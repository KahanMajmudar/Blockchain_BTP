import Web3 from 'web3'
import * as bip39 from 'bip39'
import hdkey from 'ethereumjs-wallet/hdkey'
// import HDWalletProvider from '@truffle/hdwallet-provider'
const infuraurl = 'https://ropsten.infura.io/v3/my-key'
import * as Tx from 'ethereumjs-tx'
const web3 = new Web3(
    new Web3.providers.HttpProvider(infuraurl)
)


export class ETH{

    #root
    #mnemonic

    async createAccount(mnemonic, seed){

        this.#mnemonic = mnemonic
        this.#root = hdkey.fromMasterSeed(seed)
        // return root

    }

    getAddresses(account_index = 0, from = 0, to = 10){

        for (let i = from; i <= to; i++){

            const child = this.#root.derivePath(`m/44'/60'/${account_index}'/0/${i}`).getWallet()
            console.log(`0x${child.getAddress().toString('hex')}`)
        }

    }

    getAddressInfo(address_index){

        const child = this.#root.derivePath(`m/44'/60'/0'/0/${address_index}`).getWallet()
        const address = `0x${child.getAddress().toString('hex')}`
        const privateKey = `0x${child.getPrivateKey().toString('hex')}`

        return { address, privateKey }

    }

    async send(from_address_index, to_address, amount, network_type){

        const { address: from_address, privateKey } = this.getAddressInfo(this.#root, from_address_index)

        const nonce = await web3.eth.getTransactionCount(from_address, 'pending')
        const txData = {
            nonce: web3.utils.toHex(nonce),
            to: to_address,
            value: web3.utils.numberToHex(web3.utils.toWei(amount, 'ether')),
            gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'Gwei')),
            gasLimit:  web3.utils.toHex('3000000')
        }

        const tx = new Tx.Transaction(txData, {'chain': network_type})      //change this
        tx.sign(privateKey)
        const serializedTx = tx.serialize()
        console.log(`0x${serializedTx.toString('hex')}`)
        await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`).on('receipt', console.log)

    }

}