import { Router } from "express";
import jwt from "jsonwebtoken";
import { passportCall } from "../utils.js";

export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      passportCall("jwt", { strategyType: "jwt" }),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      passportCall("jwt", { strategyType: "jwt" }),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      passportCall("jwt", { strategyType: "jwt" }),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      passportCall("jwt", { strategyType: "jwt" }),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (message) => res.send({ status: "success", message });
    res.sendSuccessWithPayload = (payload) =>
      res.send({ status: "success", payload });
    res.sendInternalError = (error) =>
      res.status(500).send({ status: "error", error });
    res.sendErrorWithPayload = (payload) =>
      res.status(400).send({ estatus: "error", payload });
    res.sendUnauthorized = (error) =>
      res.status(401).send({ status: "error", error });
    res.sendNotFound = (error) =>
      res.status(404).send({ status: "error", error });
    next();
  };

  // handlePolicies = (policies) => {
  //   return (req, res, next) => {
  //     if (policies[0] === "PUBLIC") return next();
  //     //Usuario parseado desde jwt
  //     const user = req.user;
  //     if (policies[0] === "NO_AUTH" && user)
  //       return res.status(401).send({ status: "error", error: "Unauthorized" });
  //     if (policies[0] === "NO_AUTH" && !user) return next();
  //     //Si existe un usuario.
  //     if (!user)
  //       return res.status(401).send({ status: "error", error: req.error });
  //     if (!policies.includes(user.role.toUpperCase()))
  //       return res.status(401).send({ status: "error", error: "Unauthorized" });
  //     next();
  //   };
  // };

  handlePolicies = (policies) => {
    return (req, res, next) => {
      const user = req.user;

      // Caso: Política Pública
      if (policies.includes("PUBLIC")) {
        return next();
      }

      // Caso: Sin Autenticación Permitida
      if (policies.includes("NO_AUTH")) {
        if (user) {
          return res.render("unauthorized", { error: "Unauthorized" });
        } else {
          return next();
        }
      }

      // Caso: Usuario No Autenticado
      if (!user) {
        return res.render("unauthorized", { error: req.error });
      }

      // Caso: Política de Rol Específico
      if (!policies.includes(user.role.toUpperCase())) {
        return res.render("unauthorized", { error: "Unauthorized" });
      }

      // Caso: Acceso Permitido
      next();
    };
  };

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].sendInternalError(error);
      }
    });
  }
}
