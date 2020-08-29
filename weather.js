"use strict";
const weather = document.querySelector(".js-weather");

const API_KEYS = "***";
const COORDS = 'coords';

function getWeather(lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEYS}&units=metric`)
    .then(function(responce){
        return responce.json();
    })
    .then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const lat = position.coords.latitude;
    const long = position.coords.longtitude;
    const coordsObj = {
        lat,
        long
    };
    saveCoords(coordsObj);
    getWeather(lat, long);
}


function handleGeoError(){
    console.log("Geo Loading Error");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError) // 인자로 함수 두개 필요
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.lat, parseCoords.long);
    }
}
