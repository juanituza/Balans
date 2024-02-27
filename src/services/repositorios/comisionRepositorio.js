export default class ComisionRepositorio {
  constructor(dao) {
    this.dao = dao;
  }

  obtenerComision = () => {
    return this.dao.obtenerComision();
  };
  obtenerComisionPorId = (id) => {
    return this.dao.obtenerComisionPorId(id);
  };
  obtenerComisionPor = (params) => {
    return this.dao.obtenerComisionPor(params);
  };
  crearComision = (user) => {
    return this.dao.crearComision(user);
  };
  actualizarComision = (id, consulta) => {
    return this.dao.actualizarComision(id, consulta);
  };
  eliminarComision = (id) => {
    return this.dao.eliminarComision(id);
  };
}
