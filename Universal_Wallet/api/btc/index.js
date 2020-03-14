import * as Bitcoin from 'bitcoinjs-lib'
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import coinSelect from 'coinselect'
import axios from 'axios'
import winston from 'winston'
import { Wallet } from '../wallet';


export class BTC{


    async createAccount(network_type, strength){

        // const mnemonic = bip39.generateMnemonic(strength)
        const { mnemonic, seed }        // change it
        const seed = await bip39.mnemonicToSeed(mnemonic)
        const masterRoot = this.masterRootSelector(seed, network_type)

    }

    masterRootSelector(seed, network_type){

        if (network_type == 'testnet') return bip32.fromSeed(seed, Bitcoin.networks.testnet)

        else return bip32.fromSeed(seed, Bitcoin.networks.mainnet)

    }

    getAddresses(masterRoot, from, to){

        for(let i = from; i < to; i++) {

            let childNode = masterRoot.derivePath(`m/44'/1'/0'/0/${i}`)   //change this     //test btc has path m/44'/1'/      //mainnet btc has path m/44'/0'/
            const childAddr = Bitcoin.payments.p2pkh({pubkey: childNode.publicKey, network: testnet})   //change this

            console.log(childAddr.address);
            console.log(childNode.toWIF());

        }
    }

    getAddressInfo(masterRoot, coin_type, account_index = 0, isChange = 0, address_index){

        const childNode = masterRoot.derivePath(`m/44'/${coin_type}'/${account_index}'/${isChange}/${address_index}`)
        const childAddr = Bitcoin.payments.p2pkh({pubkey: childNode.publicKey, network: testnet})       //change this

        const address = childAddr.address
        const wif = childNode.toWIF()

        return { address, wif }

    }


    async send(masterRoot, address_index, to_address, amount, feeRate = 1){

        const {from_address, wif} = this.getAddressInfo(masterRoot, null, null, null, address_index)

        const pk = Bitcoin.ECPair.fromWIF(wif, testnet)     //change it

        const utxo = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${from_address}?unspentOnly=true`)
        // console.log(utxo.data.txrefs);

        if(utxo.data.txrefs == undefined) return console.log('No utxos!!')
        // console.log(utxo.data);

        const tx = new Bitcoin.Psbt({network: testnet})         //change this

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

                element.address = change_address;    //change address
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