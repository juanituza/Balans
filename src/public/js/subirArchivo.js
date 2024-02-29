document.addEventListener("DOMContentLoaded", async function () {
  const btnSubirArchivo = document.getElementById("btnSubirArchivo");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  const cid = obtenerIdDeLaRutaActual();

  btnSubirArchivo.addEventListener("click", async function () {
    fileInput.click(); // Activa el input de tipo archivo al hacer clic en el botón
  });

  // Maneja el cambio en el input de tipo archivo para subir archivos
  fileInput.addEventListener("change", async function () {
    const archivos = fileInput.files;

    if (archivos.length > 0) {
      const formData = new FormData();
      formData.append("documentos", archivos[0]);

      try {
        // Realiza la solicitud de carga de archivos al servidor
        const response = await fetch(`/api/comision/${cid}`, {
          method: "POST",
          body: formData,
          headers: {
            // No es necesario especificar "Content-Type" aquí, FormData se encarga de eso automáticamente
          },
        });

        console.log(response);

        if (!response.ok) {
          // Maneja el caso en el que la respuesta no sea exitosa
          throw new Error(
            `Error de red o servidor: ${response.status} ${response.statusText}`
          );
        }

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.status === "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Archivo subido",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.replace("/admin/detalleComision/" + cid);
          });
        } else {
          // Antes de mostrar SweetAlert, ajusta su z-index
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseData.error || "Error desconocido en el servidor",
          });
        }
      } catch (error) {
        console.error(error);
        // Puedes agregar un manejo de errores más específico aquí
      }
    }
  });
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
