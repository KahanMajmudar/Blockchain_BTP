const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/[key]'))
const contractAddress = '0xA25ed230ab4AB91823804b542e811cfFAc21700a'

async function test(){

    for (index = 0; index < 10; index++){
        console.log(`[${index}]` +
          await web3.eth.getStorageAt(contractAddress, index))
    }

    console.log(await web3.utils.hexToBytes('0x14267767ae164e2ebdadbfd7da56918f2d176458dfa6cb43403b93d0680d680e'))

    // [20,  38, 119, 103, 174,  22,  78,  46, 189, 173, 191, 215, 218,  86, 145, 143]

    console.log(await web3.utils.bytesToHex([20,  38, 119, 103, 174,  22,  78,  46, 189, 173, 191, 215, 218,  86, 145, 143]))

    //0x14267767ae164e2ebdadbfd7da56918f


}

test()

//data[0] --> 0x68f7c9195bd76f3a74da465fc4c50c10416ff633e6e7947e790fb59b90aa4550
//data[1] --> 0x496d36bdeaaf67098fe6721b0183f04c34ea416d698cc2e1869cd500a72d3d38
//data[2] --> 0x14267767ae164e2ebdadbfd7da56918f2d176458dfa6cb43403b93d0680d680e