const totalFrames = 24;  // Anzahl der Frames im Sprite
const frameWidth = 200;  // Breite jedes einzelnen Frames
let currentFrame = 0;  // Start bei Frame 0
let isAutoRotating = false;  // Status für automatisches Drehen
let autoRotateInterval = null;  // Intervall für das automatische Drehen

// Funktion zum Aktualisieren der Hintergrundposition basierend auf dem aktuellen Frame
function updateWheelFrame() {
    const wheel = document.getElementById('rotatingWheel');
    const position = -currentFrame * frameWidth;  // Berechne die neue Hintergrundposition
    wheel.style.backgroundPosition = `${position}px 0`;  // Hintergrundposition setzen
}

// Funktion zum Drehen nach links (Frame verringern)
function rotateLeft() {
    currentFrame = (currentFrame - 1 + totalFrames) % totalFrames;  // Frame verringern in Schleife
    updateWheelFrame();  // Hintergrund aktualisieren
}

// Funktion zum Drehen nach rechts (Frame erhöhen)
function rotateRight() {
    currentFrame = (currentFrame + 1) % totalFrames;  // Frame erhöhen in Schleife
    updateWheelFrame();  // Hintergrund aktualisieren
}

// Funktion für automatisches Drehen
function toggleAutoRotate() {
    if (isAutoRotating) {
        clearInterval(autoRotateInterval);  // Automatisches Drehen stoppen
        isAutoRotating = false;
    } else {
        autoRotateInterval = setInterval(rotateRight, 100);  // Alle 100 ms Frame wechseln
        isAutoRotating = true;
    }
}

// Event Listener für Tastatursteuerung
document.addEventListener('keydown', function(event) {
    if (event.key === 'a') {
        toggleAutoRotate();  // Automatisches Drehen starten/stoppen
    } else if (event.key === 'l') {
        rotateLeft();  // Nach links drehen
    } else if (event.key === 'r') {
        rotateRight();  // Nach rechts drehen
    }
});
