import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});

export default transport