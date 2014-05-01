// ==UserScript==
// @name         Water Reminder and Breaks Basic JPC
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
function setIntervalTimes(interval){
	var i=0, remainder,hours, minutes, remainingseconds, Intervals=new Array();
	stopTime=new Date();
	startTime=new Date();

	startTime.setHours(0);
	startTime.setMinutes(0);
	stopTime.setHours(24);
	while((startTime<stopTime)||(i<10)){
		Intervals[i]=new Date();
		Intervals[i].setHours(0);
		Intervals[i].setMinutes(0);
		//remaining minutes and seconds
		remainder=(i*interval)%(60*60); 
		//remaining seconds
		remainder=remainder%60;
		Intervals[i].setSeconds(remainder);

		hours=Math.floor((i*interval)/(60*60));
		Intervals[i].setHours(hours);
		remainingSeconds=(i*interval)-(60*60*hours);
		minutes=Math.floor(remainingSeconds/60);

		Intervals[i].setMinutes(minutes);
		startTime=Intervals[i];
		/*
		console.log(i);
		console.log(i*interval);
		console.log("hours:"+hours+" minutes:"+minutes+" seconds:"+remainingSeconds);
		console.log(Intervals[i]);
		console.log("start Time: "+startTime);
		console.log("stop Time: "+stopTime);
		*/
		i+=1;
	}
	return Intervals;
}
function CheckTime(drinkingTimes,breakTimes,currentTime){
	var minus=new Date(),plus=new Date();
	var Check=0,minutes;
	minutes=currentTime.getMinutes();
	plus.setMinutes(minutes+1);
	minus.setMinutes(minutes-1);
	//console.log("current time:"+currentTime);
	//console.log("minus time:"+minus);
	//console.log("plus time:"+plus);

	for(var i=0;i<drinkingTimes.length;i++){
		//between 2 minutes
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
	var day=0,drinkingTimes=new Array(),breakTimes=new Array();
	var Repeats=setInterval(function(){
		var currentTime=new Date();
		var startDayTime=new Date();
		var stopTime=new Date();
		startDayTime.setHours(0);
		startDayTime.setMinutes(0);
		stopTime.setHours(24);
		//get times to drink
		//every 30 minutes
		drinkingTimes=setIntervalTimes(30*60,startDayTime);
		//every 3 hours
		breakTimes=setIntervalTimes(3*60*60,startDayTime);
		console.log("Day "+day);
		console.log("Current Time:"+currentTime);
		console.log("Start Time:"+startDayTime);
		console.log("Stop Time:"+stopTime);
		//console.log("breakTimes: "+breakTimes);
		//console.log("drinkingTimes: "+drinkingTimes);
	
		CheckTime(drinkingTimes,breakTimes,currentTime);
		//check to see if 24hrs has passed
		if(currentTime>stopTime){
			//clearInterval(Repeats);
			day+=1;
		}
	},60*1000);
},10*1000);