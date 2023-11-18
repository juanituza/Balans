import moment from "moment";
import { usuarioService } from "../services/repositorios/index.js";
import path from 'path';


const contactoView = async (req, res) => {
  const userData = req.user;
  const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
  res.render("contacto", {
    user: userData,
    imagen: usuario.imagen,
  });
};

const nosotrosView = async (req, res) => {
  const userData = req.user;
   const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
  res.render("nosotros", {
    user: userData,
    imagen: usuario.imagen,
  });
};
const pilatesView = async (req, res) => {
  const userData = req.user;
  const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
  res.render("pilates", {
    user: userData,
    imagen: usuario.imagen,
  });
};

const perfilView = async (req, res) => {
  try {
    const userData = req.user;
    const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
    
    const fechaNacimiento = moment(userData.nacimiento).format("DD-MM-YYYY");
    res.render("perfil", {
      user: userData,
      nacimiento: fechaNacimiento,
      imagen: usuario.imagen,
      
    });
  } catch (error) {
    console.error("Error en perfilView:", error);
    res.status(500).send({ status: "error", error });
  }
};



export default {
  contactoView,
  nosotrosView,
  perfilView,
  pilatesView,
};
