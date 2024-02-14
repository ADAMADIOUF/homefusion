import express from "express"
import cookieParser from 'cookie-parser'
import path from 'path'
import dotenv from "dotenv"
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js"
import userRoutes from './routes/userRoute.js'
import propertyRoutes from './routes/propertyRoute.js'
import agentRoutes from './routes/agentRoute.js'
import reviewRoutes from './routes/reviewRoute.js'
import contactRoute from './routes/contactRoute.js'
import uploadRoutes from './routes/uploadRoutes.js'
import uploadProprietyRoutes from './routes/uploadProprietyRoutes.js'

import paymentRoutes from './routes/paymentRoutes.js'
dotenv.config()
connectDB()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(`/api/users`, userRoutes)
app.use(`/api/properties`, propertyRoutes)
app.use(`/api/agent`, agentRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/form', contactRoute)
app.use('/api/form/contact', contactRoute)
app.use('/api/form/submit-application', contactRoute)
app.use('/api/form/submit-maintenance', contactRoute)
app.use(`/api/upload`, uploadRoutes)
app.use(`/api/uploadPropriety`, uploadProprietyRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)
app.use('/api/payment-details', paymentRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)
app.listen(port,(console.log(`The server running at port ${port}`)))