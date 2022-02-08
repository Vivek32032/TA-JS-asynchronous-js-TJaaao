let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`

let newsElm = document.querySelector(".news");
let select = document.querySelector("select");


function renderNews(news){
    news.forEach((newsItem)=> {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = newsItem.imageUrl;
        img.alt = newsItem.title;
        let div = document.createElement("div");
        let span = document.createElement("span");
        span.classList.add("source")
        span.innerText = newsItem.newsSite;
        let h3 = document.createElement("h3");
        h3.innerText = newsItem.title;
        let a = document.createElement("a");
        a.href = newsItem.url;
        let button = document.createElement("button");
        a.append(button);
        button.innerText = "Read More";
        div.append(span,h3,button);
        li.append(img, div);
        newsElm.append(li);
    });
}

function displayOptions(sources){
    sources.forEach(sources => {
        let option = document.createElement("option");
        option.innerText = sources;
        option.value = sources
        select.append(option)
    })
   
}

fetch(url)
   .then((res) => res.json())
   .then((news)=> {
       renderNews(news);
       let allSources = new Set(news.map((n)=> n.newsSite));
       displayOptions(allSources);
   })
