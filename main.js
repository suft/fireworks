var fireworks = [];
var gravity;
var lemonmilk;
var title;

function preload() {
	lemonmilk = loadFont('./LemonMilk.otf')
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0, 0, 0);
	colorMode(HSB);
	stroke(255);
	strokeWeight(5);
	gravity = createVector(0, 0.125);
	fireworks.push(new Firework());
	title = wrap({
		x: width/2,
		y: height/2,
		text: 'CANADA DAY',
		font: lemonmilk,
		size: 75
	});

}

function draw() {
	colorMode(RGB);
	background(0, 0, 0, random(10, 15));
	if (random(1) < 0.1) {
		fireworks.push(new Firework());
	}
	for (var i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].render();
		if (fireworks[i].isDead()) {
			fireworks.splice(i, 1);
		}
	}
	for (var i = 0; i < title.length; i++) {
		textSize(75);
		textAlign(CENTER, CENTER);
		text(title[i].text, title[i].x, title[i].y)
	}

}

function spiral() {
	var theta = random(-TWO_PI, TWO_PI);
	var e =  Math.E;
	var t = random(-5, 5);
	var r = pow(e, t * theta)
	return {theta: theta, r: r};
}

function circle() {
	var theta = random(-TWO_PI, TWO_PI);
	var k = random(-5, 5);
	var r =  cos(k * theta);
	return {theta: theta, r: r};
}

function heart() {
	var theta = random(-TWO_PI, TWO_PI);
	var r =  sin(theta) * sqrt(abs(cos(theta))) / (sin(theta) + 7/5) - 2*sin(theta) + 2;
	return {theta: theta, r: r};
}

function oscarbutterfly() {
	var theta = random(-TWO_PI, TWO_PI);
	var r = pow(cos(5 * theta), 2) + sin(3 * theta) + 0.3;
	return {theta: theta, r: r};
}

function wrap(properties) {
    var retval = {
        lines: []
    };
    var words = split(properties.text, ' ');
    var line = '';
    for (var i = 0; i < words.length; i++) {
        var attempt = line + words[i] + ' ';
        var bounds = properties.font.textBounds(
            attempt,
            properties.x,
            properties.y,
            properties.size
        );
        retval.bounds = bounds;
        if (bounds.w > properties.max && i > 0) {
            retval.lines.push({
                text: line,
                x: properties.x,
                y: properties.y
            });
            line = words[i] + ' ';
            properties.y += bounds.h;
        } else {
            line = attempt;
        }
    }
    retval.lines.push({
        text: line,
        x: properties.x,
        y: properties.y
    });
    for (var j = 0; j < retval.lines.length; j++) {
        retval.lines[j].y -= retval.bounds.h * ((retval.lines.length - 1) / 2);
    }
    return retval.lines;
}
