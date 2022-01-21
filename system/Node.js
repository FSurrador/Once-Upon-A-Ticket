


const dados=[];



var search = "";
var fullname = "";
if(search==="") {
	console.log("Retry");
}

	function Start() {
	search= document.getElementById("myMovie").value;
	fullname= document.getElementById("fullname").value;
	dados[11]=fullname;



var found = new Boolean(false);


const movienames = {
	"async": true,
	"crossDomain": true,
	"url": "https://imdb8.p.rapidapi.com/auto-complete?q=" + search,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "1ea478fcf0msha2ce9cef5d95200p14718bjsn368ffca18e63"
	}
};

$.ajax(movienames).done(function (data) {
	//console.log(data);

    var movie = data.d[0].l;
    dados[0]=movie;
    var cast = data.d[0].s;
	const castsplit = cast.split(", ");
	console.log("Array Split"+castsplit[0]);
	console.log("Array Split"+castsplit[1]);
    dados[13]=castsplit[0];
	dados[14]=castsplit[1];
	var movieid = data.d[0].id;

	var movieyear = data.d[0].y;
	dados[10]=movieyear;
	
	//console.log("Actor Name:"+actorname);
    
	//DRAW MOVIE NAME AND CAST
    $(".searched").append("Movie: "+movie);
    $(".cast").append("Cast: "+castsplit[0]+", "+castsplit[1]);
	
					const topcast = {
						"async": true,
						"crossDomain": true,
						"url": "https://imdb8.p.rapidapi.com/title/get-top-cast?tconst="+movieid,
						"method": "GET",
						"headers": {
							"x-rapidapi-host": "imdb8.p.rapidapi.com",
							"x-rapidapi-key": "1ea478fcf0msha2ce9cef5d95200p14718bjsn368ffca18e63"
						}
					};
					
					$.ajax(topcast).done(function (datacast) {
						//console.log(datacast);
						
						var randomactornum = Math.floor(Math.random() * 5);
						if(randomactornum>5){
							randomactornum = Math.floor(Math.random() * datacast.length);
						}
						var randomactorsintaxe = datacast[randomactornum];
						//console.log("Sintaxe:"+randomactorsintaxe);
						var randomactor = randomactorsintaxe.replace("/name/",'');
						//console.log("Final name:" + randomactor);

						
															const getactorname = {
																"async": true,
																"crossDomain": true,
																"url": "https://imdb8.p.rapidapi.com/actors/get-bio?nconst="+randomactor,
																"method": "GET",
																"headers": {
																	"x-rapidapi-host": "imdb8.p.rapidapi.com",
																	"x-rapidapi-key": "1ea478fcf0msha2ce9cef5d95200p14718bjsn368ffca18e63"
																}
															};
															
															$.ajax(getactorname).done(function (dataactorname) {
																//console.log(dataactorname);

																var randomactorname = dataactorname.name;

																const movieframe = {
																	"async": true,
																	"crossDomain": true,
																	"url": "https://imdb8.p.rapidapi.com/title/get-images?tconst=" + movieid + "&limit=500",
																	"method": "GET",
																	"headers": {
																		"x-rapidapi-host": "imdb8.p.rapidapi.com",
																		"x-rapidapi-key": "1ea478fcf0msha2ce9cef5d95200p14718bjsn368ffca18e63"
																	}
																};
																
																$.ajax(movieframe).done(function (dataframe) {
																	//console.log(dataframe);
																	var actframe;

																	for(var i=0; i<dataframe.images.length; i++) {

																		var randomize = Math.floor(Math.random() * dataframe.images.length);
																		console.log(randomize);
																		if(typeof dataframe.images[randomize].relatedNames !=='undefined'){
																				
																		
																		
																			for(var j=0; j<dataframe.images[randomize].relatedNames.length; j++) {
																		 		
																				
																				actframe = dataframe.images[randomize].relatedNames[j].id;
																			
																				//console.log("actframe:"+actframe);
																
																	
																		
																					if(actframe==="/name/"+randomactor) {
																						var imageurl = dataframe.images[randomize].url;
																						dados[2]=imageurl;
																						getMeta(imageurl);


																						fetch (dados[2]).then( res => res.blob()).then(blob => {
																							dados[6] = blob;
																							console.log("Here", dados[6]);
																						});






																						/*$(".frame").attr("src", imageurl);
																						$(".frame").attr("width","40%");*/
																						//$(".selectedactor").append(randomactorname);
																						found = true;



																						console.log("Dados: "+dados);
																						$('#start-camera').css('color','#f0ba28');


																						if(j>dataframe.images[randomize].relatedNames.length-1 && found==false) {
																							$(".selectedactor").append("Try Again");
																						}

																											const moviegenres = {
																												"async": true,
																												"crossDomain": true,
																												"url": "https://imdb8.p.rapidapi.com/title/get-genres?tconst="+movieid,
																												"method": "GET",
																												"headers": {
																													"x-rapidapi-host": "imdb8.p.rapidapi.com",
																													"x-rapidapi-key": "1ea478fcf0msha2ce9cef5d95200p14718bjsn368ffca18e63"
																												}
																											};

																											$.ajax(moviegenres).done(function (datagenres) {
																												console.log(datagenres);
																												var genre1=datagenres[0];
																												var genre2=datagenres[1];
																												dados[9]= genre1;
																												dados[16]=genre2;

																											});

																						break;
																					}
																				if(found==true) {
																					break;
																				}
																			}
																		}

																			

																			if(found==true) {
																				break;
																			}
																	}
																			
																	
																	
																});
															});


					});



					//GET THE FRAME WHERE A RANDOM ACTOR APPEARS
					
	
	



});

	}



