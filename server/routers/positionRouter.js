const express = require('express')
const {
  createPositionController,
  getPositionsController,
  getPositionController,
  updatePositionController,
  deletePositionController
} = require('../controllers/positionController')

const positionRouter = express.Router()

positionRouter.post(`/createposition`, createPositionController),
  positionRouter.get(`/getpositions`, getPositionsController),
  positionRouter.get(`/getposition`, getPositionController),
  positionRouter.put(`/updateposition`, updatePositionController),
  positionRouter.post(`/deleteposition`, deletePositionController),

  module.exports = { positionRouter }