document.addEventListener("DOMContentLoaded", function () {
  const deleteUser = document.getElementsByClassName("deleteUser");
  Array.from(deleteUser).forEach((button) => {
    button.addEventListener("click", async (event) => {
      const usuarioId = event.target.id;
      console.log(usuarioId);

      const data = { usuarioId: usuarioId };
      console.log(data);

      const response = await fetch("/api/usuarios/" + usuarioId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        Swal.fire({
          title: "¿Seguro que desas eliminar el usuario?",
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
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al eliminar el usuario, pongase en contacto con el administrador!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    });
  });
});
