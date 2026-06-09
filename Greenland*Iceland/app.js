const ice =
    document.getElementById("ice");

const value =
    document.getElementById("value");

const status =
    document.getElementById("status");

let melting = true;

let level = 100;

function updateCycle() {

    if (melting) {

        level -= 5;

        status.textContent =
            "Melting";

        if (level <= 40) {

            melting = false;
        }

    } else {

        level += 4;

        status.textContent =
            "Refreezing";

        if (level >= 100) {

            level = 100;

            melting = true;
        }
    }

    ice.style.height =
        level + "%";

    value.textContent =
        "$" + level;
}

setInterval(
    updateCycle,
    1000
);
