const randomPhrases = {
    easy: [
      "The sun is shining brightly.",
      "I love to read books.",
      "She walked to the park.",
      "A cup of coffee in the morning."
    ],
    medium: [
      "Coding requires patience and persistence.",
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "Practice makes perfect in every skill."
    ],
    hard: [
      "While debugging, always check the console for errors.",
      "The Fibonacci sequence is a series where each number is the sum of the two preceding ones.",
      "JavaScript closures allow functions to access variables from an outer function even after the outer function has returned.",
      "Typing fast and accurately requires muscle memory and continuous practice."
    ]
  };
  
  let startTime, selectedString, timer, errors, typedChars;
  
  document.getElementById("start-button").addEventListener("click", startTrainer);
  document.getElementById("user-input").addEventListener("input", trackProgress);
  document.getElementById("restart-button").addEventListener("click", restartTrainer);
  
  function startTrainer() {
    const difficulty = document.getElementById("difficulty").value;
    const phraseList = randomPhrases[difficulty];
    selectedString = phraseList[Math.floor(Math.random() * phraseList.length)];
    displayText(selectedString);
    document.getElementById("user-input").value = "";
    document.querySelector(".trainer").style.display = "block";
    document.querySelector(".summary").classList.add("hidden");
    startTime = new Date();
    errors = 0;
    typedChars = 0;
  }
  
  function displayText(text, userInput = "") {
    let html = "";
    const words = text.split(" ");
    const inputWords = userInput.split(" ");
  
    for (let i = 0; i < words.length; i++) {
      if (inputWords[i] === undefined) {
        html += `<span class="correct">${words[i]}</span> `;
      } else if (words[i].startsWith(inputWords[i])) {
        html += `<span class="correct">${words[i]}</span> `;
      } else {
        html += `<span class="incorrect">${words[i]}</span> `;
      }
    }
  
    document.getElementById("random-string").innerHTML = html.trim();
  }
  
  function trackProgress() {
    const input = document.getElementById("user-input").value;
    typedChars = input.length;
    displayText(selectedString, input);
    if (input === selectedString) {
      clearInterval(timer);
      showSummary();
    }
    updateStats(input);
  }
  
  function updateStats(input) {
    errors = [...input].filter((char, i) => char !== selectedString[i]).length;
    const accuracy = ((input.length - errors) / input.length) * 100 || 100;
    const elapsedTime = (new Date() - startTime) / 1000 / 60;
    const wpm = ((typedChars / 5) / elapsedTime).toFixed(2);
    document.getElementById("wpm").textContent = `WPM: ${wpm}`;
    document.getElementById("accuracy").textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
  }
  
  function showSummary() {
    document.querySelector(".trainer").style.display = "none";
    document.querySelector(".summary").classList.remove("hidden");
    document.getElementById("final-wpm").textContent = document.getElementById("wpm").textContent;
    document.getElementById("final-accuracy").textContent = document.getElementById("accuracy").textContent;
  }
  
  function restartTrainer() {
    document.querySelector(".trainer").style.display = "none";
    document.querySelector(".summary").classList.add("hidden");
  }
  