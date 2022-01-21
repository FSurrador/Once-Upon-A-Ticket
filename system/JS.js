var retrievedData = localStorage.getItem("arraydata");
var dados2 = JSON.parse(retrievedData);

console.log(dados2);



    let x = 0;
    let y = 0;
    let corphoto = ["#fe503f","#498596", "#ff713e", "#4b889a", "#edb134", "#fa3d5c", "#34c634", "#8b2fb2"];
    let correct = ["#fe3f3f","#1c333a", "#e96739", "#4b889a", "#edb134", "#fa3d5c", "#2ba52b", "#8b2fb2"];

    let fontsTitle = [3];
    let fontsYear = [3];
    let fontsGenre = [3];

//let base, rectangle, pontos, photo, photomask, moldurar, moldural, retangulocast, linha, qrcode, logo, smallticket, fontLogo, fontTitle1, fontTitle2, fontTitle3, fontTitle0;

    let title = dados2[0].toUpperCase();
    let username = dados2[11].toUpperCase();
    let year = dados2[10];
    let cast1 = dados2[11].toUpperCase();
    let cast2 = dados2[13];
    let cast3 = dados2[14];
    let genre1 = dados2[9];
    let genre2 = dados2[16];
    let date = dados2[5];
    let local = dados2[4]+', Portugal';





    function preload() {
        base = loadImage('assets/base2.png');
        baserosa = loadImage('assets/baserosa.png');
        basevermelho = loadImage('assets/basevermelho.png');
        baseazulescuro = loadImage('assets/baseazulescuro.png');
        baselaranja = loadImage('assets/baselaranja.png');
        baseazul = loadImage('assets/baseazul.png');
        baseamarelo = loadImage('assets/baseamarelo.png');
        baseverde = loadImage('assets/baseverde.png');
        baseroxo = loadImage('assets/baseroxo.png');

        pontos = loadImage('assets/pontos.png');
        rectangle = loadImage('assets/rectangle.png');
        rectangle2 = loadImage('assets/rectangle2.png');
        rectangle3 = loadImage('assets/rectangle3.png');
        rectangle4 = loadImage('assets/rectangle4.png');
        photo = loadImage(dados2[8]);
        photomask = loadImage('assets/photomask.png');
        moldurar = loadImage('assets/moldurar.png');
        moldural = loadImage('assets/moldural.png');
        retangulocast = loadImage('assets/retangulocast.png');
        linha = loadImage('assets/linha.png');
        qrcode = loadImage('assets/qrcode.png');
        logo = loadImage('assets/logo.png');
        mainlogo = loadImage('assets/mainlogo.png');
        smallticket = loadImage('assets/smallticket.png');
        smallticket2 = loadImage('assets/smallticket2.png');

        fontLogo = loadFont('assets/logo/Blackford.ttf');

        fontTitle0 = loadFont('assets/title/EsthetiqueTypeface-PERSONALUSEONLY-Regular.otf');
        fontTitle1 = loadFont('assets/title/Galgo.ttf');
        fontTitle2 = loadFont('assets/title/RussoOne-Regular.ttf');
        fontTitle3 = loadFont('assets/title/TitilliumWeb-Bold.ttf');
        fontTitle4 = loadFont('assets/title/Commune NuitDebout.otf');

        //fontYear0 = loadFont('assets/year/Gaia.otf');
        fontYear1 = loadFont('assets/year/Anton-Regular.ttf');
        fontYear2 = loadFont('assets/year/MavenPro-Black.ttf');

        fontCast = loadFont('assets/cast/Bison-Bold(PersonalUse).ttf');

        fontGenre0 = loadFont('assets/genre/Voga-Medium.otf');
        fontGenre1 = loadFont('assets/genre/LionandHare-Regular.otf');


        paper = loadImage('assets/paper.png');

        mainfont = loadFont('assets/EncodeSans-Medium.ttf');

    }


    function setup() {

        let genrerandom = int(random(0,2));
        console.log("RANDOM"+genrerandom);
        let genrefinal;
        if(genrerandom===0) {
            genrefinal = dados2[9];
        }
        if(genrerandom===1) {
            genrefinal = dados2[16];
        }
        console.log(genrefinal);
        textAlign(LEFT);

            createCanvas(1003, 1003);


        if (genrefinal.includes("Crime")) {
            background(correct[0]);
        }

        if (genrefinal.includes("Action")) {
            background(correct[1]);
        }

        if (genrefinal.includes("Adventure")) {
            background(correct[2]);
        }

        if (genrefinal.includes("Biography")) {
            background(correct[3]);
        }

        if (genrefinal.includes("Comedy")) {
            background(correct[4]);
        }

        if (genrefinal.includes("Romance")) {
            background(correct[5]);
        }
        if (genrefinal.includes("Music")) {
            background(correct[6]);
        }
        if (genrefinal.includes("Drama")) {
            background(correct[7]);
        }
            else {
                background(255);
            }
//PHOTO HERE

            photo.filter(GRAY);


            if (genrefinal.includes("Crime")) {
                tint(corphoto[0]);
            }

            if (genrefinal.includes("Action")) {
                tint(corphoto[1]);
            }

            if (genrefinal.includes("Adventure")) {
                tint(corphoto[2]);
            }

            if (genrefinal.includes("Biography")) {
                tint(corphoto[3]);
            }

            if (genrefinal.includes("Comedy")) {
                tint(corphoto[4]);
            }

            if (genrefinal.includes("Romance")) {
                tint(corphoto[5]);
            }
            if (genrefinal.includes("Music")) {
                tint(corphoto[6]);
            }
            if (genrefinal.includes("Drama")) {
                tint(corphoto[7]);
            }
            photo.resize(0, 293);
            imageMode(CENTER);
            if (photo.width < 210) {
                image(photo, x + 840, y + 501);
            }
            if (photo.width>=210 && photo.width < 380) {
                image(photo, x + 780, y + 501);
            }
            if (photo.width >= 380 && photo.width < 395) {
                image(photo, x + 770, y + 501);
            }
            if (photo.width >= 395) {
                image(photo, x + 730, y + 501);
            }
            imageMode(CORNER);

            tint(255);
            base.resize(1003,0);


            if (genrefinal.includes("Crime")) {
                image(basevermelho,x ,y );
            }

            if (genrefinal.includes("Action")) {
                image(baseazulescuro,x ,y );
            }

            if (genrefinal.includes("Adventure")) {
                image(baselaranja,x ,y );
            }

            if (genrefinal.includes("Biography")) {
                image(baseazul,x ,y );
            }

            if (genrefinal.includes("Comedy")) {
                image(baseamarelo,x ,y );
            }

            if (genrefinal.includes("Romance")) {
                image(baserosa,x ,y );
            }
            if (genrefinal.includes("Music")) {
                image(baseverde,x ,y );
            }
            if (genrefinal.includes("Drama")) {
                image(baseroxo,x ,y );
            }
            //image(base, x, y);


            image(pontos, x + 341, y + 388);


            if (genrefinal.includes("Crime")) {
                tint(correct[0]);
            }

            if (genrefinal.includes("Action")) {
                tint(correct[1]);
            }

            if (genrefinal.includes("Adventure")) {
                tint(correct[2]);
            }

            if (genrefinal.includes("Biography")) {
                tint(correct[3]);
            }

            if (genrefinal.includes("Comedy")) {
                tint(correct[4]);
            }

            if (genrefinal.includes("Romance")) {
                tint(correct[5]);
            }
            if (genrefinal.includes("Music")) {
                tint(correct[6]);
            }
            if (genrefinal.includes("Drama")) {
                tint(correct[7]);
            }

            if (photo.width < 210) {
                image(rectangle4, x + 353, y + 355);
            }
            if (photo.width>=210 && photo.width < 380 ) {
                image(rectangle2, x + 353, y + 355);
            }
            if (photo.width >= 380 && photo.width < 395) {
                image(rectangle3, x + 353, y + 355);
            } if(photo.width>=395) {
                image(rectangle, x + 353, y + 355);
            }


            tint(255);
            image(moldurar, x + 365, y + 371);


            if (genrefinal.includes("Crime")) {
                tint(correct[0]);
            }
            if (genrefinal.includes("Action")) {
                tint(correct[1]);
            }
            if (genrefinal.includes("Adventure")) {
                tint(correct[2]);
            }
            if (genrefinal.includes("Biography")) {
                tint(correct[3]);
            }
            if (genrefinal.includes("Comedy")) {
                tint(correct[4]);
            }
            if (genrefinal.includes("Romance")) {
                tint(correct[5]);
            }
            if (genrefinal.includes("Music")) {
                tint(correct[6]);
            }
            if (genrefinal.includes("Drama")) {
                tint(correct[7]);
            }
            image(moldural, x + 100, y + 378);

            tint(243);
            image(retangulocast, x + 366, y + 586);

            image(linha, x + 366, y + 450);


            if (genrefinal.includes("Crime")) {
                tint(correct[0]);
            }
            if (genrefinal.includes("Action")) {
                tint(correct[1]);
            }
            if (genrefinal.includes("Adventure")) {
                tint(correct[2]);
            }
            if (genrefinal.includes("Biography")) {
                tint(correct[3]);
            }
            if (genrefinal.includes("Comedy")) {
                tint(correct[4]);
            }
            if (genrefinal.includes("Romance")) {
                tint(correct[5]);
            }
            if (genrefinal.includes("Music")) {
                tint(correct[6]);
            }
            if (genrefinal.includes("Drama")) {
                tint(correct[7]);
            }
            image(qrcode, x + 180, y + 459);



            if (genrefinal.includes("Crime")) {
                tint(correct[0]);
            }
            if (genrefinal.includes("Action")) {
                tint(correct[1]);
            }
            if (genrefinal.includes("Adventure")) {
                tint(correct[2]);
            }
            if (genrefinal.includes("Biography")) {
                tint(correct[3]);
            }
            if (genrefinal.includes("Comedy")) {
                tint(correct[4]);
            }
            if (genrefinal.includes("Romance")) {
                tint(correct[5]);
            }
            if (genrefinal.includes("Music")) {
                tint(correct[6]);
            }
            if (genrefinal.includes("Drama")) {
                tint(correct[7]);
            }
            smallticket.resize(6, 14);
            image(smallticket, x + 232, y + 391);




            fill(123)
                .strokeWeight(0)
                .textSize(23.2);

            textFont(fontLogo);
            text('Once Upon A T cket', x + 110, y + 404);


            fontsTitle[0] = fontTitle0;
            fontsTitle[1] = fontTitle1;
            fontsTitle[2] = fontTitle2;
            fontsTitle[3] = fontTitle3;
            fontsTitle[4] = fontTitle4;
            console.log(fontsTitle);

            randomTitle = int(random(0, 5));
            //randomTitle = 3;
            randomTitle2 = fontsTitle[randomTitle];


            textFont(randomTitle2);
            console.log("TITLE:" + randomTitle);


            if (randomTitle == 0) {

                fill(243);
                strokeWeight(0);
                textSize(75);
                if (textWidth(title) >= 460) {
                    textSize(56);
                    text(title, x + 366, y + 432);
                } else {
                    textSize(75);
                    text(title, x + 366, y + 440);
                }
                console.log(textWidth(title));

            }
            if (randomTitle == 1) {

                fill(243);
                strokeWeight(0);
                if (textWidth(title) > 400) {
                    textSize(80);
                } else {
                    textSize(90);
                }
                text(title, x + 366, y + 441);
            }
            if (randomTitle == 2) {

                fill(243)
                    .strokeWeight(0)
                    .textSize(55);
                text(title, x + 366, y + 430);
            }
            if (randomTitle == 3) {

                fill(243);
                strokeWeight(0);
                console.log("Width title"+textWidth(title));
                if (textWidth(title) > 190) {
                    text(title, x + 366, y + 430);
                    textSize(50);
                } else {
                    textSize(65);
                    text(title, x + 366, y + 435);
                }

            }
            if (randomTitle == 4) {

                fill(243)
                    .strokeWeight(0)
                    .textSize(80);
                text(title, x + 366, y + 441);
            }


            //fontsYear[0] = fontYear0;
            fontsYear[0] = fontGenre0;
            fontsYear[1] = fontGenre1;

            randomYear = int(random(0, 2));
            randomYear2 = fontsYear[randomYear];
            console.log(randomYear);


            textFont(randomYear2);

            if (randomYear == 0) {

                fill(123)
                    .strokeWeight(0)
                    .textSize(24)
                    .textStyle(BOLD);
                text(year, x + 110, y + 615);
            }
            if (randomYear == 1) {

                fill(123)
                    .strokeWeight(0)
                    .textSize(25)
                    .textStyle(NORMAL);
                text(year, x + 110, y + 615);
            }
            if (randomYear == 2) {

                fill(123)
                    .strokeWeight(0)
                    .textSize(40)
                    .textStyle(NORMAL);
                text(year, x + 110, y + 615);
            }


            if (genrefinal.includes("Crime")) {
                fill(correct[0]);
            }
            if (genrefinal.includes("Action")) {
                fill(correct[1]);
            }
            if (genrefinal.includes("Adventure")) {
                fill(correct[2]);
            }
            if (genrefinal.includes("Biography")) {
                fill(correct[3]);
            }
            if (genrefinal.includes("Comedy")) {
                fill(correct[4]);
            }
            if (genrefinal.includes("Romance")) {
                fill(correct[5]);
            }
            if (genrefinal.includes("Music")) {
                tint(correct[6]);
            }
            if (genrefinal.includes("Drama")) {
                tint(correct[7]);
            }
            strokeWeight(0);
            textSize(15);

            textFont(fontCast);
            text(cast1, x + 380, y + 603);

            textAlign(CENTER);
            text(cast2, x + 640, y + 603);

            textAlign(RIGHT);
            text(cast3, x + 870, y + 603);


            fontsGenre[0] = fontGenre0;
            fontsGenre[1] = fontGenre1;


            randomGenre = int(random(0, 2));
            randomGenre2 = fontsGenre[randomYear];

            textFont(randomGenre2);
            textAlign(LEFT);
            fill(243);
            if (randomGenre == 0) {
                textSize(22);
                console.log(randomGenre);
                text(genre1+"/"+genre2, x + 366, y + 476);
                textSize(25);
                text(date, x + 366, y + 540);
                text(local, x + 366, y + 570);
            }
            if (randomGenre == 1) {
                textSize(22);
                console.log(randomGenre);
                text(genre1+"/"+genre2, x + 366, y + 480);
                textSize(25);
                text(date, x + 366, y + 540);
                text(local, x + 366, y + 570);
            }




        fill(255)
            .strokeWeight(0)
            .textSize(38);

        textFont(fontLogo);
        textAlign(CENTER);
        text('Once Upon A T cket', 502, 850);


        if (genrefinal.includes("Crime")) {
            tint(correct[0]);
        }
        if (genrefinal.includes("Action")) {
            tint(correct[1]);
        }
        if (genrefinal.includes("Adventure")) {
            tint(correct[2]);
        }
        if (genrefinal.includes("Biography")) {
            tint(correct[3]);
        }
        if (genrefinal.includes("Comedy")) {
            tint(correct[4]);
        }
        if (genrefinal.includes("Romance")) {
            tint(correct[5]);
        }
        if (genrefinal.includes("Music")) {
            tint(correct[6]);
        }
        if (genrefinal.includes("Drama")) {
            tint(correct[7]);
        }
        //tint(150);
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 5;
        drawingContext.shadowBlur = 5;
        drawingContext.shadowColor = color(0,0,0, 100);
        smallticket.resize(8, 23);
        image(smallticket, x + 571, y + 829);

        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = color(0,0,0, 0);

        textFont(mainfont);
        textSize(16);
        text("student.dei.uc.pt/~surrador", 502,890);


        text("_"+username+"'S TICKET.", 502, 200);

        textSize(8);
        text("CREATED BY FRANCISCO SURRADOR", 502, 980);



            tint(255, 120);
            blendMode(MULTIPLY);
            imageMode(CORNER);
            image(paper, 72, 355);





    }

    function mousePressed() {
        console.log(smallticket.width, smallticket.height);




    }


setTimeout(function SaveURL() {
    let canvas2 = document.getElementById("defaultCanvas0");

    let image_data_url = canvas2.toDataURL('image/jpeg');
// data url of the image
console.log("ImageDataURL",image_data_url);
dados2[15]=image_data_url;


}, 2000);

function download(dataurl, filename) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = filename;
    link.click();
}

function downloadPDF() {
    // only jpeg is supported by jsPDF
    var pdf = new jsPDF();

    pdf.addImage(dados2[15], 'JPEG', 20, 20, 170,170);
    pdf.save("download.pdf");
}

var post = new Boolean(false);

function Instastory() {
    post=false;
    setup();
    setTimeout(function SaveURL() {
        let canvas2 = document.getElementById("defaultCanvas0");

        let image_data_url = canvas2.toDataURL('image/jpeg');
// data url of the image
        console.log("Okay to Download");
        dados2[15]=image_data_url;


    }, 1000);


}
function Post() {
    post=true;
    setup();
    setTimeout(function SaveURL() {
        let canvas2 = document.getElementById("defaultCanvas0");

        let image_data_url = canvas2.toDataURL('image/jpeg');
// data url of the image
        console.log("Okay to Download");
        dados2[15]=image_data_url;


    }, 1000);


}

/*window.addEventListener("load", function() {

    document.getElementById('moviename').value = dados2[0];
    document.getElementById('username').value = dados2[11];
    document.getElementById('camphoto').value = dados2[3];
    document.getElementById('ticket').value = dados2[15];




    //test:


setTimeout(function SendCanvas() {
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }
    var blob = dataURLtoBlob(dados2[15]);
    console.log(blob);




    //SEND BLOB
    var data = new FormData();
    var oReq = new XMLHttpRequest();
    oReq.open("POST", 'connection.php', true);
    oReq.onload = function (oEvent) {
        // Uploaded.
    };

    data.append('ticket', blob);
    oReq.send(data);




*/