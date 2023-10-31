export default class ConsultaRepositorio {
  constructor(dao) {
    this.dao = dao;
  }

  obtenerConsultas = () => {
    return this.dao.obtenerConsultas();
  };
  obtenerConsultaPorId = (id) => {
    return this.dao.obtenerConsultaPorId(id);
  };
  obtenerConsultaPor = (params) => {
    return this.dao.obtenerConsultaPor(params);
  };
  crearConsulta = (user) => {
    return this.dao.crearConsulta(user);
  };
  actualizarConsulta = (email, password) => {
    return this.dao.actualizarConsulta(email, password);
  };
  eliminarConsulta = (id) => {
    return this.dao.eliminarConsulta(id);
  };
}
