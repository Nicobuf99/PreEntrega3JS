// Elementos traidos del HTML

const mainHtml = document.getElementById('main-productos');
const contadorCarrito = document.getElementById("contador-carrito");
const contenidoCarrito = document.getElementById("contenido-carrito");
const precioTotalAPagar = document.getElementById("precio-total-productos");
const irAPagar = document.getElementById("ir-a-pagar");
const vaciarCarrito = document.getElementById("boton-vaciarcarrito");


// Lista de Productos

const listaProductos = [
    {id: 1, categoria:"Raqueta", modelo: "BABOLAT PURE STRIKE", precio: 80000, imagen: "./imagenes/purestrike.webp"},
    {id: 2, categoria:"Raqueta", modelo: "BABOLAT PURE DRIVE", precio: 75000, imagen: "./imagenes/puredrive.webp"},
    {id: 3, categoria:"Raqueta", modelo: "YONEX VCORE", precio: 85000, imagen: "./imagenes/yonexvcore.jpg"},
    {id: 4, categoria:"Raqueta", modelo: "WILSON PRO STAFF", precio: 95000, imagen: "./imagenes/wilsonprostaff.jpg"},
    {id: 5, categoria:"Raqueta", modelo: "HEAD RADICAL", precio: 82000, imagen: "./imagenes/headradical.webp"},
    {id: 6, categoria:"Raqueta", modelo: "WILSON BLADE", precio: 90000, imagen: "./imagenes/wilsonblade.jpeg"},
    {id: 7, categoria:"Strings", modelo: "KIRSCHBAUM PRO LINE II", precio: 20000, imagen: "./imagenes/kirschbaumprolineII.png"},
    {id: 8, categoria:"Strings", modelo: "KIRSCHBAUM SUPER SMASH", precio: 17000, imagen: "./imagenes/kirschbaumsupersmash.jpg"},
    {id: 9, categoria:"Strings", modelo: "BABOLAT RPM BLAST", precio: 25000, imagen: "./imagenes/babolatrpmblast.jpg"},
    {id: 10, categoria:"Cubregrips", modelo: "WILSON PRO OVERGRIP", precio: 30000, imagen: "./imagenes/wilsonproovergrip.jpg"},
    {id: 11, categoria:"Cubregrips", modelo: "TOURNA PRO",precio: 22000, imagen: "./imagenes/tournapro.webp"},
    {id: 12, categoria:"Cubregrips", modelo: "BABOLAT PRO TOUR OVERGRIP", precio: 25000, imagen: "./imagenes/babolatprotour.webp"}
  ]

// Con una constante defino que si el producto fue traido del LS me lo parsee y si no lo ingrese en un array

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//La clase producto me servira para luego ver los productos en el carrito de compras

class Producto {
  constructor(modelo, precio, imagen) {
      this.modelo  = modelo.toUpperCase();
      this.precio  = parseFloat(precio);
      this.imagen = imagen;
  }
}

//Con DOM creo el elemento que contiene al producto tomando el array de objetos

for (const producto of listaProductos) {
    let contenedor = document.createElement("div");
    mainHtml.classList.add("row", "row-cols-1", "row-cols-sm-2" , "row-cols-lg-3");
    contenedor.classList.add("col","px-5")
    contenedor.innerHTML = `<div class="card mt-3 mb-3 card-productos">
                                    <div class="card-body">
                                    <img src=${producto.imagen} class="card-img-top" alt=${producto.modelo} />
                                    <h3 class="card-title nombre-del-producto"> ${producto.modelo} </h3>
                                    <p class="card-text precio-del-producto"> $ ${producto.precio} </p>
                                    <button type="button" class="btn btn-primary agregar-carrito">Agregar al carrito</button>
                                </div>
                            </div>`
    mainHtml.appendChild(contenedor);
}

//A traves del boton creado de agregar al carrito armo un bucle que recorra todos los botones para que me seleccione el producto
// que deseo agregar al carrito, tomando la informacion desde el LS que es hacia donde envie la informacion

const botonCarrito = document.querySelectorAll(".agregar-carrito")

botonCarrito.forEach(btn => {
    let parent = btn.parentElement;
    let nombreProducto = parent.querySelector("h3").textContent;
    let precioProducto = parseFloat(parent.querySelector("p").textContent.replace("$",""));
    let imagenProducto = parent.querySelector("img").src;

    const productoNuevo = new Producto(nombreProducto,precioProducto,imagenProducto);

    btn.addEventListener('click', () => {
      alert("Producto añadido a tu carrito")
      carrito.push(productoNuevo);
      localStorage.setItem("carrito",JSON.stringify(carrito));
      actualizarContador();
      mostrarCarrito()
    })
});

//Con la funcion de actualizar el contador muestro cuantos productos hay en el carrito

function actualizarContador () {
  contadorCarrito.innerHTML = carrito.length
};
actualizarContador();

// Con una funcion muestro el carrito y su contenido, dando la opcion al usuario de ir a pagar si tiene productos en el

function mostrarCarrito () {
  if (carrito.length === 0) {
    contenidoCarrito.innerHTML = `<p> Tu carrito esta vacío </p>`;
    irAPagar.setAttribute('disabled',true);


  }
  else {
    irAPagar.removeAttribute('disabled');

    
    const sumaPrecios = carrito.reduce((acc, el)=>acc + el.precio, 0);
    const precioConIva = sumaPrecios * 1.21;    
    precioTotalAPagar.innerText = `$${precioConIva} con IVA`;
    
    contenidoCarrito.innerHTML = "";
    carrito.forEach(item => {
      contenidoCarrito.innerHTML += `<div class="row align-items-center">
                                      <img src=${item.imagen} class="col-3"/>
                                      <div class="col-9">
                                        <h5> ${item.modelo} </h5>
                                        <p class="precio-producto-carrito"> $ ${item.precio} + IVA </p>
                                        <button type="button" class="eliminar-producto"><i class="fa-solid fa-trash"></i></button>
                                      </div>
                                    </div>`
    });

    const eliminarProducto = document.querySelectorAll(".eliminar-producto")

    for (let i = 0; i < eliminarProducto.length; i++) {
      eliminarProducto[i].addEventListener("click", function() {
      this.parentElement.parentElement.remove();
      carrito.splice(i,1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
      });
    }
    }
} 

mostrarCarrito();

// Creo una funcion para vaciar el carrito a traves de un evento
//La funcion borrarCarrito la comento en la entrega porque me falta poder eliminar el dom sin tener que recargar la pagina

/*function borrarCarrito () {
    localStorage.clear("carrito");
   }



vaciarCarrito.addEventListener("click", () => {
  borrarCarrito();
  alert("El carrito ha sido borrado exitosamente, recargue la pagina para iniciar su compra denuevo") 
  })

*/