document.addEventListener("DOMContentLoaded", function () {
  const deleteUser = document.getElementsByClassName("eliminarComision");
  Array.from(deleteUser).forEach((button) => {
    button.addEventListener("click", async (event) => {
      const comisionId = event.target.id;
      console.log(comisionId);

      const data = { comisionId: comisionId };
      console.log(data);

      const response = await fetch("/api/comision/" + comisionId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        Swal.fire({
          title: "¿Seguro que desas eliminar la comision?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, ELIMINAR!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "¡Eliminado con éxito!",
              "¡La comision fue eliminada!",
              "success"
            ).then(() => {
              window.location.replace("/admin/comisiones");
            });
          }
        });
      } else {
        console.error("Failed removed consulta.");
      }
    });
  });
});
