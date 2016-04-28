
            
var icons = [1, 2, 3, 4, 5];
   
   

 /* Create one square for our app at position x and y and width and height with our settings */      
function createPrototype(x, y, width, height) {   
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    //Create the app "icon".
    drawRect(x, y, width, height);
    //Write the app "name" to the icon.
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Sans Serif";
    ctx.fillText("Calendar", x + 5, (y+15));
    ctx.fillText("App", (width/3) + x, (height/3) + (y+15)); 
}

// get the position of the click
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
}

// printing the position
function printPosition() {
    document.getElementById("divClick").innerHTML = sqMes;
}

// listener for the mouse + get postion + print the position
function mouseDown(xPos, yPos, xSize, ySize) {
    var canvas = document.getElementById('canvas');
    
    //The mouseclick event listener.
    canvas.addEventListener('mousedown', function(evt) {
        
        var mousePos = getMousePos(canvas, evt);
        sqMes = 'SQUARE CLICKED: ' + mousePos.x + ', ' + 
                Math.round(mousePos.y);
        printPosition();
    }, false);
}




/* Create one square for an app at position x and y and width and height */
function drawRect(x, y, width, height) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#b3b3b3";
    //Create Rectangle
    ctx.fillRect(x, y, width, height);
    // add click
    mouseDown(x, y, width, height);

}


/* start the emulator to draw the different apps on the watch and our specific app icon */ 
function startEmulator() {
    //Create the Canvas stuff
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    //ctx.clear();
    canvasWidth = 320;
    canvasHeight = 320;
    var offset = 60;
      
    //drawing the position of our app and other apps
    for (j = 0; j < icons.length; j++) {    
        for (i = 0; i < icons.length; i++) {
            if(i === 2 && j === 2) {
                createPrototype(90 + (i * offset), 92 + (j * offset), 
                            50, 50);
            } else {
                drawRect(90 + (i * offset), 92+ (j * offset), 
                            50, 50);
            }                     
        }
    }
}
