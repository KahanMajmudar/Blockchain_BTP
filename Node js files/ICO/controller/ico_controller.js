import Web3 from 'web3'

const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
const web3 = new Web3(provider)

import ico_abi from '../abis/ico_abi'
const icoContractAddress = '0xAE06b4C2528307CaE878eDFC624B18e67f5bFF66'


exports.info = async (req, res) => {

    const ICOContract = await new web3.eth.Contract(ico_abi, icoContractAddress)

    const cap = await ICOContract.methods.cap().call()
    const goal = await ICOContract.methods.goal().call()
    const weiRaised = await ICOContract.methods.weiRaised().call()
    const rate = await ICOContract.methods.rate().call()

    res.json({
        'Crowdsale Cap': cap,
        'Crowdsale Goal': goal,
        'Wei raised by Crowdsale': weiRaised,
        'Current Crowdsale Rate': rate
    })

}

exports.buyTokens = async (req, res) => {

    const ICOContract = await new web3.eth.Contract(ico_abi, icoContractAddress)

    const fromAddress = req.body.from
    const valueInEther = req.body.valueEth

    try {
        console.log(valueeth,fromAddress)
        result = await ICOContract.methods.buyTokens(fromAddress).send({
            from: fromAddress,
            value: valueInEther,
            gas: 1000000
        })

        res.status(200).send('Transcation Successfull!!')

    } catch (error) {
        res.send(error.message)
    }

}