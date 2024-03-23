// document
//   .getElementById("modifyButton")
//   .addEventListener("click", async function () {
//     try {
//       // Obtiene el contenido del editor Quill
//       const cursoId = this.getAttribute("data-curso-id");
//       const texto = document.querySelector(".ql-editor").innerHTML;

//       // Envía el contenido del editor al servidor
//       const response = await fetch("/api/curso/editarCurso/" + cursoId, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ texto: texto }),
//       });

//       const responseData = await response.json();

//       if (responseData.status === "success") {
//         Swal.fire({
//           title: "¡Cambio exitoso!",
//           text: "Su información se editó con éxito!",
//           icon: 'success',
//           showCancelButton: false,
//           confirmButtonText: 'OK',
//       }).then((result) => {
//             if (result.isConfirmed) {
//                 window.location.replace("/admin/cursos");
//             }
//         });
//       }else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: responseData.error,
//         });
//       }
//     } catch (error) {
//       console.error("Error al enviar formulario de texto:", error);
//     }
//   });

document
  .getElementById("modifyButton")
  .addEventListener("click", async function () {
    try {
      // Obtiene el contenido del editor TinyMCE
      const cursoId = this.getAttribute("data-curso-id");
      const texto = tinymce.get("editor").getContent();

      // Envía el contenido del editor al servidor
      const response = await fetch("/api/curso/editarCurso/" + cursoId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto: texto }),
      });

      const responseData = await response.json();

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
