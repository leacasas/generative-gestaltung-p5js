// jshint ignore: start
var actRandomSeed = 0;
var faderX = 0;
var circle;

function setup(){
    createCanvas(640, 640);
    cursor(CROSS);
    smooth();

    circle = new Circle(360, 300);
}

function draw(){
    background(255);
    noStroke();

    // faderX value between 0 and 1
    if(faderX < 1)
        faderX += 0.0025;
    
    // Setting seed value for all random() calls
    randomSeed(actRandomSeed);

    circle.order(faderX);
}

function mouseReleased(){
    actRandomSeed = random(100000);
}

var Circle = function(c, d){
    this.count = c;
    this.dim = d;
};
Circle.prototype.order = function(faderX){
    // Calculating angle increments according to the number of elements
    var angle = radians(360 / this.count);

    for(var i = 0; i < this.count; i++){

        // Random x and y coordinates
        var randomX = random(0, width);
        var randomY = random(0, height);

        // Calculating coordinates within the circle perimeter
        // x : r + cos(angle), y: r + sin(angle) 
        // Varying the factor at the end would give ellipses
        var circleX = width / 2 + cos(angle * i) * this.dim;
        var circleY = height / 2 + sin(angle * i) * this.dim;

        // Linear interpolation between random coordinates and cicle coordinates
        // using faderX as the factor
        var x = lerp(randomX, circleX, faderX);
        var y = lerp(randomY, circleY, faderX);

        fill(0, 130, 164);
        ellipse(x, y, 5, 5);
    }
};