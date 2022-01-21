let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener('click', async function() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
});

click_button.addEventListener('click', function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');
    // data url of the image
    console.log("ImageDataURL",image_data_url);
    dados[3]=image_data_url;
    console.log(dados);
    //saveI();
    const image = document.createElement("img");
    document.getElementById("bloco2").appendChild(image);
    image.src = dados[3];
    image.width=0;


    //document.body.appendChild(image);


    //console.log("Dados 2:", dados[2]);


    //console.log("DADOS666",dados[6]);

    function blobToDataURL(blob2, callback) {
        var a = new FileReader();
        a.onload = function(e) {callback(e.target.result);}
        a.readAsDataURL(blob2);
    }

//test:
    var blob2 = dados[6];
    console.log("Blobvar",blob2);
    blobToDataURL(blob2, function(dataurl){
        console.log("DATAURL",dataurl);
        dados[7]=dataurl;
    });


    console.log("Image:", image);
    stopStreamedVideo(video);
});




function saveI() {


    var canvas2 = document.getElementById("canvas");
    var dataURL = canvas2.toDataURL("image/jpeg");
    var newTab = window.open('about:blank', 'image from canvas');
    newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
}


function stopStreamedVideo(video) {
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
        track.stop();
    });

    video.srcObject = null;
}

// Save | Download image
/*
function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}
*/
