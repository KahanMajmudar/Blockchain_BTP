import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import walletRoutes from './wallet/wallet_routes'
import userRoutes from './users/user_routes'
import mailRoutes from './mail/mail_routes'
import middlewareRoutes from './api/middlewares/middleware_routes'
import { ErrorService } from './services/error'

class Server {

	constructor(port, app) {
		this.port = port
		this.app = app
		this.mongodb()
		this.init()
		this.error = new ErrorService()
    }

	init() {
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
		this.app.use(helmet())
		this.app.get('/', (req, res) => res.send('Hello World!'))
		this.app.use('/wallet', walletRoutes)
		this.app.use('/user', userRoutes)
		this.app.use('/mail', mailRoutes)
		this.app.use('/auth', middlewareRoutes)
		this.app.use(async (err, req, res, next) => {
			const isOperationalError = this.error.handleError({
				res: res,
				err: err.description,
				data: {
					type: err.commonType,
					bool: err.isOperational
				}
			});
			if (!isOperationalError) {
				next(err);
			}
		})
		// process.on('uncaughtException', err => {
		// 	throw err
		// })
		// process.on('unhandledRejection', err => {
		// 	throw err
		// })
		this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`))
	}

	mongodb(){

		mongoose.set('useCreateIndex', true);
		mongoose.set('useFindAndModify', false);
		mongoose.set('useNewUrlParser', true)
		mongoose.set('useUnifiedTopology', true)
		mongoose.connect('mongodb://localhost/universal_wallet')
			.then(() => console.log('Connection established succesfully!!'))
			.catch(err => console.error('Failed to establish connection', err))

	}
}

const app = express()
const server = new Server(3000, app)
// server.init()