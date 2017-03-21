// jshint ignore: start
var actRandomSeed = 0;
var faderX = 0;
var amountOfCircles = 24;
var circles = [];

function setup(){
    createCanvas(640, 640);
    cursor(CROSS);
    smooth();

    actRandomSeed = random(100000);

    for(var i = 0; i < amountOfCircles; i++)
        circles[i] = new Circle(300 - i*10);

    colorMode(HSB);
}

function draw(){
    background(255);
    noStroke();

    // faderX value between 0 and 1
    if(faderX < 1)
        faderX += 0.005;
    
    // Setting seed value for all random() calls
    randomSeed(actRandomSeed);

    for(var i = 0; i < amountOfCircles; i++)
        circles[i].order(faderX);
}

var Circle = function(d){
    this.count = int(d * 0.66);
    this.dim = d;
};
Circle.prototype.order = function(faderX){
    // Calculating angle increments according to the number of elements
    var angle = radians(360 / this.count);

    for(var i = 0; i < this.count; i++){
        var a = angle * i;

        // Random x and y coordinates
        var randomX = random(0, width);
        var randomY = random(0, height);

        // Calculating coordinates within the circle perimeter
        // x : r + cos(angle), y: r + sin(angle) 
        // Varying the factor at the end would give ellipses
        var circleX = width / 2 + cos(a) * this.dim;
        var circleY = height / 2 + sin(a) * this.dim;

        // Linear interpolation between random coordinates and cicle coordinates
        // using faderX as the factor
        var x = lerp(randomX, circleX, faderX);
        var y = lerp(randomY, circleY, faderX);
        
        fill(degrees(a), 100, 100);
        ellipse(x, y, 8, 8);
    }
};