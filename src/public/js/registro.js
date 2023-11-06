const form = document.getElementById("registroForm");


form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const data = new FormData(form);
    const obj={};
    data.forEach((value,key)=>obj[key] = value);

    const response = await fetch("/api/session/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json()
    if (responseData.status === "success") {
      Swal.fire({
        title: "Registro con éxito!!",
        text: "Serás redirigido para iniciar sesión",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/login");
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