import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import viewController from "../controladores/views.controller.js";
import download from "../middlewares/download.js";

/*-----------RENDER CON MONGO---------*/

export default class ViewsRouter extends BaseRouter {
  init() {
    this.get(
      "/contacto",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.contactoView
    );
    this.get(
      "/curso/:curso",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.renderCursoView
    );
    this.get(
      "/",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.nosotrosView
    );
 
    // this.get(
    //   "/pilates",
    //   ["PUBLIC"],
    //   passportCall("jwt", { strategyType: "jwt" }),
    //   viewController.pilatesView
    // );
    // this.get(
    //   "/quiromasaje",
    //   ["PUBLIC"],
    //   passportCall("jwt", { strategyType: "jwt" }),
    //   viewController.quiromasajeView
    // );
    // this.get(
    //   "/nutricion",
    //   ["PUBLIC"],
    //   passportCall("jwt", { strategyType: "jwt" }),
    //   viewController.nutricionView
    // );
    this.get(
      "/perfil",
      ["ALUMNO", "ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.perfilView
    );
    this.get(
      "/comisionPanel",
      ["ALUMNO", "ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      // download("documentos", 5),
      viewController.cursosAlumnos
    );
    this.get(
      "/restoreRequest",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.restoreRequest
    );
    this.get(
      "/restorePassword",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.restorePassword
    );
    this.get(
      "/particular/:id",
      ["ALUMNO", "ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.cursoVista
    );
    // Ruta para descargar documentos
    this.get(
      "/descargarDocumento/:cid/:documentId",
      ["ALUMNO", "ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      download.downloadFile
    );
    
    this.get(
      "/descargarDocumentoParticular/public/imagenes/:fileName",
      ["ALUMNO", "ADMIN", "PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      download.downloadSpecificFile
    );
    this.get(
      "/admin",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminView
    );
    this.get(
      "/admin/user",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminUserView
    );
    this.get(
      "/admin/alumnos/:aid",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminAlumnos
    );
    this.get(
      "/admin/consultas",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminConsultasView
    );
    this.get(
      "/admin/cursos",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminCursosView
    );
    this.get(
      "/admin/detalleCurso/:id",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.detalleCurso
    );
    this.get(
      "/admin/pilates",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminPilatesView
    );
    this.get(
      "/admin/quiromasaje",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminQuiromasajeView
    );
    this.get(
      "/admin/nutricion",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminNutricionView
    );
    this.get(
      "/admin/comisiones",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminComisionesView
    );
    this.get(
      "/admin/CrearComision",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.crearComisionView
    );
    this.get(
      "/admin/crearCurso",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.crearCurso
    );
    this.get(
      "/admin/detalleComision/:id",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.comisionDetalles
    );
    this.get("/login", ["NO_AUTH"], (req, res) => {
      res.render("login");
    });

    // this.get("/nosotros", ["USER"], (req, res) => {
    //   res.render("nosotros");
    // });
    this.get("/registro", 
    ["NO_AUTH"], 
    passportCall("jwt", { strategyType: "jwt" }),
    viewController.registroView
    );

    // this.get(
    //   "/products",
    //   ["PUBLIC"],
    //   passportCall("jwt", { strategyType: "jwt" }, { redirect: "/login" }),
    //   viewController.productsView
    // );
  }
}
