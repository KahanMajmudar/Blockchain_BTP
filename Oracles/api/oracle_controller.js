import Web3 from "web3"
// const url = 'http://127.0.0.1:5777'
import json from '../build/contracts/OracleTest.json'
// import * as Tx from 'ethereumjs-tx'
const web3 = new Web3(
    new Web3.providers.WebsocketProvider('ws://127.0.0.1:9545')
)


export class OracleController {

    constructor() {
        this.tokenContract  = new web3.eth.Contract(json['abi'], '0x1F7ac3cE9B79F6B0c10968Cb3d7a5A680d335f27')
        web3.eth.getBalance(this.tokenContract._address).then( (bal) => console.log(bal))
        // console.log(this.tokenContract)
        this.events = this.tokenContract.events
        // console.log(this.events)
    }

    waitForEvent = (_event, _from = 0, _to = 'latest') =>
    new Promise ((resolve,reject) =>
        _event({fromBlock: _from, toBlock: _to}, (e, ev) =>
            e ? reject(e) : resolve(ev)))

    // setTokenContract = async(contractAddress) => {

    //     const token_address = contractAddress || '0xC1A7E39A16c9e3BcB0FbeFC54A956690692DAF72'
    //     this.tokenContract = new web3.eth.Contract(json['abi'], token_address)
    //     console.log(this.tokenContract)
    //     if (this.tokenContract._address) return "Success!!"
    //     else return "Failed!!"
    // }

    // demo = async() => {
        // const { events: { LogNewProvableQuery: { blockNumber }, LogQueryId: { returnValues: { queryID } } } } = await this.tokenContract.methods.getRandomNumber().send({
            //     from: '0x89ced5229F2D31ED1eF4F7035162f0BaFdeF68c6',
            //     // value: web3.utils.toHex(web3.utils.toWei('0.005', 'ether')),
            //     gas: '2000000'
            // })
            // let queryID = null
            // if (result.events.LogQueryId) queryID = events.LogQueryId.returnValues.queryID
            // console.log(LogQueryId)
            // console.log(queryID)
            // const { returnValues: { description } } = await this.waitForEvent(this.events.LogNewProvableQuery, blockNumber)
            // const result = await this.waitForEvent(this.events.LogNewProvableQuery, blockNumber)
            // console.log(description)
            // console.log(returnValues.description)
            // const rng = await this.tokenContract.methods.randomNumber().call()
            // console.log(rng)
            // console.log(result)
            // console.log(returnValues.description)
            // return returnValues.description
    // }


    requestRandomNumber = async() => {
        try {
            const {
                events: {
                    LogNewProvableQuery: {
                        returnValues: {
                            description
                        }
                    },
                    LogQueryId: {
                        returnValues: {
                            queryID
                        }
                    } = { returnValues: { queryID: null } }
                }
            } = await this.tokenContract.methods.getRandomNumber().send({
                from: '0x89ced5229F2D31ED1eF4F7035162f0BaFdeF68c6',
                // value: web3.utils.toHex(web3.utils.toWei('0.05', 'ether')),
                // gas: '2000000'
            })

            return { message: description, queryID: queryID }

        } catch (error) {
            console.trace(error)
            return error.message
        }
    }

    requestBtcPrice = async() => {
        try {
            const {
                events: {
                    LogNewProvableQuery: {
                        returnValues: {
                            description
                        }
                    },
                    LogQueryId: {
                        returnValues: {
                            queryID
                        }
                    } = { returnValues: { queryID: null } }
                }
            } = await this.tokenContract.methods.getBtcPrice().send({
                from: '0x89ced5229F2D31ED1eF4F7035162f0BaFdeF68c6',
                // value: web3.utils.toHex(web3.utils.toWei('0.05', 'ether')),
                // gas: '2000000'
            })

            return { message: description, queryID: queryID }

        } catch (error) {
            console.trace(error)
            return error.message
        }

    }

    requestEthPrice = async() => {
        try {
            const {
                events: {
                    LogNewProvableQuery: {
                        returnValues: {
                            description
                        }
                    },
                    LogQueryId: {
                        returnValues: {
                            queryID
                        }
                    } = { returnValues: { queryID: null } }
                }
            } = await this.tokenContract.methods.getEthPrice().send({
                from: '0x89ced5229F2D31ED1eF4F7035162f0BaFdeF68c6',
                // value: web3.utils.toHex(web3.utils.toWei('0.05', 'ether')),
                // gas: '2000000'
            })

            return { message: description, queryID: queryID }

        } catch (error) {
            console.trace(error)
            return error.message
        }

    }

    fetchRandomNumber = async() => {
        try {
            const result = await this.tokenContract.methods.randomNumber().call()
            console.log(result)
            return result
        } catch (error) {
            console.trace(error)
            return error.message
        }
    }

    fetchEthPrice = async() => {
        try {
            const result = await this.tokenContract.methods.ethPrice().call()
            console.log(result)
            return result
        } catch (error) {
            console.trace(error)
            return error.message
        }
    }

    fetchBtcPrice = async() => {
        try {
            const result = await this.tokenContract.methods.btcPrice().call()
            console.log(result)
            return result
        } catch (error) {
            console.trace(error)
            return error.message
        }
    }



}