const axios = require('axios');

const getLugarLatLng = async(direccion) => {

    let encodedUrl = encodeURI(direccion);

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodedUrl }=AIzaSyAuZJc52ifcHwX3OG9aKwWOl16FfPUTxh4`)

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para la ciudad ${ direccion }`);
    }


    let location = resp.data.results[0];
    let coors = location.geometry.location;

    console.log('Dirección: ', location.formatted_address);
    console.log('lat: ', coors.lat);
    console.log('long: ', coors.lng);

    return {
        direccion: location.formatted_address,
        lat: coors.lat,
        lng: coors.lng
    }

}

module.exports = {
    getLugarLatLng
}