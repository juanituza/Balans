jQuery(document).ready(function ($) {
  new DataTable("#miTabla", {
    stateSave: true,
    responsive: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json", // URL del archivo de idioma español
    },
  });
  // $("#miTabla").DataTable();
});
