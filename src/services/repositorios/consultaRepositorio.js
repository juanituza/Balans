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
  actualizarConsulta = (id, consulta) => {
    return this.dao.actualizarConsulta(id, consulta);
  };
  eliminarConsulta = (id) => {
    return this.dao.eliminarConsulta(id);
  };
}
