const form = document.getElementById("crearCurso");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);
  const response = await fetch("/api/curso/CrearCurso", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  if (responseData.status === "success") {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Curso generado con éxito",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.replace("/admin/cursos");
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: responseData.error,
    });
  }
});
