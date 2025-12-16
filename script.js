const solution = "AVATAR"; // Gesuchtes Wort
const rows = 6;            // Anzahl der Versuche
const cols = 6;            // Anzahl Buchstaben pro Wort

let currentRow = 0;
let currentCol = 0;
let gameOver = false;

// Grid erstellen
const grid = document.getElementById('grid');
for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}
const cells = document.querySelectorAll('.cell');

// Tastatur erstellen (wie vorher)
const keyboard = document.getElementById('keyboard');
const rowsKeys = [
    "QWERTZUIOP",  // Erste Zeile
    "ASDFGHJKL",   // Zweite Zeile
    "✓YXCVBNM⌫"    // Dritte Zeile mit Haken und Löschen
];

rowsKeys.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    row.split("").forEach(letter => {
        const key = document.createElement('div');
        key.classList.add('key');
        key.textContent = letter;
        key.onclick = () => handleKeyPress(letter);
        rowDiv.appendChild(key);
    });
    keyboard.appendChild(rowDiv);
});

function handleKeyPress(letter) {
    if (gameOver) return;

    if (letter === "⌫") {
        removeLetter();
    } else if (letter === "✓") {
        checkWord();
    } else {
        // Falls noch eine editierbare Zelle da ist, diese zuerst füllen
        const editableCell = document.querySelector('.cell[contenteditable="true"]');
        if (editableCell) {
            editableCell.textContent = letter;
            editableCell.contentEditable = false;
        } else {
            addLetter(letter);
        }
    }
}

function addLetter(letter) {
    if (currentCol < cols) {
        const index = currentRow * cols + currentCol;
        cells[index].textContent = letter;
        currentCol++;
    }
}

function removeLetter() {
    if (currentCol > 0) {
        currentCol--;
        const index = currentRow * cols + currentCol;
        const cell = cells[index];
        cell.textContent = '';
        cell.classList.remove('correct', 'present', 'absent');
    }
}

function checkWord() {
    // Nur prüfen, wenn 6 Buchstaben eingegeben sind
    if (currentCol < cols) return;

    let guess = "";

    for (let i = 0; i < cols; i++) {
        const index = currentRow * cols + i;
        guess += cells[index].textContent || " ";
    }

    const solutionLetters = [...solution];
    const guessLetters = [...guess];

    // Erst alle Klassen entfernen, damit nichts „kleben“ bleibt
    for (let i = 0; i < cols; i++) {
        const index = currentRow * cols + i;
        cells[index].classList.remove('correct', 'present', 'absent');
    }

    // 1. Durchgang: exakte Treffer (grün)
    for (let i = 0; i < cols; i++) {
        const index = currentRow * cols + i;
        const letter = guessLetters[i];

        if (solution[i] === letter) {
            cells[index].classList.add('correct');
            solutionLetters[i] = null;
            guessLetters[i] = null;
        }
    }

    // 2. Durchgang: vorhandene Buchstaben (gelb/grau)
    for (let i = 0; i < cols; i++) {
        const index = currentRow * cols + i;
        const letter = guessLetters[i];

        if (!letter) continue;

        const foundIndex = solutionLetters.indexOf(letter);
        if (foundIndex !== -1) {
            cells[index].classList.add('present');
            solutionLetters[foundIndex] = null;
        } else {
            cells[index].classList.add('absent');
        }
    }

    // Gewinn-/Verlustprüfung
    if (guess.trim() === solution) {
        document.getElementById('message').textContent = "Gewonnen! 🎉";
        gameOver = true;
    } else {
        currentRow++;
        currentCol = 0;

        if (currentRow === rows) {
            document.getElementById('message').textContent = "Verloren! Das Wort war: " + solution;
            gameOver = true;
        }
    }
}

// Funktion zum Aktivieren der Zellenbearbeitung
function makeCellEditable(cell) {
    cell.contentEditable = true;
    cell.focus();

    cell.addEventListener('blur', () => {
        cell.contentEditable = false;
    });
}

// Erste Zelle aktiv machen
makeCellEditable(cells[currentRow * cols]);
