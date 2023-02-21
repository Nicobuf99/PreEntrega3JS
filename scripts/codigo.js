// Elementos traidos del HTML

const mainHtml = document.getElementById('main-productos');
const contadorCarrito = document.getElementById("contador-carrito");
const contenidoCarrito = document.getElementById("contenido-carrito");
const precioTotalAPagar = document.getElementById("precio-total-productos");
const irAPagar = document.getElementById("ir-a-pagar");
const aPago = document.getElementById("aPago");

// Lista de Productos
const listaProductos = [];

// Con una constante defino que si el producto fue traido del LS me lo parsee y si no lo ingrese en un array
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//La clase producto me servira para luego ver los productos en el carrito de compras
class Producto {
  constructor(modelo, precio, imagen, categoria) {
      this.modelo  = modelo.toUpperCase();
      this.precio  = parseFloat(precio);
      this.imagen = imagen;
      this.categoria = categoria;
  }
};

const traerProductos = async () => {
  try{
    const response = await fetch('../jsons/productos.json')
    const data = await response.json()
    listaProductos.push(...data)
    crearProductos();
    filtrarProductos();
  } catch (errores) {
    console.log (errores);
  }
};
traerProductos();

// For of que arma cada div segun producto que encuentre
const crearProductos = ()=>{
  for (const producto of listaProductos) {
    let contenedor = document.createElement("div");
    mainHtml.classList.add("row", "row-cols-1", "row-cols-sm-2" , "row-cols-lg-3");
    contenedor.classList.add("col","px-5", "card-productos", `${producto.categoria}`)
    contenedor.innerHTML = `<div class="card mt-3 mb-3">
                                    <div class="card-body">
                                    <img src=${producto.imagen} class="card-img-top imagen-productos" alt=${producto.modelo} />
                                    <h3 class="card-title nombre-del-producto"> ${producto.modelo} </h3>
                                    <p class="card-text precio-del-producto"> $ ${producto.precio} </p>
                                    <button type="button" class="btn btn-primary agregar-carrito">Agregar al carrito</button>
                                </div>
                            </div>`
    mainHtml.appendChild(contenedor);
  }
  // Boton que al seleccionarlo me arma el DOM del carrito
  const botonCarrito = document.querySelectorAll(".agregar-carrito")

  botonCarrito.forEach(btn => {
      let parent = btn.parentElement;
      let nombreProducto = parent.querySelector("h3").textContent;
      let precioProducto = parseFloat(parent.querySelector("p").textContent.replace("$",""));
      let imagenProducto = parent.querySelector("img").src;

      const productoNuevo = new Producto(nombreProducto,precioProducto,imagenProducto);

      btn.addEventListener('click', () => {
        alerta();
        carrito.push(productoNuevo);
        localStorage.setItem("carrito",JSON.stringify(carrito));
        actualizarContador();
        mostrarCarrito();
      })
  });
}

//Funcion para mostrar la cantidad de productos en el carrito
function actualizarContador () {
  contadorCarrito.innerHTML = carrito.length
};
actualizarContador();

// Con una funcion muestro el carrito y su contenido, dando la opcion al usuario de ir a pagar si tiene productos en el

function mostrarCarrito () {
  if (carrito.length === 0) {
    contenidoCarrito.innerHTML = `<p> Tu carrito esta vacío </p>`;
    aPago.classList.add('p-pago')
  }
  else {
    aPago.classList.remove('p-pago')

    //Armo una funcion para calcular el precio final de los productos ingresados al carrito
    const sumaPrecios = carrito.reduce((acc, el)=>acc + el.precio, 0);
    const precioConIva = sumaPrecios * 1.21;    
    precioTotalAPagar.innerText = `$${precioConIva} FINAL`;
    
    // Armo con DOM la estructura de los productos mostrados en el carrito
    contenidoCarrito.innerHTML = "";
    carrito.forEach(item => {
      contenidoCarrito.innerHTML += `<div class="row align-items-center">
                                      <img src=${item.imagen} class="col-3"/>
                                      <div class="col-9">
                                        <h5> ${item.modelo} </h5>
                                        <p class="precio-producto-carrito"> $ ${item.precio} + IVA </p>
                                        <button type="button" class="eliminar-producto"><i class="fa-solid fa-trash icon-carrito"></i></button>
                                      </div>
                                    </div>`
    });

    // Función para eliminar los productos del carrito
    const botonesEliminarProducto = document.querySelectorAll('.eliminar-producto');
   
    botonesEliminarProducto.forEach(boton => {
    boton.addEventListener('click', () => {
    carrito.splice(boton, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    mostrarCarrito();

    //Mostrar el precio a pagar en el carrito
    const sumaPrecios = carrito.reduce((acc, el)=>acc + el.precio, 0);
    const precioConIva = sumaPrecios * 1.21;    
    precioTotalAPagar.innerText = `$${precioConIva} FINAL`;
    if (precioConIva == 0) {
    precioTotalAPagar.classList.add('esconder-precio');
    }else{
    precioTotalAPagar.classList.remove('esconder-precio');
    }
    })
    });
   
  }
}; mostrarCarrito();

// Funcion que alerta al usuario de que el producto fue agregado exitosamente
function alerta () {
  Toastify({
    text: "Producto añadido exitosamente al carrito!",
    duration: 1500,
    gravity: "top",
    position: "right",
    style:{
      background: "#388e3c",
      color:"white",
    }
  }).showToast()
}

