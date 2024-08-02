import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import cursoController from "../controladores/curso.controller.js";


export default class CursoRouter extends BaseRouter {
    init() {
        this.post(
          "/CrearCurso",
          ["ADMIN"],
          passportCall("jwt", { strategyType: "locals" }),
        cursoController.crearCurso);
        this.put(
          "/editarCurso/:cursoId",
          ["ADMIN"],
          passportCall("jwt", { strategyType: "locals" }),
          cursoController.editarCurso
        );
    }
}