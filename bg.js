const body = document.querySelector("body");

const IMG_NUM = 3;

function paintImage(imgNum){
    const image = new Image();
    image.src = `images/${imgNum}.jpg`;
    image.classList.add("bgImage")
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUM);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();