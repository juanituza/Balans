export default class CursoRepositorio {
  constructor(dao) {
    this.dao = dao;
  }

  obtenerCurso = () => {
    return this.dao.obtenerCurso();
  };
  obtenerCursoPorId = (id) => {
    return this.dao.obtenerCursoPorId(id);
  };
  obtenerCursoPor = (params) => {
    return this.dao.obtenerCursoPor(params);
  };
  crearCurso = (user) => {
    return this.dao.crearCurso(user);
  };
  actualizarCurso = (id, consulta) => {
    return this.dao.actualizarCurso(id, consulta);
  };
  eliminarCurso = (id) => {
    return this.dao.eliminarCurso(id);
  };
}
