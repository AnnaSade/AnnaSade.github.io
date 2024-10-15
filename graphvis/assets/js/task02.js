// START Aufgabe 2

// Skalierungsfaktor
const scale = 0.05;

// Vertices für den Katzenkopf (in Paaren von x und y)
const vertices = new Float32Array([
    1.0 * scale, 7.0 * scale,    // Vertex 1
    3.0 * scale, 9.0 * scale,    // Vertex 2
    4.0 * scale, 12.0 * scale,   // Vertex 3
    2.0 * scale, 14.0 * scale,   // Vertex 4
    0.0 * scale, 14.0 * scale,   // Vertex 5
    -2.0 * scale, 12.0 * scale,  // Vertex 6
    -3.0 * scale, 8.0 * scale,   // Vertex 7
    2.0 * scale, 2.0 * scale,    // Vertex 8
    0.0 * scale, 1.0 * scale,    // Vertex 9
    -2.0 * scale, 3.0 * scale,   // Vertex 10
    -5.0 * scale, 4.0 * scale,   // Vertex 11
    -9.0 * scale, 0.0 * scale,   // Vertex 12
    -2.0 * scale, -1.0 * scale,  // Vertex 13
    -7.0 * scale, -0.5 * scale,  // Vertex 14
    0.0 * scale, -4.0 * scale,   // Vertex 15
    5.0 * scale, -2.0 * scale,   // Vertex 16
    5.0 * scale, 2.0 * scale,    // Vertex 17
    2.0 * scale, 10.0 * scale,   // Vertex 18
    0.0 * scale, 11.0 * scale,   // Vertex 19
    -1.0 * scale, 10.0 * scale,  // Vertex 20
    -2.0 * scale, -4.0 * scale,  // Vertex 21
    -5.0 * scale, -8.0 * scale,  // Vertex 22
    2.0 * scale, -8.0 * scale,   // Vertex 23
    3.0 * scale, -9.0 * scale,   // Vertex 24
    0.0 * scale, -14.0 * scale,  // Vertex 25
    1.0 * scale, -14.0 * scale    // Vertex 26
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

// Zeichnen der Linien
const lines = new Uint16Array([
    0, 1,    // Linie von Vertex 1 zu Vertex 2
    1, 2,    // Linie von Vertex 2 zu Vertex 3
    2, 3,    // Linie von Vertex 3 zu Vertex 4
    3, 4,    // Linie von Vertex 4 zu Vertex 5
    4, 5,    // Linie von Vertex 5 zu Vertex 6
    5, 6,    // Linie von Vertex 6 zu Vertex 7
    6, 7,    // Linie von Vertex 7 zu Vertex 8
    7, 8,    // Linie von Vertex 8 zu Vertex 9
    8, 9,    // Linie von Vertex 9 zu Vertex 10
    9, 10,   // Linie von Vertex 10 zu Vertex 11
    10, 11,  // Linie von Vertex 11 zu Vertex 12
    11, 12,  // Linie von Vertex 12 zu Vertex 13
    12, 8,   // Linie von Vertex 13 zu Vertex 9
    13, 14,  // Linie von Vertex 14 zu Vertex 15
    14, 15,  // Linie von Vertex 15 zu Vertex 16
    15, 16,  // Linie von Vertex 16 zu Vertex 17
    16, 19,  // Linie von Vertex 17 zu Vertex 20
    19, 18,  // Linie von Vertex 20 zu Vertex 19
    18, 17,  // Linie von Vertex 19 zu Vertex 18
    17, 0,   // Linie von Vertex 18 zu Vertex 1
    13, 20,  // Linie von Vertex 14 zu Vertex 21
    20, 21,  // Linie von Vertex 21 zu Vertex 22
    21, 22,  // Linie von Vertex 22 zu Vertex 23
    22, 23,  // Linie von Vertex 23 zu Vertex 24
    14, 24,  // Linie von Vertex 15 zu Vertex 25
    24, 25   // Linie von Vertex 25 zu Vertex 26
]);

// WebGL Buffer für die Linien erstellen
const lineBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, lines, gl.STATIC_DRAW);

// Zeichnen der Linien
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.LINES, lines.length, gl.UNSIGNED_SHORT, 0);
