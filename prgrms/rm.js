const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
const colors = ['#ff0', '#0f0', '#f00', '#00f', '#ff0'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
const numConfetti = 300;

function createConfetti() {
    for (let i = 0; i < numConfetti; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speedY: Math.random() * 5 + 2,
            speedX: (Math.random() - 0.5) * 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.1 - 0.05
        });
    }
}

function updateConfetti() {
    for (const piece of confetti) {
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.rotation += piece.rotationSpeed;

        if (piece.y > canvas.height) {
            piece.y = 0;
        }

        if (piece.x > canvas.width) {
            piece.x = 0;
        } else if (piece.x < 0) {
            piece.x = canvas.width;
        }
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const piece of confetti) {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();
    }
}

function animate() {
    updateConfetti();
    drawConfetti();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

createConfetti();
animate();
