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
      // Antes de mostrar SweetAlert, ajusta su z-index
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Alumno agregado",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "swal2-popup", // Clase específica para la ventana modal en SweetAlert 2
        },
        didOpen: function () {
          // Asegúrate de que SweetAlert esté por encima del modal
          $(".swal2-container").appendTo("body");
        },
      }).then(() => {
        window.location.replace("/admin/detalleComision/" + comisionId);
      });
    } else {
      // Antes de mostrar SweetAlert, ajusta su z-index
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.error,
        customClass: {
          popup: "swal2-popup", // Clase específica para la ventana modal en SweetAlert 2
        },
        didOpen: function () {
          // Asegúrate de que SweetAlert esté por encima del modal
          $(".swal2-container").appendTo("body");
        },
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
