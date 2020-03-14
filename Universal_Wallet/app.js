import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import { BCH } from './api/bch'

class Server {

	constructor(port, app) {
		this.port = port;
		this.app = app;
    }

	core() {
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
        this.app.use(helmet())
		this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
	}
}

const app = express()
const server = new Server(3000, app);
server.core();

// const bch = new BCH()
// bch.createAccount(256, 'testnet').then(res => {

//     console.log(res)

//     const addresses = bch.getAddresses(res.masterHDNode)

//     console.log('\n\n\n\n');

//     const { address, keyPair } = bch.getAddressInfo(res.masterHDNode, undefined, undefined, 5)

//     console.log(address, keyPair);

// })
