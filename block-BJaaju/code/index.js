const  root = document.querySelector("ul");
const searchBox = document.querySelector("input");

const url = `https://api.unsplash.com/photos/?client_id=pZcsoZm5a5NnHxmNieiiYl9fCjqyDeQHhUau7gV_M5U`
let getSearchURL = (query) => `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=pZcsoZm5a5NnHxmNieiiYl9fCjqyDeQHhUau7gV_M5U`
function fetch(url, successHandler){
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload = () => successHandler(JSON.parse(xhr.response));
    xhr.onerror = function(){
        console.error("Something went wrong!");
    };
    xhr.send();
}
function displayImages(images){
    root.innerHTML = "";

    images.forEach((image)=>{
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = image.urls.thumb;
        li.append(img);
        root.append(li);
    });
}

fetch(url,displayImages);

function searchImage(event){
   if(event.keyCode == 13 && searchBox.value){
       fetch(getSearchURL(searchBox.value),(searchResult)=>{
        displayImages(searchResult.results)});
        searchBox.value = "";
   }  

}

searchBox.addEventListener("keyup",searchImage)