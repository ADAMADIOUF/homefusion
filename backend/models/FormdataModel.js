import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js'

const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  aboutYourself: String,
  cityOfInterest: String,
  message: String,
})

formDataSchema.post('save', async function (doc) {
  // This function will be called after saving a new FormData entry
  const emailSubject = 'New Form Data Submitted'
  const emailText = `A new form data entry has been submitted:\n\nFirst Name: ${doc.firstName}\nLast Name: ${doc.lastName}\nEmail: ${doc.email}\nPhone: ${doc.phone}\nAbout Yourself: ${doc.aboutYourself}\nCity of Interest: ${doc.cityOfInterest}\nMessage: ${doc.message}`

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

const FormData = mongoose.model('FormData', formDataSchema)

export default FormData
