import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import sessionsController from "..//controladores/session.controller.js";


export default class SessionRouter extends BaseRouter {
  init() {
    this.post(
      "/registro",
      ["PUBLIC"],
      passportCall("register", { strategyType: "locals" }),
      
      sessionsController.registro
    );

    this.post(
      "/login",
      ["PUBLIC"],
      passportCall("login", { strategyType: "locals" }),
      sessionsController.login
    );

    this.post(
      "/cerrarSesion",
      ["ALUMNO", "PROFESORES", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      sessionsController.cerrarSesion
    );
  }
}
