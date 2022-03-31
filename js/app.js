const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', e => { 
    fetchData()
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        mostrarCarrito()
    }
});
cards.addEventListener('click', e =>{
    agregarCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})
/* Llamada de productos desde el JSON */
const fetchData = async () => {
    try{
        const res = await fetch('datos/productos.json');
        const data = await res.json()
        //console.log(data)
        agregartarjetas(data)
    } catch (error){
        console.log(error)
    }
}

const agregartarjetas = data => {
    data.forEach(producto => {
        templateCard.querySelector('h4').textContent = producto.title
        templateCard.querySelector('h5').textContent = producto.categoria
        templateCard.querySelector('span').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const agregarCarrito = e =>{
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h4').textContent,
        categoria: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('span').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    mostrarCarrito()
}

const mostrarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    mostrarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const mostrarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - Agregue sus Productos!</th>
        `
        return
    }

    const cantidadProductos = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const totalProductos = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    
    templateFooter.querySelectorAll('td')[0].textContent = cantidadProductos
    templateFooter.querySelector('span').textContent = totalProductos

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnLimpiar = document.getElementById('vaciar-carrito')
    btnLimpiar.addEventListener('click', () =>{
        carrito = {}
        mostrarCarrito()
    })
}
//Botones sumar o quitar producto en especifico
const btnAccion = e => {

    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        mostrarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
    }

    e.stopPropagation()

}