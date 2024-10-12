// START Aufgabe 2

// Vertex-Daten für den Katzenkopf
const vertices = new Float32Array([
    // Ohren
    -0.5, 0.7,   // Linke Ohr-Spitze
    -0.3, 1.0,   // Linke Ohr-Basis
    -0.1, 0.7,   // Linke Ohr-Spitze
    
    0.5, 0.7,    // Rechte Ohr-Spitze
    0.3, 1.0,    // Rechte Ohr-Basis
    0.1, 0.7,    // Rechte Ohr-Spitze

    // Kopf (Ellipse)
    -0.6, 0.0,   // Linke Seite des Kopfes
     0.6, 0.0,   // Rechte Seite des Kopfes
     0.4, -0.4,  // Untere rechte Seite
    -0.4, -0.4,  // Untere linke Seite
     0.5, 0.4,   // Obere rechte Seite
    -0.5, 0.4,   // Obere linke Seite

    // Augen (2 Vertices pro Auge, 2 Augen)
    -0.3, 0.2,   // Linkes Auge links
    -0.1, 0.2,   // Linkes Auge rechts
    0.1, 0.2,    // Rechtes Auge links
    0.3, 0.2,    // Rechtes Auge rechts

    // Nase
    0.0, 0.0,    // Nase

    // Mund (3 Vertices für eine einfache Kurve)
    -0.2, -0.2,  // Linke Mundseite
     0.0, -0.25, // Mittlere Mundseite (tiefer)
     0.2, -0.2,  // Rechte Mundseite

    // Weitere Details
    -0.5, 0.5,   // Detail 1 (oberer Punkt links)
     0.5, 0.5,   // Detail 2 (oberer Punkt rechts)
    -0.4, 0.4,   // Detail 3 (linker Punkt oben)
     0.4, 0.4,   // Detail 4 (rechter Punkt oben)
    -0.3, 0.4,   // Detail 5 (linker Punkt)
     0.3, 0.4    // Detail 6 (rechter Punkt)
]);

// WebGL-Setup
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    console.error('WebGL nicht unterstützt');
}

// Vertex-Shader
const vertexShaderSource = `
    attribute vec2 coordinates;
    void main(void) {
        gl_Position = vec4(coordinates, 0.0, 1.0);
    }
`;

// Fragment-Shader (Schwarz)
const fragmentShaderSource = `
    void main(void) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);  // Schwarz
    }
`;

// Shader erstellen
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Shader-Programm erstellen
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Vertex-Buffer erstellen
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Attribut-Positionen im Shader definieren
const coordinates = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coordinates, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coordinates);

// Hintergrundfarbe setzen
gl.clearColor(1.0, 1.0, 1.0, 1.0);  // Weiß
gl.clear(gl.COLOR_BUFFER_BIT);       // Leere den Farb-Puffer

// Zeichnen der Geometrie
gl.drawArrays(gl.LINE_LOOP, 0, vertices.length / 2);  // Verwende GL_LINE_LOOP für Linien

// END Aufgabe 2
