export default class UserDTO {
  constructor(usuario) {
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this._id = usuario._id;
    this.telefono = usuario.telefono;
    this.nacimiento = usuario.nacimiento;
    this.role = usuario.role;
  }
}
