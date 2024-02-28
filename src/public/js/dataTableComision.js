jQuery(document).ready(function ($) {
  new DataTable("#miTablaC", {
    stateSave: true,
    columnDefs: [
      { width: "20%", targets: 0 }, // Ajusta el ancho de la primera columna (Número)
      { width: "20%", targets: 1 }, // Ajusta el ancho de la segunda columna (Curso)
      { width: "30%", targets: 2 }, // Ajusta el ancho de la tercera columna (Alumnos)
      { width: "15%", targets: 3 }, // Ajusta el ancho de la cuarta columna (Acciones)
    ],
  });
  // $("#miTabla").DataTable();
});
