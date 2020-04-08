import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import { BCH } from '../api/bch'
import { BTC } from '../api/btc'
import { ETH } from '../api/eth'
import { WaletValidate } from './wallet_model'

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

export class WalletController {

    /*
    | Strength              Word |
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

    init = async(strength) => {

        const {error} = WaletValidate.init({strength})
        if(error) throw error

        const mnemonic = bip39.generateMnemonic(strength)
        this.seed = await bip39.mnemonicToSeed(mnemonic)
        return {mnemonic}
    }

    recover = async(mnemonic) => {

        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        this.seed = await bip39.mnemonicToSeed(mnemonic)

        return {mnemonic}

    }

    createBCHAcc = (mnemonic, network_type) => {

        const {error} = WaletValidate.create({mnemonic, network_type})
        if(error) throw error

        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        const _seed = this.seed                             //|| await bip39.mnemonicToSeed(mnemonic)
        this.bch = new BCH(mnemonic, _seed, network_type)

    }

    getBCHAddresses = (account, from, to) => {

        const address = this.bch.getAddresses(account, from, to)
        return address
    }

    getBCHAddressInfo = (account, change, address_index) => {

        const { address, pk } = this.bch.getAddressInfo(account, change, address_index)
        return{
            address,
            pk
        }
    }

    createBTCAcc = async(mnemonic, network_type) => {

        const {error} = WaletValidate.create({mnemonic, network_type})
        if(error) throw error

        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        const _seed = this.seed
        this.btc = new BTC(mnemonic, _seed, network_type)
    }

    createETHAcc = async(mnemonic) => {

        const {error} = WaletValidate.create({mnemonic, network_type})
        if(error) throw error

        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        const _seed = this.seed
        this.eth = new ETH(mnemonic, _seed)

    }

}


