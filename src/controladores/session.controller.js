import jwt from "jsonwebtoken";
import { createHash, generateToken, validatePassword } from "../utils.js";
import { usuarioService } from "../services/repositorios/index.js";
import LoggerService from "../dao/managers/LoggerManager.js"

const registro = async (req, res) => {
//   const mailingService = new MailingService();
  try {
    // const result = await mailingService.sendMail(
    //   req.user.email,
    //   DTemplates.WELCOME,
    //   { user: `${req.user.first_name} ${req.user.last_name}` }
    // );
    res.sendSuccess("Registered");
  } catch (error) {
    LoggerService.error;
    res.sendInternalError("Internal server error, contact the administrator");
  }
};

const login = async (req, res) => {
  try {
    const accessToken = generateToken(req.user);
    //envío el token por el body para que el front lo guardo
    res
      .cookie("authToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "strict",
      })
      .sendSuccess("Login In");
  } catch (error) {
    res.sendInternalError("Internal server error, contact the administrator");
  }
};

const cerrarSesion = async (req, res) => {
  res.clearCookie("authToken"); // Eliminar la cookie "authToken"
  res.send({
    status: "success",
    message: "Sesión cerrada correctamente",
  });
};


export default {
  registro,
  login,
  cerrarSesion,
  //   registerGitHub,
  //   loginGitHub,

  //   restoreRequest,
  //   restorePassword,
};