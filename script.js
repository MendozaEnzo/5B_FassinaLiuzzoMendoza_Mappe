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






function renderInserimento() {
   const html = `
        <div class="form-group">
            <input type="text" id="address" class="form-control" placeholder="Inserisci un indirizzo">
            <button id="addBtn">Aggiungi</button>
        </div>
    `;
   document.getElementById("app").innerHTML = html;
   const addBtn = document.getElementById("addBtn");
   addBtn.onclick = () => {
      addAddress();
   }
   document.onkeydown = function (e) {
      const keyCode = e.keyCode;
      if (keyCode == 13) {
         addAddress();
      }
   }
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

function addAddress(){
   const address = document.getElementById("address").value
   if (address){
      fetch(`https://us1.locationiq.com/v1/search?key=pk.51de02ca59420a8535ff19bd59504a69&q=${encodeURIComponent(address)}&format=json`) //encodeURIComponent modifica la stringa in modo che possa essere utlizzata negli url replaceando alcuni valori che nelle url si scrivono diversamente (" " => %20)
         .then(r => r.json())
         .then(data => {
            if (data.length === 0) {
               console.log("Nessun risultato trovato");
               return;
            }
            const coords = [data[0].lat, data[0].lon];
            const marker = L.marker(coords).addTo(map);
            marker.bindPopup(`<b>${address}</b>`).openPopup();
            map.setView(coords, zoom);
            address = document.getElementById("address").value = "";
         })
         .catch(error => console.error("Errore:", error));
   } else{
      console.log("Inserisci un luogo!")
      return;
   }
   }


renderInserimento();
 //pk.51de02ca59420a8535ff19bd59504a69 token di locationIq
 