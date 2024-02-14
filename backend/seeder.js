import dotenv from 'dotenv'
import colors from 'colors'
import Bootcamp from './models/PropertyModel.js'
import connectDB from './config/db.js'
import bootcampsData from './data/property.js'
import course from './data/agent.js'
import geocoder from './geocoder.js'
import Course from './models/AgentModel.js'
import users from './data/users.js'
import User from './models/UserModel.js'
dotenv.config()
connectDB()

const importData = async () => {
  try {
    // Delete existing data
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()

    const bootcamps = await Promise.all(
      bootcampsData.map(async (bootcamp) => {
        const loc = await geocoder.geocode(bootcamp.address)

        const newBootcamp = {
          ...bootcamp,
          location: {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress,
            street: loc[0].streetName,
            city: loc[0].city,
            state: loc[0].stateCode,
            zipcode: loc[0].zipcode,
            country: loc[0].countryCode,
          },
        }

        return newBootcamp
      })
    )

    await Bootcamp.insertMany(bootcamps)
    console.log(`Bootcamp data imported!`.green.inverse)

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = course.map((product) => ({
      ...product,
      user: adminUser,
    }))

    await Course.insertMany(sampleProducts)

    console.log(`Course data imported!`.green.inverse)

    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // Delete all data
    await Course.deleteMany()
    await Bootcamp.deleteMany()
    await User.deleteMany()
    console.log(`Data Destroyed!`.red.inverse)

    // Call process.exit() after all asynchronous operations are completed
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
