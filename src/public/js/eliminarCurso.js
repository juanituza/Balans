document
  .getElementById("eliminarButton")
  .addEventListener("click", async function () {
    try {
      // Obtiene el contenido del editor TinyMCE
      const cursoId = this.getAttribute("data-curso-id");
        const data = { cursoId: cursoId };

      const response = await fetch(`/api/curso/eliminarCurso/${cursoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }

      let responseData;
      try {
        responseData = await response.json();

        if (responseData.status === "success") {
          Swal.fire({
            title: "¡Cambio exitoso!",
            text: "Su curso se elimino con éxito!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.replace("/admin/cursos");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseData.error,
          });
        }
      } catch (err) {
        throw new Error("La respuesta no es un JSON válido");
      }

      
      // const responseData = await response.json();
      // console.log(responseData);

      
    } catch (error) {
      console.error("Error al enviar formulario de texto:", error);
    }
  });
