// START Aufgabe_1

let currentImageIndex = 0;  // Aktuelles Bild (Index von 0 bis 23)
let isAutoRotating = false;  // Status für automatisches Drehen
let autoRotateInterval = null;  // Intervall für das automatische Drehen

// Funktion zum Aktualisieren des Bildes basierend auf dem aktuellen Bildindex
function updateWheelImage() {
    const wheelImage = document.getElementById("rotatingWheel");
    wheelImage.src = `assets/images/wheel-${currentImageIndex}.png`;  // Bild aktualisieren
}

// Funktion zum Drehen nach links (Index verringern)
function rotateLeft() {
    currentImageIndex = (currentImageIndex - 1 + 24) % 24;  // Index in 24er Schleife
    updateWheelImage();  // Bild aktualisieren
}

// Funktion zum Drehen nach rechts (Index erhöhen)
function rotateRight() {
    currentImageIndex = (currentImageIndex + 1) % 24;  // Index in 24er Schleife
    updateWheelImage();  // Bild aktualisieren
}

// Funktion für automatisches Drehen
function toggleAutoRotate() {
    if (isAutoRotating) {
        clearInterval(autoRotateInterval);  // Automatisches Drehen stoppen
        isAutoRotating = false;
    } else {
        autoRotateInterval = setInterval(rotateRight, 100);  // Alle 100 ms nach rechts drehen
        isAutoRotating = true;
    }
}

// Event Listener für die Tastatur
document.addEventListener("keydown", function(event) {
    if (event.key === "a") {
        toggleAutoRotate();  // Automatisches Drehen starten oder stoppen
    } else if (event.key === "l") {
        rotateLeft();  // Nach links drehen
    } else if (event.key === "r") {
        rotateRight();  // Nach rechts drehen
    }
});

// END Aufgabe_1
