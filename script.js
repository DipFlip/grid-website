const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
const gridForceSlider = document.getElementById('gridForceSlider');
const gridForceValue = document.getElementById('gridForceValue');
const gridForceReachSlider = document.getElementById('gridForceReachSlider');
const gridForceReachValue = document.getElementById('gridForceReachValue');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridSpacing = 39; // Approximately 1 cm in pixels
let forceAmount = 1;
let forceReach = 1;

function drawGrid(mouseX, mouseY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += gridSpacing) {
        const distanceX = (x - mouseX);
        const offsetX = calculateOffset(distanceX);
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSpacing) {
        const distanceY = (y - mouseY);
        const offsetY = calculateOffset(distanceY);
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(canvas.width, y + offsetY);
        ctx.stroke();
    }
}

function calculateOffset(distance) {
    let normalizedDistance = Math.abs(distance / gridSpacing);
    // normalizedDistance = normalizedDistance + 0.177;
    if (normalizedDistance >= 20 || normalizedDistance <= 0.0001) {
        return 0;
    } else {
        let difference = -normalizedDistance + forceReach;
        console.log(forceAmount)
        let offsetX = 2.718**((-1*difference**2)) / 10 * forceAmount;
        if (distance < 0) {
            offsetX = -offsetX;
        }
        return offsetX * gridSpacing;
    }
}

gridForceSlider.addEventListener('input', (event) => {
    forceAmount = parseInt(event.target.value, 10);
    gridForceValue.innerText = forceAmount;
});

gridForceReachSlider.addEventListener('input', (event) => {
    forceReach = parseInt(event.target.value, 10);
    gridForceReachValue.innerText = forceReach;
});

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    drawGrid(mouseX, mouseY);
});

// Add touch event support
canvas.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    drawGrid(mouseX, mouseY);
}, { passive: false });

// Initial draw
drawGrid(-1, -1); // Pass -1, -1 to initialize grid without any mouse interaction
