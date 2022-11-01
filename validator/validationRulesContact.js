import validator from "express-validator";
const { body, validationResult } = validator;

const validationRulesContact = [
    body("name")
    .notEmpty().withMessage("Debe ingresar un nombre")
    .isLength({min: 2, max: 50}).withMessage("Ingrese un nombre válido"),
    body("email")
    .notEmpty().withMessage("Debe ingresar un email")
    .isEmail().normalizeEmail().withMessage("Ingrese un email válido")
    .isLength({min: 2, max: 50}).withMessage("Ingrese un email válido")
    .trim(" "),
    body("consulta")
    .notEmpty().withMessage("Ingrese su consulta")
    .isLength({min: 2, max: 300}).withMessage("Ingrese su consulta con un máximo de 300 caracteres"),

    (req, res, next) =>{
        const validationError = validationResult(req);
        if(!validationError.isEmpty()){
            const arrayWarning = validationError.array();
            const formData = req.body;
            console.log(formData);
            res.render("contacto", {arrayWarning, formData})
        }else return next()
    }

]
export default validationRulesContact