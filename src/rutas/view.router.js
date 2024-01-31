import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import viewController from "../controladores/views.controller.js";

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
      "/nosotros",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.nosotrosView
    );
    this.get(
      "/pilates",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.pilatesView
    );
    this.get(
      "/perfil",
      ["ALUMNO", "PROFESOR"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.perfilView
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
      "/admin/consultas",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.adminConsultasView
    );
    this.get("/login", ["NO_AUTH"], (req, res) => {
      res.render("login");
    });
    // this.get("/nosotros", ["USER"], (req, res) => {
    //   res.render("nosotros");
    // });
    this.get("/registro", ["NO_AUTH"], (req, res) => {
      res.render("registro");
    });

    // this.get(
    //   "/products",
    //   ["PUBLIC"],
    //   passportCall("jwt", { strategyType: "jwt" }, { redirect: "/login" }),
    //   viewController.productsView
    // );
  }
}