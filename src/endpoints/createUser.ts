import { Request, Response } from "express";
import { connection } from "../data/connection";
import { getAdrressInfo } from "../services/getAddressInfo";
import transporter from "../services/mailTransporter";
import { user } from "../types";

export default async function createUser(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { name, nickname, email, zipcode } = req.body

      if (!name || !nickname || !email || !zipcode) {
         res.statusCode = 422
         throw "'name', 'nickname', 'email' e 'zipcode' são obrigatórios"
      }

      const id: string = Date.now().toString()

      const address = await getAdrressInfo(zipcode)
     
      const newUser: user = { id, name, nickname, email, address }

         // essa é a messagem que vai chegar ao cliente assim que ele criar o usuario/

      await connection('aula_webservices_users').insert(newUser)

     const emailInfo = await transporter.sendMail({
         from: "<aulawebservices_rodrigo@outlook.com>",
         to: email,
         subject: "Mensagem de confrimação",
         text: `Olá ${name} sua conta foi criada`,
         html: `<p>Olá ${name} sua conta foi criada</p>`     
      })
      console.log(emailInfo)

      res.status(201).send("Usuário criado!")
   } catch (error:any) {
      if (typeof error === "string") {
         res.send(error)
      } else {
         console.log(error.sqlMessage || error.message);
         res.status(500).send("Ops! Um erro inesperado ocorreu =/")
      }
   }
}