import express from 'express'
import {  savePaymentDetails } from '../controllers/paymentController.js'

const router = express.Router();

router.post('/', savePaymentDetails)

export default router
