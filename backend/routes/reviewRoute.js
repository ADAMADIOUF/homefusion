// reviewRoutes.js

import express from 'express'
const router = express.Router()
import { createReview, getReviews } from '../controllers/reviewController.js'

// Define review routes
router.route('/').post(createReview).get(getReviews)

export default router
