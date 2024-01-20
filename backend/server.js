import express from "express"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js"
import userRoutes from './routes/userRoute.js'
import propertyRoutes from './routes/propertyRoute.js'
import agentRoutes from './routes/agentRoute.js'
import reviewRoutes from './routes/reviewRoute.js'

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

app.use(notFound)
app.use(errorHandler)
app.listen(port,(console.log(`The server running at port ${port}`)))