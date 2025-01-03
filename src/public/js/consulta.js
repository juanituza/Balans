const form = document.getElementById("consultaForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
 
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
 

  const response = await fetch("/api/consulta", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

    

    const response = await fetch('/api/consulta',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    console.log(response);
    const responseData = await response.json()
    if (responseData.status === "success") {
      Swal.fire({
        title: "Consulta enviada!",
        text: "Nos pondremos en contacto a la brevedad",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.error,
      });
    }
   
})
