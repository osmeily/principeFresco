export const showData = async (list, element) => {
    console.log(list);
    console.log(element);

    //resolver promesa
    const productos = await list;
    console.log(productos); //devuelve el resultado de la promesa resuelta

    //recorrer el array y mostrar la info en el html
    productos.forEach(prod => {
        //console.log(prod.id); //muestra los id correspondientes de los objetos o cualquier nombre de propiedad dentro del arra

        //desestructurar el array
        const { id, name, img, description, price } = prod;
        //mostrar datos en el html
        element.innerHTML += `
        <li class="card" style="width: 18rem;">
        <div class="card-body" >
        <img src="${img}" class="card-img-top" alt="...">
          <h5 class="card-title">${name}</h5>
          <a href="#" id="${id}" class="btn btn-outline-dark " style="background-color: #db7093;">Detail</a>
        </div>
        </li>
        `
    })
}