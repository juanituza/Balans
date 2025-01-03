class ComisionDTO {
  constructor({ numero, curso, alumnos, fecha_creacion, fecha_modificacion }) {
    this.numero = numero;
    this.curso = curso;
    this.alumnos = alumnos.map((alumno) => ({
      nombre: alumno.alumno.nombre,
      apellido: alumno.alumno.apellido,
      email: alumno.alumno.email,
    }));
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
  }
}

export default ComisionDTO;
