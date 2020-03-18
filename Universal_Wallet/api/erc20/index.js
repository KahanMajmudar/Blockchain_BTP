import Web3 from 'web3'
import * as bip39 from 'bip39'
import abi from 'human-standard-token-abi'
import HDWalletProvider from '@truffle/hdwallet-provider';
// import { Wallet } from '../wallet';
import { ETH } from '../eth';
const infuraurl = 'https://ropsten.infura.io/v3/96453a99912a4ec4805c98db605cdcc0'



export class ERC extends ETH{


    async setToken(token_address){

        const tokenContract = await new web3.eth.Contract(abi, token_address)
        return tokenContract
    }

    async send(tokenContract, from_address, to_address, amount){

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
