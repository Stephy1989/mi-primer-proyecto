import express from "express";
const routerContact = express.Router();
import validationRulesContact from "../validator/validationRulesContact.js"
import transport from "../config/nodemailer.js"


routerContact.get("/", (req, res, next) =>{
    res.render("contacto")
});

routerContact.post("/", validationRulesContact, async (req, res, next) =>{
    const {name, email, consulta} = req.body;
    const emailMsg = {
        to: "atencionalcliente@miempresa.com",
        from: email,
        subject: "mensaje de cliente",
        html: `Este es el mensaje de ${name} ${email}: ${consulta}`
        
    };
    const sendMailStatus = await transport.sendMail(emailMsg);
    if(sendMailStatus.rejected.length){
       req.app.locals.sendMailFeedback = "No pudimos entregar su mensaje"
       

    }else {
       req.app.locals.sendMailFeedback = "Mensaje enviado"
        
    };
    res.redirect("/")

});

export default routerContact

