// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCurso = document.querySelector("#lista-cursos");

let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregas un curso presionando "Agregar curso"
  listaCurso.addEventListener("click", agragarCurso);
  // Elimina curso
  carrito.addEventListener("click", eliminarCurso);
  // Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Reseteamos el arreglo

    limpiarHTML(); // Eliminamos todo el HTML
  });
}

// Funciones
function agragarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); // Itera sobre el carrito y muestra el HTML
  }
}

// Leer los datos del HTML al que le dimos click y extraer la información del curso
function leerDatosCurso(curso) {
  //console.log(curso);

  // Crear un objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualiza la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Actualiza el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agrega elementos al elemento de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra el Carrito en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y general el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td> ${titulo}</td>
      <td> ${precio}</td>
      <td> ${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
      `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los cursos del tbody
function limpiarHTML() {
  //Forma lenta
  //contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
