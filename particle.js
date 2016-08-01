var Particle = function(x, y, hue, parent) {
	this.x = x;
	this.y = y;
	this.parent = parent;
	this.lifespan = 255;
	this.hue = hue;
	if (this.parent) {
		this.vx = 0;
		this.vy = random(-16, -12);
	} else {
		var scale = random(5, 10);
		var shape = random([spiral(), circle(), oscarbutterfly()]);
		this.vx = cos(-shape.theta) * shape.r * scale;
		this.vy = sin(-shape.theta) * shape.r * scale;
	}
	this.ax = 0;
	this.ay = 0;
};

Particle.prototype.applyForce = function(fx, fy) {
	var sway = random(-0.25, 0.25);
	this.ax += fx + sway;
	this.ay += fy;
};

Particle.prototype.isDead = function() {
	return this.lifespan < 0;
};

Particle.prototype.update = function() {
	if (!this.parent) {
		var spread = random(0.8, 0.9);
		var decay = random(2, 15);
		this.vx *= spread;
		this.vy *= spread;
		this.lifespan -= decay;
	}
	this.vx += this.ax;
	this.vy += this.ay;
	this.x += this.vx;
	this.y += this.vy;
	this.ax *= 0;
	this.ay *= 0;
};

Particle.prototype.render = function() {
	colorMode(HSB);
	if (!this.parent) {
		strokeWeight(random(2));
		stroke(this.hue, 255, 255, this.lifespan);

	} else {
		strokeWeight(random(10));
		stroke(this.hue, 255, 255);
	}
	point(this.x, this.y);

};
