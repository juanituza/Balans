export function ifRoleAdmin(userRole, options) {
  if (userRole === "ADMIN") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
