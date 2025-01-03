import config from "../../config.js";
import {
  usuarioService,
  consultaService,
  comisionService,
  cursoService,
} from "../services/repositorios/index.js";
import __dirname from "../utils.js";

const registroView = async (req, res) => {
  try {
    // const allCursos = await cursoService.obtenerCursos();

    // // Filtrar cuando el nombre sea distinto a "Inicio"
    // const cursosFiltrados1 = allCursos.filter(
    //   (curso) =>
    //     curso.nombre !== "Inicio" &&
    //     curso.nombre !== "Prueba Mercado Pago NO TOCAR!!"
    // );
    let cursos = await cursoService.obtenerCursos();
    let curso = cursos.filter((item) => item.nombre === "Inicio");
    let cursoLista = cursos.filter(
      (item) => item.nombre.toLowerCase() !== "inicio"
    );
    // res.render("registro", { cursos: cursosFiltrados1 });
    res.render("registro", { inicio: curso, cursos: cursoLista });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};
const login = async (req, res) => {
  try {
    // const allCursos = await cursoService.obtenerCursos();

    // // Filtrar cuando el nombre sea distinto a "Inicio"
    // const cursosFiltrados1 = allCursos.filter(
    //   (curso) =>
    //     curso.nombre !== "Inicio" &&
    //     curso.nombre !== "Prueba Mercado Pago NO TOCAR!!"
    // );
    let cursos = await cursoService.obtenerCursos();
    let curso = cursos.filter((item) => item.nombre === "Inicio");
    let cursoLista = cursos.filter(
      (item) => item.nombre.toLowerCase() !== "inicio"
    );
    // res.render("registro", { cursos: cursosFiltrados1 });
    res.render("login", { inicio: curso, cursos: cursoLista });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

const contactoView = async (req, res) => {
  try {
    let cursos = await cursoService.obtenerCursos();
    let curso = cursos.filter((item) => item.nombre === "Inicio");
    let cursoLista = cursos.filter(
      (item) => item.nombre.toLowerCase() !== "inicio"
    );
    if (req.user && req.user.nombre !== "ADMIN") {
      const userData = req.user;
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);

      res.render("contacto", {
        user: userData,
        imagen: usuario.imagen,
        inicio: curso,
        cursos: cursoLista,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userData = req.user;

      res.render("contacto", {
        user: userData,
        inicio: curso,
        cursos: cursoLista,
      });
    } else {
      res.render("contacto", {
        inicio: curso,
        cursos: cursoLista,
      });
    }
  } catch (error) {
    res.sendInternalError({ status: "error", error });
  }
};

const nosotrosView = async (req, res) => {
  try {
    let userData = req.user;
    let cursos = await cursoService.obtenerCursos();
    let curso = cursos.filter((item) => item.nombre === "Inicio");
    let cursoLista = cursos.filter(
      (item) => item.nombre.toLowerCase() !== "inicio"
    );

    if (req.user && req.user.nombre !== "ADMIN") {
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
      const userRole = {
        role: "profesor", // Debes obtener el rol del usuario desde tus datos
      };
      res.render("nosotros", {
        user: userData,
        imagen: usuario.imagen,
        userRole,
        inicio: curso,
        cursos: cursoLista,
      });
    } else if (req.user && req.user.nombre === "ADMIN") {
      const userRole = "profesor";

      res.render("nosotros", {
        user: userData,
        userRole,
        inicio: curso,
        cursos: cursoLista,
      });
    } else {
      res.render("nosotros", {
        inicio: curso,
        cursos: cursoLista,
      });
    }
  } catch (error) {
    console.log(error);

    res.sendInternalError({ status: "error", error });
  }
};

const renderCursoView = async (req, res) => {
  try {
    const cursoNombre = req.params.curso;
    const userData = req.user;
    let imagen;

    if (req.user && req.user.nombre !== "ADMIN") {
      const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
      imagen = usuario.imagen;
    }

    const cursos = await cursoService.obtenerCursos();
    const curso = cursos.filter(
      (item) => item.nombre.toLowerCase() === cursoNombre.toLowerCase()
    );
    const cursoLista = cursos.filter(
      (item) =>
        item.nombre.toLowerCase() !== cursoNombre.toLowerCase() &&
        item.nombre.toLowerCase() !== "inicio"
    );
    if (curso.length === 0) {
      return res
        .status(404)
        .send({ status: "error", error: "Curso no encontrado" });
    }

    res.render("curso", {
      user: userData,
      curso: curso,
      imagen: imagen,
      cursos: cursoLista,
    });
  } catch (error) {
    console.log(error);

    res.sendInternalError({ status: "error", error });
  }
};

const perfilView = async (req, res) => {
  try {
    if (req.user && req.user.nombre !== "ADMIN") {
      const userData = req.user;
      console.log(userData);
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
    // console.log(comisiones);

    const alumnoBuscado = await req.user;
    // console.log(alumnoBuscado);

    const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
    // console.log(usuario);

    const cursos = usuario.cursos;

    let nombresCursos = []; // Declaración de nombresCursos

    // if (usuario.cursos.length > 0) {
    //   const cursosIdsString = usuario.cursos
    //     .map((curso) => curso._id)
    //     .join(",");
      
    //   // console.log(cursosIdsString);
      

    //   const cursosIdsArray = cursosIdsString.split(",");

    //   const cursosEncontrados = await Promise.all(
    //     cursosIdsArray.map(async (cursoId) => {
    //       const cursoEncontrado = await cursoService.obtenerCursoPorId(cursoId);
    //       console.log(cursoEncontrado);
    //       return cursoEncontrado;
    //     })
    //   );
    //   // console.log(cursosEncontrados);

    //   nombresCursos = cursosEncontrados.map((curso) => curso.nombre);
    // }

    // const documentId = req.params.documentId;

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
      // cursos: nombresCursos,
    });
  } catch (error) {
    console.error(error);
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

  const userData = req.user;

  res.render("layouts/admin", { Usuarios: usuarios, imagen: userData.imagen });
};

const adminUserView = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    // console.log(usuarios);
    const userData = req.user;

    // Filtrar usuarios que tengan un array en cursos
    const usuariosConCursos = usuarios.filter(
      (usuario) => usuario.cursos && Array.isArray(usuario.cursos)
    );
    const consultData = await consultaService.obtenerConsultas();
    // Iterar sobre cada usuario y obtener los cursos de cada uno
    for (const usuario of usuariosConCursos) {
      const cursosUsuario = [];
      for (const curso of usuario.cursos) {
        const cursoId = curso._id;
        const cursoComprado = await cursoService.obtenerCursoPor({
          _id: cursoId,
        });
        cursosUsuario.push(cursoComprado);
      }
      usuario.cursos = cursosUsuario; // Actualizar el array de cursos del usuario
    }

    // const listadoCursos = cursoComprado.nombre;
    res.render("adminUser", {
      Usuarios: usuarios,
      imagen: userData.imagen,
      consulta: consultData,
      user: userData,
      // Curso: listadoCursos,
      // cursoAlumno: cursoAlumno,
    });
  } catch (error) {
    console.error("Error en adminUserView:", error);
    res.sendInternalError("error:", error);
  }
};

const adminAlumnos = async (req, res) => {
  const { aid } = req.params;

  const alumnos = await usuarioService.obtenerUsuarios();
  const userData = req.user;
  const alumnoBuscado = alumnos.find((alumno) => alumno._id.toString() === aid);
  // console.log(alumnoBuscado);
  const imgAlumno = alumnoBuscado.imagen;

  const comisiones = await comisionService.obtenerComision();

  //busco las comisiones del alumno
  const comisionesDelAlumno = alumnoBuscado.comisiones.map((comisionAlumno) => {
    // Encuentra la comisión correspondiente en el array 'comisiones' utilizando el ID
    const comisionEncontrada = comisiones.find(
      (comision) => comision._id.toString() === comisionAlumno._id.toString()
    );

    // Verifica si se encontró la comisión
    if (comisionEncontrada) {
      // Retorna los detalles completos de la comisión
      return comisionEncontrada;
    } else {
      // Si la comisión no se encuentra, puedes manejar el caso de alguna manera, por ejemplo, lanzando un error o retornando un objeto vacío
      return {}; // O puedes retornar null o undefined según tus necesidades
    }
  });
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

// const adminPilatesView = async (req, res) => {
//   const usuarios = await usuarioService.obtenerUsuarios();
//   const userData = req.user;

//   const resultados = usuarios.filter((item) => item.curso === "pilates");

//   res.render("adminPilates", {
//     Usuarios: resultados,
//     imagen: userData.imagen,
//     user: userData,
//   });
// };
// const adminQuiromasajeView = async (req, res) => {
//   const usuarios = await usuarioService.obtenerUsuarios();
//   const userData = req.user;

//   const resultados = usuarios.filter((item) => item.curso === "quiromasaje");

//   res.render("adminQuiromasaje", {
//     Usuarios: resultados,
//     imagen: userData.imagen,
//     user: userData,
//   });
// };
// const adminNutricionView = async (req, res) => {
//   const usuarios = await usuarioService.obtenerUsuarios();
//   const userData = req.user;

//   const resultados = usuarios.filter((item) => item.curso === "nutricion");

//   res.render("adminNutricion", {
//     Usuarios: resultados,
//     imagen: userData.imagen,
//     user: userData,
//   });
// };
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
  let cursos = await cursoService.obtenerCursos();
  let cursoLista = cursos.filter(
    (item) => item.nombre.toLowerCase() !== "inicio"
  );

  res.render("adminCrearComision", {
    user: userData,
    cursosLista: cursoLista,
  });
};
const crearCurso = async (req, res) => {
  const userData = req.user;

  res.render("adminCrearCurso", {
    // user: userData,
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
  registroView,
  login,
  contactoView,
  nosotrosView,
  perfilView,
  adminCursosView,
  detalleCurso,
  adminView,
  adminUserView,
  adminAlumnos,
  adminConsultasView,
  // adminPilatesView,
  // adminQuiromasajeView,
  // adminNutricionView,
  adminComisionesView,
  comisionDetalles,
  crearComisionView,
  cursosAlumnos,
  cursoVista,
  crearCurso,
  restoreRequest,
  restorePassword,
  renderCursoView,
};
