var swipe = [0, 0, 0, 0];
var swipe_state = "";

/**
 * This method sets up the emulator, setting the width, height, and event listeners.
 * @returns nothing.
 */
function emulate() {
    var c = document.getElementById("smartwatch");
    var rect;
    c.setAttribute('width', '320');
    c.setAttribute('height', '320');
    
    document.getElementById("testInput").style.display = "none";
    //document.getElementById("testText").style.display = "none";

    c.addEventListener("mousedown", function (event) {
        rect = c.getBoundingClientRect();
        swipe[0] = event.clientX - rect.left;
        swipe[1] = event.clientY - rect.top;
    });
    c.addEventListener("mouseup", function (event) {
        rect  = c.getBoundingClientRect();
        swipe[2] = event.clientX - rect.left;
        swipe[3] = event.clientY - rect.top;
        set_swipe_state();
    });
    init();
}

/**
 * This method defines a swipe based on the mousedown and mouseup event coordinates.
 * @returns nothing.
 */
function set_swipe_state() {
    if (Math.abs(swipe[0] - swipe[2]) < 10 && Math.abs(swipe[1] - swipe[3]) < 10) {
        swipe_state = "click";
    } else if (Math.abs(swipe[0] - swipe[2]) > Math.abs(swipe[1] - swipe[3])) {
        if (swipe[0] < swipe[2]) {
            swipe_state = "right";
        } else {
            swipe_state = "left";
        }
    } else {
        if (swipe[1] < swipe[3]) {
            swipe_state = "down";
        } else {
            swipe_state = "up";
        }
    }
    loc = [swipe[2], swipe[3]];
}

/**
 * This method informs the user about the swipe picked up by set_swipe_state()
 * @returns a string detailing the type of the last mouse swipe.
 */
function get_swipe_state() {
    var temp = swipe_state;
    swipe_state = "";
    return temp;
}

/**
 * This method returns the coordinates of the most recent swipe's end position.
 * @returns an array with the x and y coordinates [x, y].
 */
function get_swipe_loc(){
    return swipe;
}

/**
 * This method has an input tag appear at the bottom of the canvas for file input.
 * @param response the method to pass the returned file to.
 * @param encoding a string indicating the encoding of the expected file.
 * @returns file: a string containing the contents of the file input.
 *      file will be "EMPTY" if the file input is empty.
 * @returns fname: a string containing the name of the file.
 */
function request_input(response, encoding){
    var inputElement = document.getElementById("testInput");
    inputElement.style.display = "block";
    inputElement.addEventListener("change", function(e){
            cancel_input();
            var files = e.target.files;
            var fname = document.getElementById("testInput").value;
            var reader = new FileReader();
            //var xhr = new XMLHttpRequest;
            //xhr.open("GET", inputElement.value, true);
            reader.onload = function (event) {
                var file = event.target.result;
                if (file && file.length) {
                    response(file, fname);
                }else{
                    response("EMPTY", fname);
                }
            };
            reader.readAsText(files[0], encoding);
            //xhr.send();
        }, false);
}

/**
 * This method hides the file input tag to prevent unwanted file input.
 * @returns nothing
 */
function cancel_input(){
    document.getElementById("testInput").style.display = "none";
}

/** 
 * This method uses canvas.fillText to draw a string to the emulator.
 * @param word the string to be printed to the canvas.
 * @param x the x coordinate of the text's intended position.
 * @param y the y coordinate of the text's intended position.
 * @param colour the HTML colour that the text will have.
 * @param font the HTML font that the text will have.
 * @returns nothing
 */
function display_text(word, x, y, colour, font){
    var c = document.getElementById("smartwatch");
    var context = c.getContext("2d");
    context.font = font;
    context.textAlign = "center";
    context.fillStyle = colour;
    context.fillText(word, x, y);
}

/**
 * This method fills the canvas with a specified colour, effectively erasing everything.
 * @param colour a string specifying the HTML colour to fill the screen with.
 * @returns nothing
 */
function clear_screen(colour){
    var c = document.getElementById("smartwatch");
    var context = c.getContext("2d");
    context.fillStyle = colour;
    context.fillRect(0, 0, 350, 350);
}

/**
 * This method draws an image to the canvas.
 * @param fname the filename of the intended image.
 * @param x the x coordinate of the image's intended position.
 * @param y the y coordinate of the image's intended position.
 * @returns nothing
 */
function draw_image(fname, x, y){
    var c = document.getElementById("smartwatch");
    var context = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
        context.drawImage(img, x, y);
    };
    img.src = fname;
}

/*
 * This method has the emulator play a sound file.
 * @param fname the HTML-compatible file to be played. 
 */
function play_sound(fname){
    var sound = new Audio(fname);
    sound.play();
}