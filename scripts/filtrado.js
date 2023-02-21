//Funcion que filtra los productos 

const filtrarProductos = ()=>{
    const todosLosProductos = document.getElementById("todosLosProductos");
    const raqueta = document.getElementById("raquetas");
    const rollosDeCuerda = document.getElementById("rollosDeCuerda");
    const cubregrips = document.getElementById("cubregrips");
    const cards = document.querySelectorAll(".card-productos");
    const tituloIndex = document.getElementById("titulo-index");
    const fondoIndex = document.getElementById("fondo-index");
    
    //Mostrar todos los productos
    todosLosProductos.addEventListener("click", ()=> {
        for (let card of cards) {
            card.classList.remove("borrarDelIndex")
        }
        tituloIndex.classList.remove("borrarDelIndex");
        fondoIndex.classList.remove("borrarDelIndex");
    });
    
    //Mostrar solo raquetas
    raqueta.addEventListener("click", ()=> {
        for (let card of cards) {
            card.classList.contains("raqueta") ? card.classList.remove("borrarDelIndex") : card.classList.add("borrarDelIndex")
        }
        tituloIndex.classList.add("borrarDelIndex");
        fondoIndex.classList.add("borrarDelIndex");
    });
    
    // Mostrar solo rollos de Cuerda
    rollosDeCuerda.addEventListener("click", ()=> {
        for (let card of cards) {
            card.classList.contains("strings") ? card.classList.remove("borrarDelIndex") : card.classList.add("borrarDelIndex")
        }
        tituloIndex.classList.add("borrarDelIndex");
        fondoIndex.classList.add("borrarDelIndex");
    });
    
    // Mostrar solo cubregrips
    cubregrips.addEventListener("click", ()=> {
        for (let card of cards) {
            card.classList.contains("cubregrips") ? card.classList.remove("borrarDelIndex") : card.classList.add("borrarDelIndex")
        }
        tituloIndex.classList.add("borrarDelIndex");
        fondoIndex.classList.add("borrarDelIndex");
    });
    }