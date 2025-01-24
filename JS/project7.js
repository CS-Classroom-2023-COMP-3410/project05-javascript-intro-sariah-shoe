let memoryLog = [];

function clearDisplay() {
    document.getElementById("calc-display").value = "";
}

function appendValue(value) {
    document.getElementById("calc-display").value += value;
}

function calculate() {
    try {
        let expression = document.getElementById("calc-display").value;
        expression = expression.replace(/%/g, '/100'); // Convert percentage

        let result = eval(expression);
        if (!isFinite(result)) {
            throw new Error("Math Error");
        }

        // Store in memory log
        memoryLog.unshift(`${expression} = ${result}`);
        updateMemoryLog();

        document.getElementById("calc-display").value = result;
    } catch (error) {
        document.getElementById("calc-display").value = "Error";
    }
}

function sqrt() {
    try {
        let value = document.getElementById("calc-display").value;
        if (value) {
            let result = Math.sqrt(eval(value));
            if (!isFinite(result)) throw new Error("Math Error");

            // Store in memory log
            memoryLog.unshift(`√(${value}) = ${result}`);
            updateMemoryLog();

            document.getElementById("calc-display").value = result;
        }
    } catch (error) {
        document.getElementById("calc-display").value = "Error";
    }
}

function memoryRecall() {
    let memoryList = document.getElementById("memory-log");
    if (memoryList.style.display === "none" || memoryList.innerHTML === "") {
        memoryList.style.display = "block";
    } else {
        memoryList.style.display = "none";
    }
}

function updateMemoryLog() {
    let memoryList = document.getElementById("memory-log");
    memoryList.innerHTML = "";
    memoryLog.forEach((entry) => {
        let li = document.createElement("li");
        li.textContent = entry;
        memoryList.appendChild(li);
    });
}
