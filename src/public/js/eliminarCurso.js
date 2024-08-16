document
  .getElementById("eliminarButton")
  .addEventListener("click", async function () {
    try {
      // Obtiene el contenido del editor TinyMCE
      const cursoId = this.getAttribute("data-curso-id");
      console.log(cursoId);
      

      

      // const data = {

      //   nombre: nombreInput,
      //   texto: textoInput,
      //   precio: precioValue,
      //   imagen: imagenInput,
      // };

      // // Envía el contenido del editor al servidor
      // const response = await fetch("/api/curso/editarCurso/" + cursoId, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      

      const response = await fetch(`/api/curso/eliminarCurso/${cursoId}`, {
        method: "DELETE",
        
      });

      const responseData = await response.json();
      console.log(responseData);

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
    } catch (error) {
      console.error("Error al enviar formulario de texto:", error);
    }
  });
