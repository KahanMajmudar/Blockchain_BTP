// const bip39 = require('bip39')
import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'

const infuraUrl = 'https://ropsten.infura.io/v3/b13045565c1947c09aad0dcb3ec43f6c'

exports.create = async(req, res) => {

    // const mnemonic = bip39.generateMnemonic()
    const mnemonic = 'middle news call away provide common ladder destroy small letter decrease coast'
    const provider = new HDWalletProvider(mnemonic,infuraUrl)
    const web3 = new Web3(provider)

    const acc = await web3.eth.getAccounts()
    // console.log(acc)
    res.json({
        mnemonic: mnemonic,
        accounts: acc
    })
}


exports.retrieve = async(req, res) => {

    const mnemonic = req.body.mnemonic
    const provider = new HDWalletProvider(mnemonic,infuraUrl)
    const web3 = new Web3(provider)

    const acc = provider.getAddresses()

    res.josn({
        accounts: acc
    })

}


exports.info = async(req, res) => {

    const mnemonic = req.body.mnemonic
    const provider = new HDWalletProvider(mnemonic,infuraUrl)
    const web3 = new Web3(provider)

    const wallet = provider.wallets

    res.josn({
        info: wallet
    })

}

