import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import { BCH } from '../api/bch'
import { BTC } from '../api/btc'
import { ETH } from '../api/eth'

// const currencies = {
//     BCH,
//     BTC,
//     ETH
// }

// class DynamicClass {
//     constructor (className, opts) {
//         return new currencies[className](opts);
//     }
// }

export class Wallet {

    /*
     Strength               Word
    |  128  |  4 |   132  |  12  |
    |  160  |  5 |   165  |  15  |
    |  192  |  6 |   198  |  18  |
    |  224  |  7 |   231  |  21  |
    |  256  |  8 |   264  |  24  |
    */
    constructor() {
        this.bch
        this.btc
        this.eth
    }

    init = async(req, res) => {

        const strength = req.body.strength
        const mnemonic = bip39.generateMnemonic(strength)
        this.seed = await bip39.mnemonicToSeed(mnemonic)
        // const hexSeed = seed.toString('hex')
        res.json({
            mnemonic,
        })
        // console.log(seed.toString('hex'));
        // return { mnemonic, seed }
    }

    recover = async(req, res) => {

        const mnemonic = req.body.mnemonic
        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        this.seed = await bip39.mnemonicToSeed(mnemonic)
        // console.log(this.seed)
        // const hexSeed = seed.toString('hex')
        res.json({
            mnemonic
        })
        // return { mnemonic, seed }

    }

    createBCHAcc = (req, res) => {

        const _mnemonic = req.body.mnemonic
        const _network_type = req.body.network_type
        const _seed = this.seed //|| await bip39.mnemonicToSeed(_mnemonic)
        // console.log('inside wallet\n', _mnemonic, _seed, _network_type)
        this.bch = new BCH(_mnemonic, _seed, _network_type)
        console.log(this.bch)
        res.send('Success!!')
        // return bch

    }

    getBCHAddresses = (req, res) => {

        const account = req.body.account
        const from = req.body.from
        const to = req.body.to
        const address = this.bch.getAddresses(account, from, to)
        // console.log('wallet', address)
        res.send(address)
    }

    getBCHAddressInfo = (req, res) => {

        const account = req.body.account
        const change = req.body.change
        const address_index = req.params.id
        const { address, pk } = this.bch.getAddressInfo(account, change, address_index)
        res.json({
            address,
            pk
        })
    }

    createBTCAcc = async(req, res) => {

        const _mnemonic = req.body.mnemonic
        const _network_type = req.body.network_type
        const _seed = this.seed
        this.btc = new BTC(_mnemonic, _seed, _network_type)
        res.send('Success!!')
    }

    createETHAcc = async(_network_type) => {

        const _mnemonic = req.body.mnemonic
        const _seed = this.seed
        this.eth = new ETH(_mnemonic, _seed)
        res.send('Success!!')

    }

    //not working
    // createAccount = (req, res) => {

    //     const type = req.params.currency
    //     const _mnemonic = req.body.mnemonic
    //     const _network_type = req.body.network_type
    //     const _seed = this.seed
    //     console.log(type)
    //     this.type = new DynamicClass(`'${type.toUpperCase}'`, _mnemonic, _seed, _network_type)

    //     res.send("Done")


    // }

    // getAddresses = (req, res) => {

    //     const type = req.params.currency
    //     const account = req.body.account
    //     const from = req.body.from
    //     const to = req.body.to
    //     const address = window[`this.${type}.getAddresses`](account, from, to)
    //     res.send(address)
    // }

}


