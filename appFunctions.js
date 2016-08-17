/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Sets up the necessary variables

var ctx;
var boxes = [];  //An array for holding each box
var d = new Date();  //date variable used to set the date for each box
var x; //used later on to check that the month is the same
var x1;
var x2;
var y1;
var y2;
var dayNames = [" Su", "Mo", "Tu", "We", "Th", " F", "Sa"];
var globalDay = 0;
var globalMonth = 0;
var globalYear = nyear;
var currentDate = new Date();
var monthNames = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November",
    "December"];

var dyear = new Date();
var nyear = currentDate.getFullYear();

var oldCanvas = '<canvas ' +
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
    var c = getThing("canvas_1");
    ctx = c.getContext("2d");
    ctx.font = "18px Georgia";
    ctx.fillstyle = "#000000";
    ctx.fillText(text, x + 10, y + 20);
};

/*
 * Keeps the coordinates for a box
 * create object box with x y position height and width and which day
 */
var Box = function (x, y, width, height, day) {
    this.left = x;
    this.right = x + width;
    this.top = y;
    this.bottom = y + height;
    this.day = day;
};


/*
 * Draws a box, then keeps the coordinates in the array
 * with a text at position x and y and define the width height
 */
var drawBox = function (text, x, y, width, height) {
    var c = getThing("canvas_1");
    var rect = c.getBoundingClientRect();
    draw(text, x, y);
    var box = new Box(x + rect.left, y + rect.top, width, height, text);
    boxes.push(box);
};


/*
 * Draws the days of the week across the top for each month
 */
function drawTwo() {
    boxes = [];
    var c = getThing("canvas_1");
    ctx = c.getContext("2d");
    var boxWidth = (c.width - 15) / 7;  //allow 15px for the scroll bars
    var boxHeight = (c.height - 15) / 7;
    x = d.getMonth();
    var day = d.getDate();
    d.setDate(1);


    for (i = 0; i < dayNames.length; i++) {
        ctx.fillStyle = "#000000";
        ctx.font = "15px Georgia";
        ctx.fillText(monthNames[d.getMonth()], 20, 20);
        ctx.fillText(nyear, 100, 20);
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
    x = 0;
}

var prototype = (function () {
    "use strict";

    var pub = {};

    pub.protoInitialise = function () {
        getThing("test").innerHTML = oldCanvas;
        drawTwo();
    };
    return pub;
}());

/*
 * save appt to a cookie with the information given by the user.
 */
function saveAppt() {
    var mycomment = getThing("comment").value;
    var mytime = getThing("time").value;
    var itemList;
    itemList = getCookie("appointments");
    if (itemList) {
        itemList = JSON.parse(itemList);
    } else {
        itemList = [];
    }
    newItem = {};
    newItem.comment = mycomment;
    newItem.date = globalYear + "-" + globalMonth + "-" + globalDay + "    " + mytime;
    itemList.push(newItem);
    setCookie("appointments", JSON.stringify(itemList), 0.5);
    d.setMonth(x);
    resetCanvas(oldCanvas);
    drawTwo();
}

/*
 * delete appointment.
 */
function DeleteAppt(elmnt) {
    var theappt = elmnt.value; 
    deleteInCookie(theappt);
}

/*
 * button back to go back to the app.
 */
function back() {
    d.setMonth(x);
    resetCanvas(oldCanvas);
    drawTwo();
}

/*
 * save information in the cookie.
 */
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

/*
 * get the information from cookie.
 */
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
 * get telement in a cookie at position num.
 */
function deleteInCookie(num) {
    var itemList;
    itemList = getCookie("appointments");
    itemList = JSON.parse(itemList);
    delete itemList[num];
    itemList = cleanArray(itemList);
    setCookie("appointments", JSON.stringify(itemList), 0.5);
    resetCanvas(oldCanvas);
    drawTwo();
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
 * get position of mouse at click.
 */
function mouseStart(event) {
    x1 = event.pageX;
    y1 = event.pageY;
}

/*
 * get poistion of release mouse then define the right event is it swipe of just click and where cv.
 */
function mouseEnd(event) {
    x2 = event.pageX;
    y2 = event.pageY;
    x = d.getMonth();

    if (abs(x2 - x1) < 10 && abs(y2 - y1) < 10) {
        for (i = 0; i < boxes.length; i++) {
            if (x2 < boxes[i].right && x2 > boxes[i].left && y2 > boxes[i].top && y2 < boxes[i].bottom) {
                if (boxes[i].day === "view app") {
                    var itemList;
                    itemList = getCookie("appointments");

                    getThing("test").innerHTML = "";
                    var htmlString;
                    htmlString = '<button onclick=' + '\"back()\" type=\"button\" id=\"back\">Back</button>';
                    ;
                    count = 0;
                    itemList = JSON.parse(itemList); 
                    if (itemList.length === 0) {
                        htmlString += " <br><br>You have no appointments!";

                    } else {

                        htmlString += "<table><tr><th>Appointment   s </th><th>Date & Time</th></tr>";
                        itemList.forEach(function (item) {
                            htmlString += "<tr><td>" + item.comment + "</td><td>" + item.date +
                                    "</td></tr><tr><td><button onclick=\"DeleteAppt(this)\" type=\"button\" value=" + count + " id=\"deleteButton\">delete </button></td></tr>";
                            count = count + 1;
                        });
                        htmlString += "</table>";
                    }

                    getThing("test").innerHTML = htmlString;
                } else {
                    globalDay = boxes[i].day;
                    globalMonth = monthNames[x];
                    getThing("test").innerHTML =
                            '<button onclick=' + '\"back()\" type=\"button\" id=\"back\">Back</button>' +
                            '<br>' + monthNames[x] + ' ' + globalDay + "<br>" +
                            '<br> <button onclick=' + '\"saveAppt()\" type=\"button\" id=\"demo\">Make Appointment!</button>' + ' : ' +
                            '<input id=\"comment\" type=\"text\" name=\"fname\">   <br>  ' +
                            'Select Time: <input id=\"time\" type="time" name="usr_time" step=\"1\"  value="19:47:13">';
                }
            }
        }

    } else {
        if (30 < x1 - x2) {
            x++;
            d.setMonth(x);
            resetCanvas(oldCanvas);
            drawTwo();
        } else {
            if (30 < x2 - x1) {
                x--;
                d.setMonth(x);
                resetCanvas(oldCanvas);
                drawTwo();
            }
        }
    }
}
