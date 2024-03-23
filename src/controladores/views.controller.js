import moment from "moment";
import {
  usuarioService,
  consultaService,
  comisionService,
  cursoService,
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
      const cursos = await cursoService.obtenerCursos();
      const curso = cursos.filter((item) => item.nombre === "Pilates");
      res.render("pilates", {
        user: userData,
        imagen: usuario.imagen,
        pilates: curso,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;
      const cursos = await cursoService.obtenerCursos();
      const curso = cursos.filter((item) => item.nombre === "Pilates");
      res.render("pilates", {
        user: userData,
        pilates: curso,
      });
    } else {
      const cursos = await cursoService.obtenerCursos();
      const curso = cursos.filter((item) => item.nombre === "Pilates");
      res.render("pilates", {
        pilates: curso,
      });
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
      const cursos = await cursoService.obtenerCursos();
      const curso = cursos.filter((item) => item.nombre === "Quiromasaje");

      res.render("quiromasaje", {
        user: userData,
        imagen: usuario.imagen,
        quiromasaje: curso,
        escapeHtml: false,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;
      const cursos = await cursoService.obtenerCursos();

      const curso = cursos.filter((item) => item.nombre === "Quiromasaje");

      res.render("quiromasaje", {
        user: userData,
        // imagen : userData.imagen,
        quiromasaje: curso,
        escapeHtml: false,
      });
    } else {
      const cursos = await cursoService.obtenerCursos();

      const curso = cursos.filter((item) => item.nombre === "Quiromasaje");
      res.render("quiromasaje", {
        quiromasaje: curso,
        escapeHtml: false,
      });
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
      const cursos = await cursoService.obtenerCursos();
      const curso = cursos.filter((item) => item.nombre === "Nutrición");
      res.render("nutricion", {
        user: userData,
        imagen: usuario.imagen,
        nutricion: curso,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;
      const cursos = await cursoService.obtenerCursos();
      
      const curso = cursos.filter((item) => item.nombre === "Nutrición");

      res.render("nutricion", {
        user: userData,
        nutricion: curso,
      });
    } else {
      const cursos = await cursoService.obtenerCursos();
      const curso = cursos.filter((item) => item.nombre === "Nutrición");
      res.render("nutricion", {
        nutricion: curso,
      });
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

    res.render("comisionPanel", {
      comision: comisionesConAlumno,
      user: alumnoBuscado,
      imagen: usuario.imagen,
    });
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

const adminCursosView = async (req, res) => {
  try {
    const userData = req.user;
    const allCursos = await cursoService.obtenerCursos();

    res.render("adminCursos", { cursos: allCursos, user: userData });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

const detalleCurso = async (req, res) => {
  try {
    const numeroDeCurso = req.params.id;
    const userData = req.user;
    const cursoPart = await cursoService.obtenerCursoPor(numeroDeCurso);

    const usuarios = await usuarioService.obtenerUsuarios();
    const resultados = usuarios.filter(
      (item) => item.curso === cursoPart.nombre
    );

    res.render("adminDetalleCurso", {
      curso: cursoPart,
      Usuarios: resultados,
      user: userData,
    });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

const adminView = async (req, res) => {
  const usuarios = await usuarioService.obtenerUsuarios();
  const cursos = await cursoService.obtenerCursos();
  console.log(cursos);
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

const adminAlumnos = async (req, res) => {
  const { aid } = req.params;

  const alumnos = await usuarioService.obtenerUsuarios();
  const userData = req.user;
  const alumnoBuscado = alumnos.find((alumno) => alumno._id.toString() === aid);
  // console.log(alumnoBuscado);
  const imgAlumno = alumnoBuscado.imagen;

  const comisiones = await comisionService.obtenerComision();
  // console.log(comisiones);

  // Obtener los IDs de las comisiones en las que está inscrito el alumno
  const comisionesAlumno = alumnoBuscado.comisiones.map((comision) =>
    comision.comision.toString()
  );

  // Filtrar las comisiones para encontrar las que están en la lista de comisiones del alumno
  const comisionesDelAlumno = comisiones.filter((comision) =>
    comisionesAlumno.includes(comision._id.toString())
  );

  // // Obtener la fecha de nacimiento de la base de datos
  // const fechaNacimientoDB = new Date(alumnoBuscado.nacimiento);

  // const fechaNacimientoUTC = new Date(fechaNacimientoDB);

  // const opcionesFormato = {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  //   timeZone: "UTC",
  // };

  // const fechaNacimientoLocal = fechaNacimientoUTC.toLocaleDateString(
  //   "es-ES",
  //   opcionesFormato
  // );

  // Obtén la fecha de nacimiento del alumno
  const fechaNacimientoDB = new Date(alumnoBuscado.nacimiento);

  // Convierte la fecha al formato ISO (YYYY-MM-DD)
  const fechaNacimientoISO = fechaNacimientoDB.toISOString().split("T")[0]; // Obtiene la parte de la fecha (YYYY-MM-DD)

  res.render("adminAlumnos", {
    alumno: alumnoBuscado,
    user: userData,
    comision: comisionesDelAlumno,
    imagen: imgAlumno,
    nacimiento: fechaNacimientoISO,
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
  console.log(numeroComision);
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

const restorePassword = async (req, res) => {
  const userData = req.user;
  res.render("restorePassword", { user: userData });
};

export default {
  contactoView,
  nosotrosView,
  perfilView,
  pilatesView,
  quiromasajeView,
  nutricionView,
  adminCursosView,
  detalleCurso,
  adminView,
  adminUserView,
  adminAlumnos,
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
  restorePassword,
};
