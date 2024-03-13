document.addEventListener("DOMContentLoaded", async function () {
  // Agrega un evento de clic a todos los íconos de papelera
  const trashIcons = document.querySelectorAll(".fa-trash-can");
  trashIcons.forEach((icon) => {
    icon.addEventListener("click", async function () {
      const documentId = this.dataset.documentId;
      const cid = this.dataset.cid; 
      console.log(cid);
      console.log(documentId);

      // Envía una solicitud DELETE al servidor
      try{

          const response = await fetch(
            `/api/comision/documento/${cid}/${documentId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                // Puedes agregar encabezados adicionales si es necesario
              },
              // body: Puedes enviar un cuerpo de solicitud si es necesario
            }
          );

      const responseData = await response.json();

      if (responseData.status === "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Archivo eliminado",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.replace("/admin/detalleComision/" + cid);
          });
        } else {
          // Antes de mostrar SweetAlert, ajusta su z-index
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseData.error || "Error desconocido en el servidor",
          });
        }
        // .then((response) => {
            //   if (response.ok) {
                //     console.log("Documento eliminado correctamente");
                //     // Puedes actualizar la interfaz de usuario o realizar otras acciones necesarias
                //   } else {
                    //     console.error("Error al eliminar el documento");
                    //   }
                    // })
        }
        catch(error) {
          console.error(`Error de red: ${error}`);
        };
    });
  });
});
