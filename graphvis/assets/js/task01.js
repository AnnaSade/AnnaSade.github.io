// START Aufgabe_1

// Variablen für das Wheel (CD)
const totalFramesWheel = 24;  
let currentImageIndexWheel = 0;  
let isAutoRotatingWheel = false;  

// Variablen für die Orange
const totalFramesOrange = 8;  
let currentImageIndexOrange = 1;  
let isAutoBouncingOrange = false;  

// Funktion zum Vorladen der Bilder
function preloadImages(imagePaths) {
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

// Bildpfade für die CD und die Orange
const wheelImages = Array.from({ length: totalFramesWheel }, (_, i) => `assets/images/wheel-${i}.png`);
const orangeImages = Array.from({ length: totalFramesOrange }, (_, i) => `assets/images/Orange-${i + 1}.jpg`);

// Bilder beim Laden der Seite vorladen
window.addEventListener('load', () => {
    preloadImages([...wheelImages, ...orangeImages]);
});

// Funktion zum Aktualisieren des CD-Bildes
function updateWheelImage() {
    const wheelImage = document.getElementById("rotatingWheel");
    wheelImage.src = `assets/images/wheel-${currentImageIndexWheel}.png`;
}

// Funktion zum Drehen der CD nach links
function rotateWheelLeft() {
    currentImageIndexWheel = (currentImageIndexWheel - 1 + totalFramesWheel) % totalFramesWheel;
    updateWheelImage();
}

// Funktion zum Drehen der CD nach rechts
function rotateWheelRight() {
    currentImageIndexWheel = (currentImageIndexWheel + 1) % totalFramesWheel;
    updateWheelImage();
}

// Funktion für automatische Rotation der CD
function toggleAutoRotateWheel() {
    isAutoRotatingWheel = !isAutoRotatingWheel;
    if (isAutoRotatingWheel) {
        requestAnimationFrame(autoRotateWheel);
    }
}

function autoRotateWheel() {
    if (isAutoRotatingWheel) {
        rotateWheelRight();
        setTimeout(() => requestAnimationFrame(autoRotateWheel), 100);
    }
}

// Funktion zum Aktualisieren des Orange-Bildes
function updateOrangeImage() {
    const orangeImage = document.getElementById("bouncingOrange");
    orangeImage.src = `assets/images/Orange-${currentImageIndexOrange}.jpg`;
}

// Funktion zum Rückwärtsdrehen der Orange
function bounceOrangeBack() {
    currentImageIndexOrange = (currentImageIndexOrange - 1 + totalFramesOrange) % totalFramesOrange || totalFramesOrange;
    updateOrangeImage();
}

// Funktion zum Vorwärtsdrehen der Orange
function bounceOrangeForward() {
    currentImageIndexOrange = (currentImageIndexOrange % totalFramesOrange) + 1;
    updateOrangeImage();
}

// Funktion für automatische Animation der Orange
function toggleAutoBounceOrange() {
    isAutoBouncingOrange = !isAutoBouncingOrange;
    if (isAutoBouncingOrange) {
        requestAnimationFrame(autoBounceOrange);
    }
}

function autoBounceOrange() {
    if (isAutoBouncingOrange) {
        bounceOrangeForward();
        setTimeout(() => requestAnimationFrame(autoBounceOrange), 200);
    }
}

// Event Listener für die Tastatur
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "a":
            toggleAutoRotateWheel();
            break;
        case "l":
            rotateWheelLeft();
            break;
        case "r":
            rotateWheelRight();
            break;
        case "b":
            bounceOrangeBack();
            break;
        case "f":
            bounceOrangeForward();
            break;
        case "c":
            toggleAutoBounceOrange();
            break;
    }
});

// END Aufgabe_1
