export default class UserDTO {
  constructor(usuario) {
    this.name = usuario.name;
    this.email = usuario.email;
    this._id = usuario._id;
    this.role = usuario.role;
    this.status = usuario.status;
  }
}
