import {
  usuarioService,
  comisionService,
} from "../services/repositorios/index.js";
import __dirname from "../utils.js";
import usuariosDTO from "../dto/usuarioDTO.js";

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

const eliminarUsuario = async (req, res) => {
  try {
    //obtengo el id del usuario
    const userId = req.params.uid;    
    // con el userId obtengo el usuario
    const alumno = await usuarioService.obtenerUsuarioPorId(userId);
    // si el usuario está en una comision, obtengo el id de la comision
    const comisionId = alumno.comision;
    if (comisionId === undefined) {
      //elimino el usuario por completo
      await usuarioService.eliminarUsuario({ _id: userId });
    } else {
      // obtengo todos los datos de la comision
      const comision = await comisionService.obtenerComisionPor(comisionId);
      // busco la ubicacion del alumno en el array
      const alumnoIndex = comision.alumnos.findIndex(
        (p) => p.alumno._id.toString() === userId
      );
      //Elimino el alumno del array
      comision.alumnos.splice(alumnoIndex, 1);
      //Guardo la comision editada
      await comisionService.actualizarComision(comisionId, comision);
      //elimino el usuario por completo
      await usuarioService.eliminarUsuario({ _id: userId });
    }
    res.sendSuccess("Usuario eliminado");
  } catch (error) {
    res.sendInternalError(
      "Error al eliminar el usuario, pongase en contacto con el administrador"
    );
  }
};

export default {
  obtenerUsuarios,
  guardarUsuario,
  editarUsuario,
  editarImagen,
  eliminarUsuario,
};
