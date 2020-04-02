import { WalletController } from './wallet_controller'
import { ErrorService } from '../services/error'

export class Wallet {

    constructor() {
        this.walletcontroller = new WalletController()
    }

    init = async(req, res, next) => {

        try {
            const strength = req.body.strength
            const result = await this.walletcontroller.init(strength)
            res.json(result)
        } catch (error) {
            const err = new ErrorService('error', error, true)      //improve all
            next(err)
        }
    }

    recover = async(req, res) => {

        const mnemonic = req.body.mnemonic
        const result = await this.walletcontroller.recover(mnemonic)
        res.json(result)

    }

    createBCHAcc = (req, res, next) => {

        try {
            const mnemonic = req.body.mnemonic
            const network_type = req.body.network_type
            this.walletcontroller.createBCHAcc(mnemonic, network_type)
            res.send('Success BCH!!')
        } catch (error) {
            const err = new ErrorService('error', error, true)
            next(err)
        }
    }

    getBCHAddresses = (req, res) => {

        const account = req.body.account
        const from = req.body.from
        const to = req.body.to
        const result = this.walletcontroller.getBCHAddresses(account, from, to)
        res.send(result)
    }

    getBCHAddressInfo = (req, res) => {

        const account = req.body.account
        const change = req.body.change
        const address_index = req.params.id
        const { address, pk } = this.walletcontroller.getBCHAddressInfo(account, change, address_index)
        res.json({
            address,
            pk
        })
    }

    createBTCAcc = async(req, res) => {

        const _mnemonic = req.body.mnemonic
        const _network_type = req.body.network_type
        await this.walletcontroller.createBTCAcc(_mnemonic, _network_type)
        res.send('Success BTC!!')
    }

    createETHAcc = async(req, res) => {

        const _mnemonic = req.body.mnemonic
        await this.walletcontroller.createETHAcc(_mnemonic)
        res.send('Success ETH!!')

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


