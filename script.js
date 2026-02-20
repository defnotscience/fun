document.querySelectorAll('.card-button').forEach(button => {
    // Set background image from data attribute
    const imageUrl = button.getAttribute('data-image');
    const cardImage = button.querySelector('.card-image');
    
    if (imageUrl) {
        cardImage.style.backgroundImage = `url('${imageUrl}')`;
    }
    
    // Handle click navigation
    button.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        
        if (url) {
            console.log('Navigating to:', url);
            window.location.href = url;
        } else {
            console.warn('No URL specified for this button');
        }
    });
});

function updateDeviceInfo() {
    const watermark = document.getElementById('deviceWatermark');
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const maxTouchPoints = navigator.maxTouchPoints;
    const hardwareConcurrency = navigator.hardwareConcurrency || 'N/A';
    const deviceMemory = navigator.deviceMemory || 'N/A';
    const screen = window.screen;
    const fps = calculateFPS();
    const now = new Date();
    const time = now.toLocaleTimeString();
    let connection = 'N/A';
    if (navigator.connection) {
        connection = navigator.connection.effectiveType || 'N/A';
    }
    let battery = 'N/A';
    if (navigator.getBattery) {
        navigator.getBattery().then(bat => {
            battery = Math.round(bat.level * 100) + '%';
            updateDisplay();
        });
    }
    const info = `- zj71's benchmarker

TIME: ${time}

DEVICE:
Platform: ${platform}
Cores: ${hardwareConcurrency}
RAM: ${deviceMemory}GB
Touch: ${maxTouchPoints > 0 ? 'Yes' : 'No'}

DISPLAY:
Resolution: ${screen.width}x${screen.height}
DPI: ${window.devicePixelRatio}x

CONNECTION:
Type: ${connection}
Battery: ${battery}

PERFORMANCE:
FPS: ${fps}`;

    watermark.textContent = info;
}
let frameCount = 0;
let lastTime = Date.now();
let currentFPS = 60;
function calculateFPS() {
    frameCount++;
    const currentTime = Date.now();
    if (currentTime >= lastTime + 1000) {
        currentFPS = frameCount;
        frameCount = 0;
        lastTime = currentTime;
    }
    return currentFPS;
}
function animationLoop() {
    calculateFPS();
    requestAnimationFrame(animationLoop);
}
setInterval(updateDeviceInfo, 500);
updateDeviceInfo();
animationLoop();

function goBack() {
    window.location.href = '/';
}