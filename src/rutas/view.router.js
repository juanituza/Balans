import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import viewController from "../controladores/views.controller.js";

/*-----------RENDER CON MONGO---------*/

export default class ViewsRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], passportCall("jwt", { strategyType: "jwt" }),viewController.contactoView);
    
  
  
    // this.get(
    //   "/products",
    //   ["PUBLIC"],
    //   passportCall("jwt", { strategyType: "jwt" }, { redirect: "/login" }),
    //   viewController.productsView
    // );

  }
}