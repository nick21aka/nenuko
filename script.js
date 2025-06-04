let carrito = JSON.parse(localStorage.getItem('carritoNenuko')) || [];
let total = 0;


function agregarAlCarrito(nombre, precio, imagen) {
  carrito.push({ nombre, precio, imagen });
  guardarCarrito();
  mostrarCarrito();
  mostrarCarritoLateral();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');
  const contadorEl = document.getElementById('contador');

  lista.innerHTML = '';
  total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="item-carrito">
        ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}" class="img-miniatura">` : ''}
        <div class="info-carrito">
          <strong>${item.nombre}</strong><br>
          $${item.precio}
        </div>
        <span class="eliminar-item" onclick="eliminarDelCarrito(${index})">✖</span>
      </div>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = total;
  contadorEl.textContent = carrito.length;
  actualizarContadorFlotante();
}





function mostrarCarritoLateral() {
  const panel = document.getElementById('carrito-lateral');
  const fondo = document.getElementById('fondo-oscuro');
  const wsp = document.querySelector('.boton-whatsapp');

  panel.classList.remove('oculto');
  panel.classList.add('visible');

  fondo.classList.remove('oculto');
  fondo.classList.add('visible');

  document.body.classList.add('no-scroll');

  // Oculta botón de WhatsApp
  if (wsp) wsp.style.display = 'none';
}

function cerrarCarrito() {
  const panel = document.getElementById('carrito-lateral');
  const fondo = document.getElementById('fondo-oscuro');
  const wsp = document.querySelector('.boton-whatsapp');

  panel.classList.remove('visible');
  panel.classList.add('oculto');

  fondo.classList.remove('visible');
  fondo.classList.add('oculto');

  document.body.classList.remove('no-scroll');

  // Vuelve a mostrar botón de WhatsApp
  if (wsp) wsp.style.display = 'flex';
}


function guardarCarrito() {
  localStorage.setItem('carritoNenuko', JSON.stringify(carrito));
}

// Evento cerrar
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cerrar-carrito').addEventListener('click', cerrarCarrito);
  mostrarCarrito(); // cargar desde localStorage al cargar
  // Nuevo: clic en "Carrito" del navbar
  document.getElementById('abrir-carrito-navbar').addEventListener('click', function (e) {
    e.preventDefault(); // evita salto de página
    mostrarCarritoLateral();
  });

  mostrarCarrito(); // carga inicial
});

document.getElementById('boton-carrito-flotante').addEventListener('click', mostrarCarritoLateral);

// Actualiza el contador flotante también
function actualizarContadorFlotante() {
  const contador = document.getElementById('contador-flotante');
  contador.textContent = carrito.length;
}

// Inclúyelo dentro de mostrarCarrito()
function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');
  const contadorEl = document.getElementById('contador');

  lista.innerHTML = '';
  total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement('li');
    li.innerHTML = `${item.nombre} - $${item.precio} <span class="eliminar-item" onclick="eliminarDelCarrito(${index})">✖</span>`;
    lista.appendChild(li);
  });

  totalEl.textContent = total;
  contadorEl.textContent = carrito.length;
  actualizarContadorFlotante(); // nuevo
}


 
let indiceCarrusel = 0;

function mostrarSlide(index) {
  const carrusel = document.querySelector('.carrusel');
  const totalSlides = carrusel.children.length;

  if (index >= totalSlides) indiceCarrusel = 0;
  else if (index < 0) indiceCarrusel = totalSlides - 1;
  else indiceCarrusel = index;

  carrusel.style.transform = `translateX(-${indiceCarrusel * 50}%)`;
}

function moverCarrusel(direccion) {
  mostrarSlide(indiceCarrusel + direccion);
}

// Opcional: cambio automático cada 5 segundos
setInterval(() => {
  moverCarrusel(1);
}, 3000);

document.getElementById("form-contacto").addEventListener("submit", function(event) {
  event.preventDefault(); // evita recargar
  alert("¡Gracias por contactarnos! Te responderemos pronto.");
  this.reset(); // limpia el formulario
});

document.getElementById("btn-pagar").addEventListener("click", function() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const resumen = carrito.map(item => `- ${item.nombre}: $${item.precio}`).join('\n');
  const confirmacion = confirm(`Resumen de tu compra:\n\n${resumen}\n\nTotal: $${total}\n\n¿Confirmar pedido?`);

  if (confirmacion) {
    alert("✅ ¡Gracias por tu compra en Nenuko!");
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    cerrarCarrito();
  }
});
