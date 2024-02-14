import express from 'express'
const router = express.Router()
import {
  createProperty,
  deletePropriety,
  getProperties,
  getPropertyById,
  updateProperty,
} from '../controllers/propertyController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
router.route('/').get(getProperties)
router.route('/').post(protect,admin,createProperty)
router
  .route(`/:id`)
  .get(getPropertyById)
  .put(protect,admin,updateProperty)
  .delete(protect, admin, deletePropriety)

export default router
