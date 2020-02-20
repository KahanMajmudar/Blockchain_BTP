const Web3 = require('web3')
const web3 = new Web3()

const contractAddress = '0x127671951172Adaa2783F4dcCdC1307978ACB5C5'

web3.eth.getStorageAt(contractAddress, 0).then( (ans) => console.log(ans) )