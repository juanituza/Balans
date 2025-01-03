// Lógica original para el formulario de imagen
const imagenForm = document.getElementById("imagenForm");

imagenForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Obtener el ID del alumno del atributo de datos del botón de enviar
  const usuarioId = event.target.querySelector("button[type=submit]").dataset
    .id;
  console.log(usuarioId);

  const formData = new FormData(imagenForm);

  try {
    const response = await fetch(
      "/api/usuarios/adminEditarImagen/" + usuarioId,
      {
        method: "PUT",
        body: formData,
      }
    );

    const responseData = await response.json();

    if (responseData.status === "success") {
      // Lógica de éxito para el formulario de imagen
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Tu imagen de perfil será editada",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, edita mi imagen!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "¡Cambio exitoso!",
            "Tu imagen de editó con éxito",
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
    console.error("Error al enviar formulario de imagen:", error);
  }
});
