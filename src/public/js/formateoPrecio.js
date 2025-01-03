

    document.addEventListener("DOMContentLoaded", function () {
        const precioInput = document.querySelector("input[name='precio']");
        
        // Función para formatear el valor del campo de entrada
        function formatearPrecio(valor) {
            // Elimina cualquier caracter que no sea un dígito o un punto
            let input = valor.replace(/[^\d.]/g, '');
            
            // Divide el valor en partes antes y después del punto decimal
            let partes = input.split('.');
            
            // Formatea la parte entera añadiendo un punto cada tres dígitos
            partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            
            // Devuelve el valor formateado con el signo "$"
            return '$' + partes.join('.');
        }
        
        // Formatear el valor inicial del campo de entrada
        precioInput.value = formatearPrecio(precioInput.value);
    });
