// ---------------------------
// CONFIG
// ---------------------------
const MAX_VALUE = 100;
const DAYS_IN_YEAR = 365;

// ---------------------------
// ICE SHEET ANIMATION
// ---------------------------
const iceLayer = document.getElementById("ice-layer");
const valueDisplay = document.getElementById("value-display");

function randomIceLevel() {
    return Math.random(); // 0 to 1
}

function updateIceSheet() {
    const level = randomIceLevel();
    const percent = level * 100;

    // Animate ice height
    iceLayer.style.height = percent + "%";

    // Convert to dollar value
    const dollarValue = (level * MAX_VALUE).toFixed(2);
    valueDisplay.textContent = `$${dollarValue}`;
}

// Update every 3 seconds
setInterval(updateIceSheet, 3000);
updateIceSheet();

// ---------------------------
// DAILY GRID GENERATION
// ---------------------------
const grid = document.getElementById("daily-grid");

function generateDailyGrid() {
    for (let i = 0; i < DAYS_IN_YEAR; i++) {
        const cell = document.createElement("div");
        cell.classList.add("day-cell");

        const inner = document.createElement("div");
        inner.classList.add("day-cell-inner");

        // Random daily average ice level
        const level = Math.random();
        const blue = Math.floor(200 + level * 55);
        const opacity = 0.3 + level * 0.7;

        inner.style.background = `rgba(150, ${blue}, 255, ${opacity})`;

        cell.appendChild(inner);
        grid.appendChild(cell);
    }
}

generateDailyGrid();
