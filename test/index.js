// import { BITBOX } from 'bitbox-sdk'
// // import _ from 'lodash'
// import coinSelect from 'coinselect'
// import * as bip32 from 'bip32';
// import * as bip39 from 'bip39';
// import coin from 'coininfo'

// const bitbox = new BITBOX({
//     restURL: 'https://trest.bitcoin.com/v2/',
//   });

// const langs = [
//   "english",
//   "chinese_simplified",
//   "chinese_traditional",
//   "korean",
//   "japanese",
//   "french",
//   "italian",
//   "spanish"
// ]

// const lang = langs[0]

// const mnemonic = 'describe craft call ivory fitness link horn unlock treat what joke protect elbow smooth yellow december frown now visual impact aspect museum local talent'
// // const mnemonic = 'ancient wine vacant climb tree boil outdoor mushroom modify strong pistol until slogan force boil away boring battle immune comfort shrimp canyon phrase cook'
// // console.log("BIP44 $BCH Wallet");
// // console.log(`256 bit ${lang} BIP39 Mnemonic: `, mnemonic);

// const rootSeed = bip39.mnemonicToSeedSync(mnemonic);
// // console.log(rootSeed.toString('hex'));
// // console.log(  );
// // const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, "testnet");
// const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, 'testnet');
// // // console.log(masterHDNode);

// // const xpriv = bitbox.HDNode.toXPriv(masterHDNode);
// // console.log(xpriv);

// // const xpub = bitbox.HDNode.toXPub(masterHDNode)
// // console.log(xpub);
// // const masterHDNode = bip32.fromSeed(rootSeed)
// // console.log(masterHDNode);

// const account = bitbox.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");
// console.log(`BIP44 Account: "m/44'/145'/0'"`);

// for (let i = 0; i < 10; i++) {
//   let childNode = masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`);
//   console.log(
//     `${bitbox.HDNode.toCashAddress(childNode)}`
//   );
// }


// const change = bitbox.HDNode.derivePath(account, "0/1");
// const change2 = bitbox.HDNode.derivePath(account, "0/4");
// // console.log(change);



// const cashAddress = bitbox.HDNode.toCashAddress(change);
// const cashAddress2 = bitbox.HDNode.toCashAddress(change2);
// console.log('\n\n\n\n');
// console.log(cashAddress);
// let keyPair = bitbox.HDNode.toKeyPair(change2);
// console.log(keyPair, keyPair.getAddress());
// console.log(cashAddress2);

// // bitbox.Address.details(cashAddress).then(result => console.log(result))
// // bitbox.Address.details(cashAddress2).then(result => console.log(result))



// // bitbox.Address.details(cashAddress2).then(result => console.log(result))
// // bitbox.Address.utxo(cashAddress2).then(result => console.log(result))
// // const from_cashAddress = ''
// // const to_cashAddress2 = ''

// async function send(){

//   const result = await bitbox.Address.utxo(cashAddress2)
//   // console.log(result);

//   if (!result.utxos[0]) return;

//   let allUtxos = result.utxos
//   // console.log(allUtxos);
//   const balance = addr_bal(allUtxos)
//   console.log(balance);

//   const to_addr = cashAddress
//   const amount_to_send = 1000

//   // const byteCount = bitbox.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
//   // const sendAmount = amount_to_send - byteCount;
//   // const isDust = sendAmount > dustValue

//   const newUtxos = utxoConvertor(allUtxos)
//   const {inputs, outputs, fee} = utxoSelector(newUtxos, [{
//     address: to_addr, value: amount_to_send}],
//   1)

//   let transactionBuilder = new bitbox.TransactionBuilder("testnet");
//   addInputs(inputs, transactionBuilder);

//   console.log('done.....maybe.........');

//   addOutputs(outputs, transactionBuilder);

//   console.log('almost there............');

//   let keyPair = bitbox.HDNode.toKeyPair(change2);
//   let redeemScript;

//   signAll(inputs, transactionBuilder, keyPair, redeemScript);

//   console.log('atlast.........');

//   const tx = transactionBuilder.build();
//   const tx_hex = tx.toHex();
//   console.log(`Transaction raw hex: ${tx_hex}`);


//   // try {
//   //   const confirm = await bitbox.RawTransactions.sendRawTransaction(tx_hex)
//   //   console.log(`Transaction ID: ${confirm}`);

//   // } catch (error) {
//   //   console.log(error);
//   // }


// }
// send()

// function signAll(inputs, transactionBuilder, keyPair, redeemScript) {
//   inputs.forEach((element, i) => {
//     transactionBuilder.sign(i, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, element.value);
//   });
// }

// function addOutputs(outputs, transactionBuilder) {
//   outputs.forEach(element => {
//     // console.log(element);
//     if (!element.address) {
//       element.address = cashAddress2;
//       transactionBuilder.addOutput(element.address, element.value);
//       console.log('inside');
//     }
//     else {
//       transactionBuilder.addOutput(element.address, element.value);
//       console.log('outside');
//     }
//   });
// }

// function addInputs(inputs, transactionBuilder) {
//   inputs.forEach(element => {
//     // console.log(element);
//     transactionBuilder.addInput(element.txid, element.vout);
//     console.log('added');
//   });
// }

// function utxoConvertor(allUtxos){

//   for (let i in allUtxos){
//     allUtxos[i]['value'] = allUtxos[i]['satoshis']
//   }
//   return allUtxos

// }

// function utxoSelector(allUtxos, targets, feeRate){

//   let { inputs, outputs, fee } = coinSelect(allUtxos, targets, feeRate)
//   console.log('INPUTS------------------\n', inputs)
//   console.log('OUTPUTS------------------\n', outputs)
//   console.log('FEE------------------\n', fee)
//   return {inputs, outputs, fee}
// }

// function addr_bal(allUtxos){

//   // const sorted_utxo = _.orderBy(selectedUtxos, 'amount', 'desc')
//   // console.log(sorted_utxo);

//   let total_amount = 0
//   let new_amount = 0
//   for (let i in allUtxos){

//     new_amount = allUtxos[i].amount
//     total_amount += new_amount
//   }

//   // console.log(total_amount);
//   return total_amount

// }

// async function bchsend(){

//   const result = await bitbox.Address.utxo(from_cashAddress)

//   if (!result.utxos[0]) return;

//   let transactionBuilder = new bitbox.TransactionBuilder("testnet");

//   const originalAmount = result.utxos[0].satoshis;
//   const vout = result.utxos[0].vout;
//   const txid = result.utxos[0].txid;

//   transactionBuilder.addInput(txid, vout);

//   const byteCount = bitbox.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
//   const sendAmount = originalAmount - byteCount;

//   transactionBuilder.addOutput(to_cashAddress2, sendAmount);

//   let keyPair = bitbox.HDNode.toKeyPair(change);
//   let redeemScript;
//   transactionBuilder.sign(
//     0,
//     keyPair,
//     redeemScript,
//     transactionBuilder.hashTypes.SIGHASH_ALL,
//     originalAmount
//   );

//   const tx = transactionBuilder.build();

//   const tx_hex = tx.toHex();
//   console.log(`Transaction raw hex: ${tx_hex}`);

  // const confirm = await bitbox.RawTransactions.sendRawTransaction(tx_hex)
  // console.log(`Transaction ID: ${confirm}`);

// }

// // send()


// async function bchsendMultiple(){

//   const result = await bitbox.Address.utxo(cashAddress)

//   if (!result.utxos[0]) return;

//   let transactionBuilder = new bitbox.TransactionBuilder("testnet");

//   const originalAmount = result.utxos[0].satoshis;
//   const vout = result.utxos[0].vout;
//   const txid = result.utxos[0].txid;

//   transactionBuilder.addInput(txid, vout);

//   const byteCount = bitbox.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 'n' });
//   const sendAmount = originalAmount - byteCount;

//   // for ( i to 'n'){
//       //   transactionBuilder.addOutput(cashAddress[i], sendAmount);
//   // }


//   let keyPair = bitbox.HDNode.toKeyPair(change);
//   let redeemScript;
//   transactionBuilder.sign(
//     0,
//     keyPair,
//     redeemScript,
//     transactionBuilder.hashTypes.SIGHASH_ALL,
//     originalAmount
//   );

//   const tx = transactionBuilder.build();

//   const tx_hex = tx.toHex();
//   console.log(`Transaction raw hex: ${tx_hex}`);

//   const confirm = await bitbox.RawTransactions.sendRawTransaction(tx_hex)
//   console.log(`Transaction ID: ${confirm}`);


// }




// import * as Bitcoin from 'bitcoinjs-lib'
// import * as bip39 from 'bip39';
// import * as bip32 from 'bip32';
// import coinSelect from 'coinselect'
// import axios from 'axios'

// // import Mnemonic from 'bitcore-mnemonic';
// // import Bitcore, { Transaction } from 'bitcore-lib'
// // import SoChain from 'sochain'

// // const chain = new SoChain('BTCTEST')
// // import { testnet } from 'bitcoinjs-lib/types/networks';
// // import explorers from 'bitcore-explorers'
// // const blockexplorer = require('blockchain.info/blockexplorer').usingNetwork(3)
// // blockexplorer.usingNetwork(3)


// async function btctest(){

//     // const mnemonic = 'ancient wine vacant climb tree boil outdoor mushroom modify strong pistol until slogan force boil away boring battle immune comfort shrimp canyon phrase cook'
//     // const code = new Mnemonic(mnemonic)

// //   const hdpk = code.toHDPrivateKey(code, 'testnet')
// //   // console.log(hdpk);
// //   console.log(hdpk.privateKey.toString('hex'));

// //   const master = new Bitcore.HDPrivateKey(hdpk)
// //   // console.log(master);                                                '-------------------not working-------------------'
// //   let walletAddrs = []
// //   for(let i = 0; i < 10; i++) {

// //     let key = master.deriveChild(i);
// //     walletAddrs.push(key.privateKey.toAddress().toString());
// //     console.log(walletAddrs[i]);

// // }

  // const testnet = Bitcoin.networks.testnet
  // const mnemonic = 'ancient wine vacant climb tree boil outdoor mushroom modify strong pistol until slogan force boil away boring battle immune comfort shrimp canyon phrase cook'
  // const seed = await bip39.mnemonicToSeed(mnemonic)
  // const root = bip32.fromSeed(seed, testnet)

  // let walletAddrs = []
  // let wif = []

  // for(let i = 0; i < 10; i++) {

  //   let childNode = root.derivePath(`m/44'/1'/0'/0/${i}`)     //test btc has path m/44'/1'/      mainnet btc has path m/44'/0'/
  //   const childAddr = Bitcoin.payments.p2pkh({pubkey: childNode.publicKey, network: testnet})
  //   walletAddrs.push(childAddr.address)
  //   wif.push(childNode.toWIF())
  //   console.log(childNode.toWIF());
  //   console.log(childAddr.address);

  // }

  //   // const network = 'BTCTEST'
  // const from_addr = walletAddrs[1]
  // const to_addr = walletAddrs[0]
  // const amt_to_sent = 11000
  // const pk = Bitcoin.ECPair.fromWIF(wif[1], testnet)
  // // console.log(pk);

  // const utxo = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${from_addr}?unspentOnly=true`)
  // // console.log(utxo.data.txrefs);

  // if(utxo.data.txrefs == undefined) return console.log('No utxos!!')
  // // console.log(utxo.data);

  // const tx = new Bitcoin.Psbt({network: testnet})

  // const utxos = utxo.data.txrefs
  // const {inputs, outputs, fee} = utxoSelector(utxos ,[{
  //   address: to_addr,
  //   value: amt_to_sent
  // }],
  // 1)

  // for (const res of inputs){

  //   const txdata = await axios.get(`https://api.blockcypher.com/v1/btc/test3/txs/${res.tx_hash}?includeHex=true`)

  //   tx.addInput({
  //     hash: res.tx_hash,
  //     index: res.tx_output_n,
  //     nonWitnessUtxo: Buffer.from(txdata.data.hex, 'hex')
  //   })

  // }

  // outputs.forEach(element => {

  //   if(element.address == undefined){
  //     element.address = from_addr   //change address
  //     tx.addOutput({
  //       address: element.address,
  //       value: element.value
  //     })
  //   } else {
  //     tx.addOutput({
  //       address: element.address,
  //       value: element.value
  //     })
  //   }
  // });

  // console.log(tx);

  // inputs.forEach((element, i) => {

  //   tx.signInput(i, pk)
  //   tx.validateSignaturesOfInput(i)
  // });

  // tx.finalizeAllInputs()

  // const signedTransaction = tx.extractTransaction().toHex()
  // const transactionId = tx.extractTransaction().getId()
  // console.log(signedTransaction)
  // console.log(transactionId)


  // console.log(txid);
  // const txdata = await axios.get(`https://api.blockcypher.com/v1/btc/test3/txs/${txid}?includeHex=true`)
  // console.log(txdata.data.hex)

  // const isSegwit = txdata.data.hex.substring(8, 12) === '0001'
  // console.log(isSegwit);
  // console.log(txdata.data.outputs[0].value);

  // tx.addInput({
  //   hash: txid,
  //   index: 0,
  //   // witnessUtxo: Buffer.from(txdata.data.hex , 'hex')
  //   // witnessUtxo: {
  //   //   script: Buffer.from(txdata.data.outputs[0].script, 'hex'),
  //   //   value: txdata.data.outputs[0].value
  //   // }
  //   nonWitnessUtxo: Buffer.from(txdata.data.hex, 'hex')


  // })

  // tx.addOutput({
  //   address: to_addr,
  //   value: 9000
  // })
  // tx.signInput(0, pk)
  // tx.validateSignaturesOfAllInputs(0)
  // tx.finalizeAllInputs()

  // const signedTransaction = tx.extractTransaction().toHex()
  // const transactionId = tx.extractTransaction().getId()
  // console.log(signedTransaction)
  // console.log(transactionId)



  // const tx = new Transaction().from(utxo.data).to(to_addr).fee(6000).change(from_addr).sign(pk)
  // console.log(tx);


// }
// btctest()

// function utxoSelector(allUtxos, targets, feeRate){

//     let { inputs, outputs, fee } = coinSelect(allUtxos, targets, feeRate)
//     console.log('INPUTS--------------- \n', inputs)
//     console.log('OUTPUTS-------------- \n', outputs)
//     console.log('FEES----------------- \n', fee)
//     return {inputs, outputs, fee}

// }


/*
cRj14d86BocZxGE7BWzuNnAhxFnxdz7eisFSNTT9sCLtTqAwaLEm
mmcr9o6qTpEqzfCghhb1Sg46v6VPx439UX
cSMggPynSQEfdARdW5DUK8sM5EPkXUD17UZy7nP3eUbWktJ6poMS
mzb7qKu7645Grk4NLT1TyxVR3Rrcap8f6q
cS92oAVJSbdWmJwJNzoKYvwApXCv4bKRyjxFuBcdTMMxPLTMex9J
muGrvQ8SUhfgaVMbzDTrnEUGp1kpwau1A1
cQfcS9sSjRSifwPptq6WsFbyeYWHVBhLfwT8PQz4Y9YQSTiGXZtW
mnBcBUVr9wgtVQRsjgcaZGrFd2dNFpu5Xi
cVaoJpvD4UA3ZwGz35oda5Xsz3yxxtyd6pJE7UGomseLUZXgNCjk
n3Q43f6zgmVM2aBJafipvQBuBNPx1aTthr
cRYsWD3G424V6X15iDvkTNiUSbu9uprFzMdChU6W2cTt15JzGthZ
n1JNbAewdFUm2owKK9sJadvHQp4rH8YU4T
cQ3MeTm3jX3Jvi5TRuqFqbMsBNbwg8LVis4S5sDQw5x6gHKu51xi
myPQUkfedo7pv5bvBzVP5tbp48kfjXVKHX
cQmVWfx4mEpFwC3q6ecg5CiiihEDHwSEyArC9igS8iT8mFs25V4c
myi6nVxDsmVApq7kBiQzX4YrKNdNJZQpAg
cNwVkjhrV4g6vb2HSY2o5SEPy2QTLxrzNNmTiTdgKtkYnSXkhrpU
n4oN6LWfoUftVbuKrAFTLaHN2MPYJpE13D
cPNrZP9HdMrhnyD5f48QdxkYBhqbHuDrdUiz5gbrj7UhzKr1MACm
mitAeoG5srxhYSY629Q67i6WvR4RgikpUD

{
  address: 'mmcr9o6qTpEqzfCghhb1Sg46v6VPx439UX',
  total_received: 10000,
  total_sent: 0,
  balance: 10000,
  unconfirmed_balance: 0,
  final_balance: 10000,
  n_tx: 1,
  unconfirmed_n_tx: 0,
  final_n_tx: 1,
  txrefs: [
    {
      tx_hash: '15a2cb1c13acc3a65f12adf5c45b1fdf2a40ee337367e368cbff803e55634a46',
      block_height: 1667175,
      tx_input_n: -1,
      tx_output_n: 0,
      value: 10000,
      ref_balance: 10000,
      spent: false,
      confirmations: 34,
      confirmed: '2020-03-02T06:54:19Z',
      double_spend: false
    }
  ],
  tx_url: 'https://api.blockcypher.com/v1/btc/test3/txs/'
}

15a2cb1c13acc3a65f12adf5c45b1fdf2a40ee337367e368cbff803e55634a46
true

0200000001464a63553e80ffcb68e3677333ee402adf1f5bc4f5ad125fa6c3ac131ccba215000000006a473044022017c09b29280b2ac0a8926b8de361c993081712662f25611b4d764d87ed5ad26602203e7b38a88f16dfd9bd49fc54517b586f95b76489b58825fe5cfd52f7e37cce8401210242dcd7dbadbc1cd5b4bf307e6372d34d5ce07753ae05232ddd9ef9cce073e763ffffffff0128230000000000001976a914d13404430cfdf3f6564202ca7eba60bf25555e7e88ac00000000
f1b31625b178d37a9aedfb8213f423793d4fd334a87afad55a8ea0101e7922d2
*/

// import Web3 from 'web3'
// import HDWalletProvider from '@truffle/hdwallet-provider'
// import { Transaction as Tx } from 'ethereumjs-tx';
// import _ from 'lodash'
// import Web3 from 'web3';
// import HDWalletProvider from '@truffle/hdwallet-provider';
// const infuraurl = 'https://ropsten.infura.io/v3/96453a99912a4ec4805c98db605cdcc0'
// import * as Tx from 'ethereumjs-tx'

// async function ethtest() {

// try {
//   const mnemonic = 'ancient wine vacant climb tree boil outdoor mushroom modify strong pistol until slogan force boil away boring battle immune comfort shrimp canyon phrase cook'

//   const provider = new HDWalletProvider(mnemonic, infuraurl)
//   const web3 = new Web3(provider)

//   const address = await web3.eth.getAccounts()
//   const from_addr = address[0]
//   const to_addr = address[1]
//   const wallet_info = web3.eth.accounts._provider.wallets
//   const from_addr_lower = from_addr.toLowerCase()
//   // console.log(wallet_info[from_addr_lower]);
//   // console.log(await web3.eth.getAccounts());
//   // console.log(web3.eth.accounts._provider.wallets);
//   // console.log(Object.keys(wallet_info));
//   // console.log(Object.values(wallet_info));
//   // console.log(wallet_info);
//   const from_pk = wallet_info[from_addr_lower]._privKey
//   const privateKey = Buffer.from(from_pk.toString('hex'), 'hex')

//   const nonce = await web3.eth.getTransactionCount(from_addr, 'pending')
//   // console.log(nonce);
//   const txData = {
//     nonce: web3.utils.toHex(nonce),
//     to: to_addr,
//     value: web3.utils.numberToHex(web3.utils.toWei('0.0001', 'ether')),
//     gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'Gwei')),
// 		 gasLimit:  web3.utils.toHex('3000000')
//   }

//   // console.log(txData);

//     const tx = new Tx.Transaction(txData, {'chain':'ropsten'})
//     // console.log('private key', privateKey)
//     tx.sign(privateKey)
//     const serializedTx = tx.serialize()
//     console.log('0x' + serializedTx.toString('hex'));
//     // console.log(serializedTx);
//     await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
//     console.log('done');

// } catch (error) {
//   console.log(error.message);
// }


// }

// test()

// import Web3 from 'web3'
// import HDWalletProvider from '@truffle/hdwallet-provider'
// import abi from 'human-standard-token-abi'
// const infuraurl = 'https://ropsten.infura.io/v3/96453a99912a4ec4805c98db605cdcc0'


// async function ercsend(){

//   const mnemonic = 'ancient wine vacant climb tree boil outdoor mushroom modify strong pistol until slogan force boil away boring battle immune comfort shrimp canyon phrase cook'
//   const provider = new HDWalletProvider(mnemonic, infuraurl)
//   const web3 = new Web3(provider)

//   const address = await web3.eth.getAccounts()
//   console.log(address);

//   const tokenAddr = '0x20fe562d797a42dcb3399062ae9546cd06f63280'

//   const amount_to_send =  web3.utils.toBN(100)
//   const decimals = web3.utils.toBN(18)  //await tokenContract.methods.decimals().call()
//   const actual_value = amount_to_send.mul(web3.utils.toBN(10).pow(decimals))  //amt * 10^decimals
//   console.log(actual_value.toString());

//   const tokenContract = await new web3.eth.Contract(abi, tokenAddr)
//   // console.log(tokenContract);

//   // console.log('Name: ' + await tokenContract.methods.name().call());
//   // console.log('Symbol: ' + await tokenContract.methods.symbol().call());
//   // console.log('Decimals: ' + await tokenContract.methods.decimals().call());
//   // console.log('Total Supply: ' + await tokenContract.methods.totalSupply().call());
//   // console.log('Address ' + address[0] + ' has ' + await tokenContract.methods.balanceOf(address[0]).call() + ' tokens');
//   // // console.log(await tokenContract.methods.transfer(address[1], '100000000000000000000').send({from: address[0]}));
//   // // console.log('done');                                          100000000000000000000
//   // console.log('Address ' + address[1] + ' has ' + await tokenContract.methods.balanceOf(address[1]).call() + ' tokens');

// }

// ercsend()


// import * as BitcoinCash from 'bitcore-lib-cash'
// import * as bip39 from 'bip39';
// import * as bip32 from 'bip32';
// // import { regtest } from 'bitcoinjs-lib/types/networks';

// async function bchsend(){

//   // var wif = 'KyLJExENqzF4rUu1KJB8W3Bo32GtTL9ocAKkmzDHURacGZsRN5YK';
//   // var address = new BitcoinCash.PrivateKey(wif).toAddress().toCashAddress();
//   // console.log(address);

//   const mnemonic = 'ancient wine vacant climb tree boil outdoor mushroom modify strong pistol until slogan force boil away boring battle immune comfort shrimp canyon phrase cook'
//   const testnet = BitcoinCash.Networks.livenet
//   console.log(testnet);
//   const seed = await bip39.mnemonicToSeed(mnemonic)
//   const root = bip32.fromSeed(seed, testnet)
//   // console.log(root);

//  ---------------------doesnot support hd wallets---------------------

//   // let walletAddrs = []
//   // let wif = []

//   for(let i = 0; i < 10; i++) {

//     let childNode = root.derivePath(`m/44'/145'/0'/0/${i}`)
//     // console.log(childNode);
//     // const childAddr = BitcoinCash.payments.p2pkh({pubkey: childNode.publicKey, network: testnet})
//     // walletAddrs.push(childAddr.address)
//     // wif.push(childNode.toWIF())
//     console.log(childNode.toWIF());
//     console.log(BitcoinCash.PrivateKey(childNode.toWIF()).toAddress().toCashAddress());

//   }


// }

// bchsend()

// import * as bip32 from 'bip32'
// import * as bip39 from 'bip39'
// import coin from 'coininfo'
// import hdkey from 'hdkey'

// // const mnemonic = bip39.generateMnemonic(256)        //128 for 12, 256 for 24 words
// const mnemonic = 'code forum edit blur give reform pond tent okay wait person news cube hole sure animal extra purpose stand segment industry sugar answer ramp'
// const seed = bip39.mnemonicToSeedSync(mnemonic)
// console.log(seed.toString('hex'));

// const masterNode = bip32.fromSeed(seed)
// const masterNode = hdkey.fromMasterSeed(seed);
// console.log(masterNode);

// console.log(mnemonic, '\n',  masterNode);
// console.log(masterNode.privateKey);


// class A {

//   method(a){

//     console.log("A.method");
//     const aa = a
//     return a
//   }


// }

// class B extends A {

//   method2(baa){
//     const ba = super.method(baa)
//     console.log(ba);
//   }
// }

// const b = new B
// b.method2('hello')

import { BITBOX } from 'bitbox-sdk'
import * as bip39 from 'bip39'
import coinSelect from 'coinselect';

const bitbox = new BITBOX({
    restURL: 'https://trest.bitcoin.com/v2/',
});

// const mnemonic = bip39.generateMnemonic()
const mnemonic = 'rural blood puzzle artwork plate transfer cherry flash list stock jungle cart'
console.log('Mnemonic', mnemonic);
const rootSeed = bip39.mnemonicToSeedSync(mnemonic);
// console.log('Root Seed', rootSeed.toString('hex'));
const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, "testnet");

// const xpriv = bitbox.HDNode.toXPriv(masterHDNode);
// console.log(xpriv);

// const xpub = bitbox.HDNode.toXPub(masterHDNode)
// console.log(xpub);

const account = bitbox.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

let childNodeExternal = masterHDNode.derivePath(`m/44'/145'/0'/0/0`);
let externalCashAddr = bitbox.HDNode.toCashAddress(childNodeExternal)
console.log(
  `External Cash Addr: ${externalCashAddr}`
);

let childNodeInternal = masterHDNode.derivePath(`m/44'/145'/0'/1/0`)
let internalCashAddr = bitbox.HDNode.toCashAddress(childNodeInternal)
console.log(
  `Internal Cash Addr: ${internalCashAddr}`
);

const external = bitbox.HDNode.derivePath(account, "0/0");
const internal = bitbox.HDNode.derivePath(account, "1/0");

let externalKP = bitbox.HDNode.toKeyPair(external)
let internalKP = bitbox.HDNode.toKeyPair(internal)

const result1 = {
  utxos: [
    {
      txid: '6cc6063d01115eb5afe6bc04c95d03228c74841aebd8deb6c4cdb578fdbaa35f',
      vout: 1,
      amount: 0.1,
      satoshis: 10000000,
      height: 1366772,
      confirmations: 5
    }
  ],
  legacyAddress: 'mqWZcbq235YSzQjBwMCv4Rj6dHFSBA5d93',
  cashAddress: 'bchtest:qpkeu56fhl5rezg5jtx6hcm3lwpv7rrsnclsswmxll',
  slpAddress: 'slptest:qpkeu56fhl5rezg5jtx6hcm3lwpv7rrsncyyh4p3dz',
  scriptPubKey: '76a9146d9e5349bfe83c891492cdabe371fb82cf0c709e88ac',
  asm: 'OP_DUP OP_HASH160 6d9e5349bfe83c891492cdabe371fb82cf0c709e OP_EQUALVERIFY OP_CHECKSIG'
}


const result2 = {
  utxos: [
    {
      txid: '39a4148dc0dfc9b75bbd0d4f1a1fa7d4dd6f6bb8d865a3c32a7ee915b58ddeae',
      vout: 1,
      amount: 0.1,
      satoshis: 10000000,
      height: 1366773,
      confirmations: 4
    }
  ],
  legacyAddress: 'n4rHmR5YuiDu3FpxHFHdPhbdjLZ8g7gJsV',
  cashAddress: 'bchtest:qrllxr8damaafp78q7kx2lhqy0t2h50v2qr48078jw',
  slpAddress: 'slptest:qrllxr8damaafp78q7kx2lhqy0t2h50v2qcpq5ysqn',
  scriptPubKey: '76a914fff30cedeefbd487c707ac657ee023d6abd1ec5088ac',
  asm: 'OP_DUP OP_HASH160 fff30cedeefbd487c707ac657ee023d6abd1ec50 OP_EQUALVERIFY OP_CHECKSIG'
}

// console.log(externalKP, '\n\n\n\n' ,internalKP);

async function send() {

  // const result1 = await bitbox.Address.utxo(externalCashAddr)
  console.log(result1.utxos);
  console.log('R1 done');

  // const result2 = await bitbox.Address.utxo(internalCashAddr)
  console.log(result2.utxos);
  console.log('R2 done');

  let allUtxos = result1.utxos.concat(result2.utxos)
  // console.log(allUtxos, typeof allUtxos);

  allUtxos = utxoConvertor(allUtxos)
  console.log(allUtxos);

  console.log(allUtxos.length);

  const {inputs, outputs, fee} = utxoSelector(allUtxos, [{
    address: 'bchtest:qqmd9unmhkpx4pkmr6fkrr8rm6y77vckjvqe8aey35', value: 19999628}],
  1)

  let transactionBuilder = new bitbox.TransactionBuilder("testnet");

  addInputs(inputs, transactionBuilder);

  addOutputs(outputs, transactionBuilder);

  console.log('almost there............');

  let redeemScript;

  transactionBuilder.sign(0, externalKP, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, 10000000)
  transactionBuilder.sign(1, internalKP, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, 10000000)

  const tx = transactionBuilder.build();
  const tx_hex = tx.toHex();
  console.log(`Transaction raw hex: ${tx_hex}`);

}
send()

function utxoConvertor(allUtxos){

  for (let i in allUtxos){
    allUtxos[i]['value'] = allUtxos[i]['satoshis']
  }
  return allUtxos

}

function utxoSelector(allUtxos, targets, feeRate){

    let { inputs, outputs, fee } = coinSelect(allUtxos, targets, feeRate)
    console.log('INPUTS------------------\n', inputs)
    console.log('OUTPUTS------------------\n', outputs)
    console.log('FEE------------------\n', fee)
    return {inputs, outputs, fee}
}


function addOutputs(outputs, transactionBuilder) {
  outputs.forEach(element => {
    // console.log(element);
    if (!element.address) {
      element.address = cashAddress2;
      transactionBuilder.addOutput(element.address, element.value);
      console.log('inside');
    }
    else {
      transactionBuilder.addOutput(element.address, element.value);
      console.log('outside');
    }
  });
}

function addInputs(inputs, transactionBuilder) {
  inputs.forEach(element => {
    // console.log(element);
    transactionBuilder.addInput(element.txid, element.vout);
    console.log('added');
  });
}

function signAll(inputs, transactionBuilder, keyPair, redeemScript) {
  inputs.forEach((element, i) => {
    transactionBuilder.sign(i, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, element.value);
  });
}
/*
02000000025fa3bafd78b5cdc4b6ded8eb1a84748c22035dc904bce6afb55e11013d06c66c010000006a47304402206abd288433dfce5c28d8c4e29327c05bd17bed54d95d82f6e22f8d768d870981022055e554fb6e01b1324ba695c74259a7004be63cd9982eb41ee11b232fbd1bd064412102a9f7c28093f033a299fdb8cc5a7b4e5f0e80e0e1eb3c9070a2fc0a7f95d1a561ffffffffaede8db515e97e2ac3a365d8b86b6fddd4a71f1a4f0dbd5bb7c9dfc08d14a439010000006b483045022100ba6256c193e4edbb367263164293cd851c8d779b61d387912cff2219988af6ac02205fb660e5fba6d18dafa190bf7242d8f04e4809be07faf3522603b6c4f23c33f7412102b147ec671c126528a993097fde1d93c8e03e4ebc96b8f15063bc8916044b3c21ffffffff018c2b3101000000001976a91436d2f27bbd826a86db1e93618ce3de89ef33169388ac00000000
*/