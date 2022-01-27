let input = document.querySelector("input");
let info = document.querySelector(".info");
let userImage = document.querySelector(".info img");
let userName = document.querySelector(".info h2");
let userLogin = document.querySelector(".info h5");
let followingUL = document.querySelector(".following")
let followersUL = document.querySelector(".followers")

function fetch(url,successHandler){
    let xhr = new XMLHttpRequest();
    xhr.open( "GET" , url);
    xhr.onload = ()=> successHandler(JSON.parse(xhr.response));

    xhr.onerror = function(){
        console.error("Something went wrong!")
    };
    xhr.send();
}
function displayExtraInfo(url,rootElm){
    rootElm.innerHTML = "";
    fetch(url,function(followersList){
    let topFive = followersList.slice(0,5);
    topFive.forEach(info => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = info.avatar_url;
        img.alt = info.name;
        li.append(img)
        rootElm.append(li);
    });
  });
}

function handleDisplay(userInfo){
    console.log(userInfo);
    userImage.src = userInfo.avatar_url;
    userImage.alt = userInfo.name;
    userName.innerText = userInfo.name;
    userLogin.innerText = "@"+userInfo.login;
    displayExtraInfo(`https://api.github.com/users/${userInfo.login}/followers`,followersUL);
    displayExtraInfo(`https://api.github.com/users/${userInfo.login}/following`,followingUL)
}
function handleInput(event){
    if(event.keyCode === 13 && input.value){
        const url = "https://api.github.com/users/";
        let username = input.value;
       fetch((url + username),handleDisplay);
        input.value = "";
    }
}


input.addEventListener("keydown",handleInput);


let getNewCat = document.querySelector("#newCat");
let catImg = document.querySelector("#catImg");

getNewCat.addEventListener("click",(event)=>{
    event.preventDefault();
    let catData = new XMLHttpRequest();
    catData.open( "GET" , `https://api.thecatapi.com/v1/images/search?limit=1&size=full`);
    catData.onload = ()=> catImg.src= `${JSON.parse(catData.response)[0].url}`;
    catData.onerror = function(){
        console.error("Something went wrong!")
    };
    catData.send();
    
})