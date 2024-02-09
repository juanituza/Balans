// Función para enviar el formulario de texto
async function enviarInputFormulario() {
  const inputForm = document.getElementById("inputForm");
  const formData = new FormData(inputForm);

  try {
    const response = await fetch("/api/consulta/editarConsulta", {
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
            "Tu información se editó con éxito! Debe volver a loguearse para ver los cambios",
            "success"
          ).then(() => {
            window.location.replace("/adminConsultas");
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
