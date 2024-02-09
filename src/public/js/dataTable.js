// jQuery(document).ready(function ($) {
//   new DataTable("#miTabla", {
//     stateSave: true,
//   });
//   // $("#miTabla").DataTable();
// });

  // $(document).ready(function () {
  //   var table = $("#miTabla").DataTable({
  //     stateSave: true,
  //   });

  //   // Agregar filtrado de columnas
  //   $("#miTabla thead tr th").each(function () {
  //     var title = $(this).text();
  //     $(this).html('<i class="fa-solid fa-filter"></i>' + title);
  //   });

  //   // Aplicar el filtrado de columnas
  //   table.columns().every(function () {
  //     var that = this;

  //     $("input", this.header()).on("keyup change", function () {
  //       if (that.search() !== this.value) {
  //         that.search(this.value).draw();
  //       }
  //     });
  //   });
  // });

$(document).ready(function () {
  var table = $("#miTabla").DataTable({
    stateSave: true,
  });

  // Agregar evento clic al icono para abrir modal de búsqueda
  $("#miTabla thead tr th").append('<i class="fas fa-filter open-modal"></i>');

  $(".open-modal").on("click", function (e) {
    e.stopPropagation(); // Evitar que se propague el evento clic al encabezado
    var columnIndex = $(this).closest("th").index();
    $("#busquedaModal").data("columnIndex", columnIndex);
    $("#busquedaModal").modal("show");
  });

  // Evento clic al botón de búsqueda en el modal
  $("#buscarBtn").on("click", function () {
    var filterValue = $("#filtroInput").val();
    var columnIndex = $("#busquedaModal").data("columnIndex");

    // Aplicar el filtrado de la columna seleccionada
    if (filterValue.trim() !== "") {
      table.column(columnIndex).search("^" + filterValue, true, false).draw();
    }

    // Cerrar el modal
    $("#busquedaModal").modal("hide");
  });

  // Evento clic al botón de limpiar en el modal
  $("#limpiarBtn").on("click", function () {
    $("#filtroInput").val(""); // Limpiar el campo de entrada
    var columnIndex = $("#busquedaModal").data("columnIndex");

    // Limpiar el filtrado de la columna seleccionada
    table.column(columnIndex).search("").draw();

    // Cerrar el modal
    $("#busquedaModal").modal("hide");
  });

  // Aplicar el filtrado de columnas mediante input
  table.columns().every(function () {
    var that = this;

    $("input", this.header()).on("keyup change", function () {
      if (that.search() !== this.value) {
        that.search(this.value).draw();
      }
    });
  });

  $("#cerrarModalBtn").on("click", function () {
    $("#busquedaModal").modal("hide");
  });
});


   
  







