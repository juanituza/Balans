import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import comisionController from "../controladores/comision.controller.js";


export default class ComisionRouter extends BaseRouter {
    init (){
        this.get("/", ["ADMIN"], passportCall("jwt", { strategyType: "locals" }),comisionController.obtenerComisiones);
        this.post("/",["ADMIN"],passportCall("jwt", { strategyType: "locals" }),comisionController.crearComision);
        this.post("/:cid/:uid", ["ADMIN"],passportCall("jwt",{strategyType:"locals"}),comisionController.agregarAlumno);
        this.delete("/:cid/:uid",["ADMIN"],passportCall("jwt", { strategyType: "local" }),comisionController.eliminarAlumno
        );
    }
}
