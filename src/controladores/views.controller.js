import moment from "moment";
import { usuarioService } from "../services/repositorios/index.js";


const contactoView = async (req, res) => {
  try {
    
    if (req.user && req.user.nombre !== 'ADMIN') {
      const userData = req.user;
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
      
      res.render("contacto", {
        user: userData,
        imagen: usuario.imagen,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;

      res.render("contacto", {
        user: userData,
      });
    } else {
      res.render("contacto");
    }
  } catch (error) {
    res.sendInternalError({ status: "error", error });
  }
};

const nosotrosView = async (req, res) => {
  try {
    if (req.user && req.user.nombre !== "ADMIN") {
      const userData = req.user;
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
      const userRole = {
        role: "profesor", // Debes obtener el rol del usuario desde tus datos
      };
     
      res.render("nosotros", {
        user: userData,
        imagen: usuario.imagen,
        userRole,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;
       const userRole =  "profesor";
       
      res.render("nosotros", {
        user: userData,
        userRole,
      });
    } else {
      res.render("nosotros");
    }
  } catch (error) {
    res.sendInternalError({ status: "error", error });
  }
};
const pilatesView = async (req, res) => {
  try {
    if (req.user && req.user.nombre !== "ADMIN") {
      const userData = req.user;
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
      res.render("pilates", {
        user: userData,
        imagen: usuario.imagen,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;

      res.render("contacto", {
        user: userData,
      });
    } else {
      res.render("nosotros");
    }
  } catch (error) {
    res.sendInternalError({ status: "error", error });
  }
};

const perfilView = async (req, res) => {
  try {
    if (req.user && req.user.nombre !== "ADMIN") {
      const userData = req.user;
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
      const fechaNacimiento = moment(userData.nacimiento).format("DD-MM-YYYY");
      res.render("perfil", {
        user: userData,
        nacimiento: fechaNacimiento,
        imagen: usuario.imagen,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;

      res.render("perfil", {
        user: userData,
      });
    }
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
};

const adminView = async (req, res) => {
  const usuarios = await usuarioService.obtenerUsuarios();
  console.log(usuarios.imagen);
  res.render("layouts/admin", { Usuarios: usuarios });
};


export default {
  contactoView,
  nosotrosView,
  perfilView,
  pilatesView,
  adminView,
};
