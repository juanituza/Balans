import BaseRouter from "./baseRouter.js";


import usuarioController from "../controladores/usuario.controller.js";
import {passportCall} from "../utils.js";
import uploadImage from "../middlewares/uploaderImage.js";


export default class ConsultaRouter extends BaseRouter {
  init() {
    this.get(
      "/admin",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      usuarioController.obtenerUsuarios
    );
    this.put(
      "/editarUsuario",
      ["ALUMNO", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      uploadImage.array("imagen", 3),
      usuarioController.editarImagen
    );
    this.post(
      "/",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      usuarioController.eliminarUsuario
    );
  }
}