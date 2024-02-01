const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const btnAgregar = document.querySelector('#btn-agregar');
let cursosCarrito = [];

//listaCursos.addEventListener('click',agregarCurso); //este está comentado por que sino lo ejecuta dos veces el añadir curso

function agregarCurso(e){
    e.preventDefault()
   //console.log(e.target.parentElement.parentElement);
   let cursoSeleccionado = e.target.parentElement.parentElement;
   leerDatosCurso(cursoSeleccionado);
}

function leerDatosCurso(curso){
    console.log(curso.querySelector('a').getAttribute('data-id')); //para traer el atributo
    //objeto = atributos(caracteristicas) : VALOR A ASIGNAR
    //javascript representa objetos con llaves "{}"
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('h5').textContent,
        cantidad: 1
    }

    //ver si el curso (elemento) ya existe en el carrito //some determina si eso existe
    const yaExiste = cursosCarrito.some(curso => curso.id === infoCurso.id)

    if(yaExiste) {
        cursosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad += 1
                return curso; //va a dejar el curso en el array con cantidad +1
            }else{ //esto se puede eliminar, por que se queda igual, no entra en yaexiste
                return curso; // retornará los cursos con su cantidad ya que no hay duplicado
            }
        });
           //cursosCarrito.push(cursosActualizados)
            // cursosActualizados = [...cursosActualizados] //otra sintaxis que hace exactamente lo mismo
        }else{
            cursosCarrito.push(infoCurso);
        }
        //cursosCarrito.push(infoCurso);
        console.log(cursosCarrito);
        pintarCarritoHTML()  
    }



function pintarCarritoHTML(){

    //limpiar carrito
    limpiarCarritoHTML();

    //metodo MAP arrays = recorrer el array y devolver o ejecutar algo con cada posicion
    cursosCarrito.map( (curso) => {
        //creamos el elemento tr de la tabla
        const fila = document.createElement('tr');
        //asignamos un valor con innerHTML a esa fila
        fila.innerHTML = `
        <td> <img src="${curso.imagen}"> </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
            <button class="btn-eliminar btn btn-danger" data-id="${curso.id}" onclick="eliminarCurso(event)">X</button>
        </td>
        `

        //agrego la fila al contenedor del carrito (tbody)
    contenedorCarrito.appendChild(fila)
    })
}

function limpiarCarritoHTML(){
    while(contenedorCarrito.firstChild)
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}

function vaciarCarrito(e){
    e.preventDefault();
    cursosCarrito = [];
    limpiarCarritoHTML();
}

/*
  LIMPIAR CARRITO UNO A UNO 
*/


function eliminarCurso(e) {
    e.preventDefault();
    const identificacion = e.target.getAttribute('data-id');
    const cursoAgregadoCarrito = cursosCarrito.find((curso) => curso.id === identificacion);

    if (cursoAgregadoCarrito.cantidad > 1) {
        cursoAgregadoCarrito.cantidad -= 1;
    } else {
        cursosCarrito = cursosCarrito.filter((curso) => curso.id !== identificacion);
    }
    pintarCarritoHTML();
}






//infoCurso.imagen = "./images/curso1"
//infoCurso.titulo = "HTML Y CSS"
//infoCurso.precio = "$15.00"

// persona { }

/*let persona = { 
    ojos : "rojos",
    cabello: "largo",
    edad: 25,

}*/

//Caracteristicao o atributo : VALOR