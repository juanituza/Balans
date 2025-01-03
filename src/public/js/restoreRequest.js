const form = document.getElementById("restoreRequestForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch("/api/session/restoreRequest", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  if (responseData.status === "success") {
    Swal.fire("Se envió el mail exitosamente");
    //   window.location.replace('/products');
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: responseData.error,
    });
  }
});
