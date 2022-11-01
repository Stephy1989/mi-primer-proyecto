import {encrypt, decrypt} from "../helpers/securePass.js";
import User from "../config/schemas/userSchema.js";


//Muestra el formulario de inicio de sesión
function getLoginForm (req, res, next){
res.render("loginForm")
};
//Envía el formulario de inicio de sesión
async function sendLoginForm (req, res, next){
    const {email, password} = req.body;
    const user = await User.find().where({email});   
    
    if (user.length){
        const match = await decrypt(password, user[0].password)
        if (match){
            const usr = {
                id: user[0]._id,
                name: user[0].name,
                lastName: user[0].lastName,
                email: user[0].email,
                updatedAt: user[0].updatedAt,
                validEmail: user[0].validEmail
            }
            req.session.user = usr;
            res.redirect("/usuarios")
        }else return res.render("loginForm", {message: "Email o contraseña incorrectos"})
        
    }else return res.render("loginForm", {message: "Email o contraseña incorrectos"})
    
    
};
//Muestra el formulario de registro
function getRegisterForm (req, res, next){
res.render("registerForm")
};
//Envía el formulario de registro y carga el nuevo usuario a la base de datos
async function sendRegisterForm (req, res, next){
    const {name, lastName, email, password} = req.body
    const hashedPass = await encrypt(password)
    
    const newUser = new User({
        name, lastName, email, password: hashedPass
    })
    newUser.save((err)=>{ //Carga el nuevo usuario en la base de datos
        if (!err){
            const usr = {
                id: newUser._id,
                name: newUser.name,
                lastName: newUser.lastName,
                updatedAt: newUser.updatedAt,
                validEmail: newUser.validEmail
            }
            req.session.user = usr
            res.redirect("/usuarios")
        }else {
            console.log(err.message)
        }
    })
};
//Mostramos la configuracion de la cuenta
async function getSettings(req, res){
    const user = await User.findById(req.session.user.id)
    res.render("settings", {user: req.session.user})
};
//Enviamos la modificación de la cuenta
async function sendSettings(req, res){
    try{
     const user = await User.findByIdAndUpdate(req.session.user.id, {name: req.body.name, 
        lastName: req.body.lastName, email:req.body.email})
        res.redirect("/usuarios")
    }catch (err){
       res.render("settings", {message: "Ocurrió un error, vuelva a intentarlo"})
    }
};
//Mostramos la validacion de la cuenta
async function validateEmail(req, res){
    res.send("validar email")
};
//Borramos la cuenta del usuario
async function deleteUser(req, res){
    try{
        await User.findByIdAndDelete(req.session.user.id)
        req.session.destroy()
        res.redirect("/")
    }catch (error){
        res.render("settings", {message: "Ocurrió un error, vuelva a intentarlo"})
    }
};
//Sale de la sesión
function logOut (req, res){
    req.session.destroy();
    res.redirect("/");

};

export { deleteUser, getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, getSettings, validateEmail, sendSettings, logOut }