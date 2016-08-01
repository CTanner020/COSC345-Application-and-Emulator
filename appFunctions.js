/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    //Sets up the necessary variables

var ctx ;
var boxes = [];  //An array for holding each box
var d = new Date();  //date variable used to set the date for each box
d.setDate(1);         //Starts drawing on the first of the month
var x = d.getMonth(); //used later on to check that the month is the same
var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    
    
          var group = 2;
        var x1;
        var x2;
        var y1;
        var y2;
        var dateSetting = new Date();
        var dateCurrent = new Date();
        var monthNames = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November",
            "December"];

        var oldCanvas = '<canvas '  +  
                //'onmousedown=\"mouseStart(event)\" onmouseup=\"mouseEnd(event)\" '+
                ' width="' + 300 + '" height="' + 300
            + '" id="' + 'canvas_1"  ' + 'style=\"border:1px solid #c3c3c3;\" onmouseup=\"clicked(event)\" ' + '>' + 
            'initialisation!' +
            '</canvas>'; 
            
          //   <canvas id="myCanvas" width="1000" height="1000" style="border:1px solid #c3c3c3;" onmouseup="clicked(event)">
           
             /* var oldCanvas = '<canvas '  +  
                ' width="' + 300 + '" height="' + 300
            + '" id="' + 'canvas_1"  >' +
             
            '</canvas>';
            */
    
    
    
    //A draw function for the writing in the boxes
var draw = function(text,x,y){
    var c = document.getElementById("canvas_1");
    ctx = c.getContext("2d");
    ctx.font = "20px Georgia";
    ctx.fillstyle = "#000000";
    ctx.fillText(text,x+10,y+20);
};
    
    //Keeps the coordinates for a box
var Box = function(x,y,width,height,day) {
    this.left = x;
    this.right = x+width;
    this.top = y;
    this.bottom = y+height;
    this.day = day;
};
    //Draws a box, then keeps the coordinates in the array
var drawBox = function(text,x,y,width,height) {
    var c = document.getElementById("canvas_1");
    var rect = c.getBoundingClientRect();
    draw(text,x,y);
    var box = new Box(x+rect.left,y+rect.top,width,height,text);
    boxes.push(box);
};
    //Draws the days of the week across the top
    function drawTwo(){
        var c = document.getElementById("canvas_1");
        ctx = c.getContext("2d");
        var canvasWidth = c.width;
        var canvasHeight = c.height;
        var boxWidth = canvasWidth/7;
        var boxHeight = canvasHeight/7;
for(i=0;i<dayNames.length;i++){
 
    ctx.fillStyle = "#000000";
    ctx.font = "15px Georgia";
    ctx.fillText(dayNames[i],(5+i*boxWidth),20);
}
for(i=0;i<=6;i++){
    for(j=0;j<=6;j++){ //Makes a grid for drawing
	if(j===d.getDay() && x ===d.getMonth()){ //Checks for the day being valid
            ctx.fillStyle = "#FF0000";
            ctx.fillRect((0+j*boxWidth),(30+i*boxHeight),(boxWidth-10),(boxHeight-10)); //Draws squares to show each box
            ctx.fillStyle = "#000000";
            drawBox(d.getDate(),(0+j*boxWidth),(30+i*boxHeight),boxWidth,boxHeight); //Draws the proper boxes
            d.setDate(d.getDate()+1); //increases the day so that we can draw the next one
	}
    }
}
    }




var prototype = (function () {
    "use strict";
    


    var pub = {};


    pub.protoInitialise = function () {



document.getElementById("test").innerHTML = oldCanvas ; 
// 
// $.get("emulator.js", function () {
//            resetCanvas(oldCanvas);
//
//
//
//        });
         drawTwo() ; 
        
        // writeCalendar();
    };



    
    return pub;
}());



//The idea for this part is that, on mouseclick, it searches through each box
//in the array, checks if the click was in that box's area, then returns the
//date of the box. If we then combine that with a setDate(), we can go to that
//day's screen.
function clicked(event){
     //console.log("hello") ; 

    var clickedX = event.pageX;
    var clickedY = event.pageY;
    for (i=0; i<boxes.length; i++) {
        if (clickedX < boxes[i].right && clickedX > boxes[i].left && clickedY > boxes[i].top && clickedY < boxes[i].bottom) {
            alert('clicked:' + boxes[i].day);
        }
    }
};


//        
//        function draw(){
//            var canvas = document.getElementById('canvas_1');
//            if (canvas.getContext){
//                var ctx = canvas.getContext('2d');
//            }
//            
//            
//            if(group===1){
//                ctx.fillStyle = "#99b3ff"; //lightblu
//                ctx.fillRect(0,0,620,620);
//                ctx.fillStyle = "#000000";
//                ctx.font = "25px Arial";
//                ctx.fillText("Current month: "+monthNames[
//                    dateSetting.getUTCMonth()]+' '+dateSetting.getUTCFullYear(),
//                    10,50);
//                ctx.fillText("Set day: "+dateSetting.getUTCDate(),10,100);
//            }
//            
//            
//            if(group===2){
//                ctx.fillStyle = "#ff8080"; //lightred
//                ctx.fillRect(0,0,620,620);
//                ctx.fillStyle = "#000000";
//                ctx.font = "20px Arial";
//                ctx.fillText(dateSetting.toUTCString(),8,50);
//                ctx.fillText("Week setting not available yet!", 10, 100);
//            }
//            
//            
//            if(group===3){
//                ctx.fillStyle = "#b3ffb3"; //lightgreen
//                ctx.fillRect(0,0,620,620);
//                ctx.fillStyle = "#000000";
//                ctx.font = "30px Arial";
//                ctx.fillText("Set month:",10,50);
//                ctx.fillText(monthNames[dateSetting.getUTCMonth()]+' '+
//                        dateSetting.getUTCFullYear(),10,100);
//            }
//            //alert(dateSetting) ; 
//        }
//        
        
//        function mouseStart(event){
//                x1 = event.pageX;
//                y1 = event.pageY;
//        }
//        
//        function mouseEnd(event){
//                x2 = event.pageX;
//                y2 = event.pageY;
//                if(x2>x1+30 && group > 1){
//                    group = group-1;
//                } else if(x2<x1-30 && group < 3){
//                    group = group+1;
//                } else if(y2>y1+30 && group === 1){
//                    dateSetting.setUTCDate(dateSetting.getUTCDate() - 1);
//                } else if(y2>y1+30 && group === 3){
//                    dateSetting.setUTCMonth(dateSetting.getUTCMonth() - 1);
//                } else if(y2<y1-30 && group === 1){
//                    dateSetting.setUTCDate(dateSetting.getUTCDate() + 1);
//                } else if(y2<y1-30 && group === 3){
//                    dateSetting.setUTCMonth(dateSetting.getUTCMonth() + 1);
//                }
//                draw();
//        }
//        
//        



//function maxDays(mm, yyyy){
//var mDay;
//	if((mm == 3) || (mm == 5) || (mm == 8) || (mm == 10)){
//		mDay = 30;
//  	}
//  	else{
//  		mDay = 31
//  		if(mm == 1){
//   			if (yyyy/4 - parseInt(yyyy/4) != 0){
//   				mDay = 28
//   			}
//		   	else{
//   				mDay = 29
//  			}
//		}
//  }
//return mDay;
//}
//function changeBg(id){
//	if (eval(id).style.backgroundColor != "yellow"){
//		eval(id).style.backgroundColor = "yellow"
//	}
//	else{
//		eval(id).style.backgroundColor = "#ffffff"
//	}
//}
//function writeCalendar(){
//var now = new Date
//var dd = now.getDate()
//var mm = now.getMonth()
//var dow = now.getDay()
//var yyyy = now.getFullYear()
//var arrM = new Array("January","February","March","April","May","June","July","August","September","October","November","December")
//var arrY = new Array()
//	for (ii=0;ii<=4;ii++){
//		arrY[ii] = yyyy - 2 + ii
//	}
//var arrD = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat")
//
//var text = ""
//text += "<form    width = 100% height = 300% name=calForm>"
//text += "<table  width=100% height =100% border=1>"
//text += "<tr><td>"
//text += "<table width=100%  height=100% ><tr>"
//text += "<td align=left>"
//text += "<select name=selMonth onChange='changeCal()'>"
//	for (ii=0;ii<=11;ii++){
//		if (ii==mm){
//			text += "<option value= " + ii + " Selected>" + arrM[ii] + "</option>"
//		}
//		else{
//			text += "<option value= " + ii + ">" + arrM[ii] + "</option>"
//		}
//	}
//text += "</select>"
//text += "</td>"
//text += "<td align=right>"
//text += "<select name=selYear onChange='changeCal()'>"
//	for (ii=0;ii<=4;ii++){
//		if (ii==2){
//			text += "<option value= " + arrY[ii] + " Selected>" + arrY[ii] + "</option>"
//		}
//		else{
//			text += "<option value= " + arrY[ii] + ">" + arrY[ii] + "</option>"
//		}
//	}
//text += "</select>"
//text += "</td>"
//text += "</tr></table>"
//text += "</td></tr>"
//text += "<tr><td>"
//text += "<table width=100% height =100%  border=1>"
//text += "<tr>"
//	for (ii=0;ii<=6;ii++){
//		text += "<td align=center><span class=label>" + arrD[ii] + "</span></td>"
//	}
//text += "</tr>"
//aa = 0
//	for (kk=0;kk<=5;kk++){
//		text += "<tr>"
//		for (ii=0;ii<=6;ii++){
//			text += "<td align=center><span id=sp" + aa + " onClick='changeBg(this.id)'>1</span></td>"
//			aa += 1
//		}
//		text += "</tr>"
//	}
//text += "</table>"
//text += "</td></tr>"
//text += "</table>"
//text += "</form>"
//document.getElementById("test").innerHTML = text ;
// 
// changeCal() ;  
//
// 
//}
//function changeCal(){
//var now = new Date
//var dd = now.getDate()
//var mm = now.getMonth()
//var dow = now.getDay()
//var yyyy = now.getFullYear()
//var currM = parseInt(document.calForm.selMonth.value)
//var prevM
//	if (currM!=0){
//		prevM = currM - 1
//	}
//	else{
//		prevM = 11
//	}
//var currY = parseInt(document.calForm.selYear.value)
//var mmyyyy = new Date()
//mmyyyy.setFullYear(currY)
//mmyyyy.setMonth(currM)
//mmyyyy.setDate(1)
//var day1 = mmyyyy.getDay()
//	if (day1 == 0){
//		day1 = 7
//	}
//var arrN = new Array(41)
//var aa
//	for (ii=0;ii<day1;ii++){
//		arrN[ii] = maxDays((prevM),currY) - day1 + ii + 1
//	}
//	aa = 1
//	for (ii=day1;ii<=day1+maxDays(currM,currY)-1;ii++){
//		arrN[ii] = aa
//		aa += 1
//	}
//	aa = 1
//	for (ii=day1+maxDays(currM,currY);ii<=41;ii++){
//		arrN[ii] = aa
//		aa += 1
//	}
//	for (ii=0;ii<=41;ii++){
//		eval("sp"+ii).style.backgroundColor = "#FFFFFF"
//	}
//var dCount = 0
//	for (ii=0;ii<=41;ii++){
//		if (((ii<7)&&(arrN[ii]>20))||((ii>27)&&(arrN[ii]<20))){
//			eval("sp"+ii).innerHTML = arrN[ii]
//			eval("sp"+ii).className = "c3"
//		}
//		else{
//			eval("sp"+ii).innerHTML = arrN[ii]
//			if ((dCount==0)||(dCount==6)){
//				eval("sp"+ii).className = "c2"
//			}
//			else{
//				eval("sp"+ii).className = "c1"
//			}
//			if ((arrN[ii]==dd)&&(mm==currM)&&(yyyy==currY)){
//				eval("sp"+ii).style.backgroundColor="#90EE90"
//			}
//		}
//	dCount += 1
//		if (dCount>6){
//			dCount=0
//		}
//	}
//        
//}
