var map;
//Create a new blank array for all the listing markers.
var markers=[];
var locations =
    [
        {title: 'pehalwan', location :{lat:32.6345392 , lng:74.9123791}},
        {title: 'golden bar and restra', location :{lat:32.6373872 , lng:74.910922}},
        {title: 'Indian oil', location :{lat:32.6373863, lng:74.9043559 }},
        {title: 'Sahil Cafeteria', location :{lat:32.6312073 , lng:74.9130249}},
        {title: 'SIDCO Factories', location :{lat:32.6483984, lng:74.9010746}},

    ];

    // Create style array to use with the map.
        var styles=[
            {
                featureType: 'water',
                stylers:[
                    {
                        color:'#4690af'
                    }
                ]
            },{
                featureType: 'administrative',
                elementType: 'labels.text.stroke',
                 stylers:[
                    {
                        color:'#ccb3a7'
                    },
                     {
                        weight:'6'
                    }]
            },{
                featureType: 'administrative',
                elementType: 'labels.text.fill',
                 stylers:[
                    {
                        color:'#bc8129'
                    }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                 stylers:[
                    {
                        color:'#a38f85'
                    },
                     {
                        lightness:-40
                    }]
            },
                {
                      featureType: 'transit.station',
                      stylers:[
                    {
                        weight:'9'
                    }
                ,{
                        hue:'#e8113'
                     }]
                },{
                     featureType: 'road.highway',
                     elementType:'labels.icon',
                      stylers:[
                    {
                        visibility:'off'
                    }] },
                   {

                featureType: 'road.highway',
                elementType: 'geometry.fill',
                 stylers:[
                    {
                        color:'#e0d5d0'
                    },
                   {
                        lightness:-25
                    }]
            }
        ];
var myViewmodel= function()
{
        //style the markers a bit. this will be our listening  marker icon.
            var defaultIcon = makeMarkerIcon('0091ff');
        //create a highlightes location marker when user mouse over the marker.
            var highlightedIcon =makeMarkerIcon('FFFF24');
            var infoWindow = new google.maps.InfoWindow();
           for(var i = 0; i < locations.length ; i++)
               {
                   // get the position from the location array.
                   var position = locations[i].location;
                   var title = locations[i].title;
                   //create a marker per location, and put into markers array.
                   var marker = new google.maps.Marker({
                       map: map,
                       position: position,
                       title: title,
                       icon: defaultIcon,
                       animation: google.maps.Animation.DROP,
                   });
                   markers.push(marker);

                   marker.addListener('mouseover',function(){
                     this.setIcon(highlightedIcon);
                   });

                   marker.addListener('mouseout',function(){
                     this.setIcon(defaultIcon);
                   });

                   marker.addListener('click',function(){
                     openInfowindow(this,infoWindow);
                   });


             }

           function openInfowindow(marker,infowindow)
           {  console.log(marker);
             if(infowindow.marker != marker){
               infowindow.marker=marker;
             }

            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);

            infowindow.addListener('closeclick',function(){
            infowindow.marker = null;
            });

           }

           this.markerwindow = function(marker)
           {
             openInfowindow(marker, infoWindow);
           };


            function makeMarkerIcon (color){
             var markerIcon = new google.maps.MarkerImage(
             'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ color +'|40|_|%E2%80%A2',
                   new google.maps.Size(21, 34),
                   new google.maps.Point(0, 0),
                   new google.maps.Point(10, 34),
                   new google.maps.Size(21,34));
                   return markerIcon;
               };

            /*   var location = function(info)
               {
                 var self = this;
                 this.name = info.name;
                 this.lat = info.lat;
                 this.lng = info.lng;
                 this.URL = "";
                 this.street = "";
                 this.city = "";
                 client_id = WIHER35QWOA1G2FUHTFCNH03YMDGNCVNX3BECG51JZQWTTWJ;
                 client_secret = ZIDSR0TARBSWAKITLFZO5YTYB2EPGP55SZDIHZE2GL2QLOOY;

                 this.visible = ko.observable(true);
                 var URL1 = 'https://api.foursquare.com/v2/venues/search?11='+this.lat + ',' + this.lng + ',' + '&client_id' +
                 client_id + '&client_secret' + client_secret + this.URL + this.street + this.city + this.name ;

                 $.getJSON(URL1).done(function(info) {
 		             var res = data.response.venues[0];
 		             self.URL = res.url;
 		              if (typeof self.URL === 'undefined'){
 			            self.URL = "";
 		             }
 		              self.street = res.location.formattedAddress[0];
             		  if(typeof self.street === 'undefined'){
             			self.street = " not available";
             		}
                  	self.city = res.location.formattedAddress[1];
             			if(typeof self.city === 'undefined'){
             				self.city = " not available";
             			}

                 	}).fail(function() {
                 		alert(" Please refresh the page.");
                 	});*/





       function ViewModel(marker) {
        var self = this;
      //Gets value from the search and filters through the array.
        self.filter = ko.observable('');
      //Sets the locationArray as a ko.observableArray.
        self.items = ko.observableArray(locationArray);

      //Computed function that filters through the locationArray
        self.filteredItems = ko.computed(function() {
          var filter = self.filter();
          if (!filter) {
          for(var j = 0; j < markers.length; j++)
          {

            markers[j].setVisible()
            console.log(markers)
          }
          return self.items();
          }
          return self.items().filter(function(j) {
          var m= j.title.toLowerCase().indexOf(filter) > -1;
          j.marker.setVisible(m);
          return m;
      });
    }
  }

  };
