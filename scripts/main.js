import getData from "./getData.js"
import {showData} from './showData.js'

const endpoint = 'http://localhost:4000/productos';

const element = document.querySelector('.list-group');

document.addEventListener('DOMContentLoaded', () => {

    //ver si el endpoint esta funcionando apenas se cargue el DOM
    //console.log(endpoint);
    /* Obtener data de la endpoint */
    var data = getData(endpoint);
    //console.log(data);//este console es importante para ver que esta retornando la funcion
    showData(data,element);

})

//CAPTURAR EVENTO DE LOS ELEMENTOS IMPRESOS EN EL HTML
element.addEventListener('click', async(e) => {
    //console.log(e);//imprime el evento click en el boton de los elementos

    //relacionar el id con el boton
    const id = e.target.id;
    console.log(e.target.id);

    //contains: reponde un booleano dependiendo de lo que se relacione en esta funcion, o sea, si el elemento tiene o no la clase que esta dentro de esta funcion
    const btnDetail = e.target.classList.contains('btn-outline-dark');

    if (btnDetail) {
        //console.log('hizo click en boton detail');

        //buscar en la data con la funcion getData
        const lista = await getData(endpoint);
        //console.log(lista);

        //hacer la busqueda y que devuelva el objeto. recorre la lista (list) y que tome list.id y lo compare con el id. agregar Number() para evitar que me de undefined, al comprara id con list.id, porque el id es un string, ya que estoy utilizando comparacion estricta ===
        const objeto = lista.find(list => list.id === Number(id))
        //console.log(objeto);
        //almacenar en el local storage
        localStorage.setItem("Detail", JSON.stringify(objeto));
        //que nos lleve a detail.html al dar click en el boton detail, que es donde vamos a ver la info completa del producto
        window.location.href = "./detail.html"
    }
})

//Funciones de carrito

