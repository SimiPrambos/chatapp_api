'use strict'
module.exports = (sequelize, DataTypes) => {
	const chats = sequelize.define('chats', {
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		text: DataTypes.STRING,
		image: DataTypes.STRING,
		video: DataTypes.STRING
	}, {
			modelName: 'chats',
			sequelize,
			underscored: true
		})
	chats.associate = function (models) {
		chats.belongsTo(models.users, {
			foreignKey: 'user_id'
		})
	};
	return chats
}
