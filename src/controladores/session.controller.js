import jwt from "jsonwebtoken";
import { createHash, generateToken, validatePassword } from "../utils.js";
import { usuarioService } from "../services/repositorios/index.js";
import MailingService from "../services/mailingService.js";
import RestoreTokenDTO from "../dto/restoresTokenDTO.js";
import LoggerService from "../dao/managers/LoggerManager.js";
import DTemplates from "../constants/DTemplates.js";

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

const restoreRequest = async (req, res) => {
  try {
    
    //capturo el mail del front por body
    const { email } = req.body;
    
  // si no existe email
  if (!email) return res.sendNotFound("Email no enviado");
  // si existe email busco el usuario
  const usuario = await usuarioService.obtenerUsuarioPor({ email });
 
  // si no existe usuario
  if (!usuario)
    return res.sendNotFound(
      "Email inválido - No  fue encontrado en nuestras base de datos"
    );
  //si existe el usuario y verificamos que el mail está en la db
  // creo un restoreToken
  const restoreToken = generateToken(RestoreTokenDTO.getfrom(usuario));
  const mailingService = new MailingService();
  const sendMailResult = await mailingService.sendMailRestored(
    usuario.email,
    DTemplates.RESTORE,
    { restoreToken }
  );

  
  res.sendSuccess("Se envió el mail exitosamente");
} catch (error) {
  res.sendInternalError("hola error");
}
};

const restorePassword = async (req, res) => {
  const { password, token } = req.body;
  console.log(password);
  console.log(token);
  try {
    const tokenUser = jwt.verify(token, "jwtSecret");
    const user = await usuarioService.obtenerUsuarioPor({
      email: tokenUser.email,
    });
    //Verificar si la contraseña es la misma
    const isSamePassword = await validatePassword(password, user.password);
    if (isSamePassword)
      return res.sendUnauthorized(
        "No se puede reemplazar la contraseña con la contraseña actual"
      );
    //  hasheo password nuevo
    const newHashPassword = await createHash(password);

    const result = await usuarioService.actualizarUsuario(
      { _id: user._id },
      { password: newHashPassword }
    );
    res.sendSuccess("Password modificado con éxito");
  } catch (error) {
    LoggerService.error;
    res.sendInternalError("Internal server error, contact the administrator");
  }
};

export default {
  registro,
  login,
  cerrarSesion,
  //   registerGitHub,
  //   loginGitHub,

  restoreRequest,
  restorePassword,
};
