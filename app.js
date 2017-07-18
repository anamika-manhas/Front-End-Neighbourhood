var map;
//Create a new blank array for all the listing markers.
var locations = [{
        title: 'KC PLAZA',
        location: {
            lat: 33.4048658,
            lng: 75.0624122
        },
        venueID: '4bd1cf695e0cce727706a284'
    },
    {
        title: 'WAVE MALL',
        location: {
            lat: 32.7099595,
            lng: 74.8906963
        },
        venueID: '5380cde6498e15919e8c5ae9'
    },
    {
        title: 'COLOR LOUNGE',
        location: {
            lat: 32.7119114,
            lng: 74.8609743
        },
        venueID: '5433c575498ec4159f691dc0'
    },
    {
        title: 'HARI NIWAS',
        location: {
            lat: 32.7464754,
            lng: 74.8706109
        },
        venueID: '4bd77f31304fce72a7a333ab'
    },
    {
        title: 'UNIVERSITY OF JAMMU',
        location: {
            lat: 32.7193745,
            lng: 74.8658743
        },
        venueID: '51590ebce4b03caa2892f8fb'
    },

];

var myViewmodel = function() {
    var self = this;
    //style the markers a bit. this will be our listening  marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
    //create a highlightes location marker when user mouse over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');
    var infoWindow = new google.maps.InfoWindow();
    self.markers = ko.observableArray();

    function suc(data) {
        likes = data.response.venue.likes.count;
    }

    function err(e) {
        console.log("Error fetching data");
    }

    function Highlight() {
        this.setIcon(highlightedIcon);
    }

    function Default() {
        this.setIcon(defaultIcon);
    }

    function Open() {
        openInfowindow(this, infoWindow);
    }

    for (var i = 0; i < locations.length; i++) {
        // get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        var likes = 0;
        //create a marker per location, and put into markers array.

        $.ajax({

            url: 'https://api.foursquare.com/v2/venues/' + locations[i].venueID + '?client_id=WIHER35QWOA1G2FUHTFCNH03YMDGNCVNX3BECG51JZQWTTWJ&client_secret=ZIDSR0TARBSWAKITLFZO5YTYB2EPGP55SZDIHZE2GL2QLOOY&v=20170714',
            async: false,
            success: suc,
            error: err
        });
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            likes: likes,
            icon: defaultIcon,
            show: ko.observable(true),
            animation: google.maps.Animation.DROP,
        });
        self.markers.push(marker);
        marker.addListener('mouseover', Highlight);

        marker.addListener('mouseout', Default);

        marker.addListener('click', Open);




    }

    function openInfowindow(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
        }

        infowindow.setContent('<div>' + marker.title + '</div>' + '<div>Likes: ' + marker.likes + '</div>');
        infowindow.open(map, marker);

        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });

    }

    this.markerwindow = function(marker) {
        openInfowindow(marker, infoWindow);
        marker.setAnimation(google.maps.Animation.DROP);
    };


    function makeMarkerIcon(color) {
        var markerIcon = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + color + '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerIcon;
    }
    self.abc = ko.observable('');
    this.filterInput = function() {
        infoWindow.close();
        var currentinput = self.abc();

        for (var i = 0; i < self.markers().length; i++) {
            if (self.markers()[i].title.toLowerCase().indexOf(currentinput.toLowerCase()) > -1) {
                self.markers()[i].setVisible(true);
                self.markers()[i].show(true);

            } else {
                self.markers()[i].show(false);
                self.markers()[i].setVisible(false);
            }
        }

    };

    //      
};