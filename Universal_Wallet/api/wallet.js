import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import { BCH } from './bch'
import { BTC } from './btc'
import { ETH } from './eth'


export class Wallet{

    async create(strength){

        const mnemonic = bip39.generateMnemonic(strength)
        const seed = await bip39.mnemonicToSeed(mnemonic)
        // console.log(seed.toString('hex'));
        return { mnemonic, seed }
    }

    async recover(mnemonic){

        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        const seed = await bip39.mnemonicToSeed(mnemonic)
        return { mnemonic, seed }

    }

    async createBCHAcc(_seed, _network_type){

        const bch = new BCH()
        const masterHDNode = await bch.createAccount(_seed, _network_type)
        return masterHDNode
    }

    async createBTCAcc(_seed, _network_type){

        const btc = new BTC()
        const masterRoot = await btc.createAccount(_seed, _network_type)
        return masterRoot

    }

    async createETHAcc(_mnemonic){

        const eth = new ETH()
        const info = await eth.createAccount(_mnemonic)
        return info

    }

}