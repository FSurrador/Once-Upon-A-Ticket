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
let year = dados2[10];
let username = dados2[11].toUpperCase();
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

        createCanvas(500, 888);


        if (genrefinal.includes("Crime")) {
            background('#601313');
        }

        if (genrefinal.includes("Action")) {
            background('#112024');
        }

        if (genrefinal.includes("Adventure")) {
            background('#522414');
        }

        if (genrefinal.includes("Biography")) {
            background('#26454e');
        }

        if (genrefinal.includes("Comedy")) {
            background('#614415');
        }

        if (genrefinal.includes("Romance")) {
            background('#641825');
        }
        if (genrefinal.includes("Music")) {
            background('#104d10');
        }
        if (genrefinal.includes("Drama")) {
            background('#270d32');
        }

    photo.filter(GRAY);

        //INSTASTORY HERE
        if (genrefinal.includes("Crime")) {
            tint(corphoto[0]);
        }
        if (genrefinal.includes("Action")) {
            tint(corphoto[1]);
        }
        if (genrefinal.includes("Aventure")) {
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
        photo.resize(0, 146);
        imageMode(CENTER);
    console.log(photo.width);
        if (photo.width < 380) {
            translate(940,90);
            scale(1.5);
            rotate(PI/2);

            image(photo, x+380, y+450);
        }
        if (photo.width >= 380 && photo.width < 395) {
            translate(940,90);
            scale(1.5);
            rotate(PI/2);

            image(photo, x+200, y +450);
        }
        if (photo.width >= 395) {
            translate(940,90);
            scale(1.5);
            rotate(PI/2);

            image(photo, x+200, y +450);
        }
        imageMode(CORNER);

        tint(255);
        base.resize(500,0);

        if (genrefinal.includes("Crime")) {
            basevermelho.resize(500,0);
            image(basevermelho,x ,y+200 );
        }

        if (genrefinal.includes("Action")) {
            baseazulescuro.resize(500,0);
            image(baseazulescuro,x ,y+200 );
        }

        if (genrefinal.includes("Adventure")) {
            baselaranja.resize(500,0);
            image(baselaranja,x ,y +200);
        }

        if (genrefinal.includes("Biography")) {
            baseazul.resize(500,0);
            image(baseazul,x ,y +200);
        }

        if (genrefinal.includes("Comedy")) {
            baseamarelo.resize(500,0);
            image(baseamarelo,x ,y +200);
        }

        if (genrefinal.includes("Romance")) {
            baserosa.resize(500,0);
            image(baserosa,x ,y +200);
        }
        if (genrefinal.includes("Music")) {
            baseverde.resize(500,0);
            image(baseverde,x ,y +200);
        }

        if (genrefinal.includes("Drama")) {
            baseroxo.resize(500,0);
            image(baseroxo,x ,y +200);
        }



        pontos.resize(0,120);
        image(pontos, x + 170.5, y + 390);

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
            tint(corphoto[6]);
        }
        if (genrefinal.includes("Drama")) {
           tint(corphoto[7]);
        }


    console.log("WIDTH "+photo.width);
    console.log("HEIGHT "+photo.height);
        if (photo.width < 180) {
            rectangle2.resize(0,147);
            image(rectangle2, x + 176, y + 376);
        }
        if (photo.width >= 180 && photo.width < 200) {
            rectangle3.resize(0,147);
            image(rectangle3, x + 176, y + 376);
        } if(photo.width>=200) {

            rectangle.resize(0,147);
            image(rectangle, x + 176, y + 376);
        }


        tint(255);
        moldurar.resize(0,130);
        image(moldurar, x + 182, y + 385);

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
            tint(corphoto[6]);
        }
        if (genrefinal.includes("Drama")) {
            tint(corphoto[7]);
        }
        moldural.resize(0,122);
        image(moldural, x + 52, y + 390);

        tint(243);
        retangulocast.resize(0,11);
        image(retangulocast, x + 183, y + 493);

        linha.resize(60,0);
        image(linha, x + 183, y + 425);

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
            tint(corphoto[6]);
        }
        if (genrefinal.includes("Drama")) {
            tint(corphoto[7]);
        }
        qrcode.resize(45,0);
        image(qrcode, x + 85, y + 426);


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
        tint(corphoto[6]);
    }
    if (genrefinal.includes("Drama")) {
        tint(corphoto[7]);
    }
        smallticket.resize(3, 7);
        image(smallticket, x + 115.2, y + 396);


        fill(123)
            .strokeWeight(0)
            .textSize(11.1);

        textFont(fontLogo);
        text('Once Upon A T cket', x + 57, y + 402);


        fontsTitle[0] = fontTitle0;
        fontsTitle[1] = fontTitle1;
        fontsTitle[2] = fontTitle2;
        fontsTitle[3] = fontTitle3;
        fontsTitle[4] = fontTitle4;
        console.log(fontsTitle);

        //randomTitle = int(random(0, 5));
        randomTitle = 2;
        randomTitle2 = fontsTitle[randomTitle];


        textFont(randomTitle2);
        console.log("TITLE:" + randomTitle);


        if (randomTitle == 0) {

            fill(243);
            strokeWeight(0);
            textSize(75);
            if (textWidth(title) >= 460) {
                textSize(56);
                text(title, x + 366, y + 402);
            } else {
                textSize(39);
                text(title, x + 183, y + 420);
            }
            console.log(textWidth(title));

        }
        if (randomTitle == 1) {

            fill(243);
            strokeWeight(0);
            if (textWidth(title) > 400) {
                textSize(42);
            } else {
                textSize(45);
            }
            text(title, x + 183, y + 420);
        }
        if (randomTitle == 2) {

            fill(243);
            strokeWeight(0);
            console.log("Esta width:"+textWidth(title));
            if (textWidth(title) > 70) {
                textSize(25);
            } else {
                textSize(40);
            }
            text(title, x + 183, y + 415);
        }
        if (randomTitle == 3) {

            fill(243);
            strokeWeight(0);
            console.log("Width title"+textWidth(title));
            if (textWidth(title) > 190) {
                text(title, x + 183, y + 420);
                textSize(30);
            } else {
                textSize(40);
                text(title, x + 183, y + 420);
            }

        }
        if (randomTitle == 4) {

            fill(243)
                .strokeWeight(0)
                .textSize(40);
            text(title, x + 183, y + 421);
        }


        //fontsYear[0] = fontYear0;
        fontsYear[0] = fontGenre0;
        fontsYear[1] = fontGenre1;

        randomYear = int(random(0, 2));
        //randomYear = 2;
        randomYear2 = fontsYear[randomYear];
        console.log(randomYear);


        textFont(randomYear2);

        if (randomYear == 0) {

            fill(123)
                .strokeWeight(0)
                .textSize(13)
                .textStyle(BOLD);
            text(year, x + 56, y + 510);
        }
        if (randomYear == 1) {

            fill(123)
                .strokeWeight(0)
                .textSize(13)
                .textStyle(NORMAL);
            text(year, x + 56, y + 510);
        }
        if (randomYear == 2) {

            fill(123)
                .strokeWeight(0)
                .textSize(13)
                .textStyle(NORMAL);
            text(year, x + 56, y + 510);
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
            tint(corphoto[6]);
        }
        if (genrefinal.includes("Drama")) {
            tint(corphoto[7]);
        }
        strokeWeight(0);
        textSize(7);

        textFont(fontCast);
        text(cast1, x + 190, y + 501);

        textAlign(CENTER);
        text(cast2, x + 317, y + 501);

        textAlign(RIGHT);
        text(cast3, x + 436, y + 501);


        fontsGenre[0] = fontGenre0;
        fontsGenre[1] = fontGenre1;


        randomGenre = int(random(0, 2));
        //randomGenre = 2;
        randomGenre2 = fontsGenre[randomYear];

        textFont(randomGenre2);
        textAlign(LEFT);
        fill(243);
        if (randomGenre == 0) {
            textSize(11);
            console.log(randomGenre);
            text(genre1+", "+genre2, x + 183, y + 437);
            textSize(13);
            text(date, x + 183, y + 470);
            text(local, x + 183, y + 485);
        }
        if (randomGenre == 1) {
            textSize(11);
            console.log(randomGenre);
            text(genre1+", "+genre2, x + 183, y + 439);
            textSize(13);
            text(date, x + 183, y + 470);
            text(local, x + 183, y + 485);
        }


    fill(255)
        .strokeWeight(0)
        .textSize(27);

    textFont(fontLogo);
    textAlign(CENTER);
    text('Once Upon A T cket', 250, 565);


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
        tint(corphoto[6]);
    }
    if (genrefinal.includes("Drama")) {
        tint(corphoto[7]);
    }
    //tint(150);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = color(0,0,0, 100);
    smallticket.resize(6, 16);
    image(smallticket, x + 299, y + 550);

    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = color(0,0,0, 0);

    textFont(mainfont);
    textSize(12);
    text("student.dei.uc.pt/~surrador", 250,590);


    text("_"+username+"'S TICKET.", 250, 350);

    textSize(6);
    text("CREATED BY FRANCISCO SURRADOR", 250, 612);

        tint(255, 120);
        blendMode(MULTIPLY);
        paper.resize(0,146);
        image(paper, 37, 376);

    if (genrefinal.includes("Crime")) {
        fill('#601313');
    }

    if (genrefinal.includes("Action")) {
        fill('#112024');
    }

    if (genrefinal.includes("Adventure")) {
        fill('#522414');
    }

    if (genrefinal.includes("Biography")) {
        fill('#26454e');
    }

    if (genrefinal.includes("Comedy")) {
        fill('#614415');
    }

    if (genrefinal.includes("Romance")) {
        fill('#641825');
    }
    if (genrefinal.includes("Music")) {
        fill('#104d10');
    }
    if (genrefinal.includes("Drama")) {
        fill('#270d32');
    }
    blendMode(NORMAL);

    rect(width/2+249, height/2-300,60,600);




}

function mousePressed() {
    let current = get(mouseX, mouseY);
    let currentPixel = color(current);

    console.log(currentPixel);




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

