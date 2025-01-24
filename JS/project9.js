/* JS/project9.js */

const arrayContainer = document.getElementById('array-container');
const speedInput = document.getElementById('speed');
const explanationBox = document.createElement('div');
document.body.appendChild(explanationBox);
explanationBox.id = 'explanation';
let speed = speedInput.value;

speedInput.addEventListener('input', () => {
    speed = speedInput.value;
});

function generateArray() {
    arrayContainer.innerHTML = '';
    explanationBox.innerHTML = 'Generating a new random array.';
    let array = [];
    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        let bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    }
}

async function startSorting() {
    let algorithm = document.getElementById('algorithm').value;
    if (algorithm === 'bubbleSort') {
        explanationBox.innerHTML = 'Starting Bubble Sort...';
        await bubbleSort();
    } else if (algorithm === 'insertionSort') {
        explanationBox.innerHTML = 'Starting Insertion Sort...';
        await insertionSort();
    }
}

async function bubbleSort() {
    let bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            explanationBox.innerHTML = `Comparing elements at index ${j} and ${j + 1}.`;
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            await sleep(speed);
            let height1 = parseInt(bars[j].style.height);
            let height2 = parseInt(bars[j + 1].style.height);
            if (height1 > height2) {
                explanationBox.innerHTML = `Swapping elements at index ${j} and ${j + 1}.`;
                bars[j].style.height = `${height2}px`;
                bars[j + 1].style.height = `${height1}px`;
            }
            bars[j].style.backgroundColor = 'blue';
            bars[j + 1].style.backgroundColor = 'blue';
        }
    }
    explanationBox.innerHTML = 'Bubble Sort complete!';
}

async function insertionSort() {
    let bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < bars.length; i++) {
        let key = parseInt(bars[i].style.height);
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';
        explanationBox.innerHTML = `Taking element at index ${i} and comparing with previous elements.`;
        await sleep(speed);
        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            explanationBox.innerHTML = `Moving element at index ${j} to index ${j + 1}.`;
            bars[j + 1].style.height = bars[j].style.height;
            j--;
            await sleep(speed);
        }
        bars[j + 1].style.height = `${key}px`;
        bars[i].style.backgroundColor = 'blue';
    }
    explanationBox.innerHTML = 'Insertion Sort complete!';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

generateArray();
