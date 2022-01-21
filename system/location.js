function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];

    // Paste your LocationIQ token below.
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.e23ef5134e08a1775ce2e76aec28f03b&lat=" + lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            console.log(city);
            dados[4]=city;

            //horas

            const tyear = new Date();
            var year = tyear.getFullYear();



            const tmonth = new Date();
            var month = tmonth.getMonth();

            const tday = new Date();
            var day = tday.getDate();

            const thours = new Date();
            var hours = thours.getHours();

            const tminutes = new Date();
            var minutes = tminutes.getMinutes();

            console.log(year+"/"+month+"/"+day+"  "+hours+":"+minutes);
            dados[5]=year+"/"+month+"/"+day+"  "+hours+":"+minutes;




            return;
        }
    }
}

getCoordintes();





