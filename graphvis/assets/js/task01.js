// START Aufgabe_1

// Variablen für das Wheel
let currentImageIndexWheel = 0;  // Aktuelles Bild des Wheel (Index von 0 bis 23)
let isAutoRotatingWheel = false;  // Status für automatisches Drehen des Wheel
let autoRotateIntervalWheel = null;  // Intervall für das automatische Drehen des Wheel



// Variablen für die Orange
let currentImageIndexOrange = 1;  // Start bei Bild 1 (Index von 1 bis 8)
const totalFramesOrange = 8;  // Anzahl der Orange-Bilder

// Funktion zum Aktualisieren des Wheel-Bildes basierend auf dem aktuellen Bildindex
function updateWheelImage() {
    const wheelImage = document.getElementById("rotatingWheel");
    wheelImage.src = `assets/images/wheel-${currentImageIndexWheel}.png`;  // Bild aktualisieren
}

// Funktion zum Drehen des Wheels nach links (Index verringern)
function rotateLeft() {
    currentImageIndexWheel = (currentImageIndexWheel - 1 + 24) % 24;  // Index in 24er Schleife
    updateWheelImage();  // Bild aktualisieren
}

// Funktion zum Drehen des Wheels nach rechts (Index erhöhen)
function rotateRight() {
    currentImageIndexWheel = (currentImageIndexWheel + 1) % 24;  // Index in 24er Schleife
    updateWheelImage();  // Bild aktualisieren
}

// Funktion für automatisches Drehen des Wheels
function toggleAutoRotateWheel() {
    if (isAutoRotatingWheel) {
        clearInterval(autoRotateIntervalWheel);  // Automatisches Drehen stoppen
        isAutoRotatingWheel = false;
    } else {
        autoRotateIntervalWheel = setInterval(rotateRight, 100);  // Alle 100 ms nach rechts drehen
        isAutoRotatingWheel = true;
    }
}

// Funktion zum Aktualisieren des Orange-Bildes basierend auf dem aktuellen Bildindex
function updateOrangeImage() {
    const orangeImage = document.getElementById("bouncingOrange");
    orangeImage.src = `assets/images/Orange-${currentImageIndexOrange}.jpg`;  // Bild aktualisieren
}

// Funktion zum Rückwärtsdrehen der Orange (Index verringern)
function bounceBack() {
    currentImageIndexOrange = (currentImageIndexOrange - 1 + totalFramesOrange) % totalFramesOrange || totalFramesOrange;
    updateOrangeImage();  // Bild aktualisieren
}

// Funktion zum Vorwärtsdrehen der Orange (Index erhöhen)
function bounceForward() {
    currentImageIndexOrange = (currentImageIndexOrange % totalFramesOrange) + 1;
    updateOrangeImage();  // Bild aktualisieren
}

// Event Listener für die Tastatur
document.addEventListener("keydown", function(event) {
    switch (event.key) {
        // Steuerung für das Wheel
        case "a":
            toggleAutoRotateWheel();  // Automatisches Drehen des Wheels
            break;
        case "l":
            rotateLeft();  // Nach links drehen
            break;
        case "r":
            rotateRight();  // Nach rechts drehen
            break;
        
        // Steuerung für die Orange
        case "b":
            bounceBack();  // Rückwärts bewegen
            break;
        case "f":
            bounceForward();  // Vorwärts bewegen
            break;
    }
});

// END Aufgabe_1
