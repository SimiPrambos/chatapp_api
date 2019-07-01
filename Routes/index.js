import JwtAuthMiddleware from '../Middleware/JwtAuthMiddleware'
import AuthRoute from './AuthRoute'
import ChatRoute from './ChatRoute'
import UserRoute from './UserRoute'

const routes = (app) => {
	app.use('/api/v1/auth', [], AuthRoute)
	app.use('/api/v1/users', [JwtAuthMiddleware.isAuthenticated], UserRoute)
	app.use('/api/v1/chats', [JwtAuthMiddleware.isAuthenticated], ChatRoute)
}

module.exports = routes
