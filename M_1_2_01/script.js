// jshint ignore: start
var actRandomSeed = 0;
var count = 360;

function setup(){
    createCanvas(640, 640);
    cursor(CROSS);
    smooth();
}

function draw(){
    background(255);
    noStroke();

    // faderX value between 0 and 1
    var faderX = mouseX / width;

    // Setting seed value for all random() calls
    randomSeed(actRandomSeed);

    // Calculating angle increments according to the number of elements
    var angle = radians(360 / count);

    for(var i = 0; i < count; i++){

        // Random x and y coordinates
        var randomX = random(0, width);
        var randomY = random(0, height);

        // Calculating coordinates within the circle perimeter
        // x : r + cos(angle), y: r + sin(angle) 
        // Varying the factor at the end would give ellipses
        var circleX = width / 2 + cos(angle * i) * 300;
        var circleY = height / 2 + sin(angle * i) * 300;

        // Linear interpolation between random coordinates and cicle coordinates
        // using faderX as the factor
        var x = lerp(randomX, circleX, faderX);
        var y = lerp(randomY, circleY, faderX);

        fill(0, 130, 164);
        ellipse(x, y, 5, 5);
    }
}

function mouseReleased(){
    actRandomSeed = random(100000);
}