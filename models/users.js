'use strict'
module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define('users', {
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		is_active: DataTypes.BOOLEAN,
		name: DataTypes.STRING,
		avatar: DataTypes.STRING
	}, {
			modelName: 'users',
			sequelize,
			underscored: true
		})
	users.associate = function (models) {
		users.hasMany(models.chats, {
			as: 'chats'
		})
	}
	return users
}
