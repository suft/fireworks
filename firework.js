var Firework = function() {
	this.hue = random(255);
	this.exploded = false;
	this.parent = new Particle(
		random(width),
		height,
		this.hue,
		true
	);
	this.children = [];
}

Firework.prototype.explode = function() {
	var spread = floor(random(100, 250));
	for (var i = 0; i < spread; i++) {
		var child = new Particle(this.parent.x, this.parent.y, this.hue, false);
		this.children.push(child);
	}
};

Firework.prototype.isDead = function() {
	return this.exploded && this.children.length === 0;
};

Firework.prototype.update = function() {
	if (!this.exploded) {
		this.parent.applyForce(gravity.x, gravity.y);
		this.parent.update();
		if (this.parent.vy >= 0) {
			this.exploded = true;
			this.explode();
		}
	}
	for (var i = this.children.length - 1; i >= 0; i--) {
		this.children[i].applyForce(gravity.x, gravity.y);
		this.children[i].update();
		if (this.children[i].isDead()) {
			this.children.splice(i, 1);
		}
	}
};

Firework.prototype.render = function() {
	if (!this.exploded) {
		this.parent.render();2
	}
	for (var i = this.children.length - 1; i >= 0; i--) {
		this.children[i].render();
	}
};
