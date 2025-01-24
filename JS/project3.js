document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("game-grid");
    const movesCounter = document.getElementById("moves");
    const timeCounter = document.getElementById("time");
    const restartButton = document.getElementById("restart");

    const icons = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥝"];
    let cards = [...icons, ...icons];
    let firstCard = null, secondCard = null;
    let moves = 0, time = 0, timer;
    
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function startGame() {
        grid.innerHTML = "";
        moves = 0;
        time = 0;
        movesCounter.textContent = moves;
        timeCounter.textContent = time;
        cards = shuffle(cards);

        cards.forEach(icon => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.icon = icon;
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        });

        clearInterval(timer);
        timer = setInterval(() => {
            time++;
            timeCounter.textContent = time;
        }, 1000);
    }

    function flipCard() {
        if (this.classList.contains("flipped") || secondCard) return;

        this.classList.add("flipped");
        this.textContent = this.dataset.icon;

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            moves++;
            movesCounter.textContent = moves;

            if (firstCard.dataset.icon === secondCard.dataset.icon) {
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                firstCard = secondCard = null;
            } else {
                setTimeout(() => {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                    firstCard.textContent = "";
                    secondCard.textContent = "";
                    firstCard = secondCard = null;
                }, 1000);
            }
        }
    }

    restartButton.addEventListener("click", startGame);

    startGame();
});
