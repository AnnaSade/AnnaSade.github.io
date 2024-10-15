// START Aufgabe 2

var vertices = new Float32Array([1, 1, -1, 1, -1, -1, 1, -1]);
/*const vertices = new Float32Array([
    0.0, 0.0,    // Spitze des Herzens
    1.0, 1.0,    // Obere linke Rundung
    2.0, 1.0,    // Obere rechte Rundung
    3.0, 0.0,    // Rechte Spitze
    2.0, -1.0,   // Untere rechte Spitze
    0.0, -2.0,   // Untere Spitze
    -2.0, -1.0,  // Untere linke Spitze
    -3.0, 0.0,   // Linke Spitze
    -2.0, 1.0,   // Obere linke Rundung
    -1.0, 1.0    // Obere linke Rundung (kurve)
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
