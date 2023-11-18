// Función para enviar el formulario de texto
async function enviarInputFormulario() {
  const inputForm = document.getElementById("inputForm");
  const formData = new FormData(inputForm);

  try {
    const response = await fetch("/api/usuarios/editarUsuario", {
      method: "PUT",
      body: formData,
    });

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
            "Tu información se editó con éxito!",
            "success"
          ).then(() => {
            window.location.replace("/perfil");
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
}

// Lógica original para el formulario de imagen
const imagenForm = document.getElementById("imagenForm");

imagenForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(imagenForm);

  try {
    const response = await fetch("/api/usuarios/editarImagen", {
      method: "PUT",
      body: formData,
    });

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
            window.location.replace("/perfil");
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
