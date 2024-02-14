import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js'

const contactSchema = new mongoose.Schema({
  moveInDate: Date,
  availableDate: Date,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  message: String,
  monthlyIncome: Number,
  optionalInfo: {
    pets: {
      cat: Boolean,
      dog: Boolean,
      other: Boolean,
    },
  },
})

contactSchema.post('save', async function (doc) {
  // This function will be called after saving a new FormData entry
  const emailSubject = 'New Form Data Submitted'
  const emailText = `A new form data entry has been submitted:\n\nFirst Name: ${doc.firstName}\nLast Name: ${doc.lastName}\nEmail: ${doc.email}\nPhone: ${doc.phone}\nMessage: ${doc.message}\nMove-in Date: ${doc.moveInDate}\nAvailable Date: ${doc.availableDate}\nOptional Information:\nMonthly Income: ${doc.monthlyIncome}\nPets: Cat - ${doc.optionalInfo.pets.cat}, Dog - ${doc.optionalInfo.pets.dog}, Other - ${doc.optionalInfo.pets.other}`

  // Replace 'recipient@example.com' with the email address you want to receive the notification
  const emailRecipient = 'adamadiouf2017@gmail.com'

  // Call the sendEmail function to send the notification email
  try {
    await sendEmail(emailRecipient, emailSubject, emailText)
    console.log('Notification email sent successfully.')
  } catch (error) {
    console.error('Error sending notification email:', error)
  }
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
