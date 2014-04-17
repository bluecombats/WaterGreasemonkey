// ==UserScript==
// @name         Water Reminder and Breaks JPC
// @namespace     http://www.bluecombats.blogspot.com
// @description	  Reminds you when to have a drink and get away from the desk
// @include       http://www.miniclip.com/games/*
// @version        0.7
// ==/UserScript==


function doFirst(){
	var w=window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var h=window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight; 

	var boxheight=200;
	var boxwidth=200;
	var boxY=h/2-boxheight/2;
	var boxX=w/2-boxwidth/2;
	console.log(h+" "+w);
	console.log(boxY+" "+boxX);
	var box= document.createElement("div");
	box.setAttribute("id", "backgroundWaterBreak");
	box.style.display="inline";
	box.style.height=boxheight;
	box.style.width=boxwidth;
	box.style.postion="relative";
	box.style.Left=boxY;
	box.style.top=boxX;
	//box.style.z-index=1;
	box.style.borderStyle="solid";
    document.getElementsByTagName("body")[0].appendChild(box);
	document.getElementById("backgroundWaterBreak").innerHTML="smack the pony";
}
//generate times to drink
function setIntervalTimes(interval,currentTime){
	//console.log(interval);
	var stopTime=24*60*60*1000+currentTime;
	//console.log("stop time=   "+stopTime);
	var i=0, Intervals=new Array();
	while(currentTime<stopTime){
		//console.log(i);
		Intervals[i]=currentTime;
		i+=1;
		currentTime+=interval;
	}
	return Intervals;
}
function CheckTime(drinkingTimes,breakTimes,currentTime){
	var minus=currentTime-60*1000;
	var plus=currentTime+60*1000;
	console.log(currentTime);
	console.log(minus);
	console.log(plus);
	var Check=0;

	for(var i=0;i<drinkingTimes.length;i++){
		//between 2 minutes
		console.log(i+" drinkTime"+drinkingTimes[i]);
		if((drinkingTimes[i]>minus)&&(drinkingTimes[i]<plus)){
			console.log("Time to drink");
			Check+=1;
		}
		else{
			console.log("Can't have a drink yet");
		}
	}
	for(var i=0;i<breakTimes.length;i++){
		//between 2 minutes
		console.log(i+" breakTime"+breakTimes[i]);
		if(breakTimes[i]>minus&&breakTimes[i]<plus){
			console.log("Time to have a kitkat (joke)");
			Check+=2;
		}
		else{
			console.log("Can't take a break yet");
		}
	}
	if(Check==1){
		//take a drink
		display("drink");
	}
	else if(Check==2){
		//take a break
		display("break");
	}
	else{
		//take a break and a drink
		display("both");
	}
}
function display(display){
}
//Main Script starts here
doFirst();
var day=0;
do{
	console.log("Day "+day);
	day+=1;
	//get current time
	var currentTime=new Date();
	var stopTime=24*60*60*1000+currentTime.getTime();
	var time="okay";
	//get times to drink
	//every 30 minutes
	var drinkingTimes=setIntervalTimes(30*60*1000,currentTime.getTime());
	//every 3 hours
	var breakTimes=setIntervalTimes(3*60*60*1000,currentTime.getTime());
	//console.log(breakTimes);
	console.log(breakTimes.length);
	
	var Repeats=setInterval(function(){
		var currentTime=new Date();
		CheckTime(drinkingTimes,breakTimes,currentTime.getTime());
		//check to see if 24hrs has passed
		if(currentTime.getTime()<stopTime){
			clearInterval(Repeats);
			time="not okay";
		}
	},60*1000);
}
while(time=="okay");