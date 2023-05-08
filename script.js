const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

// Declare mouse initialed x, y value
const mouse = {
	x: undefined,
	y: undefined,
};

// Click to create from circle
canvas.addEventListener("click", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	// drawCircle();
	for (let i = 0; i < 10; i++) {
		particleArray.push(new Particle());
	}
});

// Mouse move and loop from circle
canvas.addEventListener("mousemove", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	for (let i = 0; i < 10; i++) {
		particleArray.push(new Particle());
	}
	// particleArray.push(new Particle());
	// drawCircle();
	// console.log(mouse.x, mouse.y);
});

// Create circle function
// function drawCircle() {
// 	context.fillStyle = "blue";
// 	context.strokeStyle = "white";
// 	context.lineWidth = 5;
// 	context.beginPath();
// 	context.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
// 	context.fill();
// 	context.stroke();
// }

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		// this.x = Math.random() * canvas.width;
		// this.y = Math.random() * canvas.height;
		this.size = Math.random() * 10 + 1;
		this.speedX = Math.random() * 3 - 1.5; // direction
		this.speedY = Math.random() * 3 - 1.5;
		this.color = "hsl(" + hue + ",100%, 50%)";
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1;
	}
	draw() {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		context.fill();
	}
}

// function init() {
// 	for (let i = 0; i < 100; i++) {
// 		particleArray.push(new Particle());
// 	}
// }

// init();

function handleParticle() {
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].update();
		particleArray[i].draw();
		if (particleArray[i].size <= 0.3) {
			particleArray.splice(i, 1);
			console.log(particleArray.length);
			i--;
		}
	}
}
// Animation to circle duplicate
function animate() {
	// context.clearRect(0, 0, canvas.width, canvas.height);
	// drawCircle();
	context.fillStyle = "rgba(0,0,0,0.1)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	handleParticle();
	hue += 3;
	requestAnimationFrame(animate);
}

animate();
