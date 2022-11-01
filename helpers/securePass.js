import bcrypt from "bcrypt";
const saltRound = 10;


const encrypt = async function (pass) {
    const encryptedPass = await  bcrypt.hash(pass, saltRound)
    return encryptedPass // retorna contraseña encriptada

}

const decrypt = async function (pass, hashedPass){
    const decryptedPass = await bcrypt.compare(pass, hashedPass)
    return decryptedPass // retorna true o false
}

export {encrypt, decrypt}