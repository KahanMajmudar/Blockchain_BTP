import { OracleController } from "./oracle_controller";

export class Oracle {

    constructor(){
        this.controller = new OracleController()
    }

    setTokenContract = async(req, res) => {

        const address = req.body.contractAddress
        const result = await this.controller.setTokenContract(address)
        res.send(result)
    }

    requestRandomNumber = async(req, res) => {

        const result = await this.controller.requestRandomNumber()
        res.send(result)
    }

    requestBtcPrice = async(req, res) => {

        const result = await this.controller.requestBtcPrice()
        res.send(result)
    }

    requestEthPrice = async(req, res) => {

        const result = await this.controller.requestEthPrice()
        res.send(result)
    }

    fetchRandomNumber = async(req, res) => {

        const result = await this.controller.fetchRandomNumber()
        res.send(result)
    }

    fetchEthPrice = async(req, res) => {

        const result = await this.controller.fetchEthPrice()
        res.send(result)
    }

    fetchBtcPrice = async(req, res) => {

        const result = await this.controller.fetchBtcPrice()
        res.send(result)
    }


}