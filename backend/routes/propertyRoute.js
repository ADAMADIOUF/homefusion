import express from 'express'
const router = express.Router()
import {
  createProperty,
  deletePropriety,
  getProperties,
  getPropertyById,
} from '../controllers/propertyController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
router.route('/').get(getProperties)
router.route('/').post(protect,admin,createProperty)
router.route('/').delete(protect, admin, deletePropriety)
// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
router.route('/:id').get(getPropertyById)

export default router
