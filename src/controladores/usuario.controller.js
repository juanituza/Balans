import {
  usuarioService,
  comisionService,
  cursoService,
} from "../services/repositorios/index.js";
import __dirname from "../utils.js";
import usuariosDTO from "../dto/usuarioDTO.js";
import config from "../config.js";
import { MercadoPagoConfig, Preference } from "mercadopago";


const client = new MercadoPagoConfig({
  accessToken:
    "TEST-593741329831048-041321-456dfa5513a11ee44a97d152c02dd41b-6494809",
});

const createPreference = async (req, res) => {
  // Agrega credenciales
  // //Capturo el nombre del curso a pagar
  // const cursoNombre = req.query.nombre;
  // console.log(cursoNombre);
  // //Obtengo todos los cursos
  // const allCursos = await cursoService.obtenerCursos();
  // //Busca el curso encontrado por el nombre
  // const cursoEncontrado = allCursos.find((curso) => curso.nombre === cursoNombre);
  // console.log(cursoEncontrado);
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
        
      ],
      back_urls: {
        success: "https://www.institutobalans.com.ar/",
        failure: "https://www.institutobalans.com.ar/",
        pending: "https://www.institutobalans.com.ar/",
      },
      auto_return: "approved",
    };
    

    console.log(body);
    const preference = new Preference(client);
    console.log(preference);
    
    const result = await preference.create({ body });
    res.json({ id: result.id });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

const obtenerUsuarios = async (req, res) => {
  const users = await usuarioService.obtenerUsuarios();
  res.sendSuccessWithPayload(users);
};

const guardarUsuario = async (req, res) => {
  try {
    const imagenRuta = req.files.map(
      (file) => `/uploads/perfil/${file.filename}`
    );
    const { nombre, apellido, email, password, nacimiento, telefono } =
      req.body;

    const user = {
      nombre,
      apellido,
      email,
      password,
      nacimiento,
      imagen: [imagenRuta],
      telefono,
    };
    if (
      !user.nombre ||
      !user.apellido ||
      !user.email ||
      !user.password ||
      !user.telefono ||
      !user.imagen
    )
      return res
        .status(400)
        .send({ status: "error", payload: "Incomplete value" });

    const result = await usersService.createUser(user);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

const editarImagen = async (req, res) => {
  const userId = req.user._id;
  // console.log(req.file);
  // const {imagen} = req.body;
  const imagePath = req.files.map((file) => `/uploads/perfil/${file.filename}`);

  try {
    const userUpdate = await usuarioService.actualizarUsuario(
      { _id: userId },
      { imagen: imagePath }
    );
    res.sendSuccessWithPayload(userUpdate);
  } catch (error) {
    LoggerService.error;
    res.sendInternalError("Internal server error, contact the administrator");
  }
};
const adminEditarImagen = async (req, res) => {
  // obtengo el id del usuario
  const userId = req.params.uid;
  // obtengo la ruta de la imagen
  const imagePath = req.files.map((file) => `/uploads/perfil/${file.filename}`);

  try {
    // actualizo el usuario
    const userUpdate = await usuarioService.actualizarUsuario(
      { _id: userId },
      { imagen: imagePath }
    );

    res.sendSuccessWithPayload(userUpdate);
  } catch (error) {
    LoggerService.error;
    res.sendInternalError("Internal server error, contact the administrator");
  }
};

const editarUsuario = async (req, res) => {
  try {
    const userId = req.user._id;
    const userUpdate = req.body;
    const usuarioActual = await usuarioService.obtenerUsuarioPorId(userId);

    // Verifica si el campo "nombre" está presente y no es igual al valor actual
    if (userUpdate.nombre && userUpdate.nombre !== usuarioActual.nombre) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { nombre: userUpdate.nombre }
      );
    }
    if (userUpdate.apellido && userUpdate.apellido !== usuarioActual.apellido) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { apellido: userUpdate.apellido }
      );
    }
    if (userUpdate.apellido && userUpdate.apellido !== usuarioActual.apellido) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { apellido: userUpdate.apellido }
      );
    }
    if (userUpdate.telefono && userUpdate.telefono !== usuarioActual.telefono) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { telefono: userUpdate.telefono }
      );
    }
    if (userUpdate.email && userUpdate.email !== usuarioActual.email) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { email: userUpdate.email }
      );
    }
    if (userUpdate.role && userUpdate.role !== usuarioActual.role) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { role: userUpdate.role }
      );
    }
    if (
      userUpdate.nacimiento &&
      userUpdate.nacimiento !== usuarioActual.nacimiento
    ) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { nacimiento: userUpdate.nacimiento }
      );
    }
    // Vuelve a obtener el usuario actualizado después de las actualizaciones
    const updatedUser = await usuarioService.obtenerUsuarioPorId(userId);

    res.sendSuccessWithPayload(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendInternalError("Internal error");
  }
};


const adminEditarUsuario = async (req, res) => {
  try {
    const userId = req.params.uid;
    const userUpdate = req.body;
    const usuarioActual = await usuarioService.obtenerUsuarioPorId(userId);
    const actualizaciones = {};

    // Verificar si userUpdate es un objeto
    if (typeof userUpdate === "object" && userUpdate !== null) {
      // Iterar sobre las propiedades del objeto userUpdate
      for (let key in userUpdate) {
        // Verificar si la propiedad existe en userUpdate y es diferente de null o undefined
        if (
          Object.prototype.hasOwnProperty.call(userUpdate, key) && // Usar Object.prototype.hasOwnProperty.call para verificar la propiedad
          userUpdate[key] !== null &&
          userUpdate[key] !== undefined &&
          userUpdate[key] !== usuarioActual[key]
        ) {
          // Agregar la actualización al objeto actualizaciones
          actualizaciones[key] = userUpdate[key];
        }
      }
    }
    // Verificar si hay actualizaciones para realizar
    if (Object.keys(actualizaciones).length > 0) {
      // Realizar las actualizaciones en la base de datos
      await usuarioService.actualizarUsuario({ _id: userId }, actualizaciones);
    }
    // Vuelve a obtener el usuario actualizado después de las actualizaciones
    const updatedUser = await usuarioService.obtenerUsuarioPorId(userId);

    res.sendSuccessWithPayload(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendInternalError("Internal error");
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    //obtengo el id del usuario
    const userId = req.params.uid;
    // con el userId obtengo el usuario
    const alumno = await usuarioService.obtenerUsuarioPorId(userId);

    // Verificar si el usuario está asociado a alguna comisión
    if (alumno.comisiones && alumno.comisiones.length > 0) {
      // El usuario está asociado a comisiones

      // Iterar sobre cada comisión del usuario y realizar las operaciones necesarias
      await Promise.all(
        alumno.comisiones.map(async (comisionId) => {
          // Obtener la comisión
          const comision = await comisionService.obtenerComisionPor(comisionId);

          // Buscar el índice del alumno en el array de la comisión
          const alumnoIndex = comision.alumnos.findIndex(
            (alumno) => alumno.alumno._id.toString() === userId
          );

          // Eliminar al alumno del array de alumnos de la comisión
          if (alumnoIndex !== -1) {
            comision.alumnos.splice(alumnoIndex, 1);
            // Actualizar la comisión en la base de datos
            await comisionService.actualizarComision(comisionId, comision);
          }
        })
      );
    }

    // Eliminar al usuario
    await usuarioService.eliminarUsuario({ _id: userId });

    res.sendSuccess("Usuario eliminado");
  } catch (error) {
    res.sendInternalError(
      "Error al eliminar el usuario, póngase en contacto con el administrador"
    );
  }
};

export default {
  createPreference,
  obtenerUsuarios,
  guardarUsuario,
  editarUsuario,
  editarImagen,
  eliminarUsuario,
  adminEditarImagen,
  adminEditarUsuario,
};
