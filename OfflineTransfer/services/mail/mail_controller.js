import nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import { promises as fs } from 'fs';
import path from 'path'


export class MailController {

    constructor(){

        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e4bddf076f94ee",
                pass: "b3692275fe58c9"
            }
        });

    }

    send = async(data) => {

        try {

            const url = `https://ropsten.etherscan.io/pushTx?hex=${data.txhash}`
            const hbs_file = await fs.readFile(path.resolve(__dirname, 'mail_views.hbs'), {encoding: 'utf-8'})
            const template = Handlebars.compile(hbs_file)
            const updated_template = template({
                name: 'Crypto User',
                txhash: url
            })


            this.transporter.sendMail({
                to: data.email,
                from: 'offline.transfer@mail.com',
                subject: 'Services Needed!!',
                html: updated_template
            })

            return "Success"

        } catch (error) {
            console.log(error);
        }
    }

}