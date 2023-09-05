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
        let numeroAleatorio = Math.floor(Math.random() * data.length) - 1;
        if (numeroAleatorio == -1){
            numeroAleatorio = Math.floor(Math.random() * data.length) - 1;
        }
        // YYYY-MM-DD HH:MM:SS
        let nombreImagen = data[numeroAleatorio]['image'];
        let fechaImagen = data[numeroAleatorio]['date'];
        let fecha = fechaImagen.split(' ')[0];
        let hora = fechaImagen.split(' ')[1];
        let latitud = data[numeroAleatorio]['centroid_coordinates']['lat'];
        let longitud = data[numeroAleatorio]['centroid_coordinates']['lon'];
        
        let componentesFecha = fecha.split('-');
        let nuevaFechaImagen = componentesFecha[0] + '/' + componentesFecha[1] + '/' + componentesFecha[2];
        let imgRes = 'https://api.nasa.gov/EPIC/archive/natural/' + nuevaFechaImagen + '/png/' + nombreImagen + '.png?api_key=' + API_KEY_NASA;
        console.log(imgRes);

        document.getElementById('card' + id_card).src = imgRes;
        
        let cardText = document.getElementById('cardp' + id_card);
        cardText.textContent = `Date: ${fecha} - Time: ${hora} - Lat: ${latitud} - Lon: ${longitud}`;

        console.log(data);
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    })
}


function llamaApifhaz() {
    const fechaAleatoria = obtenerFechaAleatoria();
    
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + fechaAleatoria.toISOString().slice(0, 10) + '&camera=fhaz&api_key=' + API_KEY_NASA;
    fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la consulta a la NASA');
        } else {
            return response.json();
        }
    })
    .then(data => {
        console.log(data);
        const photo = data.photos[0];
        if (photo) {
            const imgSrc = photo.img_src;
            const fhazImg = document.getElementById('fhaz-img');
            fhazImg.src = imgSrc;
            
            const fhazImgDate = document.getElementById('fhaz-img-date');
            const earthDate = photo.earth_date;
            fhazImgDate.textContent = 'Date: ' + earthDate;
        } else {
            llamaApifhaz();
        }
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
}

llamaApifhaz();

function llamaApiMardi() {
    const fechaAleatoria = obtenerFechaAleatoria();
    
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + fechaAleatoria.toISOString().slice(0, 10) + '&camera=mardi&api_key=' + API_KEY_NASA;
    fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la consulta a la NASA');
        } else {
            return response.json();
        }
    })
    .then(data => {
        console.log(data);
        const photo = data.photos[0];
        if (photo) {
            const imgSrc = photo.img_src;
            const fhazImg = document.getElementById('mardi-img');
            fhazImg.src = imgSrc;
            
            const fhazImgDate = document.getElementById('mardi-img-date');
            const earthDate = photo.earth_date;
            fhazImgDate.textContent = 'Date: ' + earthDate;
        } else {
            llamaApiMardi();
        }
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
}
llamaApiMardi();

function llamaApiNavCam() {
    const fechaAleatoria = obtenerFechaAleatoria();
    
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + fechaAleatoria.toISOString().slice(0, 10) + '&camera=navcam&api_key=' + API_KEY_NASA;
    fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la consulta a la NASA');
        } else {
            return response.json();
        }
    })
    .then(data => {
        console.log(data);
        const photo = data.photos[0];
        if (photo) {
            const imgSrc = photo.img_src;
            const fhazImg = document.getElementById('navcam-img');
            fhazImg.src = imgSrc;
            
            const fhazImgDate = document.getElementById('navcam-img-date');
            const earthDate = photo.earth_date;
            fhazImgDate.textContent = 'Date: ' + earthDate;
        } else {
            llamaApiNavCam();
        }
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
}

llamaApiNavCam();