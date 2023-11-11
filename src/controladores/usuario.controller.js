import { usuarioService } from "../services/repositorios/index.js";
import __dirname from "../utils.js";
import usuariosDTO from "../dto/usuarioDTO.js";

const obtenerUsuarios = async (req, res) => {
  const users = await usuarioService.obtenerUsuarios();
  res.sendSuccessWithPayload(users);
};

const guardarUsuario = async (req, res) => {
  try {
    const imagenRuta = req.files.map((file) => `/uploads/perfil/${file.filename}`);
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
      if (!user.nombre || !user.apellido || !user.email || !user.password || !user.telefono || !user.imagen)
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
  console.log(imagePath);
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


const eliminarUsuario = async (req, res) => {
  const userId = req.params.uid;
  await usersService.deleteUser({ _id: userId });
  res.sendSuccess("User removed");
};

export default {
  obtenerUsuarios,
  guardarUsuario,
  editarImagen,
  eliminarUsuario,
};
