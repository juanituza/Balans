jQuery(document).ready(function ($) {
  new DataTable("#miTablaC", {
    stateSave: true,
    columnDefs: [
      { width: "5%", targets: 0 }, // Ajusta el ancho de la primera columna (Número)
      { width: "5%", targets: 1 }, // Ajusta el ancho de la segunda columna (Curso)
      { width: "25%", targets: 2 }, // Ajusta el ancho de la tercera columna (Alumnos)
      { width: "40%", targets: 3 }, // Ajusta el ancho de la cuarta columna (Acciones)
      { width: "25%", targets: 4 }, // Ajusta el ancho de la cuarta columna (Acciones)
    ],
  });
  // $("#miTabla").DataTable();
});
