import BaseRouter from "./baseRouter.js";

import usuarioController from "../controladores/usuario.controller.js";
import {passportCall} from "../utils.js";
// import upload from "../middlewares/uploader.js";


export default class ConsultaRouter extends BaseRouter {
  init() {
    this.get(
      "/admin",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      usuarioController.obtenerUsuarios
    );
    this.post(
      "/",
      ["USER", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      usuarioController.guardarUsuario
    );
    this.post(
      "/",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      usuarioController.eliminarUsuario
    );
  }
}