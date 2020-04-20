import Web3 from "web3"
import abi from "human-standard-token-abi"
import { MailController } from '../services/mail/mail_controller'
const infuraurl = 'https://ropsten.infura.io/v3/[key]'
import * as Tx from 'ethereumjs-tx'
const web3 = new Web3(
    new Web3.providers.HttpProvider(infuraurl)
)


export class OfflineTransferController {

    constructor() {
        this.tokenContract
    }

    sendEthOffline = async (sender, receiver, valueEth, pk, email) => {

        const value = valueEth
        const privateKey = Buffer.from(pk, 'hex')

        try {
            const nonce = await web3.eth.getTransactionCount(sender, 'pending')
            const txData = {
                nonce: nonce,
                to: receiver,
                value: web3.utils.numberToHex(web3.utils.toWei(valueEth, 'ether')),
                gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'Gwei')),
                gasLimit: web3.utils.toHex('3000000')
            }

            const tx = new Tx.Transaction(txData, {'chain': 'ropsten'})
            tx.sign(privateKey)
            const serializedTx = tx.serialize()
            console.log(`0x${serializedTx.toString('hex')}`)
            const data = {
                email: email,
                txhash: `0x${serializedTx.toString('hex')}`
            }
            const result = await this.sendMail(data)
            return result

        } catch (error) {
            return(error.message)

        }

    }

    sendEthOnline = async (sender, receiver, valueEth, pk) => {

        const privateKey = Buffer.from(pk, 'hex')

        try {
            const nonce = await web3.eth.getTransactionCount(sender, 'pending')
            const txData = {
                nonce: nonce,
                to: receiver,
                value: web3.utils.numberToHex(web3.utils.toWei(valueEth, 'ether')),
                gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'Gwei')),
                gasLimit: web3.utils.toHex('3000000')
            }

            const tx = new Tx.Transaction(txData, {'chain': 'ropsten'})
            tx.sign(privateKey)
            const serializedTx = tx.serialize()
            console.log(`0x${serializedTx.toString('hex')}`)
            await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
                .on('receipt', console.log)

        } catch (error) {
            return (error.message)

        }

    }

    setTokenContract = async(contractAddress) => {

        const token_address = contractAddress
        this.tokenContract = await new web3.eth.Contract(abi, token_address)
        if (this.tokenContract) return "Success!!"
        else return "Failed!!"
    }

    sendERC20Offline = async(sender, receiver, tokenValue, pk, email) => {

        if (!this.tokenContract) return new Error('Token Contract not set!!')

        const bn_amount =  web3.utils.toBN(tokenValue)
        const decimals = await this.tokenContract.methods.decimals().call()
        const amount_to_send = bn_amount.mul(web3.utils.toBN(10).pow(decimals))  //amt * 10^decimals

        try {
            const nonce = await web3.eth.getTransactionCount(sender, 'pending')
            const txData = {
                from: sender,
                nonce: nonce,
                to: this.tokenContract,
                value: web3.utils.numberToHex(web3.utils.toWei(value, 'ether')),
                gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'Gwei')),
                gasLimit: web3.utils.toHex('3000000'),
                data: this.tokenContract.methods.transfer(receiver, amount_to_send).encodeABI()
            }

            const tx = new Tx.Transaction(txData, {'chain': 'ropsten'})
            tx.sign(pk)
            const serializedTx = tx.serialize()
            console.log(`0x${serializedTx.toString('hex')}`)

            const data = {
                email: email,
                txhash: `0x${serializedTx.toString('hex')}`
            }
            const result = await this.sendMail(data)
            return result

        } catch (error) {
            return(error.message)

        }
    }

    sendERC20Online = async(sender, receiver, tokenValue, pk) => {

        if (!this.tokenContract) return new Error('Token Contract not set!!')

        const bn_amount =  web3.utils.toBN(tokenValue)
        const decimals = await this.tokenContract.methods.decimals().call()
        const amount_to_send = bn_amount.mul(web3.utils.toBN(10).pow(decimals))  //amt * 10^decimals

        try {
            const nonce = await web3.eth.getTransactionCount(sender, 'pending')
            const txData = {
                from: sender,
                nonce: nonce,
                to: this.tokenContract,
                value: web3.utils.numberToHex(web3.utils.toWei(value, 'ether')),
                gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'Gwei')),
                gasLimit: web3.utils.toHex('3000000'),
                data: this.tokenContract.methods.transfer(receiver, amount_to_send).encodeABI()
            }

            const tx = new Tx.Transaction(txData, {'chain': 'ropsten'})
            tx.sign(pk)
            const serializedTx = tx.serialize()
            console.log(`0x${serializedTx.toString('hex')}`)

            await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
                .on('receipt', console.log)

        } catch (error) {
            return(error.message)

        }

    }

    sendMail = async(data) => {
        const mail_controller = new MailController()
        const result = await mail_controller.send(data)
        return result
    }


}