const listGroup = document.querySelector('.list-group');

const getLocalStorage = () => {
    //obtener datos del localstorage
    const det = JSON.parse(localStorage.getItem("Detail"));
    console.log(det);

    //desestructurar el objeto json
    const { name, description, img, price } = det;
    //console.log(name, description);

    //mostrar informacion en el html
listGroup.innerHTML += `
    <li class="card" style="width: 18rem;">
    <div class="card-body">
    <img src="${img}" class="card-img-top" alt="...">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">${description}</p>
    <h5 class="card-title">USD$ ${price}</h5>
    <a href="#" class="btn btn-outline-dark " style="background-color: #FF906D;">Return</a>
    </div>
    </li>
    `  
}

document.addEventListener('DOMContentLoaded',getLocalStorage)

//evento click para retornar al html anterior
listGroup.addEventListener('click', (e) => {
    console.log(e.target.classList.contains('btn-outline-dark'));

    if(e.target.classList.contains('btn-outline-dark')){
        window.location.href = "index.html";
    }

})