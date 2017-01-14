var entities = [];
var mX = 0;
var mY = 0;

function setup() {
	canvas = createCanvas(640, 480);
	canvas.parent('myCanvas');

	frameRate(30);

	noStroke();
	//noLoop();

	pixelDensity(1);
}

function draw() {
	background('#FBB829');

	tmp = [];
	for (var i = 0; i < entities.length; i++) {
		e = entities[i]
		if (e.update()) {
			e.draw();
			
			tmp.push(e);
		}
	}

	entities = tmp;

	//print(entities.length);
}

function mouseClicked() {
	e = new Entity(mouseX, mouseY, random(20, 75), [0, 0]);
	entities.push(e);
	//redraw();

	return false;
}

function mouseMoved() {
	s = Math.min(magnitude(mouseX - mX, mouseY - mY), 50);
	mov = normalize(mouseX - mX, mouseY - mY);
	e = new Entity(mouseX, mouseY, s, mov);
	entities.push(e);

	mX = mouseX;
	mY = mouseY;

  	return false;
}

function magnitude(x, y) {
	return sqrt(x * x + y * y);
}

function normalize(x, y) {
	m = magnitude(x, y);
	return [x / m, y / m];
}

function Entity(_x, _y, _size, _mov) {
	this.x = _x;
	this.y = _y;
	this.size = _size;

	this.color_r = 122; //andom(0.0, _value);
	this.color_g = 15; //random(0.0, _value);
	this.color_b = 36; //random(0.0, _value);
	this.color_a = 255;

	k = random(0.1, 2.0);
	this.vel_x = _mov[0] * k;
	this.vel_y = _mov[1] * k;
}



Entity.prototype.update = function() {
	this.x = this.x + this.vel_x
	this.y = this.y + this.vel_y

	this.color_a = this.color_a - 2;

	this.size = this.size - 0.2;

	alpha_condition = this.color_a > 0;
	size_condition = this.size > 0;
	x_condition = this.x > -this.size && this.x <= (width + this.size);
	y_condition = this.y > -this.size && this.y <= (height + this.size);
	return  alpha_condition && size_condition && x_condition && y_condition;
}

Entity.prototype.draw = function() {
	c = color(this.color_r, this.color_g, this.color_b, this.color_a);
	fill(c);
	ellipse(this.x, this.y, this.size, this.size);
}