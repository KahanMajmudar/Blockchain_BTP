const bip39 = require('bip39')
// const Web3 = require('web3')
// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const infuraUrl = 'https://ropsten.infura.io/v3/b13045565c1947c09aad0dcb3ec43f6c'
// const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')

// const mnemonic = bip39.generateMnemonic()
// const mnemonic = 'cruise zebra meadow nurse timber old waste improve neglect nasty trick around'
// console.log(mnemonic)
// const seed = await bip39.mnemonicToSeed(mnemonic)
// console.log(web3.utils.toHex(seed))

// const provider = new HDWalletProvider(mnemonic, infuraUrl)
// console.log('------------------------')

// const web3 = new Web3(provider)

// async function send(){

//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts)

//     try {
//         await web3.eth.sendTransaction({

//             from: accounts[1],
//             to: accounts[0],
//             value: web3.utils.toWei('0.5', 'ether')

//         })
//     } catch (error) {
//         console.log(error.message)
//     }

// }
// send()

// provider.engine.stop()

const Web3 = require('web3')
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraUrl = 'https://ropsten.infura.io/v3/b13045565c1947c09aad0dcb3ec43f6c'

// console.log(provider)

// const provider = new HDWalletProvider('cruise zebra meadow nurse timber old waste improve neglect nasty trick around', infuraUrl)
// const web3 = new Web3(provider)

// console.log(provider.getAddresses())


// create = async() => {

//     // const mnemonic = bip39.generateMnemonic()
//     const mnemonic = 'middle news call away provide common ladder destroy small letter decrease coast'
//     // console.log(mnemonic)
//     const provider = new HDWalletProvider(mnemonic, infuraUrl)
//     const web3 = new Web3(provider)

//     const acc = await web3.eth.getAccounts()
//     const bal = await web3.eth.getBalance(acc[0])
//     console.log(acc)
//     console.log(bal)
//     provider.engine.stop()
// }
// create()

// info = async() => {

//     const mnemonic = 'middle news call away provide common ladder destroy small letter decrease coast'
//     const provider = new HDWalletProvider(mnemonic, infuraUrl)
//      // const mnemonic = bip39.generateMnemonic()
//     console.log(mnemonic)
//     let bal = []
//     const acc = await web3.eth.getAccounts()
//     console.log(acc)
//     for (a in acc){
//         bal[a] = web3.utils.fromWei(await web3.eth.getBalance(acc[a]), 'ether')
//     }

//     console.log(bal)
//     // const bal = await web3.eth.getBalance()
//     // console.log(bal)
//     provider.engine.stop()
// }
// info()




// restore = async(mnemonic) => {

//     const mnemonic = mnemonic
//     // const seed = await bip39.mnemonicToSeed(mnemonic)




//     // console.log(path, smt)
// }

// restore()




