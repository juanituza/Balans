document.addEventListener("DOMContentLoaded", function () {
  const deleteUser = document.getElementsByClassName("eliminarComision");
  Array.from(deleteUser).forEach((button) => {
    button.addEventListener("click", async (event) => {
      const comisionId = event.target.id;
      

      const data = { comisionId: comisionId };
  

      const response = await fetch("/api/comision/" + comisionId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
         
            Swal.fire(
              "¡Eliminado con éxito!",
              "¡La comision fue eliminada!",
              "success"
            ).then(() => {
              window.location.replace("/admin/comisiones");
            });
          
        
      } else {
        console.error("Failed removed consulta.");
      }
    });
  });
});
