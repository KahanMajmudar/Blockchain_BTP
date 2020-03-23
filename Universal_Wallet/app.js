import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import walletRoutes from './wallet/wallet_routes'
import userRoutes from './users/user_routes'
import mailRoutes from './mail/mail_routes'

class Server {

	constructor(port, app) {
		this.port = port
		this.app = app
		this.mongodb()
		this.init()
    }

	init() {
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
		this.app.use(helmet())
		this.app.get('/', (req, res) => res.send('Hello World!'))
		this.app.use('/wallet', walletRoutes)
		this.app.use('/user', userRoutes)
		this.app.use('/mail', mailRoutes)
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


// const wallet = new Wallet()
// wallet.create(128).then(res => {

// 	console.log('app \n', res.mnemonic)

// 	wallet.createBCHAcc(res.mnemonic, res.seed, 'testnet').then(ress => {

// 		// console.log('app.bch', ress)

// 		ress.getAddresses(0, 0, 5)

// 		// const {address, keyPair} = ress.getAddressInfo(0, 0, 5)
// 		// console.log(address, keyPair)


// 	})


// 	wallet.createBTCAcc(res.mnemonic, res.seed, 'testnet').then(ress => {

// 		// console.log(ress)

// 		// console.log(ress.getCointype())
// 		ress.getAddresses()

// 		// const {address, keyPair} = ress.getAddressInfo(0, 0, 0)

// 		// console.log(address, keyPair)

// 	})

// })

