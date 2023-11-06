// Obtén la fecha actual en el formato deseado (AAAA-MM-DD)
const today = new Date().toISOString().split("T")[0];

// Establece la fecha actual como el valor máximo para el campo de fecha
document.getElementById("nacimiento").setAttribute("max", today);
