import { BITBOX } from 'bitbox-sdk'
import coinSelect from 'coinselect'
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import coin from 'coininfo'
import winston from 'winston'

const bitbox = new BITBOX({
    restURL: 'https://trest.bitcoin.com/v2/',
});


export class BCH{

    // #masterHDNode
    // #network_type
    // #mnemonic

    constructor(_mnemonic, _seed, _network_type){

        // console.log('inside bch \n', mnemonic, seed, network_type)
        this.mnemonic = _mnemonic
        this.network_type = _network_type
        this.masterHDNode = this.masterNodeSelector(_seed, this.network_type)
        const rootKey = bitbox.HDNode.toXPriv(this.masterHDNode);
        // console.log('bchhhhhhhhhhhhh', rootKey)
    }

    masterNodeSelector = (rootSeed) => {

        if (this.network_type == 'testnet') {

            this.network_type = coin.bitcoincash.test
            return bitbox.HDNode.fromSeed(rootSeed, 'testnet')
            // return bip32.fromSeed(rootSeed, this.network_type)
        }

        else {
            this.network_type = coin.bitcoincash.main
            return bitbox.HDNode.fromSeed(rootSeed, 'mainnet')
            // return bip32.fromSeed(rootSeed, this.network_type)
        }
    }

    getAddresses = (from_account_index = 0, from = 0, to = 10) => {

        console.log(from , to)
        // console.logmasterHDNode);
        let address = {}
        for (let i = from; i <= to; i++) {
            let childNode = this.masterHDNode.derivePath(`m/44'/145'/${from_account_index}'/0/${i}`);
            address[`address-${i}`] = bitbox.HDNode.toCashAddress(childNode)
            console.log(
              `${address[i]}`
            );
        }

        return address
    }

    getAddressInfo = (account_index = 0, isChange = 0, address_index) => {

        const account = this.masterHDNode.derivePath(`m/44'/145'/${account_index}'`)
        const childNode = this.masterHDNode.derivePath(`m/44'/145'/${account_index}'/${isChange}/${address_index}`)

        const address = bitbox.HDNode.toCashAddress(childNode)
        const node = bitbox.HDNode.derivePath(account, `${isChange}/${address_index}`);
        const keyPair = bitbox.HDNode.toKeyPair(node);
        const pk = keyPair.toWIF().toString('hex')

        return { address, pk, keyPair }
    }


    send = async(from_account_index = 0, from_address_index, to_address, amount, feeRate) => {

        let {address: from_address, pk, keyPair} = this.getAddressInfo(from_account_index, 0, from_address_index)   //change this

        const result = await bitbox.Address.utxo(from_address)

        if (!result.utxos[0]) return console.log('info', 'No utxos!!!');

        const allUtxos = result.utxos

        const newUtxos = this.utxoConvertor(allUtxos)

        const {inputs, outputs, fee} = this.utxoSelector(newUtxos, [{
            address: to_address, value: amount}],
        feeRate)

        let transactionBuilder = this.buildTx(inputs, from_account_index, outputs)

        let redeemScript
        this.signAll(inputs, transactionBuilder, keyPair, redeemScript)
        console.log('info', 'atlast.........')

        await this.sendTx(transactionBuilder)

    }

    utxoConvertor = (allUtxos) => {

        for (let i in allUtxos){
            allUtxos[i]['value'] = allUtxos[i]['satoshis']
        }
        return allUtxos

    }

    utxoSelector = (allUtxos, targets, feeRate = 1) => {

        let { inputs, outputs, fee } = coinSelect(allUtxos, targets, feeRate)
        console.log('info', 'INPUTS-------------------\n', inputs)
        console.log('info', 'OUTPUTS------------------\n', outputs)
        console.log('info', 'FEE----------------------\n', fee)
        return { inputs, outputs, fee }
    }


    addInputs = (inputs, transactionBuilder) => {
        inputs.forEach(element => {

            transactionBuilder.addInput(element.txid, element.vout);
            console.log('info', 'added');
        });
    }

    addOutputs = (outputs, change_address, transactionBuilder) => {
        outputs.forEach(element => {

            if (!element.address) {

                element.address = change_address;
                transactionBuilder.addOutput(element.address, element.value);
            }
            else {

                transactionBuilder.addOutput(element.address, element.value);
            }
        });
    }

    buildTx = (inputs, from_account_index, outputs) => {

        let transactionBuilder = new bitbox.TransactionBuilder(this.network_type) //change this
        this.addInputs(inputs, transactionBuilder)
        console.log('info', 'done.....maybe.........')

        const { address: change_address} = this.getAddressInfo(from_account_index, 1, 0) //change this
        this.addOutputs(outputs, change_address, transactionBuilder) //change_address?
        console.log('info', 'almost there............')

        return transactionBuilder
    }


    signAll = (inputs, transactionBuilder, keyPair, redeemScript) => {
        inputs.forEach((element, i) => {
            transactionBuilder.sign(i, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, element.value);
    });
    }


    sendTx = async(transactionBuilder) => {

        const tx = transactionBuilder.build()
        const tx_hex = tx.toHex()
        console.log('info', `Transaction raw hex: ${tx_hex}`)
        confirm = await bitbox.RawTransactions.sendRawTransaction(tx_hex)
        console.log('info', `Transaction ID: ${confirm}`)
    }


    _addr_bal(allUtxos){

        let total_amount = 0
        let new_amount = 0
        for (let i in allUtxos){

            new_amount = allUtxos[i].amount
            total_amount += new_amount
        }

        // console.log(total_amount);
        return total_amount

    }

}


