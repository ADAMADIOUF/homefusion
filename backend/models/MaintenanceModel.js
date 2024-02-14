import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js'

const maintenanceSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  subject: String,
  description: String,
  address: String,
})

maintenanceSchema.post('save', async function (doc) {
  
  const emailSubject = 'Request Maintenance'
  const emailText = `A new form data entry has been submitted:\n\nFirst Name: ${doc.firstName}\nLast Name: ${doc.lastName}\nPhone: ${doc.phone}\nAddress: ${doc.address}\nSubject : ${doc.subject}\nDescription: ${doc.description}`
  const emailRecipient = 'adamadiouf2017@gmail.com'
  try {
    await sendEmail(emailRecipient, emailSubject, emailText)
    console.log('Notification email sent successfully.')
  } catch (error) {
    console.error('Error sending notification email:', error)
  }
})

const Maintenance = mongoose.model('Maintenance', maintenanceSchema)

export default Maintenance
