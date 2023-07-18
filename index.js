const API_KEY_NASA = 'Ny5elcI3dUMaNKUlx7z6AcezJRsTCHGxY5buQ6fp';
const URL_APOD = 'https://api.nasa.gov/planetary/apod?api_key=' + API_KEY_NASA + '&date=';

function obtenerFechaAleatoria(){
    const fechaInicio = new Date('2022-01-01').getTime();
    const fechaFin = new Date();
    const tiempoAleatorio = Math.random() * (fechaFin - fechaInicio) + fechaInicio;
    const fechaAleatoriaNueva = new Date(tiempoAleatorio);
    return fechaAleatoriaNueva
}


function llamaApiApod(){
    const fechaAleatoria = obtenerFechaAleatoria();
    const url = URL_APOD + fechaAleatoria.toISOString().slice(0, 10);
    fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(response => {
        if(!response.ok){
            throw new Error('Error en la consulta a la NASA');
        } else {
            return response.json();
        }
    })
    .then(data => {
        // Aqui es donde puedo trabajar con la info que me regresa la nasa en formato json.
        console.log(data);
        document.getElementById('carousel1').src = data['url'];
        document.getElementById('carousel2').src = data['url'];
        document.getElementById('descripcion_apod_title').innerHTML = '<b>' +data['title']+'</b>'
        document.getElementById('descripcion_apod_text').innerHTML =  data['explanation'];
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    })
}

function llamaApiEpic(id_card) {
    const url ='https://api.nasa.gov/EPIC/api/natural/images?api_key=' + API_KEY_NASA;
    fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(response => {
        if(!response.ok){
            throw new Error('Error en la consulta a la NASA');
        } else {
            return response.json();
        }
    })
    .then(data => {
        // Aqui es donde puedo trabajar con la info que me regresa la nasa en formato json.
        console.log(data);
        let numeroAleatorio = Math.floor(Math.random() * data.length)-1;
        if (numeroAleatorio == -1){
            let numeroAleatorio = Math.floor(Math.random() * data.length)-1;
        }
        let nombreImagen = data[numeroAleatorio]['image']
        let fechaImagen = data[numeroAleatorio]['date'];
        let fecha = fechaImagen.split(' ')[0];
        let componentesFecha = fecha.split('-')
        let nuevaFechaImagen = componentesFecha[0]+'/'+componentesFecha[1]+componentesFecha[2];

        let imgRes =  'https://api.nasa.gov/EPIC/archive/natural/'+ nuevaFechaImagen +'/png/'+nombreImagen+'.png?api_key=' + API_KEY_NASA;
        document.getElementById('card'+id_card).src = imgRes;
        
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    })
}
llamaApiEpic();