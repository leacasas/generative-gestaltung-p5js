// jshint ignore: start
var actRandomSeed = 0;
var fader = 0;
var amountOfCircles = 32;
var circles = [];

function setup(){
    createCanvas(640, 640);
    smooth();

    actRandomSeed = random(100000);

    for(var i = 0; i < amountOfCircles; i++)
        circles[i] = new Circle(300-i*10, 100-i*2, width/2, height/2);

    colorMode(HSB);
}

function draw(){
    background(255);
    noStroke();

    // faderX value between 0 and 1
    if(fader < 1)
        fader += 0.01;
    
    // Setting seed value for all random() calls
    randomSeed(actRandomSeed);

    for(var i = 0; i < amountOfCircles; i++)
        circles[i].order(fader);
}

var Circle = function(d, b, ox, oy){
    this.count = int(d * 0.66);
    this.dim = d;
    this.brightness = b;
    this.angle = radians(360 / this.count);
    this.ox = ox;
    this.oy = oy;
};
Circle.prototype.order = function(fader){
    // Calculating angle increments according to the number of elements
    for(var i = 0; i < this.count; i++){
        var a = this.angle * i;

        // Random x and y coordinates
        var randomX = random(0, width);
        var randomY = random(0, height);

        // Calculating coordinates within the circle perimeter
        // x : r + cos(angle), y: r + sin(angle) 
        // Varying the factor at the end would give ellipses
        var circleX = this.ox + cos(a) * this.dim;
        var circleY = this.oy + sin(a) * this.dim;

        // Linear interpolation between random coordinates and cicle coordinates
        // using faderX as the factor
        var x = lerp(randomX, circleX, fader);
        var y = lerp(randomY, circleY, fader);
        
        fill(degrees(a), 100, this.brightness);
        ellipse(x, y, 8, 8);
    }
};