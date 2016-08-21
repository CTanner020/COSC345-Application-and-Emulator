/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Sets up the necessary variables for later use
 */

var ctx;
var boxes = [];  //An array for holding each box
var d = new Date();  //date variable used to set the date for each box
var x; //used later on to check that the month is the same
var xChange;
var yChange;
var dayNames = [" Su", "Mo", "Tu", "We", "Th", " Fr", "Sa"];
var globalDay = 0;
var globalMonth = 0;
var globalYear = 0;
var currentDate = new Date();
var monthNames = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November",
    "December"];

var dyear = new Date();
var nyear = currentDate.getFullYear();

var oldScreen = '<canvas ' +
        'onmousedown=\"mouseStart(event)\" ' + 'onmouseup=\"mouseEnd(event)\" ' +
        ' width="' + 300 + '" height="' + 300
        + '" id="' + 'canvas_1"  ' + 'style=\"border:1px solid #c3c3c3;\" ' + '>' +
        'initialisation!' +
        '</canvas>';


/*
 * A draw function for the writing in the boxes
 * drawing text at position x y
 */
var draw = function (text, x, y) {
    var c = getObject("canvas_1");
    ctx = c.getContext("2d");
    ctx.font = "18px Georgia";
    ctx.fillstyle = "#000000";
    ctx.fillText(text, x + 10, y + 20);
};

/*
 * Keeps the coordinates for a box.
 * Create object box with x y position height and width and which day.
 * These are not the visible boxes, just the co-ordinates that they respond to
 * and their day.
 */
var Box = function (x, y, width, height, day) {
	
    this.left = x;
    this.right = x + width;
    this.top = y;
    this.bottom = y + height;
    this.day = day;
};


/*
 * Draws a box, then stores the coordinates in the array
 * with a text at position x and y and define the width height
 */
var drawBox = function (text, x, y, width, height) {
    var c = getObject("canvas_1");
    var rect = c.getBoundingClientRect();
    draw(text, x, y);
    var box = new Box(x + rect.left, y + rect.top, width, height, text);
    boxes.push(box);
};


/*
 * Draws the days of the month on the screen. This is the visible part of the app.
 */
function drawTwo() {
    boxes = [];
    var c = getObject("canvas_1");
    ctx = c.getContext("2d");
    var boxWidth = (c.width - 15) / 7;  //allow 15px for the scroll bars
    var boxHeight = (c.height - 15) / 7;
    x = d.getMonth();
    var day = d.getDate();
    var y = d.getFullYear();
    d.setDate(1);


    for (i = 0; i < dayNames.length; i++) {
        ctx.fillStyle = "#000000";
        ctx.font = "14px Georgia";
        ctx.fillText(monthNames[d.getMonth()], 20, 20);
        ctx.fillText(d.getFullYear(), 100, 20);
        ctx.fillText(dayNames[i], (5 + i * boxWidth), 45);
    }
    
    ctx.fillStyle = "white";
    ctx.fillRect(205, 5, 90, 24);
    ctx.fillStyle = "#000000";
    drawBox("view app", 190, 3, 90, 24);

    var dlocal = new Date();
    var mlocal = dlocal.getMonth();
    var dalocal = dlocal.getDate();
    for (i = 0; i <= 6; i++) {
        for (j = 0; j <= 6; j++) { //Makes a grid for drawing
            if (j === d.getDay() && x === d.getMonth()) { //Checks for the day being valid

                if (d.getDate() === dalocal && mlocal === x) {
                    ctx.fillStyle = "white";
                } else {
                    ctx.fillStyle = "lightblue";
                }
                ctx.fillRect((0 + j * boxWidth), (55 + i * boxHeight), (boxWidth - 9), (boxHeight - 9)); //Draws squares to show each box
                ctx.fillStyle = "#000000";
                drawBox(d.getDate(), (0 + j * boxWidth), (55 + i * boxHeight), (boxWidth - 9), (boxHeight - 9)); //Draws the proper boxes
                d.setDate(d.getDate() + 1); //increases the day so that we can draw the next one
            }
        }
    }
    d.setDate(day);
    d.setMonth(x);
    d.setFullYear(y);
    x = 0;
}

/*
 * This is called to start the application itself.
 */
var prototype = (function () {
    "use strict";

    var pub = {};

    pub.protoInitialise = function () {
        writeContentTo(oldScreen, "test");
        drawTwo();
    };
    return pub;
}());

/*
 * Save the appt to data storage with the information given by the user.
 * Ends by returning to the previous screen.
 */
function saveAppt() {
    var mycomment = getElementValue("comment");
    var mytime = getElementValue("time");
    var itemList;
    itemList = getData("appointments");
    if (itemList) {
        itemList = JSON.parse(itemList);
    } else {
        itemList = [];
    }
    newItem = {};
    newItem.comment = mycomment;
    newItem.date = globalMonth + "-" + globalDay + "-" + globalYear + "    " + mytime;
    itemList.push(newItem);
    setData("appointments", JSON.stringify(itemList));
    d.setMonth(x);
    resetDisplay(oldScreen);
    drawTwo();
}

/*
 * delete appointment.
 */
function DeleteAppt(elmnt) {
    var theappt = elmnt.value;
    deleteInData(theappt);
}

/*
 * button back to go back to the app.
 */
function back() {
    d.setMonth(x);
    resetDisplay(oldScreen);
    drawTwo();
}

/*
 * save information in the cookie.
 */
function setData(name, value, hours) {
    var date, expires;
    name = encodeURIComponent(name);
    value = encodeURIComponent(value);
    if (hours) {
        date = new Date();
        date.setHours(date.getHours + hours);
        expires = "; expires=" + date.toString();
    } else {
        expires = "";
    }
    storeData(name + "=" + value + expires + "; path=/");
}

/*had to make a special testing version of setData so the program would
continue to work during testing*/
function setDataTest(name, value, hours) {
	
    var date, expires;
    name = encodeURIComponent(name);
    value = encodeURIComponent(value);
    if (hours) {
        date = new Date();
	  	date.setHours(date.getHours + hours);
		expires = "; expires=" + date.toString();
	
    } else {
        expires = "";
    }
    //testing otuput to the document cookie
	var outputToCookie = name + "=" + value + expires + "; path=/";
	
	
	//No Hours test-----------------------------------------------
	if(hours === undefined){
	if(outputToCookie === "appointments=%5Bobject%20Object%5D; path=/"){	
	testOutput(true,"setData No Hours test");
	}else{
	testOutput(false,"setData no Hours test");
	}

	}
	
	//Invalid date test----------------------------------------------
	if(hours === 0.5){
	if(outputToCookie === "appointments=%5Bobject%20Object%5D; expires=Invalid Date; path=/"){	
	testOutput(true,"setData Invalid Date test");
	}else{
	testOutput(false,"setData Invalid Date test");
	}

	}

}

/*
 * get the information from cookie.
 */
function getData(name) {
    var name2, data, datum, i;
    name = encodeURIComponent(name);
    name2 = name + "=";
    data = returnData();
    for (i = 0; i < data.length; i += 1) {
        datum = data[i].trim();
        if (datum.indexOf(name2) === 0) {
			//console.log(bs);
            return decodeURIComponent(datum.substring(name2.length, datum.length));
			//console.log();
        }
    }
    return null;
}


/*
 * delete elements that are null in the itemlist.
 */
function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

/*
 * get element in a cookie at position num.
 */
function deleteInData(num) {
	console.log(num);
    var itemList;
    itemList = getData("appointments");
	//itemList = "comment":"asd","date":"August-2-2016    ";
	console.log("appointments");
	console.log(itemList);
	console.log(typeof itemList);
    itemList = JSON.parse(itemList);
	console.log(itemList[num]);
    delete itemList[num];
	
    itemList = cleanArray(itemList);
    setData("appointments", JSON.stringify(itemList), 0.5);
    resetDisplay(oldScreen);
    showAppointments();
}

function deleteInDataTest(num) {
	console.log(num);
    var itemList;
    itemList = {"comment":"asd","date":"August-2-2016    "};
	console.log(itemList);
	console.log(typeof itemList);
    itemList = JSON.parse(itemList);
	console.log(itemList[num]);
    delete itemList[num];
	
    itemList = cleanArray(itemList);
    setData("appointments", JSON.stringify(itemList), 0.5);
    resetDisplay(oldScreen);
    showAppointments();
}

/*
 * calculate the absolute value of x number.
 */
function abs(x) {
    if (x < 0) {
        return -x;
    } else {
        return x;
    }
}

/*
 * This code determines what to do in response to the mouse actions that are
 * handled by the emulator.
 * -Triggers showAppointments() if "view app" was clicked
 * -Triggers a new appointment if a day was clicked
 * -A swipe will alter the month
 */
function actionCheck(xEnd, yEnd, xChange, yChange) {
    x = d.getMonth();
    year = d.getFullYear();
	
	
	//click test
	if(xEnd===233){
	if(abs(xChange) ==0 && abs(yChange) ==0){	
	testOutput(true,"actionCheck click test");
	}else{
	testOutput(false,"actionCheck click test");	
	}
	}
	//swipe left test
	if(xEnd===156){
	if (30 < xChange){	
	testOutput(true,"actionCheck swipe left test");
	}else{
	testOutput(false,"actionCheck swipe left test");	
	}
	}
	//swipe right test
	if(xEnd===359){
	if (-30 > xChange){	
	testOutput(true,"actionCheck swipe right test");
	}else{
	testOutput(false,"actionCheck swipe right test");	
	}
	}

    if (abs(xChange) < 10 && abs(yChange) < 10) {
        for (i = 0; i < boxes.length; i++) {
            if (xEnd < boxes[i].right && xEnd > boxes[i].left && yEnd > boxes[i].top && yEnd < boxes[i].bottom) {
                if (boxes[i].day === "view app") {
                    showAppointments();
                } else {
                    globalDay = boxes[i].day;
                    globalMonth = monthNames[x];
                    globalYear = year;
                    writeContentTo(
                            '<button onclick=' + '\"back()\" type=\"button\" id=\"back\">Back</button>' +
                            '<br>' + monthNames[x] + ' ' + globalDay + "<br>" +
                            '<br> <button onclick=' + '\"saveAppt()\" type=\"button\" id=\"demo\">Make Appointment!</button>' + ' : ' +
                            '<input id=\"comment\" type=\"text\" name=\"fname\">   <br>  ' +
                            'Select Time: <input id=\"time\" type="time" name="usr_time" step=\"1\"  value="">'
                            , "test");
                }
            }
        }

    } else {
        if (30 < xChange) {
            x++;
            d.setMonth(x);
            resetDisplay(oldScreen);
            drawTwo();
        } else {
            if (-30 > xChange) {
                x--;
                d.setMonth(x);
                resetDisplay(oldScreen);
                drawTwo();
            }
        }
    }
}

/*
 * Used to display the current appointments.
 * By having it as a separate funcion, can call it once changes are made to the
 * appointment list instead of jumping back to the month view.
 */
function showAppointments() {
    var itemList;
    itemList = getData("appointments");

    writeContentTo("", "test");
    var htmlString;
    htmlString = '<button onclick=' + '\"back()\" type=\"button\" id=\"back\">Back</button>';
    var count = 0;
    itemList = JSON.parse(itemList);

    if (itemList === null || itemList.length === 0) {
        htmlString += " <br><br>You have no appointments!";

    } else {

        htmlString += "<table><tr><th>Appointment</th><th>Date & Time</th></tr>";
        itemList.forEach(function (item) {
            htmlString += "<tr><td>" + item.comment + "</td><td>" + item.date +
                    "</td></tr><tr><td><button onclick=\"DeleteAppt(this)\" type=\"button\" value=" + count + " id=\"deleteButton\">delete </button></td></tr>";
            count = count + 1;
        });
        htmlString += "</table>";
    }
    writeContentTo(htmlString, "test");
}
