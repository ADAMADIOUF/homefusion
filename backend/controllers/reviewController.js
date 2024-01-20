// reviewController.js

import asyncHandler from '../middleware/asyncHandler.js'
import Review from '../models/ReviewModel.js'

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public (you can change the access level as needed)
const createReview = asyncHandler(async (req, res) => {
  const { user, property, rating, comment } = req.body

  // Create the review
  const review = await Review.create({
    user,
    property,
    rating,
    comment,
  })

  if (review) {
    res.status(201).json(review)
  } else {
    res.status(400)
    throw new Error('Invalid review data')
  }
})

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public (you can change the access level as needed)
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
  res.json(reviews)
})

export { createReview, getReviews }
