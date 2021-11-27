
//hacer consumo de la endpoint, y exportarlo
const getData = async(url) => {
    //console.log(fetch(url));

    const resp = await fetch(url);
    //console.log(resp);
    const data = await resp.json();
    //console.log(data);
    
    return data;
}

export default getData;
