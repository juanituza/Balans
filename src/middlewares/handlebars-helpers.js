export function ifRoleAdmin(userRole, options) {
  if (userRole === "ADMIN") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
export function ifRoleIsUser(userRole, options) {
  if (userRole === "alumno") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
// Definición simplificada del helper `eq` para uso sin bloques
