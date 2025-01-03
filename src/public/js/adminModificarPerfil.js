// Función para enviar el formulario de texto
async function enviarInputFormulario() {
  const inputForm = document.getElementById("inputForm");
  // Verificar si window y window.location están disponibles
  if (
    typeof window !== "undefined" &&
    window.location &&
    window.location.pathname
  ) {
    const pathParts = window.location.pathname.split("/");

    // Verificar si se obtuvo una ruta válida
    if (pathParts && pathParts.length > 0) {
      const usuarioId = pathParts[pathParts.length - 1];
      

      const formData = new FormData(inputForm);

      try {
        const response = await fetch(
          "/api/usuarios/adminEditarUsuario/" + usuarioId,
          {
            method: "PUT",
            body: formData,
          }
        );

        const responseData = await response.json();

        if (responseData.status === "success") {
          Swal.fire({
            title: "Seguro que deseas editar la información?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si! cambiar mi información",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "¡Cambio exitoso!",
                "Su información se editó con éxito! Debe volver a loguearse para ver los cambios",
                "success"
              ).then(() => {
                window.location.replace("/admin/user");
              });
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseData.error,
          });
        }
      } catch (error) {
        console.error("Error al enviar formulario de texto:", error);
      }
    } else {
      console.error("La ruta no tiene el formato esperado.");
    }
  } else {
    console.error("No se pudo obtener la información de la ruta.");
  }
}
