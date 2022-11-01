import validator from "express-validator";

const {body, validationResult} = validator;

const validationRulesReg = [
    body("name")
    .notEmpty().withMessage("Debe ingresar su nombre")
    .isLength({min: 2, max: 30}).withMessage("Debe ingresar un nombre válido"),
    body("lastName")
    .notEmpty().withMessage("Debe ingresar su apellido")
    .isLength({min: 2, max: 30}).withMessage("Debe ingresar un apellido válido"),
    body("email")
    .notEmpty().withMessage("Debe ingresar su dirección de email")
    .isEmail().normalizeEmail().withMessage("Debe ingresar un email válido")
    .isLength({min: 2, max: 50})
    .trim(" "),
    body("email2")
    .notEmpty().withMessage("Debe ingresar su dirección de email")
    .isEmail().normalizeEmail().withMessage("Debe ingresar un email válido")
    .isLength({min: 2, max: 50})
    .trim(" "),
    (req, res, next)=>{
            const{name, lastName, email, email2} = req.body
        if (email === email2){
            const validationError = validationResult(req);
            if (!validationError.isEmpty()){
                const arrayWarning = validationError.array();
                const formData = req.body;
                res.render("registerForm", {arrayWarning, formData})
            }else return next()

            }else{
                const message = "El email no coincide, verifique e intente de nuevo";
                const formData = req.body;
                res.render("registerForm", {message, formData})
        
        
            }
        }


]
export default validationRulesReg