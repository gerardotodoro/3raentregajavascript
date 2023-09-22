console.table(productos);
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorProds = document.getElementById('misprods');
const tablaBody = document.getElementById('tablabody');
const btnFinalizar = document.getElementById('finalizar');
const btnVaciar = document.getElementById('vaciar');


function dibujarTabla() {
    for (const prod of carrito) {
        tablaBody.innerHTML += `
        <tr>
            <td>${prod.id}</td>
            <td>${prod.nombre}</td>
            <td>${prod.precio}</td>
        </tr>
        `;
    }
    const subTotal = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
    console.log('Subtotal $' + subTotal);
    document.getElementById('total').innerText = 'Total a pagar $:' + subTotal;
}


if (carrito.length != 0) {
    dibujarTabla();
}

function renderizarProds(listaProds) {
    contenedorProds.innerHTML = '';
    for (const prod of listaProds) {
        contenedorProds.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src=${prod.Fotos} alt=${prod.nombre}/>
                    <div class="card-body">
                        <h5 class="card-title">${prod.nombre}</h5>
                        <p class="card-text">$ ${prod.precio}</p>
                        <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
                    </div>
            </div>
        `;
    }

    let botones = document.getElementsByClassName('compra');//coleccion de nodos
    for (const boton of botones) {
    
        boton.addEventListener('click', () => {
            console.log('Hiciste click en el boton cuyo id es ' + boton.id);
            const prodACarro = listaProds.find((producto) => producto.id == boton.id);
            console.log(prodACarro);
           
            agregarAlCarrito(prodACarro);
        });

        
        boton.onmouseover = () => boton.classList.replace('btn-primary', 'btn-warning');
        boton.onmouseout = () => boton.classList.replace('btn-warning', 'btn-primary');
    }
}

renderizarProds(productos);


function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.table(carrito);
    alert(`Agregaste ${producto.nombre} al carro`);
  
    tablaBody.innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
    `;
   
    const subTotal = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
    console.log('Subtotal $' + subTotal);
    document.getElementById('total').innerText = 'Total a pagar $:' + subTotal;
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');

campoNombre.onkeyup = () => {
    if (campoNombre.value.length < 4) {
        console.log('Nombre de menos de 4 letras');
        campoNombre.style.color = 'red';
    } else {
        campoNombre.style.color = 'black';
    }
}

campoNombre.onchange = () => {
    alert('cambio el nombre del formulario');
}

campoEmail.addEventListener('input', () => {
    if ((!campoEmail.value.includes('@')) || (!campoEmail.value.includes('.'))) {
        document.getElementById('mensaje').innerText = "Ingrese un mail valido!";
    } else {
        document.getElementById('mensaje').innerText = "";
    }
});

function borrarCampos() {
    campoNombre.value = '';
    campoEmail.value = '';
}

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', validar);

function validar(evento) {
    if ((campoNombre.value == '') || (campoEmail.value == '')) {
        evento.preventDefault();
        alert('Ingrese nombre o email faltante');
    }
}

btnFinalizar.onclick=()=>{
    Swal.fire('Gracias por tu compra','Recibiras el envio en las proximas 72hs','success');
    carrito=[];
    tablaBody.innerHTML='';
    document.getElementById('total').innerText = 'Total a pagar $:';
    localStorage.removeItem('carrito');
}

btnVaciar.onclick=()=>{
    carrito=[];
    tablaBody.innerHTML='';
    document.getElementById('total').innerText = 'Total a pagar $:';
    localStorage.removeItem('carrito');
}