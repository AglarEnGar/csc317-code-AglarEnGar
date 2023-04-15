var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

function fadeOut(ev) {
    console.log(ev.target);
    console.log(ev.currentTarget);
    var ele1 = ev.currentTarget;
    var opacity = 1;
    let time = setInterval(function () {
        console.log(ele1)

        opacity -= 0.1;
        ele1.style.opacity = opacity;
        if(opacity<=0){
            clearInterval(time);
            ele1.remove();
            collection = document.querySelectorAll('.album').length;
            document.getElementById('card-count').innerHTML = `DOM Elements: ${collection}`;
        }

    }, 50)
    
}

async function fetchWithString() {
    try{

        var response = await fetch(url);
        var data = await response.json();
        console.log(data);
        var htmlString = data.reduce(function(prev, api_property){
            return (
                prev + 
                `<div class="album">
                <img class="album-url" src="${api_property.url}">
                <div class = "album-details">
                    <p class="album-title"> ${api_property.title}</p>
                </div>
            </div>`
            );
        }, "");
        document.getElementById('api_grid').innerHTML = htmlString;

        var collection = document.querySelectorAll('.album').length;
        document.getElementById('card-count').innerHTML = `DOM Elements: ${collection}`;

        let cards = document.getElementsByClassName('album');
        [...cards].forEach(function(ele){
            ele.style.opacity = 1;
            ele.addEventListener('click', function(ev){
                console.log(ev);
                fadeOut(ev);

            })
        });


    } catch (error) {
        console.log(error);
    }
}
fetchWithString();

