document.addEventListener("DOMContentLoaded", function () {
  const deleteUser = document.getElementsByClassName("eliminarConsulta");
  Array.from(deleteUser).forEach((button) => {
    button.addEventListener("click", async (event) => {
      const consultaId = event.target.id;

      const data = { consultaId: consultaId };   

      const response = await fetch("/api/consulta/" + consultaId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        Swal.fire({
          title: "¿Seguro que desas eliminar la consulta?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, ELIMINAR!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "¡Eliminado con éxito!",
              "¡La consulta fue eliminada!",
              "success"
            ).then(() => {
              window.location.replace("/admin/consultas");
            });
          }
        });
      } else {
        console.error("Failed removed user.");
      }
    });
  });
});
