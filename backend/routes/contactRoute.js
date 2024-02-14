// backend/routes/formRoutes.js
import express from 'express'
import {
  contactFormData,
  submitApplication,
  submitFormData,
  submitMaintenance,
} from '../controllers/contactController.js'


const router = express.Router()

// Route for form submissions
router.post('/', submitFormData)
router.post('/contact', contactFormData)

router.post('/submit-application', submitApplication)
router.post('/submit-maintenance', submitMaintenance)





export default router
