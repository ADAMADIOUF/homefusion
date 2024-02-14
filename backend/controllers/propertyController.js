

import asyncHandler from '../middleware/asyncHandler.js'
import Property from '../models/PropertyModel.js'
import geocoder from '../geocoder.js'


// @desc    Create a new property
// @route   POST /api/properties
// @access  Public (you may want to change this based on your authentication logic)

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({})
  res.json(properties)
})

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id)

  if (property) {
    res.json(property)
  } else {
    res.status(404)
    throw new Error('Property not found')
  }
})
// @desc    Create a new property
// @route   POST /api/properties
// @access  Public (you may want to change this based on your authentication logic)
const createProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    bedrooms,
    bathrooms,
    area,
    type,
    status,
    images,
    featured,
    address,
  } = req.body

  try {
    const property = new Property({
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      area,
      type,
      status,
      images,
      featured,

      address,
    })

    const createdProperty = await property.save()
    const { street, city, zipcode, country } = createdProperty.location

    
    const responseData = {
      ...createdProperty.toObject(), 
      address: `${street}, ${city}, ${zipcode}, ${country}`,
    }

    res.status(201).json({ success: true, data: responseData })
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: error.message || 'Internal Server Error',
      })
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
export { getProperties, getPropertyById, createProperty,deletePropriety }
