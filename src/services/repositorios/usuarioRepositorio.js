export default class UsuarioRepositorio {
  constructor(dao) {
    this.dao = dao;
  }

  obtenerUsuarios = () => {
    return this.dao.obtenerUsuarios();
  };
  obtenerUsuarioPorId = (id) => {
    return this.dao.obtenerUsuarioPorId(id);
  };
  obtenerUsuarioPor = (params) => {
    return this.dao.obtenerUsuarioPor(params);
  };
  crearUsuario = (user) => {
    return this.dao.crearUsuario(user);
  };
  actualizarUsuario = (email, password) => {
    return this.dao.actualizarUsuario(email, password);
  };
  eliminarUsuario = (id) => {
    return this.dao.eliminarUsuario(id);
  };
}
