document.addEventListener("DOMContentLoaded", () => {
    const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");
    const resetBtn = document.getElementById("reset");
    const progressDisplay = document.getElementById("progress");

    // Define the story paths
    const story = {
        start: {
            text: "You wake up in a dark forest. Two paths lie ahead: one to the left and one to the right.",
            choices: [
                { text: "Go left", next: "leftPath1" },
                { text: "Go right", next: "rightPath1" }
            ]
        },
        leftPath1: {
            text: "You find an old cabin. Do you enter or keep walking?",
            choices: [
                { text: "Enter the cabin", next: "cabin1" },
                { text: "Keep walking", next: "forest1" }
            ]
        },
        rightPath1: {
            text: "You encounter a river. Do you swim across or follow the riverbank?",
            choices: [
                { text: "Swim across", next: "swim1" },
                { text: "Follow the riverbank", next: "river1" }
            ]
        },
        cabin1: {
            text: "The cabin is abandoned. You find a map and supplies. Do you stay or explore?",
            choices: [
                { text: "Stay for the night", next: "cabin2" },
                { text: "Explore deeper", next: "forest2" }
            ]
        },
        cabin2: {
            text: "You rest and regain your strength. In the morning, you decide to leave. Do you follow the map or explore freely?",
            choices: [
                { text: "Follow the map", next: "safeEscape" },
                { text: "Explore freely", next: "lostWoods" }
            ]
        },
        safeEscape: {
            text: "The map leads you to a safe path out of the forest. You survive!",
            choices: []
        },
        forest1: {
            text: "You hear noises in the bushes. Do you investigate or hide?",
            choices: [
                { text: "Investigate", next: "bearAttack" },
                { text: "Hide", next: "safeHideout" }
            ]
        },
        forest2: {
            text: "Deeper in the woods, you find a hidden passage. Do you enter?",
            choices: [
                { text: "Yes", next: "secretEscape" },
                { text: "No", next: "lostWoods" }
            ]
        },
        secretEscape: {
            text: "You find a hidden exit and escape the forest safely. You survive!",
            choices: []
        },
        bearAttack: {
            text: "A bear appears! Do you run or try to scare it?",
            choices: [
                { text: "Run", next: "tripped" },
                { text: "Scare it", next: "safeHideout" }
            ]
        },
        safeHideout: {
            text: "You find a small cave and wait out the night. You survive!",
            choices: []
        },
        tripped: {
            text: "You trip while running and injure your leg. Do you try to crawl away or stay still?",
            choices: [
                { text: "Crawl away", next: "rescuedByHunter" },
                { text: "Stay still", next: "bearAttackFinal" }
            ]
        },
        bearAttackFinal: {
            text: "The bear finds you. Unfortunately, this is the end for you.",
            choices: []
        },
        rescuedByHunter: {
            text: "A hunter finds you and helps you escape the forest. You survive!",
            choices: []
        },
        lostWoods: {
            text: "You wander endlessly and run out of supplies. The End.",
            choices: []
        }
    };

    const maxSteps = 8; // The longest path in the game
    let currentStep = 0;

    function updateProgress() {
        let percentage = Math.min(Math.round((currentStep / maxSteps) * 100), 100);
        progressDisplay.textContent = `(${percentage}%)`;
    }

    function startGame() {
        let savedProgress = localStorage.getItem("storyProgress");

        if (!savedProgress || !story[savedProgress]) {
            savedProgress = "start";
            localStorage.setItem("storyProgress", savedProgress);
            currentStep = 0; // Reset progress
        } else {
            currentStep = parseInt(localStorage.getItem("storySteps")) || 0;
        }

        updateProgress();
        loadStory(savedProgress);
    }

    function loadStory(part) {
        if (!story[part]) {
            console.error(`Story part "${part}" does not exist! Resetting...`);
            localStorage.removeItem("storyProgress");
            localStorage.removeItem("storySteps");
            loadStory("start");
            return;
        }

        localStorage.setItem("storyProgress", part);
        storyText.textContent = story[part].text;
        choicesDiv.innerHTML = "";

        if (story[part].choices && story[part].choices.length > 0) {
            resetBtn.style.display = "none";
            story[part].choices.forEach(choice => {
                const btn = document.createElement("button");
                btn.textContent = choice.text;
                btn.classList.add("choice-btn");
                btn.onclick = () => {
                    currentStep++;
                    localStorage.setItem("storySteps", currentStep);
                    updateProgress();
                    loadStory(choice.next);
                };
                choicesDiv.appendChild(btn);
            });
        } else {
            resetBtn.style.display = "block";
        }
    }

    resetBtn.addEventListener("click", () => {
        localStorage.clear();
        resetBtn.style.display = "none";
        currentStep = 0; // Reset progress
        updateProgress();
        loadStory("start");
    });

    startGame();
});
