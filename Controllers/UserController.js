import models from '../models/index'

const Users = models.users

class UserController {

	static async retrieve(req, res) {
		await Users.findOne({
			where: {
				id: req.user.id
			},
			attributes: [
				'id',
				'username',
				'email',
				'name',
				'avatar',
				'createdAt',
				'updatedAt'
			]
		}).then(user => {
			if (user) {
				return res.status(200).send(user)
			}
		})
			.catch(err => {
				console.log(err)
				res.status(500).send({ detail: err })
			})
	}

	static async update(req, res) {
		let user_id = req.user.id
		let newData = req.body // TODO must be validated and serialized

		await Users.findOne({
			where: { id: user_id },
			attributes: [
				'id',
				'username',
				'email',
				'name',
				'avatar',
				'createdAt',
				'updatedAt'
			]
		}).then(user => {
			if (user) {
				user.update(newData).then(updatedData => {
					return res.status(200).send(updatedData)
				}).catch(error => {
					console.log('Post update error :', error)
					return res.status(400).send('Update failed')
				})
			} else {
				return res.status(404).send({ detail: 'Not found' })
			}
		})
			.catch(error => {
				console.log('Post update error :', error)
				return res.send(400, 'Update failed')
			})
	}

	static async delete(req, res) {
		let user_id = req.user.id

		await Users.findOne({ where: { id: user_id } })
			.then(user => {
				if (user) {
					user.destroy()
					return res.status(204).send({})
				} else {
					return res.status(404).send({ detail: 'Not found' })
				}
			})
			.catch(error => {
				console.log('Post delete error :', error)
			})
	}
}

module.exports = UserController
