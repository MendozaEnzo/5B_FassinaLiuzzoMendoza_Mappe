let token;

fetch('./.gitignore/conf.json') // carica le variabili da conf.json
    .then(response => {
        if (!response.ok) {
            console.log('Errore nel caricamento del file JSON');
        }
        return response.json();
    })
    .then(data => {
        token = data.token;
    })
    .catch(error => console.error('Errore:', error));



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
 let map = L.map('map').setView([45.4642, 9.1900],  zoom);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: maxZoom,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
 }).addTo(map);


function addAddress(){
   const address = document.getElementById("address").value
   let url = `https://us1.locationiq.com/v1/search?key=${token}&q=${encodeURIComponent(address)}&format=json`

   if (address){
      fetch(url) //encodeURIComponent modifica la stringa in modo che possa essere utlizzata negli url replaceando alcuni valori che nelle url si scrivono diversamente (" " => %20)
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
 