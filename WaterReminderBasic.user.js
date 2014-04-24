// ==UserScript==
// @name         Water Reminder and Breaks JPC
// @namespace     http://www.bluecombats.blogspot.com
// @description	  Reminds you when to have a drink and get away from the desk
// @include       http://www.miniclip.com/games/*
// @version        0.7
// ==/UserScript==


function doFirst(){
	/*var w=window.innerWidth
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
	box.style.height=boxheight+"px";
	box.style.width=boxwidth+"px";
	box.style.postion="relative";
	box.style.left=boxY+"px";
	box.style.top=boxX+"px";
	//box.style.z-index=1;
	box.style.borderStyle="solid";
    document.getElementsByTagName("body")[0].appendChild(box);
	document.getElementById("backgroundWaterBreak").innerHTML="smack the pony";
	*/
}
//generate times to drink
function setIntervalTimes(interval,currentTime){
	//console.log(interval);
	var stopTime=24*60*60*1000+currentTime;
	//console.log("stop time=   "+stopTime);
	var i=0, Intervals=new Array();
	while(currentTime<stopTime){
		//console.log(i);
		currentTime=currentTime+(i+1)*interval;
		Intervals[i]=currentTime;
		i+=1;
	}
	return Intervals;
}
function CheckTime(drinkingTimes,breakTimes,currentTime){
	var minus=currentTime-60*1000;
	var plus=currentTime+60*1000;
	var Check=0;
	console.log("current time:"+currentTime);
	console.log("minus   time:"+minus);
	console.log("plus      time:"+plus);

	for(var i=0;i<drinkingTimes.length;i++){
		//between 2 minutes
		//console.log(i+" drinkTime"+drinkingTimes[i]);
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
		//console.log(i+" breakTime"+breakTimes[i]);
		if((breakTimes[i]>minus)&&(breakTimes[i]<plus)){
			console.log("Time to have a kitkat (joke)");
			Check+=2;
		}
		else{
			console.log("Can't take a break yet");
		}
	}
	if(Check==0){
		//do nothing
	}
	else if(Check==1){
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
	if(display=="drink"){
		alert("Have a drink");
	}
	else if(display=="break"){
		alert("Get away from your computer for 15 minutes");
	}
	else{
		alert("Get away from your computer and go and have a drink");
	}
}
//Main Script starts here
setTimeout(function(){
	doFirst();
	var day=0,stopTime,drinkingTimes=new Array(),breakTimes=new Array();
	var currentTime=new Date();
	//get times to drink
	//every 30 minutes
	drinkingTimes=setIntervalTimes(30*60*1000,currentTime.getTime());
	//every 3 hours
	breakTimes=setIntervalTimes(3*60*60*1000,currentTime.getTime());
	stopTime=24*60*60*1000+currentTime.getTime();
	var Repeats=setInterval(function(){
			console.log("Day "+day);
			//get current time
			console.log("C Time:"+currentTime.getTime());
			console.log("S Time:"+stopTime);
			console.log("breakTimes array length:"+breakTimes.length);
			console.log("drinkingTimes array length:"+drinkingTimes.length);
	
			//currentTime=new Date();
			CheckTime(drinkingTimes,breakTimes,currentTime.getTime());
			//check to see if 24hrs has passed
			if(currentTime.getTime()>stopTime){
				clearInterval(Repeats);
				day+=1;
				//get times to drink
				//every 30 minutes
				drinkingTimes=setIntervalTimes(30*60*1000,currentTime.getTime());
				//every 3 hours
				breakTimes=setIntervalTimes(3*60*60*1000,currentTime.getTime());
				stopTime=24*60*60*1000+currentTime.getTime();
			}
	},60*1000);
},10*1000);