import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import consultaController from "../controladores/consulta.controller.js";

export default class ConsultaRouter extends BaseRouter {
  init() {
    this.get(
      "/",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      consultaController.obtenerConsultas
    );
    this.post(
      "/",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "locals" }),
      consultaController.guardarConsulta
    );
     this.put("/:cid", ["ADMIN"], passportCall("jwt", { strategyType: "locals" }),consultaController.actualizarConsulta);
     this.delete("/:cid",["ADMIN"],passportCall("jwt", { strategyType: "locals" }),consultaController.eliminarConsulta);
  
  }
}