

function init()
{
    //console.log("in init");
    //request = new XMLHttpRequest();

    //request.onreadystatechange = getLocation;  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(dataReady, errorHandler);
    }else{
        alert("Geolocation is not supported by your web browser.  What a shame!");
    } 
}


function errorHandler(err){
    
    if(err.code == 1) {
        alert("Error: Access is denied.");
    }else if( err.code == 2) {
        alert("Error: Position is unavailable.");
    }
    
}

/*
function getLocation()
{
	console.log("in getlocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(dataReady, errorHandler);
    }else{
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }

}*/

function dataReady(position)
{
	lat = position.coords.latitude;
    lng = position.coords.longitude;

    var key = "AIzaSyAtlnmbZ0E_19gCzP128pD6B1DGvKeeaZw";
    var URLstring = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng;
    URLstring += "&types=atm&sensor=true&rankby=distance&key=";
    URLstring += key;

    request = new XMLHttpRequest();
    request.open("get", URLstring, true); 
    request.onreadystatechange = getATMS;
    request.send(null); 
}

function getATMS() 
{
	if (request.readyState == 4 && request.status == 200) {
   		atmList = JSON.parse(request.responseText);

        var landmark = new google.maps.LatLng(lat, lng);

        var myOptions = {
            zoom: 15, 
            center: landmark,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        var marker = new google.maps.Marker({
            position: landmark,
            title: "Your Location",
            icon: "http://maps.google.com/mapfiles/arrow.png"
        });
        marker.setMap(map);

        var closest = atmList["results"][0];
        position_info = '<h1>You are here</h1>' + "The closest ATM is a " + closest["name"] + ", located at " + closest["vicinity"] + ".";

    
        var infowindow = new google.maps.InfoWindow();

        
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(position_info);
            infowindow.open(map, marker);
        });

        showATM(map, atmList);
    }
    
}

function showATM(map, atmList)
{
    var numatm = Object.keys(atmList["results"]).length;
    for (var i = 0; i < numatm; i++){
        var atm = atmList["results"][i];
        var coords = new google.maps.LatLng(atm["geometry"]["location"]["lat"], atm["geometry"]["location"]["lng"])
        var marker = new google.maps.Marker({
            position: coords,
            title: atm["name"]
        });
        marker.setMap(map);

        var contentString = '<h1>' + atm["name"] + '</h1>' + atm["vicinity"];

        if (atm["opening_hours"] != null) {
            if (atm["opening_hours"]["open_now"] == true) {
                contentString += '</br>' + "Currently open.";
            } else if (atm["opening_hours"]["open_now"] == false) {
                contentString += '</br>' + "Currently closed.";
            }
        }

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        listenMarker(marker, map, infowindow);
    }
}



function listenMarker(marker, map, infowindow)
{
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}












