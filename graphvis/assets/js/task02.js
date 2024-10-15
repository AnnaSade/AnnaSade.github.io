// START Aufgabe 2


const vertices = new Float32Array([
    0.0, 0.5,   // 1
    0.2, 0.8,   // 2
    0.4, 0.5,   // 3
    0.35, 0.4,  // 4
    0.25, 0.4,  // 5
    0.15, 0.4,  // 6
    0.1, 0.3,   // 7
    0.3, 0.3,   // 8
    0.4, 0.1,   // 9
    0.2, 0.1,   // 10
    0.0, 0.1,   // 11
    -0.1, 0.2,  // 12
    -0.15, 0.4, // 13
    -0.25, 0.4, // 14
    -0.2, 0.3,  // 15
    -0.3, 0.1,  // 16
    -0.2, 0.0,  // 17
    0.0, -0.1,  // 18
    0.2, -0.1,  // 19
    0.3, 0.0,   // 20
    0.35, 0.1,  // 21
    0.35, 0.3,  // 22
    0.15, 0.0,  // 23
    0.1, -0.1,  // 24
    0.0, 0.0,   // 25
]);
const lines = [
    [0, 1],  // Linie von Punkt 1 zu Punkt 2
    [1, 2],  // Linie von Punkt 2 zu Punkt 3
    [2, 3],  // Linie von Punkt 3 zu Punkt 4
    [3, 4],  // Linie von Punkt 4 zu Punkt 5
    [5, 6],  // Linie von Punkt 5 zu Punkt 6
    [6, 7],  // Linie von Punkt 6 zu Punkt 7
    [7, 8],  // Linie von Punkt 7 zu Punkt 8
    [8, 9],  // Linie von Punkt 8 zu Punkt 9
    [9, 10], // Linie von Punkt 9 zu Punkt 10
    [10, 11],// Linie von Punkt 10 zu Punkt 11
    [11, 12],// Linie von Punkt 11 zu Punkt 12
    [12, 13],// Linie von Punkt 12 zu Punkt 13
    [13, 14],// Linie von Punkt 13 zu Punkt 14
    [14, 15],// Linie von Punkt 14 zu Punkt 15
    [15, 16],// Linie von Punkt 15 zu Punkt 16
    [16, 17],// Linie von Punkt 16 zu Punkt 17
    [17, 18],// Linie von Punkt 17 zu Punkt 18
    [18, 19],// Linie von Punkt 18 zu Punkt 19
    [19, 20],// Linie von Punkt 19 zu Punkt 20
    [20, 21],// Linie von Punkt 20 zu Punkt 21
    [21, 22],// Linie von Punkt 21 zu Punkt 22
    [22, 23],// Linie von Punkt 22 zu Punkt 23
    [23, 24],// Linie von Punkt 23 zu Punkt 24
    [24, 25],// Linie von Punkt 24 zu Punkt 25
];

/*
const scale = 0.3;  // Skalierungsfaktor

const vertices = new Float32Array([
    0.0 * scale, 0.0 * scale,     // Spitze des Herzens
    1.0 * scale, 1.0 * scale,     // Obere linke Rundung
    2.0 * scale, 1.0 * scale,     // Obere rechte Rundung
    3.0 * scale, 0.0 * scale,     // Rechte Spitze
    2.0 * scale, -1.0 * scale,    // Untere rechte Spitze
    0.0 * scale, -2.0 * scale,    // Untere Spitze
    -2.0 * scale, -1.0 * scale,   // Untere linke Spitze
    -3.0 * scale, 0.0 * scale,    // Linke Spitze
    -2.0 * scale, 1.0 * scale,    // Obere linke Rundung
    -1.0 * scale, 1.0 * scale     // Obere linke Rundung (kurve)
]);*/

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
