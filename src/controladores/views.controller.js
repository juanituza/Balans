import moment from "moment";
import {
  usuarioService,
  consultaService,
  comisionService,
} from "../services/repositorios/index.js";
import __dirname from "../utils.js";
import { promises as fsPromises } from "fs";
import path from "path";

const contactoView = async (req, res) => {
  try {
    if (req.user && req.user.nombre !== "ADMIN") {
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
      const userRole = "profesor";

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

      res.render("pilates", {
        user: userData,
      });
    } else {
      res.render("pilates");
    }
  } catch (error) {
    res.sendInternalError({ status: "error", error });
  }
};

const quiromasajeView = async (req, res) => {
  try {
    if (req.user && req.user.nombre !== "ADMIN") {
      const userData = req.user;
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
      res.render("quiromasaje", {
        user: userData,
        imagen: usuario.imagen,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;

      res.render("quiromasaje", {
        user: userData,
      });
    } else {
      res.render("quiromasaje");
    }
  } catch (error) {
    res.sendInternalError({ status: "error", error });
  }
};

const nutricionView = async (req, res) => {
  try {
    if (req.user && req.user.nombre !== "ADMIN") {
      const userData = req.user;
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
      res.render("nutricion", {
        user: userData,
        imagen: usuario.imagen,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;

      res.render("nutricion", {
        user: userData,
      });
    } else {
      res.render("nutricion");
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

      // Obtener la fecha de nacimiento de la base de datos
      const fechaNacimientoDB = new Date(userData.nacimiento);

      const fechaNacimientoUTC = new Date(fechaNacimientoDB);

      const opcionesFormato = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      };

      const fechaNacimientoLocal = fechaNacimientoUTC.toLocaleDateString(
        "es-ES",
        opcionesFormato
      );

      res.render("perfil", {
        user: userData,
        nacimiento: fechaNacimientoLocal,
        imagen: usuario.imagen,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;

      res.render("perfil", {
        user: userData,
        imagen: userData.imagen,
      });
    }
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
};

const cursosAlumnos = async (req, res) => {
  try {
    const comisiones = await comisionService.obtenerComision();
    const alumnoBuscado = await req.user;
    const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);

    const documentId = req.params.documentId;

    // Filtra las comisiones que contienen al alumno buscado
    const comisionesConAlumno = comisiones.filter((comision) => {
      return comision.alumnos.some((alumno) =>
        alumno.alumno._id.equals(usuario._id)
      );
    });

    res.render("cursoPanel", {
      comision: comisionesConAlumno,
      user: alumnoBuscado,
      imagen: usuario.imagen,
      // numeroComision: numeroComision,
      // alumno: alumnosComision,
    });

    // Ahora, puedes imprimir la información de las comisiones encontradas
    // comisionesConAlumno.forEach(async (comision) => {
    //   const numeroComision = comision.numero;
    //   const cursoComision = comision.curso;
    //   const alumnosComision = comision.alumnos;

    //   // Renderiza la vista sin esperar las descargas
    // });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
};

const cursoVista = async (req, res) => {
  try {
    // const { id } = req.params;
    const numeroComision = req.params.id;
    const userData = req.user;
    const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);

    const comision = await comisionService.obtenerComisionPor({
      _id: numeroComision,
    });
    const docu = comision.documents;

    res.render("particular", {
      user: userData,
      comisionParticular: comision,
      imagen: usuario.imagen,
      documentos: docu,
    });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
};

const adminView = async (req, res) => {
  const usuarios = await usuarioService.obtenerUsuarios();
  console.log(usuarios);
  const userData = req.user;

  res.render("layouts/admin", { Usuarios: usuarios, imagen: userData.imagen });
};

const adminUserView = async (req, res) => {
  const usuarios = await usuarioService.obtenerUsuarios();
  const userData = req.user;
  const consultData = await consultaService.obtenerConsultas();

  res.render("adminUser", {
    Usuarios: usuarios,
    imagen: userData.imagen,
    consulta: consultData,
    user: userData,
  });
};
const adminConsultasView = async (req, res) => {
  const consultData = await consultaService.obtenerConsultas();
  const userData = req.user;
  res.render("adminConsultas", {
    consulta: consultData,
    user: userData,
  });
};

const adminPilatesView = async (req, res) => {
  const usuarios = await usuarioService.obtenerUsuarios();
  const userData = req.user;

  const resultados = usuarios.filter((item) => item.curso === "pilates");

  res.render("adminPilates", {
    Usuarios: resultados,
    imagen: userData.imagen,
    user: userData,
  });
};
const adminQuiromasajeView = async (req, res) => {
  const usuarios = await usuarioService.obtenerUsuarios();
  const userData = req.user;

  const resultados = usuarios.filter((item) => item.curso === "quiromasaje");

  res.render("adminQuiromasaje", {
    Usuarios: resultados,
    imagen: userData.imagen,
    user: userData,
  });
};
const adminNutricionView = async (req, res) => {
  const usuarios = await usuarioService.obtenerUsuarios();
  const userData = req.user;

  const resultados = usuarios.filter((item) => item.curso === "nutricion");

  res.render("adminNutricion", {
    Usuarios: resultados,
    imagen: userData.imagen,
    user: userData,
  });
};
const adminComisionesView = async (req, res) => {
  const comisiones = await comisionService.obtenerComision();
  const userData = req.user;

  res.render("adminComisiones", {
    Comisiones: comisiones,
    user: userData,
  });
};
const comisionDetalles = async (req, res) => {
  const numeroComision = req.params.id;
  const usuarios = await usuarioService.obtenerUsuarios();
  const userData = req.user;

  try {
    const comision = await comisionService.obtenerComisionPor({
      _id: numeroComision,
    });

    if (!comision) {
      return res.status(404).send("Comisión no encontrada");
    }

    // Renderizar la página con los detalles de la comisión
    res.render("detallesComision", {
      comisionParticular: comision,
      alumnosDisp: usuarios,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const crearComisionView = async (req, res) => {
  const userData = req.user;
  
  res.render("adminCrearComision", {
    user: userData,
  });
};

const restoreRequest = async (req, res) => {
  res.render("restoreRequest");
};

export default {
  contactoView,
  nosotrosView,
  perfilView,
  pilatesView,
  quiromasajeView,
  nutricionView,
  adminView,
  adminUserView,
  adminConsultasView,
  adminPilatesView,
  adminQuiromasajeView,
  adminNutricionView,
  adminComisionesView,
  comisionDetalles,
  crearComisionView,
  cursosAlumnos,
  cursoVista,
  restoreRequest,
};
