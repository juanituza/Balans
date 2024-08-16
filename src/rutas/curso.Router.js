import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import cursoController from "../controladores/curso.controller.js";
import upload from "../middlewares/upload.js";


export default class CursoRouter extends BaseRouter {
    init() {
        this.post(
          "/CrearCurso",
          ["ADMIN"],
          passportCall("jwt", { strategyType: "locals" }),
          upload.single('imagen'),
        cursoController.crearCurso);
        this.put(
          "/editarCurso/:cursoId",
          ["ADMIN"],
          passportCall("jwt", { strategyType: "locals" }),
         
          cursoController.editarCurso
        );
        this.delete(
          "/eliminarCurso/:cursoId",
          ["ADMIN"],
          passportCall("jwt", { strategyType: "locals" }),         
          cursoController.eliminarCurso
        );
    }
}