import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import { BCH } from './bch'
import { BTC } from './btc'
import { ETH } from './eth'


export class Wallet{

    /*
     Strength               Word
    |  128  |  4 |   132  |  12  |
    |  160  |  5 |   165  |  15  |
    |  192  |  6 |   198  |  18  |
    |  224  |  7 |   231  |  21  |
    |  256  |  8 |   264  |  24  |
    */
    async init(strength){

        const mnemonic = bip39.generateMnemonic(strength)
        const seed = await bip39.mnemonicToSeed(mnemonic)
        const hexSeed = seed.toString('hex')

        // console.log(seed.toString('hex'));
        return { mnemonic, seed }
    }

    async recover(mnemonic){

        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        seed = await bip39.mnemonicToSeed(mnemonic)
        return { mnemonic, seed }

    }

    async createBCHAcc(_mnemonic, _seed, _network_type){

        const bch = new BCH(_mnemonic, _seed, _network_type)
        return bch

    }

    async createBTCAcc(_mnemonic, _seed, _network_type){

        const btc = new BTC(_mnemonic, _seed, _network_type)
        return btc
    }

    async createETHAcc(_network_type){

        const eth = new ETH()
        const info = await eth.createAccount(_mnemonic)
        return info

    }

}