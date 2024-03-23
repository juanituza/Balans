import usuarioModel from "../models/usuarios.js";

export default class UsersManager {
  obtenerUsuarios = async () => {
    return await usuarioModel.find().lean();
  };
  obtenerUsuarioPorId = (id) => {
    return usuarioModel.findById(id);
  };
  obtenerUsuarioPor = async (params) => {
    return await usuarioModel.findOne(params).lean();
  };
  crearUsuario = async (user) => {
    return await usuarioModel.create(user);
  };
  actualizarUsuario = async (email, password) => {
    return await usuarioModel.updateOne(email, { $set: password });
  };
  actualizarUsuarioPorId = async (userId, data) => {
    return await usuarioModel.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    );
  };
  obtenerUsuariosPorComision = async (comisionId) => {
    return await usuarioModel.find({ 'comisiones.comision':comisionId}).lean();
  };

  eliminarUsuario = async (id) => {
    return await usuarioModel.findByIdAndDelete(id);
  };
}
