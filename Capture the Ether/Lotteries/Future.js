const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/[infurakey]')
const web3 = new Web3(provider)

const abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "myGuess",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ans",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getEth",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "mySettle",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myguess",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
]


const contractAddress = "0xf3dF1Ad13d0464003800274d2e3ca7a9444cd74b"


const mycontract = new web3.eth.Contract(abi, contractAddress)
// console.log(mycontract)



async function test(){

    const done = true;

    while (done) {


        var blockNumber = await web3.eth.getBlockNumber();
        console.log(blockNumber)
        const blockInfo = await web3.eth.getBlock(blockNumber - 1);
        var blockHash = await blockInfo.hash;
        console.log(blockHash)
        var timestamp = await blockInfo.timestamp;
        console.log(timestamp)

        // if(web3.utils.soliditySha3((blockHash, timestamp)) % 10 == 9 ){

            // await web3.eth.sendSignedTransaction({
            //     from: '0x6Cc608EF9CAfE158dE60c2C2d29a42760604e69a',
            //     value: web3.utils.toWei('1', 'ether')
            //     data:

            // })

            // done = true


        // }

    }
}


test()




// console.log(blockNumber, blockHash, timestamp)
