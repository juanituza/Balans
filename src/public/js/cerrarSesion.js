

const logoutButton = document.getElementById("loguotButton");
if (logoutButton) {
// Agrega un event listener al botón de logout
logoutButton.addEventListener("click", async function () {
  // Realiza una petición POST al endpoint de logout
  const response = await fetch("/api/session/cerrarSesion", {
    method: "POST",
  });

  const responseData = await response.json();
  if (responseData.status === "success") {
    // Redirige a la página de inicio de sesión

    
    Swal.fire({
      title: "Se ha deslogueado correctamente",
      text: "Esperamos que nos visite proximamente",
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace("/login");
      }
    });
  }
});
}
