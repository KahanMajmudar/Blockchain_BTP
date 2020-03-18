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

    async createAccount(mnemonic, seed, network_type){

        // const mnemonic = bip39.generateMnemonic(strength)    //12 or 24?
        // const rootSeed = await bip39.mnemonicToSeed(mnemonic)
        // const { mnemonic, seed }    //change it
        const masterHDNode = this.masterNodeSelector(seed, network_type)
        const rootKey = bitbox.HDNode.toXPriv(masterHDNode);
        return masterHDNode

    }

    getAddresses(masterHDNode, from_account_index = 0, from = 0, to = 10){

        // console.log(masterHDNode);
        for (let i = from; i < to; i++) {
            let childNode = masterHDNode.derivePath(`m/44'/145'/${from_account_index}'/0/${i}`);
            console.log(
              `${bitbox.HDNode.toCashAddress(childNode)}`
            );
        }
    }

    getAddressInfo(masterHDNode, account_index = 0, isChange = 0, address_index){

        const account = masterHDNode.derivePath(`m/44'/145'/${account_index}'`)
        const childNode = masterHDNode.derivePath(`m/44'/145'/${account_index}'/${isChange}/${address_index}`)

        const address = bitbox.HDNode.toCashAddress(childNode)
        const node = bitbox.HDNode.derivePath(account, `${isChange}/${address_index}`);
        const keyPair = bitbox.HDNode.toKeyPair(node);

        return { address, keyPair }
    }

    masterNodeSelector(rootSeed, network_type){

        if (network_type == 'testnet') return bitbox.HDNode.fromSeed(rootSeed, coin.bitcoincash.test)

        else return bitbox.HDNode.fromSeed(rootSeed, coin.bitcoincash.main)

    }

    async send(masterHDNode, from_account_index = 0, from_address_index, to_address, amount, feeRate){

        let {address: from_address, keyPair} = this.getAddressInfo(masterHDNode, from_account_index, false, from_address_index)   //change this

        const result = await bitbox.Address.utxo(from_address)

        if (!result.utxos[0]) return console.log('info', 'No utxos!!!');

        const allUtxos = result.utxos

        const newUtxos = this.utxoConvertor(allUtxos)

        const {inputs, outputs, fee} = this.utxoSelector(newUtxos, [{
            address: to_address, value: amount}],
        feeRate)

        let transactionBuilder = this.buildTx(inputs, masterHDNode, from_account_index, outputs)

        let redeemScript
        this.signAll(inputs, transactionBuilder, keyPair, redeemScript)
        console.log('info', 'atlast.........')

        await this.sendTx(transactionBuilder)

    }

    utxoConvertor(allUtxos){

        for (let i in allUtxos){
            allUtxos[i]['value'] = allUtxos[i]['satoshis']
        }
        return allUtxos

    }

    utxoSelector(allUtxos, targets, feeRate = 1){

        let { inputs, outputs, fee } = coinSelect(allUtxos, targets, feeRate)
        console.log('info', 'INPUTS-------------------\n', inputs)
        console.log('info', 'OUTPUTS------------------\n', outputs)
        console.log('info', 'FEE----------------------\n', fee)
        return { inputs, outputs, fee }
    }


    addInputs(inputs, transactionBuilder) {
        inputs.forEach(element => {

            transactionBuilder.addInput(element.txid, element.vout);
            console.log('info', 'added');
        });
    }

    addOutputs(outputs, change_address, transactionBuilder) {
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

    buildTx(masterHDNode, inputs, from_account_index, outputs) {

        let transactionBuilder = new bitbox.TransactionBuilder("testnet") //change this
        this.addInputs(inputs, transactionBuilder)
        console.log('info', 'done.....maybe.........')

        const change_address = this.getAddressInfo(masterHDNode, from_account_index, true, 0) //change this
        this.addOutputs(outputs, change_address, transactionBuilder) //change_address?
        console.log('info', 'almost there............')

        return transactionBuilder
    }


    signAll(inputs, transactionBuilder, keyPair, redeemScript) {
        inputs.forEach((element, i) => {
            transactionBuilder.sign(i, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, element.value);
    });
    }


    async sendTx(transactionBuilder) {

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


