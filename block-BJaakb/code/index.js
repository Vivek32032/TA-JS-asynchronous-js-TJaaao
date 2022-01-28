function fetch(url){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET" , url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject("something went wrong!");
        xhr.send();
    });
}

fetch(url).then(displayImages)