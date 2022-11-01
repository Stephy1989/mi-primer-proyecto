import express from "express";
import {getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, getSettings, sendSettings } from "../controllers/controlUser.js";
import validationRulesReg from "../validator/validationRulesRegisterForm.js";
const routerUser = express.Router();

routerUser.get("/", getLoginForm);
routerUser.post("/", sendLoginForm);


const routerRegister = express.Router();

routerRegister.get("/", getRegisterForm);
routerRegister.post("/", validationRulesReg, sendRegisterForm);

const routerSettings = express.Router();
routerSettings.get("/", getSettings);
routerSettings.post("/", sendSettings);
 

const routerValidate = express.Router();
routerValidate.get("/");
routerValidate.post("/");

export {routerUser, routerRegister, routerSettings, routerValidate}
