import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()
//função para enviar e-mail de confirmação após o usuario efetuar o cadastro//
const transporter = nodemailer.createTransport({
  host: "smtp.outlook.com",//e-mail p/ exemplo//
  port: 587,
  secure: false,
  auth: {
     user: process.env.NODEMAILER_USER,
     pass: process.env.NODEMAILER_PASS
  },
  tls: { ciphers: "SSLv3" }
})



export default transporter