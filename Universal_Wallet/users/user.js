import { UserController } from '../users/user_controller'

export class User {

    constructor() {
        this.controller = new UserController()
    }

    viewAll = async(req, res) => {

        const result = await this.controller.viewUser()
        res.send(result)

    }

    viewUser = async(req, res) => {

        const result = await this.controller.viewUserid(req.params.id)
        res.send(result)
    }

    createUser = async(req, res) => {

        const result = await this.controller.createUser(req.body)
        res.send(result)

    }

    updateUser = async(req, res) => {

        const result = await this.controller.updateUser(req.params.id, req.body)
        res.send(result)

    }

    deleteUser = async(req, res) => {

        const result = await this.controller.deleteUser(req.params.id)
        res.send(result)

    }


}