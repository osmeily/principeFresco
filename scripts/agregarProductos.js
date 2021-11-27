import { url as endpoint } from '../scripts/urlMasProductos.js';

//esto es para desaparecer la caja del ID
document.getElementById('inputId').style.display = 'none';

/* */
const ul = document.querySelector('.lista-productos');

//console.log(endpoint);

//peticion get, lectura de datos
const getUser = async () => {

    const respuesta = await fetch(endpoint);
    const data = await respuesta.json();
    //console.log(data)

    data.forEach(element => {
        const { id, name, img } = element;//desfragmentar o desestructurar el objeto json para asi poder llamar directamente a las variable (id,url, nombre) en ves de poner ej: (element.id) dentro de ${ }
        
        
        //Insertar items en el html
        //en el button relacionmos el id para poder borrar
        ul.innerHTML += `
        <li class="list-group-item">
        <img src=${img} width="50px"></img>
        <span class="lead">${name}</span>
        <button id=${id} class="btn btn-dark btm-sm float-end ">
           Borrar
        </button>
        </li>
        `

    });
}

window.addEventListener('DOMContentLoaded', getUser)

//Peticion delete - eliminacion de datos
//Capturar evento click dentro del ul en el html
ul.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('btn-dark'); //con target al darle click a cualquier elemento nos muestra por consola la info de ese elemento al que le damos click
    //con .classList: muestra las clases que tiene relacionadas el elemento donde damos click y los muestra en un arreglo
    //con .contains(): devuelve un booleano, al dar click en el elemento en este caso deberia devolver true, si damos click en otro elemento que no tenga esa clase, devuelve false

    //console.log(e.target.id);

    //condicional para borrar
    if (btnEliminar === true) {
        const id = e.target.id;//capturar el id del boton seleccionado
        await fetch(endpoint + id, {
            method: 'DELETE'//el metodo eliminar toma la endpoint y le concatena un numero (id)
        })
    }
})

//5 Captura de datos del formulario para poder crear el objeto
const capturarDatos = () => {

    const img = document.getElementById('inputUrl').value;
    const name = document.getElementById('inputNombre').value;
    const price = document.getElementById('inputPrice').value;
    const description = document.getElementById('inputDescripcion').value;

    //crear el objeto con los datos capturados. esos nombres que estan dentro del objeto son los nombres de las propiedades que se van a crear en el documento .json
    const user = {
            img,
            name,
            price,
            description
        }

    console.log(user);
    return user;//retornar estos datos para luego llamarlos la funcion de abajo
}
//6 Petición POST para la creacion de informacion en un objeto
const form = document.querySelector('.form-group');//capturar el formulario

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    //no olvidar el preventDefault para no perder la informcion del formulario el darle enviare.preventDefault();
    const objeto = capturarDatos();

    await fetch(endpoint, {
        //metodo:
        method: 'POST',
        //objeto que estamos capturando:
        body: JSON.stringify(objeto),
        //en los headers se indica el tipo de informacion que se va a enviar y charset=utf-8 para indicar que vamos a trabajar con caracteres especiales
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })

})
// 7 Buscar por correo me permitira despues hacer la modificacion de datos

const btnNombre = document.getElementById('btnNombre');

btnNombre.addEventListener('click', async () => {

    //capturar lo que se esta recibiendo en la caja de texto, en este caso, el correo
    const input = document.getElementById('inputNombre').value;
    //console.log(input);

    //buscar en toda la data. se hace una peticion GET a la endpoint:
    const resp = await fetch(endpoint);

    //en donde voy a buscar la data?. mostrar la data:
    const lista = await resp.json()

    //realizar una busqueda puntual dentro del array. al recorrer y comparar todos los objetos dentro del array que tenemos:
    //toLocaleLowerCase() para convertir letras en minuscula
    const buscado = lista.find(u => u.name.toLocaleLowerCase() === input.toLocaleLowerCase())
    console.log(buscado);

    //if: en caso de que el correo existe, o sea, si es diferente de undefined, muestra los datos
    //else: si no existe el correo, muestra un mensaje en una alerta: Correo no encontrado 
    if (buscado !== undefined) {

        //desestructurar el objeto
        const { id, description, img, price} = buscado;
        document.getElementById('inputUrl').value = img;
        document.getElementById('inputPrice').value=price
        document.getElementById('inputDescripcion').value = description;
        document.getElementById('inputId').value = id;
    } else {
        alert('Correo no encontrado')
    }
})
//8 peticion de modificacion Put: Modificar lo buscado. la peticion se hara por medio del (ingresando) correo electronico

//capturar boton de modificar
const btnModificar = document.getElementById('btnModificar');

btnModificar.addEventListener('click', async () => {

    //guardar los datos capturados en la constante dataMod
    const dataMod = capturarDatos();

    //desestructurar datos
    const {img,description,name, price} = dataMod;

    if(img === "",name === "",price === "",description === ""){
        alert('Llenar todos los campos')
    }
    else {

        //captura de la caja de texto id
        const id = document.getElementById('inputId').value;
        console.log(dataMod);

        await fetch(endpoint + id, {
            //metodo tipo PUT
            method: 'PUT',
            //captura de la informacion modificada
            body: JSON.stringify(dataMod),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }

})
