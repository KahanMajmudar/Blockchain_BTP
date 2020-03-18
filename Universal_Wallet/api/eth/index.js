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


    async createAccount(mnemonic, seed){

        // const { mnemonic, seed }            //change it
        // const provider = new HDWalletProvider(mnemonic, infuraurl)
        const root = hdkey.fromMasterSeed(seed)
        return root

    }

    getAddresses(root, from, to){

        for (let i = from; i <= to; i++){

            const child = root.derivePath(`m/44'/60'/0'/0/${i}`).getWallet()
            console.log('0x' + child.getAddress().toString('hex'))
        }

    }

    getAddressInfo(root, address_index){

        const child = root.derivePath(`m/44'/60'/0'/0/${address_index}`).getWallet()
        const address = `0x${child.getAddress().toString('hex')}`
        const privateKey = `0x${child.getPrivateKey().toString('hex')}`

        return { address, privateKey }

    }

    async send(root, from_address_index, to_address, amount, network_type){

        const { address: from_address, privateKey } = this.getAddressInfo(root, from_address_index)

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