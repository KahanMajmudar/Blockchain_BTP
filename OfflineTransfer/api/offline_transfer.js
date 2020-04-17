import { OfflineTransferController } from "./offline_transfer_controller";

export class OfflineTransfer {

    constructor(){
        this.controller = new OfflineTransferController()
    }

    sendEthOffline = async(req, res) => {

        const sender = req.body.sender
        const receiver = req.body.receiver
        const valueEth = req.body.valueEth
        const pk = req.body.pk
        const email = req.body.email
        const result = await this.controller.sendEthOffline(sender, receiver, valueEth, pk, email)
        res.send(result)
    }

    sendEthOnline = async(req, res) => {

        const sender = req.body.sender
        const receiver = req.body.receiver
        const valueEth = req.body.valueEth
        const pk = req.body.pk
        const result = await this.controller.sendEthOnline(sender, receiver, valueEth, pk)
        res.send(result)
    }

    sendErc20Offline = async(req, res) => {

        const sender = req.body.sender
        const receiver = req.body.receiver
        const valueErc = req.body.valueErc
        const pk = req.body.pk
        const email = req.body.email
        const result = await this.controller.sendERC20Offline(sender, receiver, valueErc, pk, email)
        res.send(result)

    }

    sendErc20Online = async(req, res) => {

        const sender = req.body.sender
        const receiver = req.body.receiver
        const valueEth = req.body.valueEth
        const pk = req.body.pk
        const result = await this.controller.sendERC20Online(sender, receiver, valueEth, pk)
        res.send(result)
    }



}