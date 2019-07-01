import models from '../models'

const Chats = models.chats


class ChatController {

	static async index(req, res) {
		await Chats.findAll({
			include: [{
				model: models.users,
				attributes: [
					'id',
					'username'
				]
			}],
			order: [
				['createdAt', 'DESC']
			]
		}).then(chats => {
			return res.status(200).send(chats)
		}).catch(error => {
			console.log(error)
			return res.status(500).send('Server Error')
		})
	}

	static async create(req, res) {
		let user_id = req.user.id
		let text = req.body.text

		await Chats.create({
			user_id,
			text
		}).then(createdChat => {
			return res.status(200).send(createdChat)
		}).catch(error => {
			console.log(error)
			return res.status(500).send('server error')
		})
	}

	static async retrieve(req, res) {
		let user_id = req.user.id
		let chat_id = req.params._id

		await Chats.findOne({
			where: {
				id: chat_id,
				user_id
			}
		}).then(chat => {
			if (chat) {
				return res.status(200).send(chat)
			} else {
				return res.status(404).send({ message: 'Not Found' })
			}
		}).catch(error => {
			console.log(error)
			return res.status(500).send({ message: 'Internal server error' })
		})
	}

	static async delete(req, res) {
		let chat_id = req.params._id
		let user_id = req.user.id

		await Chats.findOne({
			where: {
				id: chat_id,
				user_id
			}
		}).then(chat => {
			if (chat) {
				chat.destroy()
				return res.status(204).send({})
			}
		}).catch(err => {
			console.log(err)
			return res.status(500).send({ message: 'Internal server error' })
		})
	}
}

module.exports = ChatController
