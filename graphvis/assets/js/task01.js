const totalFrames = 24;  // Anzahl der Frames im Sprite
const frameWidth = 200;  // Breite jedes einzelnen Frames
let currentFrame = 0;  // Start mit dem ersten Frame
let isAutoRotating = false;  // Status für automatisches Drehen

// Funktion zum Aktualisieren der Hintergrundposition basierend auf dem aktuellen Frame
function updateWheelFrame() {
    const wheel = document.getElementById('rotatingWheel');
    const position = -currentFrame * frameWidth;  // Berechne die neue Hintergrundposition
    wheel.style.backgroundPosition = `${position}px 0`;  // Setze die Hintergrundposition
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
    isAutoRotating = !isAutoRotating;  // Status umschalten
    if (isAutoRotating) {
        requestAnimationFrame(rotateRight);  // Starte die Animation
    }
}

// Funktion für die Animation bei automatischer Drehung
function autoRotate() {
    if (isAutoRotating) {
        rotateRight();  // Drehe nach rechts
        requestAnimationFrame(autoRotate);  // Nächsten Frame anfordern
    }
}

// Event Listener für Tastatursteuerung
document.addEventListener('keydown', function(event) {
    if (event.key === 'a') {
        toggleAutoRotate();  // Automatisches Drehen starten/stoppen
        if (isAutoRotating) {
            requestAnimationFrame(autoRotate);  // Starte die Animation
        }
    } else if (event.key === 'l') {
        rotateLeft();  // Nach links drehen
    } else if (event.key === 'r') {
        rotateRight();  // Nach rechts drehen
    }
});
