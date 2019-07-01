import express from 'express'
import ChatController from '../Controllers/ChatController'

const router = express.Router()

router
	.get('/', ChatController.index)
	.post('/', ChatController.create)
	.get('/:_id', ChatController.retrieve)
	.delete('/:_id', ChatController.delete)

module.exports = router
