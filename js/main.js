var geoController = {
    "init": function(){
        geoController.methods.detectGeolocation();
        geoController.methods.showMapInit();
    },
    "parameters" : {
        "latitude": null,
        "longitude ": null,
    },
    "places" : [],
    "methods" : {
        "show_position": function(position){
            var mapMsg = document.getElementById('map-msg');

            geoController.parameters.latitude = position.coords.latitude;
            geoController.parameters.longitude = position.coords.longitude;

            var latitude = geoController.parameters.latitude;
            var longitude = geoController.parameters.longitude;
            var altitude = position.coords.altitude;
            var accuracy = position.coords.accuracy + " metros";
            var timestamp = position.coords.timestamp;

            mapMsg.innerHTML = latitude;
            mapMsg.innerHTML += longitude;
            mapMsg.innerHTML += accuracy;
        },
        "detectGeolocation": function(){
            var msgBox = document.getElementById('msg-box');

            if ('geolocation' in navigator) {
                msgBox.className = "success-box";
                msgBox.innerHTML = "Yay! Tenemos soporte para Geolocalización!";

                navigator.geolocation.getCurrentPosition(geoController.methods.show_position);

            } else {
                msgBox.className = "fail-box";
                msgBox.innerHTML = "Sorry, tu dispositivo es una mega carreta!";
            }
        },
        "showMapInit": function(){
            var showMapButton = document.getElementById('show-map');
            showMapButton.onclick=function(){
                geoController.methods.showMapContainer();
            };
        },
        "setLocations" : function(){
            geoController.places.push(['MRM BA', geoController.parameters.latitude, geoController.parameters.longitude, 3]);
        },
        "gMapsInitializer": function(){
            var map,
            mapOptions = {
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.SATELLITE
                  };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var options = {
            map: map,
            position: new google.maps.LatLng(geoController.parameters.latitude, geoController.parameters.longitude)
            };

            var infowindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);

            geoController.methods.setMarkers(map, geoController.places);
        },
        "showMapContainer": function(){
        	document.getElementById("show-map").style.display="none";
            document.getElementById("map").style.display="block";
            geoController.methods.setLocations();
            geoController.methods.gMapsInitializer();
        },
        
        "setMarkers": function(map, locations){
            var image = {
              url: 'http://files.softicons.com/download/web-icons/vista-map-markers-icons-by-icons-land/png/32x32/MapMarker_Ball_Left_Pink.png',
              // This marker is 20 pixels wide by 32 pixels tall.
              size: new google.maps.Size(32, 37),
              // The origin for this image is 0,0.
              origin: new google.maps.Point(0,0),
              // The anchor for this image is the base of the flagpole at 0,32.
              anchor: new google.maps.Point(0, 32)
            };
            var shape = {
                coord: [1, 1, 1, 20, 18, 20, 18 , 1],
                type: 'poly'
            };
            console.log(locations);
            for (var i = 0; i < locations.length; i++) {
              var beach = locations[i];
              var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
              var marker = new google.maps.Marker({
                  position: myLatLng,
                  map: map,              
                  icon: image,
                  shape: shape,
                  title: beach[0],
                  zIndex: beach[3]
              });
            }
        }
    }
}

geoController.init();