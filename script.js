(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "02/23/",
      birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  //end
  
  const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("headline").innerText = "It's my birthday!";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0)
  }());
const langs = [
	"10101010",
	"1010101010101",
	"000101010101",
	"111001",
	"11010101",
	"11010101",
	"000101010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"11010101",
	"01010101010",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
	"000101010101",
	"000101010101",
	"0101",
	"000101010101",
	"0101",
	"11010101",
	"0101",
	"11010101",
];

let charSize = 18;
let fallRate = charSize / 2;
let streams;

// -------------------------------
class Char {
	constructor(value, x, y, speed) {
		this.value = value;
		this.x = x;
		this.y = y;
		this.speed = speed;
	}

	draw() {
		const flick = random(100);
		// 10 percent chance of flickering a number instead
		if (flick < 10) {
			fill(120, 30, 100);
			text(round(random(9)), this.x, this.y);
		} else {
			text(this.value, this.x, this.y);
		}

		// fall down
		this.y = this.y > height ? 0 : this.y + this.speed;
	}
}

// -------------------------------------
class Stream {
	constructor(text, x) {
		const y = random(text.length * 4);
		const speed = random(2, 10);
		this.chars = [];

		for (let i = text.length; i >= 0; i--) {
			this.chars.push(
				new Char(text[i], x, (y + text.length - i) * charSize, speed)
			);
		}
	}

	draw() {
		fill(120, 100, 100);
		this.chars.forEach((c, i) => {
			// 30 percent chance of lit tail
			const lit = random(100);
			if (lit < 30) {
				if (i === this.chars.length - 1) {
					fill(120, 30, 100);
				} else {
					fill(120, 100, 90);
				}
			}

			c.draw();
		});
	}
}

function createStreams() {
	// create random streams from langs that span the width
	for (let i = 0; i < width; i += charSize) {
		streams.push(new Stream(random(langs), i));
	}
}

function reset() {
	streams = [];
	createStreams();
}

function setup() {
	createCanvas(innerWidth, innerHeight);
	reset();
	frameRate(60);
	colorMode(HSB);
	noStroke();
	textSize(charSize);
	textFont("monospace");
	background(0);
}

function draw() {
	background(0, 0.4);
	streams.forEach((s) => s.draw());
}

function windowResized() {
	resizeCanvas(innerWidth, innerHeight);
	background(0);
	reset();
}
