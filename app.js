import express from "express";
import hbs from "express-handlebars";
import routerContact from "./routes/routerContact.js";
import {routerUser, routerRegister, routerSettings, routerValidate} from "./routes/routerUser.js";
import mongoose from "mongoose";
import path from "path";
import {fileURLToPath} from "url";
import session from "express-session";
import * as dotenv from "dotenv";
import { deleteUser, logOut} from "./controllers/controlUser.js"
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const URI = process.env.DataBase_URI;
const app = express();
const PORT = 3030;

app.use(session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
app.use(express.static(path.join(__dirname, "/public")));
app.engine(".hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

//Definimos una constante de autorización
const auth = (req, res, next)=>{
    if (req.session.user) {
        next()
    }else {
        res.render("registerForm")
    }
};

mongoose.connect(URI, (err)=>{
    err? console.log(`Error: ${err}`):
    console.log(`Conectado a la base de datos`)
});

app.locals.sendMailFeedback = "";
app.locals.user = "";

app.get("/", function(req, res){
    res.render("home")
});

app.get("/nosotros", function(req, res){
    res.render("nosotros")
});
 
app.use("/contacto", routerContact);

app.use("/loginForm", routerUser);

app.use("/registerForm", routerRegister);

app.get("/usuarios", auth, (req, res)=> {
    res.render("usuarios", {usr: req.session.user},)
});

app.use("/usuarios/settings", routerSettings);

app.use("/usuarios/validate", routerValidate); 

app.get("/usuarios/deleteUser", deleteUser)

app.get("/usuarios/logOut", logOut)


app.listen(PORT, function(err){
    !err?
    console.log(`Server running on: http://localhost:${PORT}`)
    :
    console.log(`Error launching server: ${err.code}`)
});
