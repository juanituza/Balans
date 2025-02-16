// document.addEventListener("DOMContentLoaded", function () {
//   const deleteUser = document.getElementsByClassName("deleteUser");
//   Array.from(deleteUser).forEach((button) => {
//     button.addEventListener("click", async (event) => {
//       const usuarioId = event.target.id;

//       const data = { usuarioId: usuarioId };

//       const response = await fetch("/api/usuarios/" + usuarioId, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const responseData = await response.json();
//       if (responseData.status === "success") {
//         Swal.fire({
//           title: "¿Seguro que desas eliminar el usuario?",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "¡Sí, ELIMINAR!",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             Swal.fire(
//               "¡Eliminado con éxito!",
//               "¡El usuario ha sido eliminado con éxito!",
//               "success"
//             ).then(() => {
//               window.location.replace("/admin/user");
//             });
//           }
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Error al eliminar el usuario, pongase en contacto con el administrador!",
//           footer: '<a href="#">Why do I have this issue?</a>',
//         });
//       }
//     });
//   });
// });



document.addEventListener("DOMContentLoaded", function () {
  const deleteUser = document.getElementsByClassName("deleteUser");
  Array.from(deleteUser).forEach((button) => {
    button.addEventListener("click", async (event) => {
      const usuarioId = event.target.id;

      const data = { usuarioId: usuarioId };

      const response = await fetch("/api/usuarios/" + usuarioId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      try {
        const responseData = await response.json();
        if (responseData.status === "success") {
          Swal.fire({
            title: "¿Seguro que deseas eliminar el usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, ELIMINAR!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "¡Eliminado con éxito!",
                "¡El usuario ha sido eliminado con éxito!",
                "success"
              ).then(() => {
                window.location.replace("/admin/user");
              });
            } else {
              console.log("Se ha cancelado la eliminación del usuario.");
            }
          });
        } else {
          console.error("Error al eliminar el usuario:", responseData.error);
        }
      } catch (error) {
        console.error("Error al procesar la respuesta:", error);
      }
    });
  });
});
