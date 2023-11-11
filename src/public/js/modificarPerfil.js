// const imagenForm = document.getElementById("imagenForm");

// imagenForm.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const imagenSelect = document.getElementById("fileInput");
//   const selectedImagen = imagenSelect.value;

//   const response = await fetch("/api/usuarios/editarUsuario", {
//     method: "PUT",
//     body: JSON.stringify({ imagen: selectedImagen }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const responseData = await response.json();

//   if (responseData.status === "success") {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, change my role!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire(
//           "Changed!",
//           "Your role was successfully changed!",
//           "success"
//         ).then(() => {
//           window.location.replace("/perfil");
//         });
//       }
//     });
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: responseData.error,
//     });
//   }
// });


const imagenForm = document.getElementById("imagenForm");

imagenForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  
  const formData = new FormData(imagenForm);

  const response = await fetch("/api/usuarios/editarUsuario", {
    method: "PUT",
    body: formData,
  });

  const responseData = await response.json();

  if (responseData.status === "success") {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change my role!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Changed!",
          "Your role was successfully changed!",
          "success"
        ).then(() => {
          window.location.replace("/perfil");
        });
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: responseData.error,
    });
  }
});
