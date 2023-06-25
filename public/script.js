

let shortArrayHTML = document.getElementsByClassName("shortLink");
var shortArray = Array.prototype.slice.call(shortArrayHTML)
shortArray.forEach(element => {
    element.href='srt/'+element.innerText;
});

let longArrayHTML = document.getElementsByClassName("longLink");
var longArray = Array.prototype.slice.call(longArrayHTML)
longArray.forEach(element => {
    element.href=element.innerText;
});


