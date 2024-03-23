const form = document.getElementById("crearForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);
  const response = await fetch("/api/comision/", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
 
  const responseData = await response.json();
  if (responseData.status === "success") {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Comisión generada con éxito",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
    window.location.replace("/admin/comisiones");
      
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: responseData.error,
    });
  }
});
