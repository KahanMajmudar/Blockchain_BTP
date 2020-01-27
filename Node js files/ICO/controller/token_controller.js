import Web3 from 'web3'

const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
const web3 = new Web3(provider)

import token_abi from '../abis/token_abi'
const tokenContractAddress = '0xe7Cf9bCdc927D3aA5be3a9136ea998a7cc94d636'

exports.info =  async (req, res) => {

    const TokenContract = await new web3.eth.Contract(token_abi, tokenContractAddress)

        const name = await TokenContract.methods.name().call()
        const symbol = await TokenContract.methods.symbol().call()
        const totalSupply = await TokenContract.methods.totalSupply().call()

        res.json({
            'Token Name': name,
            'Token Symbol': symbol,
            'Total Supply': web3.utils.fromWei(totalSupply, 'ether') + ' ETH'
        })

}

