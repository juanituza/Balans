import BaseRouter from "./baseRouter.js";


import usuarioController from "../controladores/usuario.controller.js";
import {passportCall} from "../utils.js";
import uploadImage from "../middlewares/uploaderImage.js";


export default class UsuarioRouter extends BaseRouter {
  init() {
    this.get('/config',
      ["PUBLIC"], 
      
      usuarioController.getConfig
    );

     this.post(
       "/createPreference",
       ["ALUMNO", "ADMIN"],
       passportCall("jwt", { strategyType: "jwt" }),
       usuarioController.createPreference
     );
        
    this.post("/webhook", ["PUBLIC"], usuarioController.webhook);

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
      usuarioController.editarUsuario
    );
    this.put(
      "/editarImagen",
      ["ALUMNO", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      uploadImage.array("imagen", 3),
      usuarioController.editarImagen
    );
    this.put(
      "/adminEditarImagen/:uid",
      ["ALUMNO", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      uploadImage.array("imagen", 3),
      usuarioController.adminEditarImagen
    );
    this.put(
      "/adminEditarUsuario/:uid",
      ["ALUMNO", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      uploadImage.array("imagen", 3),
      usuarioController.adminEditarUsuario
    );
    this.delete(
      "/:uid",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      usuarioController.eliminarUsuario
    );
  }
}