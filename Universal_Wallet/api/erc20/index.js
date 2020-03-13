import Web3 from 'web3'
import * as bip39 from 'bip39'
import abi from 'human-standard-token-abi'
import HDWalletProvider from '@truffle/hdwallet-provider';
const infuraurl = 'https://ropsten.infura.io/v3/96453a99912a4ec4805c98db605cdcc0'



export class ERC{


    async createAccount(strength){

        const mnemonic = bip39.generateMnemonic(strength)
        // const mnemonic = 'ancient wine vacant climb tree boil outdoor mushroom modify strong pistol until slogan force boil away boring battle immune comfort shrimp canyon phrase cook'
        const provider = new HDWalletProvider(mnemonic, infuraurl)
        const web3 = new Web3(provider)

        return walletInfo = web3.eth.accounts._provider.wallets

    }

    async setToken(token_address){

        const tokenContract = await new web3.eth.Contract(abi, token_address)
        return tokenContract
    }

    async send(from_address, to_address, amount){

        const amount_to_send =  web3.utils.toBN(amount)
        const decimals = await tokenContract.methods.decimals().call()
        const actual_amount = amount_to_send.mul(web3.utils.toBN(10).pow(decimals))  //amt * 10^decimals

        const result = await tokenContract.methods.transfer(to_address, actual_amount).send({from: from_address})

    }

    async tokenInfo(tokenContract){

        console.log('Name: ' + await tokenContract.methods.name().call());
        console.log('Symbol: ' + await tokenContract.methods.symbol().call());
        console.log('Decimals: ' + await tokenContract.methods.decimals().call());
        console.log('Total Supply: ' + await tokenContract.methods.totalSupply().call());

    }

}
