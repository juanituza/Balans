import { usuarioService } from "../services/repositorios/index.js";
import usuariosDTO from "../dto/usuarioDTO.js"

const obtenerUsuarios = async (req, res) => {
  const users = await usuarioService.obtenerUsuarios();
  res.sendSuccessWithPayload(users);

}

const guardarUsuario = async (req, res) => {
  try {
    
        // Get the paths of the uploaded files
        const imagenRuta = req.files.map(
          (file) => `/uploads/perfil/${file.filename}`
        );
    const {
      nombre,
      apellido,
      email,
      password,
      nacimiento,
      telefono,
    } = req.body;
    if (!nombre || !apellido || !email || !password || !telefono)
      return res
        .status(400)
        .send({ status: "error", payload: "Incomplete value" });

    const user = { nombre, apellido, email, password, nacimiento,imagen : [imagenRuta], telefono };

    const result = await usersService.createUser(user);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    res.sendInternalError("Internal error");
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
  eliminarUsuario,
};