const Web3 = require('web3')
// address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' , mainnet
// use 'http' remix for testrpc instead of 'https'

const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b13045565c1947c09aad0dcb3ec43f6c')
const web3 = new Web3(provider)

// console.log(provider)

// const address = '0xc46315d82FFe8BF93311dfD43c2b8ECBf5faDfB9'
// const token_abi = require('./abi')
// const ico_abi = require('./ico_abi')
// const tokenContractAddress = '0xe7Cf9bCdc927D3aA5be3a9136ea998a7cc94d636'
// const ico_contractAddress = '0xAE06b4C2528307CaE878eDFC624B18e67f5bFF66'
// const address = '0x69624C64AD243194D01C25b22401C88672e4bb26'

/*
const acc = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'

web3.eth.getBalance(acc, (err, data) => {

    if (err) console.log(err)

    else console.log(web3.utils.fromWei(data, 'ether') + " ETH")
})
*/

// async function testToken() {

//     const TokenContract = await new web3.eth.Contract(token_abi, tokenContractAddress)
//     // console.log(TokenContract)
//     // console.log(TokenContract.methods)
//     const name = await TokenContract.methods.name().call()
//     const symbol = await TokenContract.methods.symbol().call()
//     const totalSupply = await TokenContract.methods.totalSupply().call()
//     console.log(`name: ${name}`)
//     console.log(`symbol: ${symbol}`)
//     console.log(web3.utils.fromWei(totalSupply, 'ether') + ' ETH')
// }
// testToken()


// async function testICO() {

//     const ICOContract = await new web3.eth.Contract(ico_abi, ico_contractAddress)
//     // console.log(TokenContract)
//     // console.log(ICOContract.methods)
//     // const data = ICOContract.methods.buyTokens.getData('0xf88e092262867b34c67f26cd71ba071dffb1ba47');
//     result = await ICOContract.methods.buyTokens('0xf88e092262867b34c67f26cd71ba071dffb1ba47').send({
//         from: '0xf88e092262867b34c67f26cd71ba071dffb1ba47',
//         value: web3.utils.toWei('1', 'ether')
//     })
//     // console.log(await ICOContract.methods.buyTokens('0xf88e092262867b34c67f26cd71ba071dffb1ba47').call())

// }
// testICO()


// async function send(){


//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts)

//     const result = await web3.eth.getBalance('0xC60f81F891856c465d18A34C4F409717529430b2')
//     console.log(result)

//     try {
//         await web3.eth.sendTransaction({

//             from: accounts[8],
//             to: accounts[7],
//             value: web3.utils.toWei('10', 'ether')

//         })
//     } catch (error) {
//         console.log(error.message)
//     }

// }
// send()


// async function method(){
//     const ICOContract = await new web3.eth.Contract(ico_abi, ico_contractAddress)
//     // console.log(TokenContract)
//     console.log(ICOContract.methods)
// }

// method()

// console.log(web3.utils.numberToHex(web3.utils.toWei('0.01','ether')))

// const Tx = require('ethereumjs-tx')

// async function sendEthSigned(){

//     const sender = '0x5f7E63D6a822A7ce2f584643b55220F66b791a53'
//     const receiver = '0x14d33570618e244b8216589Df8d606e2079cB327'
//     const value = '10'
//     const privateKey = Buffer.from('d72187730fbde7b5df8a11b281fc3903821b02f0d354743ec9527a6c9acc9f94', 'hex')

//     const nonce = await web3.eth.getTransactionCount(sender, 'pending')
//     const txData = {
//         nonce: nonce,
//         to: receiver,
//         value: web3.utils.numberToHex(web3.utils.toWei(value, 'ether')),
//         gas: web3.utils.numberToHex('21000')
//     }

//     const tx = new Tx.Transaction(txData)
//     // console.log(tx)
//     const signed = tx.sign(privateKey)
//     console.log(signed)
//     const serializedTx = tx.serialize()
//     // console.log(serializedTx)
//     // console.log('0x' + serializedTx.toString('hex'))

//     const sendSigned = await web3.eth.sendSignedTransaction(serializedTx)
//     console.log(sendSigned)


// }

// sendEthSigned()