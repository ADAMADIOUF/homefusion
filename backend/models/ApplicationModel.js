import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js'

const emergencyContactSchema = new mongoose.Schema({
  name: String,
  address: String,
  relationship: String,
  email: String,
})

const currentEmployerSchema = new mongoose.Schema({
  employerName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  country: {
    type: String,
    default: 'United States',
  },
  employerPhoneNumber: String,
  monthlySalary: String,
  positionHeld: String,
  yearsWorked: Date,
  supervisorName: String,
  supervisorEmailAddress: String,
})

const uploadedFilesSchema = new mongoose.Schema({
  photoID: [String],
  proofOfIncome: [String],
  other: [String],
})

const legalHistorySchema = new mongoose.Schema({
  rentSued: String,
  rentSuedExplanation: String,
  damagesSued: String,
  damagesSuedExplanation: String,
  evicted: String,
  evictedExplanation: String,
  leaseDefault: String,
  leaseDefaultExplanation: String,
  bankruptcy: String,
  bankruptcyExplanation: String,
  felonyConvictions: String,
  felonyConvictionsExplanation: String,
  publicRecords: String,
  publicRecordsExplanation: String,
})

const previousAddressSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  country: {
    type: String,
    default: 'United States',
  },
  residedFromMonth: Date,
  residedFromYear: Date,
  residedToMonth: Date,
  residedToYear: Date,
  monthlyRent: Date,
  landlord: String,
  landlordPhoneNumber: String,
  landlordEmail: String,
  reasonForLeaving: String,
})

const applicationSchema = new mongoose.Schema({
  desiredMoveInDate: Date,
  applicationType: {
    type: String,
    enum: ['tenant', 'guarantor'],
    required: true,
  },
  tenantFirstName: {
    type: String,
    default: '',
  },
  tenantLastName: {
    type: String,
    default: '',
  },
  firstName: String,
  lastName: String,
  middleName: String,
  suffix: String,
  email: String,
  confirmEmail: String,
  phoneNumber: String,
  phoneType: String,
  howDidYouHear: String,
  previousAddresses: [previousAddressSchema], // Corrected schema for previous addresses
  hasCoApplicants: {
    type: Boolean,
    default: false,
  },
  hasOtherOccupants: {
    type: Boolean,
    default: false,
  },
  hasPets: {
    type: Boolean,
    default: false,
  },
  dateOfBirth: Date,
  socialSecurityNumber: String,
  governmentID: String,
  issuingState: String,
  emergencyContact: emergencyContactSchema,
  hasVehicles: {
    type: Boolean,
    default: false,
  },
  currentEmployer: currentEmployerSchema,
  additionalIncomeSource: String,
  uploadedFiles: uploadedFilesSchema,
  legalHistory: legalHistorySchema,
})

applicationSchema.post('save', async function (doc) {
  const emailSubject = 'New Application Submitted'
  const emailText = `A new application has been submitted:\n\nFirst Name: ${
    doc.firstName
  }\nLast Name: ${doc.lastName}\nEmail: ${doc.email}\nApplication Type: ${
    doc.applicationType
  }\nDesired Move In Date: ${
    doc.desiredMoveInDate
  }\n\nAdditional Details:\n${JSON.stringify(doc, null, 2)}`

  const emailRecipient = 'adamadiouf2017@gmail.com'

  try {
    await sendEmail(emailRecipient, emailSubject, emailText)
    console.log('Notification email sent successfully.')
  } catch (error) {
    console.error('Error sending notification email:', error)
  }
})

const Application = mongoose.model('Application', applicationSchema)

export default Application
