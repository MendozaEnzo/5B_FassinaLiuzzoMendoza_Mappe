let places = [
    {
       name: "Piazza del Duomo",
       coords: [45.4639102, 9.1906426]
    },
    {
       name: "Darsena",
       coords: [45.4536286, 9.1755852]
    },
    {
       name: "Parco Lambro",
       coords: [45.4968296, 9.2505173]
    },
    {
       name: "Stazione Centrale",
       coords: [45.48760768, 9.2038215]
    }
 ];


map = document.getElementById("map").value ;


fetch("https://us1.locationiq.com/v1/search?key=pk.51de02ca59420a8535ff19bd59504a69&q=Piazza Del Duomo, Milano&format=json&"){
    .then(response => response.json())
    .then(data => console.log(data))
}

function renderInserimento(){
    html_template +=`  
        "<div class="form-group">
              <input type="date" class="form-control" id="data" required>
            </div>
    ` 
}

 let zoom = 12;
 let maxZoom = 19;
 let map = L.map('map').setView(places[0].coords, zoom);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: maxZoom,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
 }).addTo(map);

 //inserimento mark 
 places.forEach((place) => {
    const marker = L.marker(place.coords).addTo(map);
    marker.bindPopup(`<b>${place.name}</b>`);
 });


 //pk.51de02ca59420a8535ff19bd59504a69 token di locationIq
 ` 