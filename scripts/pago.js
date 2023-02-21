//Registro las constantes que voy a traer del HTML

const nombreCard = document.getElementById("nombreDeTarjeta");
const numeroCard = document.getElementById("numeroDeTarjeta");
const codigoDeSeguridad = document.getElementById("codigoSeguridad");
const fechaCaducidad = document.getElementById("fecha-caducidad");
const email = document.getElementById("email");
const envio = document.getElementById("envio")
const formPago = document.getElementById("formPago");
const errorNombre = document.getElementById("errorNombre");
const errorTarjeta = document.getElementById("errorTarjeta");
const errorCodigo = document.getElementById("errorCodigo");
const errorFecha = document.getElementById("errorFecha");
const errorMail = document.getElementById("errormail");
const errorEnvio = document.getElementById("errorEnvio");
const botonSubmit = document.getElementById("botonSubmit");

//Armo la funcion para validar el formulario

botonSubmit.addEventListener("click", function (e){
    e.preventDefault();
    let nombre = nombreCard.value;
    let numeroTarjeta = numeroCard.value;
    let codigoDeSeguro = codigoDeSeguridad.value;
    let fechadeVencimiento = fechaCaducidad.value;
    let mail = email.value;
    let envioProductos = envio.value;

    (nombre === null || nombre === '') ? errorNombre.innerText = "Ingresa el nombre de la tarjeta" : false;
    (numeroTarjeta === null || numeroTarjeta === '') ? errorTarjeta.innerText = "Ingrese un número de tarjeta válido" : false;
    (codigoDeSeguro === null || codigoDeSeguro === '') ? errorCodigo.innerText = "Ingresa el código de seguridad de 3/4 dígitos" : false;
    (fechadeVencimiento === null || fechadeVencimiento === '') ? errorFecha.innerText = "Ingresa la fecha de vencimiento" : false;
    (mail === null || mail === '') ? errorMail.innerText = "Ingresa un mail valido para poder coordinar la entrega" : false;
    (envioProductos === null || envioProductos === '') ? errorEnvio.innerText = "Ingresa la dirección de envío para recibir tus productos" : false;

// Alerta de pago generado exitosamente y mandando al usuario al index cuando el formulario se valido
    setTimeout(() => {
      if (nombre != null && nombre != '' && numeroTarjeta != null && numeroTarjeta != '' && codigoDeSeguro != null && codigoDeSeguro != '' && fechadeVencimiento != null && fechadeVencimiento != '' && mail != null || mail != '' && envioProductos != null && envioProductos != '') {
        Swal.fire(
          {
            icon: 'success',
            title: 'Compra realizada con éxito!',
            text: 'Recibiras pronto un mail para saber el estado del envío de tu compra!',
            footer: '<a type="button" class="btn btn-secondary" href="index.html">OK</a>',
            showConfirmButton: false,
          })
    }}, 1000);
      localStorage.clear("carrito")
      // Muestro los datos ingresados en consola
      console.log("El nombre ingresado es " + nombre + ", con el numero de tarjeta " + numeroTarjeta + ", su fecha de vencimiento es " + fechadeVencimiento + " y la direccion de envio es " + envioProductos); 
    });

// Traigo del JSON el precio final a pagar para que el cliente confirme los datos del pago sabiendo el precio final de lo que eligio

const carrito = JSON.parse(localStorage.getItem('carrito'))
const sumaPrecios = carrito.reduce((acc, el)=>acc + el.precio, 0);
const precioConIva = sumaPrecios * 1.21;

const precioFormulario = document.getElementById("precio-form")
precioFormulario.innerText = 'El precio final a pagar es $' + precioConIva;


