import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import offlineTransferRoutes from './api/offline_transfer_routes'

class Server {

	constructor(port, app) {
		this.port = port
		this.app = app
		this.init()
    }

	init() {
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
		this.app.use(helmet())
		this.app.get('/', (req, res) => res.send('Hello World!'))
		this.app.use('/transfer', offlineTransferRoutes)
		this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`))
	}
}

const app = express()
new Server(3000, app)