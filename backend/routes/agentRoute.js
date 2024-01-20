// agentRoutes.js

import express from 'express'
const router = express.Router()
import { createAgent, getAgents } from '../controllers/agentController.js'

// Define agent routes
router.route('/').post(createAgent).get(getAgents)

export default router
