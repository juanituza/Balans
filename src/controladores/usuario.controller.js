import { usuarioService } from "../services/repositorios/index.js";
import usuariosDTO from "../dto/usuarioDTO.js"

const obtenerUsuarios = async (req, res) => {
  const users = await usuarioService.obtenerUsuarios();
  res.sendSuccessWithPayload(users);

}

const guardarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono } =
      req.body;
    if (!nombre || !apellido || !email || !password  || !telefono)
      return res
        .status(400)
        .send({ status: "error", payload: "Incomplete value" });

    const user = new usuariosDTO();
    

    const result = await usersService.createUser(user);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};


export default {
  obtenerUsuarios,
  guardarUsuario,
};