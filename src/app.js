import express from "express";
import cookieParser from "cookie-parser";
import { join } from "path";
import handlebars from "express-handlebars";

import __dirname from "./utils.js";
import config from "./config.js";
import MongoSingleton from "./mongoSingleton.js";
import initializePassportStrategies from "../config/passport.config.js";

import exphbs from "express-handlebars";
import { ifRoleAdmin } from "./middlewares/handlebars-helpers.js";

import ViewsRouter from "./rutas/view.router.js";
import UsuarioRouter from "./rutas/usuario.router.js";
import ConsultaRouter from "./rutas/consulta.Router.js";
import SessionRouter from "./rutas/session.Router.js";
import LoggerService from "./dao/managers/LoggerManager.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const PORT = config.app.PORT;

const connection = MongoSingleton.getInstance();

//Server de escucha
const server = app.listen(PORT, () =>
  LoggerService.info(`Listening on ${PORT}`)
);

initializePassportStrategies();

const hbs = exphbs.create({
  helpers: {
    ifRoleAdmin,
  },
  layoutsDir: `${__dirname}/views/layouts`, // Ruta absoluta
  defaultLayout: "main",
  partialsDir: `${__dirname}/views/partials`, // Ruta absoluta
  extname: "handlebars",
});

// Asigna el layout principal para las rutas que no sean de administrador
app.use((req, res, next) => {
  res.locals.layout = "main";
  next();
});

app.use("/admin", (req, res, next) => {
  res.locals.layout = "admin";
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware para archivos estáticos en el layout "main"
app.use("/", express.static(join(__dirname, "public")));

// Middleware para archivos estáticos en el layout "admin"
app.use("/admin", express.static(join(__dirname, "public")));

// app.engine("handlebars", handlebars.engine());
app.engine("handlebars", hbs.engine);
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

const usuarioRouter = new UsuarioRouter();
const consultaRouter = new ConsultaRouter();
const viewsRouter = new ViewsRouter();
const sessionRouter = new SessionRouter();

app.use("/", viewsRouter.getRouter());
app.use("/api/usuarios", usuarioRouter.getRouter());
app.use("/api/consulta", consultaRouter.getRouter());
app.use("/api/session", sessionRouter.getRouter());

// Middleware para manejar errores
app.use((err, req, res, next) => {
  // Verifica si el error es "Unauthorized"
  if (err && err.message === "Unauthorized") {
    // Redirige al usuario a una imagen específica
    return res.redirect("/imagenes/balansIMG.png");
  }

  // Si no es un error "Unauthorized", pasa al siguiente middleware de manejo de errores
  next(err);
});

// Ruta de ejemplo que lanza un error "Unauthorized"
    app.get("/ruta-protegida", (req, res, next) => {
      const error = new Error("Unauthorized");
      error.status = 401;
      next(error);
    });

// // Configura el proxy para redirigir todas las solicitudes a la API de GeoNames
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://api.geonames.org",
//     changeOrigin: true,
//     onProxyReq: (proxyReq) => {
//       console.log("Proxying request to GeoNames:", proxyReq.path);
//     },
//     onProxyRes: (proxyRes) => {
//       console.log("Received response from GeoNames:", proxyRes.statusCode);
//     },
//   })
// );

// // Ruta específica para manejar solicitudes a la API de GeoNames
// app.get("/api/countries", async (req, res) => {
//   try {
//     console.log("Solicitud a /api/countries recibida");
//     const response = await fetch("http://api.geonames.org/countriesJSON?username=juanituza85");
//     console.log("Respuesta de GeoNames recibida");
//     const countries = await response.json();
//     res.json(countries);
//   } catch (error) {
//     console.error("Error al obtener la lista de países:", error);
//     res.status(500).json({ error: "Internal Server Error", message: error.message });
//   }
// });

// app.get("/api/childrenJSON", async (req, res) => {
//   try {
//     const { geonameId } = req.query;
//     const response = await fetch(
//       `http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=juanituza85`
//     );
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error al obtener la lista de provincias:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
