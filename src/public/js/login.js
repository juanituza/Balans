const form = document.getElementById("loginForm")


// console.log(document.cookie);
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    const response = await fetch("/api/session/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });


    const responseData = await response.json();
    if (responseData.status === "success"){
        Swal.fire({
            title: 'Inicio de sesión exitoso!',
            text: 'Será redirigido al inicio',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace('/nosotros');
            }
        });
    }else{
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Credenciales incorrectas",
        })
    }
    
})

