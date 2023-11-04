import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import sessionsController from "..//controladores/session.controller.js";

export default class SessionRouter extends BaseRouter {
  init() {
    this.post(
      "/register",
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
  }
}
