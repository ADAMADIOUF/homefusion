import mongoose from 'mongoose'


const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  payerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  payerEmail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Payment = mongoose.model('Payment', paymentSchema)

export default  Payment
