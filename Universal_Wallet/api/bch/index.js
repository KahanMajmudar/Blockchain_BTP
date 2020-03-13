import { BITBOX } from 'bitbox-sdk'
import coinSelect from 'coinselect'
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import coin from 'coininfo'
import winston from 'winston'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ]
})

const bitbox = new BITBOX({
    restURL: 'https://trest.bitcoin.com/v2/',
  });


export class BCH{


    async createAccount(network_type, strength){

        const mnemonic = bip39.generateMnemonic(strength)    //12 or 24?
        const rootSeed = await bip39.mnemonicToSeed(mnemonic)
        const masterHDNode = this.masterNodeSelector(rootSeed, network_type)
        const rootKey = bitbox.HDNode.toXPriv(masterHDNode);

        return mnemonic, rootKey

    }

    getAddresses(masterHDNode, account_index = 0, from, to){

        for (let i = from; i < to; i++) {
            let childNode = masterHDNode.derivePath(`m/44'/145'/${account_index}'/0/${i}`);
            logger.log(
              `${bitbox.HDNode.toCashAddress(childNode)}`
            );
        }
    }

    getAddressInfo(masterHDNode, account_index = 0, isChange = 0, address_index){

        const account = masterHDNode.derivePath(`m/44'/145'/${account_index}'/${isChange}/${address_index}'`)
        const childNode = masterHDNode.derivePath(`m/44'/145'/${account_index}'/${isChange}/${address_index}`);
        logger.log(
            `${bitbox.HDNode.toCashAddress(childNode)}`
        );

        const address = bitbox.HDNode.toCashAddress(childNode)
        const node = bitbox.HDNode.derivePath(account, `${isChange}/${index}`);
        const keyPair = bitbox.HDNode.toKeyPair(node);


        return address, keyPair
    }

    masterNodeSelector(rootSeed, network_type){

        if (network_type == 'testnet') return bitbox.HDNode.fromSeed(rootSeed, coin.bitcoincash.test)

        else return bitbox.HDNode.fromSeed(rootSeed, coin.bitcoincash.main)

    }

    async send(masterHDNode, account_index = 0, from_index, to_address, amount, feeRate){

        let {from_address, keyPair} = this.getAddressInfo(masterHDNode, account_index, false, from_index)   //change this

        const result = await bitbox.Address.utxo(from_address)

        if (!result.utxos[0]) return logger.log('info', 'No utxos!!!');

        const allUtxos = result.utxos

        const newUtxos = this.utxoConvertor(allUtxos)

        const {inputs, outputs, fee} = this.utxoSelector(newUtxos, [{
            address: to_address, value: amount}],
        feeRate)

        let transactionBuilder = new bitbox.TransactionBuilder("testnet");  //change this
        this.addInputs(inputs, transactionBuilder);

        logger.log('info', 'done.....maybe.........');

        const change_address = this.getAddressInfo(masterHDNode, account_index, true, 0)    //change this
        this.addOutputs(outputs, change_address, transactionBuilder);       //change_address?

        logger.log('info', 'almost there............');

        let redeemScript;

        this.signAll(inputs, transactionBuilder, keyPair, redeemScript);

        logger.log('info', 'atlast.........');

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
        logger.log('info', 'INPUTS-------------------\n', inputs)
        logger.log('info', 'OUTPUTS------------------\n', outputs)
        logger.log('info', 'FEE----------------------\n', fee)
        return {inputs, outputs, fee}
    }


    addInputs(inputs, transactionBuilder) {
        inputs.forEach(element => {

            transactionBuilder.addInput(element.txid, element.vout);
            logger.log('info', 'added');
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


    signAll(inputs, transactionBuilder, keyPair, redeemScript) {
        inputs.forEach((element, i) => {
            transactionBuilder.sign(i, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, element.value);
    });
    }


    async sendTx(transactionBuilder) {

        const tx = transactionBuilder.build()
        const tx_hex = tx.toHex()
        logger.log('info', `Transaction raw hex: ${tx_hex}`)
        confirm = await bitbox.RawTransactions.sendRawTransaction(tx_hex)
        logger.log('info', `Transaction ID: ${confirm}`)
    }


    addr_bal(allUtxos){

        let total_amount = 0
        let new_amount = 0
        for (let i in allUtxos){

            new_amount = allUtxos[i].amount
            total_amount += new_amount
        }

        // logger.log(total_amount);
        return total_amount

    }

}


