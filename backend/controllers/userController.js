import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/UserModel.js'
import sendEmail from '../utils/sendEmail.js'
import generateToken from '../utils/generateToken.js'
import crypto from 'crypto'
const authUser = asyncHandler(async (req, res) => {
  const { email, password,propertyAddress,phoneNumber,lastName } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      propertyAddress: user.propertyAddress,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error(`Invalid email or password`)
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { email, firstName, password, phoneNumber, propertyAddress, lastName } =
    req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error(`User already exists`)
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    propertyAddress,
  })
  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      propertyAddress: user.propertyAddress,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error(`Invalid user data`)
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: `Logout successfully` })
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      propertyAddress:user.propertyAddress,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error(`User not found`)
  }
})
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
  (user.firstName = req.body.firstName || user.firstName),
      (user.lastName = req.body.lastName || user.lastName),
      (user.propertyAddress = req.body.propertyAddress || user.propertyAddress),
      (user.phoneNumber = req.body.phoneNumber || user.phoneNumber),
      (user.email = req.body.email || user.email)
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      propertyAddress: updatedUser.propertyAddress,
    phoneNumber:updatedUser.phoneNumber,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error(`User not found`)
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Cant delete admin user')
    }
    await User.deleteOne({ _id: user._id })
    res.status(200).json({ message: 'User deleted successfully' })
  } else {
    res.status(404)
    throw new error('User not found')
  }
})
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not  found')
  }
})
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex')
  // Set token in database (you need to add these fields to your User model)
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  user.resetPasswordExpire = Date.now() + 3600000 // 1 hour

  await user.save()

  // Send email (implement sendEmail function based on your email service)
  const resetUrl = `https://www.homefusion.house/resetpassword/${resetToken}`
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please go to the following link to reset your password: \n\n ${resetUrl}`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    })

    res.status(200).json({ success: true, data: 'Email sent' })
  } catch (error) {
    console.log(error)

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    res.status(500)
    throw new Error('Email could not be sent')
  }
})
const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    res.status(400)
    throw new Error('Invalid token')
  }

  // Set new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  res.status(200).json({ success: true, data: 'Password reset successful' })
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  forgotPassword,
  resetPassword
}
