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

    // Agregar filtrado de columnas con icono de búsqueda y botón de limpiar filtros
    $("#miTabla thead tr th").each(function () {
      var title = $(this).text();
      var columnIndex = table.column($(this).index()).index();

      // Agregar evento clic al icono para abrir modal de búsqueda
      $(this).html('<div class="filter-container"><i class="fas fa-filter"></i>' + title + '<button class="open-modal btn btn-primary btn-sm">Buscar</button><button class="clear-filter btn btn-danger btn-sm">Limpiar</button></div>');

      // Agregar evento clic al botón para abrir modal de búsqueda
      $(".open-modal", this).on("click", function (e) {
        e.stopPropagation(); // Evitar que se propague el evento clic al encabezado
        $("#busquedaModal").modal("show");
      });

      // Agregar evento clic al botón para limpiar el filtro
      $(".clear-filter", this).on("click", function (e) {
        e.stopPropagation(); // Evitar que se propague el evento clic al encabezado
        table.column(columnIndex).search('').draw();
      });
    });

    // Evento clic al botón de búsqueda en el modal
    $("#buscarBtn").on("click", function () {
      var filterValue = $("#filtroInput").val();
      var columnIndex = $("#busquedaModal").data("columnIndex");

      // Aplicar el filtrado de la columna seleccionada
      if (filterValue.trim() !== "") {
        table.column(columnIndex).search(filterValue).draw();
      }

      // Cerrar el modal
      $("#busquedaModal").modal("hide");
    });

    // Evento mostrado del modal para almacenar el índice de la columna
    $("#busquedaModal").on("shown.bs.modal", function (e) {
      var columnIndex = table.column($(e.relatedTarget).closest("th")).index();
      $(this).data("columnIndex", columnIndex);
      $("#filtroInput").val(""); // Limpiar el campo de entrada al mostrar el modal
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
  });
</script>






