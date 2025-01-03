function formatDate(fecha) {
  const date = new Date(fecha);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("es-ES", options);
}
