function display(){
    let shortArrayHTML = document.getElementsByClassName("shortLink");
    var shortArray = Array.prototype.slice.call(shortArrayHTML)
    console.log(shortURL);
    var linkText = shortURL;
    shortArray.innerText=window.location.origin + "/srt/" + linkText;
}
display();