
import asyncHandler from '../middleware/asyncHandler.js'
import Payment from '../models/MonthlyPaymentModel.js'


const savePaymentDetails = asyncHandler(async  (req, res) => {
  try {
    const payment = new Payment(req.body)
    await payment.save()
    res.status(201).send(payment)
  } catch (error) {
    res.status(400).send(error)
  }
})

export {savePaymentDetails}