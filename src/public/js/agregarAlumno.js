// $(document).ready(function () {
//   // ...

//   // Agregar evento de clic a las filas de la tabla dentro del modal
//   $("#listadoUsuariosModal table tbody tr").click(function () {
//     // Obtener el ID del alumno seleccionado y otros datos relevantes
//     const alumnoId = $(this).data("alumno-id");

//     // Obtener el ID de la comisión de la URL
//     const comisionId = obtenerIdDeLaRutaActual();

//     // Ejemplo: Log al ID del alumno seleccionado
//     console.log("Alumno seleccionado:", alumnoId);
//     console.log("Comisión seleccionada:", comisionId);

//     // Realizar una solicitud para agregar el alumno a la comisión
//     $.ajax({
//       type: "POST",
//       url: "/api/comision/" + comisionId + "/" + alumnoId, // Reemplaza con la ruta real del servidor
//       data: {
//         comisionId: comisionId,
//         alumnoId: alumnoId,
//       },
//       success: function (response) {
//         console.log("Alumno agregado con éxito a la comisión:", response);

//         // Puedes realizar acciones adicionales aquí, como actualizar la interfaz de usuario, etc.

//         // Cerrar el modal después de seleccionar el alumno
//         $("#listadoUsuariosModal").modal("hide");
//       },
//       error: function (error) {
//         console.error("Error al agregar alumno a la comisión:", error);
//         // Manejo de errores, si es necesario
//       },
//     });
//   });

//   // Agregar evento de clic a la columna que contiene el ícono "plus"
//   $(".agregar-alumno-column").click(function () {
//     // Acciones que deseas realizar al hacer clic en la columna
//     console.log("Clic en la columna Agregar Alumno");
//   });

//   // ...
// });

$("#listadoUsuariosModal table tbody tr").click(async function () {
  // Obtener el ID del alumno seleccionado y otros datos relevantes
  const alumnoId = $(this).data("alumno-id");
  const comisionId = obtenerIdDeLaRutaActual(); // Reemplaza con el ID real de la comisión

  try {
    // Realizar solicitud con fetch
    const response = await fetch(`/api/comision/${comisionId}/${alumnoId}`, {
      method: "POST", // o 'PUT' según tu lógica de servidor
      headers: {
        "Content-Type": "application/json",
      },
      // body: ... // si necesitas enviar datos en el cuerpo de la solicitud
    });

    const responseData = await response.json();

    if (responseData.status === "success") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Alumno agregado",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.replace("/admin/detalleComision/" + comisionId);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.error,
      });
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    // Manejar errores aquí
  }
});

// Aquí puedes realizar acciones adicionales según la respuesta del servidor

function obtenerIdDeLaRutaActual() {
  // Obtener la ruta actual desde la ventana
  const rutaActual = window.location.pathname;

  // Dividir la ruta en partes usando "/"
  const partesDeLaRuta = rutaActual.split("/");

  // El ID de la comisión debería estar en la última parte de la ruta
  const comisionId = partesDeLaRuta[partesDeLaRuta.length - 1];

  return comisionId;
}
