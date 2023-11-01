import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import viewController from "../controladores/views.controller.js";

/*-----------RENDER CON MONGO---------*/

export default class ViewsRouter extends BaseRouter {
  init() {
    this.get("/contacto", ["PUBLIC"], passportCall("jwt", { strategyType: "jwt" }),viewController.contactoView);
    this.get(
      "/nosotros",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.nosotrosView
    );
    
  
  
    // this.get(
    //   "/products",
    //   ["PUBLIC"],
    //   passportCall("jwt", { strategyType: "jwt" }, { redirect: "/login" }),
    //   viewController.productsView
    // );

  }
}