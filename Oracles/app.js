import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import oracleRoutes from './api/oracle_routes'

// truffle develop
// ethereum-bridge -a 9 -H 127.0.0.1 -p 9545 --dev
// truffle compilte && truffle migrate

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
		this.app.use('/oracle', oracleRoutes)
		this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`))
	}
}

const app = express()
new Server(3000, app)