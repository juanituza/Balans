import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import comisionController from "../controladores/comision.controller.js";
import upload from "../middlewares/upload.js";

export default class ComisionRouter extends BaseRouter {
  init() {
    this.get(
      "/",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      comisionController.obtenerComisiones
    );
    this.post(
      "/",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      comisionController.crearComision
    );
    this.post(
      "/:cid/:uid",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      comisionController.agregarAlumno
    );
    this.post(
      "/:cid",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      upload.array("documentos", 5),
      comisionController.cargarArchivos
    );
    this.delete(
      "/:cid/:documentId",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      comisionController.eliminarDocumento
    );
    this.delete(
      "/:cid/:uid",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "local" }),
      comisionController.eliminarAlumno
    );
    this.delete(
      "/:cid",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "local" }),
      comisionController.eliminarComision
    );
  }
}
