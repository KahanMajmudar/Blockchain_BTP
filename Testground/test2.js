const Web3 = require('web3')

const web3 = new Web3()

const param1 = (web3.utils.sha3("onERC1155Received(address,address,uint256,uint256,bytes)"))
const param2 = (web3.utils.sha3("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))

console.log(param1)
console.log(param2)

// console.log(param3)

// console.log( web3.utils.bytesToHex( web3.utils.hexToBytes(param3).slice(0,4) ) )

console.log(process.env.NODE_ENV)

import _ from 'loadash'

console.log(_)