import * as bip32 from 'bip32'
import * as bip39 from 'bip39'


export class Wallet{

    async create(strength){

        const mnemonic = bip39.generateMnemonic(strength)
        const seed = await bip39.mnemonicToSeed(mnemonic)
        // console.log(seed.toString('hex'));
        return { mnemonic, seed }
    }

}