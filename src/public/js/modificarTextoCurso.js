

document
  .getElementById("modifyButton")
  .addEventListener("click", async function () {
    try {
      // Obtiene el contenido del editor TinyMCE
      const cursoId = this.getAttribute("data-curso-id");

      
      const nombreInput = document.querySelector("input[name='nombre']").value;
      
      const textoInput = tinymce.get("editor").getContent();
      const precioInput = document.querySelector("input[name='precio']");
     
      // Obtén el valor numérico sin el símbolo '$'
    let precioValue = parseFloat(
      precioInput.value.replace("$", "").replace(".", "")
    );



      const data = {
        nombre: nombreInput,
        texto: textoInput,
        precio: precioValue,
      };

      // Envía el contenido del editor al servidor
      const response = await fetch("/api/curso/editarCurso/" + cursoId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status === "success") {
        Swal.fire({
          title: "¡Cambio exitoso!",
          text: "Su información se editó con éxito!",
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
