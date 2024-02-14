import Application from '../models/ApplicationModel.js'
import Contact from '../models/ContactModel.js'
import FormData from '../models/FormdataModel.js'
import Maintenance from '../models/MaintenanceModel.js'

const submitFormData = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    aboutYourself,
    cityOfInterest,
    message,
  } = req.body

  try {
    const formData = new FormData({
      firstName,
      lastName,
      email,
      phone,
      aboutYourself,
      cityOfInterest,
      message,
    })

    const savedFormData = await formData.save()
    res.json({ success: true, data: savedFormData })
  } catch (error) {
    console.error('Error saving form data:', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}
const contactFormData = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    message,
    moveInDate,
    availableDate,
    monthlyIncome,
    optionalInfo: { pets },
  } = req.body

  try {
    const formData = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
      moveInDate,
      availableDate,
      monthlyIncome,
      optionalInfo: { pets },
    })

    const savedFormData = await formData.save()
    res.json({ success: true, data: savedFormData })
  } catch (error) {
    console.error('Error saving form data:', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

 const submitApplication = async (req, res) => {
   const {
     desiredMoveInDate,
     tenantFirstName,
     tenantLastName,
     applicationType,
     firstName,
     lastName,
     middleName,
     suffix,
     email,
     confirmEmail,
     phoneNumber,
     phoneType,
     howDidYouHear,
     previousAddresses,
     hasCoApplicants,
     hasOtherOccupants,
     hasPets,
     dateOfBirth,
     socialSecurityNumber,
     governmentID,
     issuingState,
     emergencyContact,
     hasVehicles,
     currentEmployer,
     additionalIncomeSource,
     uploadedFiles,
     legalHistory,
     address1: address1Main,
     address2: address2Main,
     city: cityMain,
     state: stateMain,
     zip: zipMain,
     yearsWorked,
   } = req.body

   try {
     
     const application = new Application({
       desiredMoveInDate,
       tenantFirstName,
       tenantLastName,
       applicationType,
       firstName,
       lastName,
       middleName,
       suffix,
       email,
       confirmEmail,
       phoneNumber,
       phoneType,
       howDidYouHear,
       previousAddresses,
       hasCoApplicants,
       hasOtherOccupants,
       hasPets,
       dateOfBirth,
       socialSecurityNumber,
       governmentID,
       issuingState,
       emergencyContact,
       hasVehicles,
       currentEmployer,
       additionalIncomeSource,
       uploadedFiles,
       legalHistory,
       address1: address1Main,
       address2: address2Main,
       city: cityMain,
       state: stateMain,
       zip: zipMain,
       yearsWorked,
     })
     const savedApplication = await application.save()
     res.json({ success: true, data: savedApplication })
   } catch (error) {
     console.error('Error saving application:', error)
     res.status(500).json({ success: false, message: 'Internal Server Error' })
   }
 }

 const submitMaintenance = async (req, res) => {
   const { firstName, lastName, phone, subject, description, address } =
     req.body

   try {
     const maintenance = new Maintenance({
       firstName,
       lastName,
       phone,
       subject,
       description,
       address
     })
     const savedMaintenance = await maintenance.save()
     res.json({ success: true, data: savedMaintenance })
   } catch (error) {
     console.error('Error saving application:', error)
     res.status(500).json({ success: false, message: 'Internal Server Error' })
   }
 }

export { submitFormData,contactFormData,submitApplication,submitMaintenance }
