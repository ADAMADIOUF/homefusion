// agentController.js

import asyncHandler from '../middleware/asyncHandler.js'
import Agent from '../models/AgentModel.js'

// @desc    Create a new agent
// @route   POST /api/agents
// @access  Public (you can change the access level as needed)
const createAgent = asyncHandler(async (req, res) => {
  const { name, email, contactNumber, image } = req.body

  // Create the agent
  const agent = await Agent.create({
    name,
    email,
    contactNumber,
    image,
  })

  if (agent) {
    res.status(201).json(agent)
  } else {
    res.status(400)
    throw new Error('Invalid agent data')
  }
})

// @desc    Get all agents
// @route   GET /api/agents
// @access  Public (you can change the access level as needed)
const getAgents = asyncHandler(async (req, res) => {
  const agents = await Agent.find({})
  res.json(agents)
})

export { createAgent, getAgents }
