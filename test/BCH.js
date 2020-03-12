import { BITBOX } from 'bitbox-sdk'
import _ from 'lodash'
import * as bip39 from 'bip39'
import * as bip32 from 'bip32'
import coininfo from 'coininfo'
import hdkey from 'hdkey'
// import { bip32 } from 'bitcoinjs-lib';
// import { testnet } from 'bitcoinjs-lib/types/networks';

const bitbox = new BITBOX({
    restURL: 'https://trest.bitcoin.com/v2/',
  });

async function createWallet(){

    const testnet = coininfo.bitcoincash.test
    // const mnemonic = bip39.generateMnemonic()
    const mnemonic = 'ancient wine vacant climb tree boil outdoor mushroom modify strong pistol until slogan force boil away boring battle immune comfort shrimp canyon phrase cook'
    const rootSeed = bip39.mnemonicToSeedSync(mnemonic)
    const masterHDNode = bip32.fromSeed(rootSeed, testnet)
    // const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, "testnet");
    const account = addAccount(`'m/44'/145'`)
    const address = addAddress(`'m/44'/145'`)

    console.log(address);

    const change = bitbox.HDNode.derivePath(account, '0/0')
    console.log(change);


}

function addAccount(path){

    let account_index
    const account = masterHDNode.derivePath(`${path}/${account_index}'`)
    return account
}

function addAddress(path){

    let address_index
    let childNode = masterHDNode.derivePath(`${path}/0/${address_index}`);
    const address = bitbox.HDNode.toCashAddress(childNode)
    return address
}

function totalAddresses(){

    let details = new Map()
    details.set(address, privatekey)
    return details.keys()
}



