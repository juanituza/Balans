// Obtener todos los botones de cambio de rol
const changeRolButtons = document.querySelectorAll(".changeEstado");

// Agregar manejadores de eventos a cada botón
changeRolButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    // Obtener el ID de usuario desde el atributo data
    const consultaId = event.target.dataset.consultaId;
    // Encontrar el select para el rol dentro del formulario del usuario
    const row = event.target.closest("tr");
    const estadoSeleccionado = row.querySelector(".estadoSeleccionado");
    // Obtener el rol seleccionado del elemento select
    const seleccionEstado = estadoSeleccionado.value;
    // Crear un objeto con el ID de usuario y el nuevo rol
    const data = { consultaId: consultaId, estado: seleccionEstado };
    console.log(data);
    // Enviar una solicitud PUT para actualizar el rol del usuario
    try {
      const response = await fetch("/api/consulta/" + data.consultaId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        Swal.fire({
          title: "¿Seguro que desas modificar el estado?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, modificar el estado!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "¡Modificado con éxito!",
              "¡El estado fue modificado!",
              "success"
            ).then(() => {
              window.location.replace("/admin/consultas");
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
      console.error("Error al actualizar el estado:", error);
    }
  });
});
