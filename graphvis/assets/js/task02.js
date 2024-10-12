// START Aufgabe 2

// Vertex-Daten für den Katzenkopf
const vertices = new Float32Array([
    // Ohren
    -0.6, 0.6,  -0.4, 0.9,  -0.2, 0.6,  // Linkes Ohr
    0.6, 0.6,   0.4, 0.9,   0.2, 0.6,  // Rechtes Ohr
  
    // Kopf (Ellipse, genauer)
    -0.6, 0.0,  0.6, 0.0,  0.4, -0.3, -0.4, -0.3,  // Unterer Teil
    0.5, 0.4,  -0.5, 0.4,  0.0, 0.5,  // Oberer Teil
  
    // Augen (oval)
    -0.35, 0.25, -0.25, 0.25, -0.25, 0.15, -0.35, 0.15, // Linkes Auge
    0.25, 0.25,  0.35, 0.25,  0.35, 0.15,  0.25, 0.15,  // Rechtes Auge
  
    // Nase (Dreieck)
    0.0, 0.05,  -0.1, -0.05,  0.1, -0.05,
  
    // Mund (Kurve)
    -0.2, -0.2,  0.0, -0.25,  0.2, -0.2,
  
    // Schnurrhaare (Beispiele)
    -0.4, 0.1,  -0.5, 0.1,
    0.4, 0.1,   0.5, 0.1,
    // ... weitere Schnurrhaare
  
    // Körper (vereinfacht)
    -0.8, -0.5,  -0.8, -1.0,  0.8, -1.0,  0.8, -0.5,  // Hauptkörper
    // ... weitere Körperteile (z.B. Beine, Schwanz)
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
