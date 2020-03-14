import Web3 from 'web3'
import * as bip39 from 'bip39'
import HDWalletProvider from '@truffle/hdwallet-provider';
const infuraurl = 'https://ropsten.infura.io/v3/96453a99912a4ec4805c98db605cdcc0'
import * as Tx from 'ethereumjs-tx'
import { Wallet } from '../wallet';



export class ETH{


    async createAccount(strength){

        const { mnemonic, seed }            //change it
        const provider = new HDWalletProvider(mnemonic, infuraurl)
        const web3 = new Web3(provider)

        return walletInfo = web3.eth.accounts._provider.wallets

    }

    async send(wallet_info, from_address, to_address, amount, network_type){

        const from_pk = wallet_info[from_address]._privKey
        const privateKey = Buffer.from(from_pk.toString('hex'), 'hex')

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
        console.log('0x' + serializedTx.toString('hex'));
        await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);

    }

}