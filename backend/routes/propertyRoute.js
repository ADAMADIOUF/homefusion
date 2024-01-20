import express from 'express'
const router = express.Router()
import {
 createProperty,
  getProperties,
  getPropertyById,
} from '../controllers/propertyController.js'

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
router.route('/').get(getProperties)
router.route('/').post(createProperty)


// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
router.route('/:id').get(getPropertyById)

export default router
