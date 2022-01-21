function Show() {
   $('.loading').css('display','inline-block');
    $('#percentage').css('display','flex');
    /*document.getElementsByClassName("loading").style.display="flex";
    document.getElementsByClassName("percentage").style.display="flex";
*/
}
function move() {
    var elem = document.getElementById("loadingbar");
    var width = 0;
    var id = setInterval(frame, 100);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            if(fail==false) {
                $('#generate').css('display', 'flex');
            }
        } else {
            width++;
            elem.style.width = width + '%';
            document.getElementById("percentage").innerHTML = width * 1  + '%';
        }
    }
}

function Half() {
    $('#bloco1').css('width','50%');
    $('#linha').css('width','2px');
    $('#linha').css('height','290px');
    $('#bloco2').css('width','49%');
    $('#video').css('visibility','visible');



}

/*function StartCamera() {
    $('#start-camera').css('display','flex');
}*/

function Click() {
    $('#start-camera').css('visibility','hidden');
    $('#click-photo').css('display','flex');
}
function StopVideo() {
    $('#video').css('display','none');
    $('#canvas').css('display','flex');
    $('#click-photo').css('display','none');
    $('#nextstep').css('display','flex');

}

window.onscroll = function Scrolll(){
    //console.log(window.pageYOffset);
    if (window.pageYOffset > 185) {
        document.body.style.position ="relative";
    } else {
        document.body.style.position ="unset";

    }
}
