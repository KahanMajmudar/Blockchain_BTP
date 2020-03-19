import * as Bitcoin from 'bitcoinjs-lib'
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import coinSelect from 'coinselect'
import axios from 'axios'
import winston from 'winston'


export class BTC{

    #masterRoot
    #network_type
    #mnemonic

    constructor(mnemonic, seed, network_type){

        this.#mnemonic = mnemonic
        this.#network_type = network_type
        this.#masterRoot = this.masterRootSelector(seed, this.#network_type)
        // return masterRoot
    }

    masterRootSelector(seed){

        if (this.#network_type == 'testnet'){

            this.#network_type = Bitcoin.networks.testnet
            return this.#masterRoot = bip32.fromSeed(seed, this.#network_type)

        }

        else {

            this.#network_type = Bitcoin.networks.mainnet
            return this.#masterRoot = bip32.fromSeed(seed, this.#network_type)
        }

    }

    getCointype(){

        if (this.#network_type == Bitcoin.networks.testnet) return 1

        else return 0

    }

    /**
     *
     * @param {Number}  [from_account_index = 0] - The user account
     * @param {Number} [from = 0] - 1st address index
     * @param {Number} [to = 0] - last address index
     */
    getAddresses(from_account_index = 0, from = 0, to = 10){

        for(let i = from; i < to; i++) {

            const coin_type = this.getCointype()
            let childNode = this.#masterRoot.derivePath(`m/44'/${coin_type}'/${from_account_index}'/0/${i}`)   //change this     //test btc has path m/44'/1'/      //mainnet btc has path m/44'/0'/
            const childAddr = Bitcoin.payments.p2pkh({pubkey: childNode.publicKey, network: this.#network_type})   //change this

            console.log(childAddr.address);

        }
    }

    getAddressInfo(account_index = 0, isChange = 0, address_index){

        const coin_type = this.getCointype()
        const childNode = this.#masterRoot.derivePath(`m/44'/${coin_type}'/${account_index}'/${isChange}/${address_index}`)
        const childAddr = Bitcoin.payments.p2pkh({pubkey: childNode.publicKey, network: this.#network_type})       //change this

        const address = childAddr.address
        const wif = childNode.toWIF()
        const keyPair = Bitcoin.ECPair.fromWIF(wif, this.#network_type)
        console.log(this.#network_type)

        return { address, keyPair }

    }


    async send(address_index, to_address, amount, feeRate = 1){

        const { address: from_address, keyPair: pk } = this.getAddressInfo(null, null, null, address_index)

        const utxo = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${from_address}?unspentOnly=true`)
        // console.log(utxo.data.txrefs);

        if(utxo.data.txrefs == undefined) return console.log('No utxos!!')
        // console.log(utxo.data);

        const tx = new Bitcoin.Psbt({network: this.#network_type})         //change this

        const utxos = utxo.data.txrefs
        const {inputs, outputs, fee} = this.utxoSelector(utxos ,[{
            address: to_address,
            value: amount
        }],
        feeRate)

        await this.addinputs(inputs, tx);

        this.addOutputs(outputs, change_address, tx);        //change_address?

        console.log(tx);

        this.signAll(inputs, tx, pk);

        tx.finalizeAllInputs()

        const signedTransaction = tx.extractTransaction().toHex()
        const transactionId = tx.extractTransaction().getId()
        console.log(signedTransaction)
        console.log(transactionId)

        //broadcast tx hash using 3PBP


    }

    async addinputs(inputs, tx) {

        for (const res of inputs) {

            const txdata = await axios.get(`https://api.blockcypher.com/v1/btc/test3/txs/${res.tx_hash}?includeHex=true`);
            tx.addInput({

                hash: res.tx_hash,
                index: res.tx_output_n,
                nonWitnessUtxo: Buffer.from(txdata.data.hex, 'hex')
            });
        }
    }

    addOutputs(outputs, change_address, tx) {

        outputs.forEach(element => {

            if (element.address == undefined) {

                element.address = change_address;    //change address?
                tx.addOutput({

                    address: element.address,
                    value: element.value
                });
            }
            else {
                tx.addOutput({

                    address: element.address,
                    value: element.value
                });
            }
        });
    }

    signAll(inputs, tx, pk) {
        inputs.forEach((_element, i) => {
            tx.signInput(i, pk);
            tx.validateSignaturesOfInput(i);
        });
    }

    utxoSelector(allUtxos, targets, feeRate){

        let { inputs, outputs, fee } = coinSelect(allUtxos, targets, feeRate)
        console.log('INPUTS-------------------\n', inputs)
        console.log('OUTPUTS------------------\n', outputs)
        console.log('FEE----------------------\n', fee)
        return {inputs, outputs, fee}

    }


}