var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

async function fetchWithString() {
    try{
        var response = await fetch(url);
        var data = await response.json();
        console.log(data);
        var htmlString = data.reduce(function(prev,api_property){
            return (
                prev + 
                `<div class="album">
                <div class = "album-details">
                    <p class="album-title"> ${api_property.title}</p>
                    <img class="album-url" src="${api_property.url}">
                </div>
            </div>`
            );
        });
        document.getElementById('api_grid').innerHTML = htmlString;
    } catch (error) {
        console.log(error);
    }
}
fetchWithString();