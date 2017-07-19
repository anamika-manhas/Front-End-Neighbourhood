  <script>
         function initMap(){
         //Constructor creates a new map-only center and zoom are requires.
         map= new google.maps.Map(document.getElementById('map'),{
           center: {lat:32.7119114, lng:74.8609743 },
           zoom: 10,
           mapTypeControl:false });
           ko.applyBindings(myViewmodel);
         }
      </script>