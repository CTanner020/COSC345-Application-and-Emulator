/*
 * These are the global variables that are used later.
 */         
var icons = [1, 2, 3, 4, 5];
var x1,x2,y1,y2;

/*
 * The following 6 functions are used to mask the browser from the application.
 * Rather than making calls to browser details, the application calls these
 * functions to do those things for them.
 */
function resetDisplay(string) {
    document.getElementById("test").innerHTML = string;
}

function getObject(element){
    return document.getElementById(element);
}

function writeContentTo(content, place){
    document.getElementById(place).innerHTML = content;
}

function getElementValue(element){
    return document.getElementById(element).value;
}

function storeData(data){
    document.cookie = data;
}

function returnData(){
    return document.cookie.split(";");
	
}

 /* Create one square for our app at position x and y and width and height with our settings */      
function createPrototype(x, y, width, height) {   
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    //Create the app "icon".
    
    drawRect(x, y, width, height,actionApp);
    //Write the app "name" to the icon.
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "10px Sans Serif";
    ctx.fillText("Calendar", x + 5, (y+15));
    ctx.fillText("App", (width/3) + x, (height/3) + (y+15)); 
}


/*
 * This calls to a function in the application that starts the app itself.
 */
function actionApp() { //--different from report
       //$(function (){
	   prototype.protoInitialise();
	   //});
}

/*
 * gets the position of the initial click so that the application only starts
 * when the centre square is clicked.
 */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
}
/* Prints the position of the click. This was a feature we later removed,
 * but is still important for triggering the application.
 */
function printPosition() {
    document.getElementById("divClick").innerHTML = sqMes;
}

// listener for the mouse + get postion + print the position
function mouseDown(xPos, yPos, xSize, ySize) {
	console.log(xPos);
	console.log(yPos);
	console.log(xSize);
	console.log(ySize);
    var canvas = document.getElementById('canvas');
    
    //The mouseclick event listener.
    canvas.addEventListener('mousedown', function(evt) {
        
        var mousePos = getMousePos(canvas, evt);
        sqMes = 'SQUARE CLICKED: ' + mousePos.x + ', ' + 
                Math.round(mousePos.y);
     
    }, false);
}


function mouseDownAct(xPos, yPos, xSize, ySize,action,bol) {
	
    var canvas = document.getElementById('canvas');
    
    //The mouseclick event listener.
    canvas.addEventListener('mousedown', function(evt) {
        
        var mousePos = getMousePos(canvas, evt);
        sqMes = 'SQUARE CLICKED: ' + mousePos.x + ', ' + 
                Math.round(mousePos.y);
        

        //If Mouse Clicked on the Black Square, new message!
        if (mousePos.x <= 175 && mousePos.y <= 175
                && mousePos.x >= (125) && mousePos.y >= (125)) {
            action();
        }
    }, false);
}





/* Create one square for an app at position x and y and width and height */
function drawRect(x, y, width, height,action) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#b3b3b3";
    //Create Rectangle
    ctx.fillRect(x, y, width, height);
    // add click

    mouseDownAct(x, y, width, height,action);


}


/* start the emulator to draw the other "apps" on the watch and 
 * our specific app icon
 */ 
function startEmulator() {
    //Create the Canvas stuff
    var c = document.getElementById("canvas");
	console.log(c);
	
    var ctx = c.getContext("2d");
    var offset = 60;
      
    //drawing the position of our app and other apps
    for (j = 0; j < icons.length; j++) {    
        for (i = 0; i < icons.length; i++) {
            if(i === 2 && j === 2) {
                createPrototype( 5+ (i * offset), 5+ (j * offset), 
                            50, 50);
            } else {
                drawRect( 5+(i * offset), 5+  (j * offset), 
                            50, 50,printPosition);
            }                     
        }
    }
}

/*
 * Get position of mouse at click.
 * This is the click down for the swipe event handling.
 */
function mouseStart(event) {

    x1 = event.pageX;
    y1 = event.pageY;
}

/*
 * Get position of mouse at buttonUp.
 * This gives the position, as well as the distance that the mouse has moved.
 * It then passes all this information to the application so that it can
 * determine what changes need to happen in response to that.
 */
function mouseEnd(event){
    x2 = event.pageX;
    y2 = event.pageY;
    xChange = x1-x2;
    yChange = y1-y2;
    actionCheck(x2,y2,xChange,yChange);
}
