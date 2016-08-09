/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    //Sets up the necessary variables

var ctx ;
var boxes = [];  //An array for holding each box
var d = new Date();  //date variable used to set the date for each box
var x; //used later on to check that the month is the same
var x1;
var x2;
var y1;
var y2;
var dayNames = [" Su","Mo", "Tu", "We", "Th", " F", "Sa"];
var globalDay = 0  ; 
var globalMonth = 0  ; 
var globalYear = nyear ; 

        var currentDate = new Date();
        var monthNames = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November",
            "December"];
        var dyear = new Date();
        var nyear = currentDate.getFullYear();

        var oldCanvas = '<canvas '  +  
                'onmousedown=\"mouseStart(event)\" ' + 'onmouseup=\"mouseEnd(event)\" '+
                ' width="' + 300 + '" height="' + 300
            + '" id="' + 'canvas_1"  ' + 'style=\"border:1px solid #c3c3c3;\" ' + '>' + 
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
        boxes = [];
        var c = document.getElementById("canvas_1");
        ctx = c.getContext("2d");
        var canvasWidth = c.width;
        var canvasHeight = c.height;
        var boxWidth = canvasWidth/7;
        var boxHeight = canvasHeight/7;
        x = d.getMonth();
        var day = d.getDate();
        d.setDate(1);
        
        
        
        for(i=0;i<dayNames.length;i++){
            ctx.fillStyle = "#000000";
            ctx.font = "15px Georgia";
            ctx.fillText(monthNames[d.getMonth()], 20, 20);
            ctx.fillText(nyear, 100, 20);
            ctx.fillText(dayNames[i],(5+i*boxWidth),45);
            ctx.fillStyle="#FF0000";
            ctx.fillRect(215,5,80,20);
            ctx.fillStyle = "#000000";
            ctx.fillText("ShowApp", 222, 20);
            drawBox("viewApp",215,5,80,20);
            
        }
        
        for(i=0;i<=6;i++){
            for(j=0;j<=6;j++){ //Makes a grid for drawing
                if(j === d.getDay() && x === d.getMonth()){ //Checks for the day being valid
                    ctx.fillStyle = "#FF0000";
                    ctx.fillRect((0+j*boxWidth),(55+i*boxHeight),(boxWidth-9),(boxHeight-9)); //Draws squares to show each box
                    ctx.fillStyle = "#000000";
                    drawBox(d.getDate(),(0+j*boxWidth),(55+i*boxHeight),(boxWidth-9),(boxHeight-9)); //Draws the proper boxes
                    d.setDate(d.getDate()+1); //increases the day so that we can draw the next one
                }
            }
        }
        d.setDate(day);
        d.setMonth(x);
        x = 0;
    }




var prototype = (function () {
    "use strict";
    


    var pub = {};


    pub.protoInitialise = function () {



document.getElementById("test").innerHTML = oldCanvas ; 
         drawTwo() ; 
    };



    
    return pub;
}());

    function saveAppt() {
        //document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
        var mycomment = document.getElementById("comment").value;

        //alert(dateSetting) ; 
        var itemList;
        itemList = getCookie("appointments");
        if (itemList) {
            itemList = JSON.parse(itemList);
        } else {
            itemList = [];
        }
        newItem = {};
        newItem.comment = mycomment;
        newItem.date = globalYear + "-" + globalMonth  + "-" + globalDay;
        itemList.push(newItem);
        setCookie("appointments", JSON.stringify(itemList), 0.5);
       d.setMonth(x);
    resetCanvas(oldCanvas);
    drawTwo() ;

    }
    
        function back() {

       d.setMonth(x);
    resetCanvas(oldCanvas);
    drawTwo() ;

    }
    //save ingo in cookie
    function setCookie(name, value, hours) {
        var date, expires;
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        if (hours) {
            date = new Date();
            date.setHours(date.getHours + hours);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    //get info from cookie
    function getCookie(name) {
        var name2, cookies, cookie, i;
        name = encodeURIComponent(name);
        name2 = name + "=";
        cookies = document.cookie.split(";");
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i].trim();
            if (cookie.indexOf(name2) === 0) {
                return decodeURIComponent(cookie.substring(name2.length, cookie.length));
            }
        }
        return null;

    }
      
        
        function mouseStart(event){
            x1 = event.pageX;
            y1 = event.pageY;
        }
        
        function mouseEnd(event){
                x2 = event.pageX;
                y2 = event.pageY;
                x = d.getMonth();
                if(x2 < (x1-30)){
                    x++;
                    d.setMonth(x);
                    resetCanvas(oldCanvas);
                    drawTwo();
                } else{
                if(x2 > (x1+30)){
                    x--;
                    d.setMonth(x);
                    resetCanvas(oldCanvas);
                    drawTwo();
                } else {
                for (i=0;i<boxes.length; i++) {
                        if (x2 < boxes[i].right && x2 > boxes[i].left && y2 > boxes[i].top && y2 < boxes[i].bottom) {
                          //  alert('clicked:' + boxes[i].day + "  "+ x  );
                          if(boxes[i].day === "viewApp"){
                              var itemList;
        itemList = getCookie("appointments");
        itemList = JSON.parse(itemList);
       var htmlString;
        htmlString = "<table>";
        htmlString += "<tr><th>Appointments </th><th>Date</th></tr>";
        itemList.forEach(function (item) {
            htmlString += "<tr><td>" + item.comment + "</td><td>" + item.date + "</td></tr>";
        });
    
        htmlString += "</table>";
         document.getElementById("test").innerHTML = htmlString  + '<button onclick=' + '\"back()\" type=\"button\" id=\"back\">Back</button>'  ;

                          } else {
                          
                           globalDay = boxes[i].day ; 
                           globalMonth = monthNames[x]  ; 
                             document.getElementById("test").innerHTML = '<button onclick=' + '\"saveAppt()\" type=\"button\" id=\"demo\">Click Me!</button>' + 
    'My comment: <input id=\"comment\" type=\"text\" name=\"fname\">   <br>  ' +
    ' for day ' + globalDay + '  and month ' + monthNames[x];
                          }
    
    
    
    
 
                        }
                    
            }
                }
            }
        }
