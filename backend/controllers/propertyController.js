import asyncHandler from '../middleware/asyncHandler.js'
import Property from '../models/PropertyModel.js'
const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({})
  res.json(properties)
})

const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id)

  if (property) {
    res.json(property)
  } else {
    res.status(404)
    throw new Error('Property not found')
  }
})
const createProperty = asyncHandler(async (req, res) => {
  const product = await new Property({

  title: "Sample Property",
  description: "This is a sample property",
  price: 100000,
  bedrooms: 8,
  bathrooms:9,
  area: 1500,
  type: "House",
  status: "available",
  images: ["image1.jpg", "image2.jpg"],
  featured: true,
  address: "1101 32ND AVE SW apt 11 dakar north dakota"
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})
const updateProperty = asyncHandler( async (req, res) => {
const {
  title,
  description,
  price,
  bedrooms,
  bathrooms,
  type,
  status,
  images,
  featured,
  address,
  
} = req.body
const property = await Property.findById(req.params.id)
    if (property) {
      property.title = title
      property.description = description
      property.price = price
      property.bedrooms = bedrooms
      property.bathrooms = bathrooms
      property.type = type
      property.status = status
      property.images = images
      property.featured = featured
      property.address = address
      const updatedProduct = await property.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Resource not found')
    }
})
const deletePropriety = asyncHandler(async (req, res) => {
  const propriety = await Property.findById(req.params.id)
  if (propriety) {
    await Property.deleteOne({ _id: propriety._id })
    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})
export {
  getProperties,
  getPropertyById,
  createProperty,
  deletePropriety,
  updateProperty,
}
