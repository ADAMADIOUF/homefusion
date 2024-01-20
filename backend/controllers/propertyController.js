
import asyncHandler from '../middleware/asyncHandler.js'
import Property from '../models/PropertyModel.js'
const createProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    type,
    status,
    images,
    agent,
    coordinates,
  } = req.body

  const property = new Property({
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    type,
    status,
    images,
    agent,
    coordinates,
  })

  try {
    const createdProperty = await property.save()
    res.status(201).json(createdProperty)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Property creation failed', error: error.message })
  }
})
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

export { getProperties, getPropertyById, createProperty }
