document.addEventListener('DOMContentLoaded', function () {
    const bird = document.getElementById('bird');
    const pipe = document.getElementById('pipe');
    const ground = document.getElementById('ground');
    const scoreboard = document.getElementById('scoreboard');
    const gameOverPopup = document.getElementById('game-over-popup');
    const retryButton = document.getElementById('retry-button');
    let gravity = 0.3;
    let velocity = 0;
    let flap = -6;
    let isGameOver = true;
    let score = 0;

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            if (!isGameOver) {
                velocity += flap;
            }
        }
    });

    document.addEventListener('touchstart', function () {
        if (!isGameOver) {
            velocity += flap;
        } else {
            retryGame();
        }
    });

    function startGame() {
        if (isGameOver) {
            isGameOver = false;
            resetGame();
            gameLoop();
        }
    }

    function gameLoop() {
        if (!isGameOver) {
            velocity += gravity;
            bird.style.top = Math.max(0, Math.min(bird.offsetTop + velocity, ground.offsetTop - bird.offsetHeight)) + 'px';

            if (bird.offsetTop <= 0 || bird.offsetTop + bird.offsetHeight >= ground.offsetTop) {
                endGame();
            }

            pipe.style.left = pipe.offsetLeft - 3 + 'px';

            if (pipe.offsetLeft + pipe.offsetWidth < 0) {
                resetPipe();
                incrementScore();
            }

            if (isColliding(bird, pipe) || bird.offsetTop <= 0 || bird.offsetTop + bird.offsetHeight >= ground.offsetTop) {
                endGame();
            }

            requestAnimationFrame(gameLoop);
        }
    }

    function resetPipe() {
        pipe.style.left = '500px';
        pipe.style.height = Math.floor(Math.random() * 300) + 100 + 'px';
    }

    function incrementScore() {
        score++;
        scoreboard.textContent = 'Score: ' + score;
    }

    function endGame() {
        isGameOver = true;
        showGameOverPopup();
    }

    function resetGame() {
        bird.style.top = '50%';
        velocity = 0;
        resetPipe();
        score = 0;
        scoreboard.textContent = 'Score: ' + score;
    }

    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        return (
            rect1.left < rect2.left + rect2.width &&
            rect1.left + rect1.width > rect2.left &&
            rect1.top < rect2.top + rect2.height &&
            rect1.top + rect1.height > rect2.top
        );
    }

    function showGameOverPopup() {
        gameOverPopup.style.display = 'block';
        document.getElementById('final-score').textContent = 'Final Score: ' + score;
    }

    function hideGameOverPopup() {
        gameOverPopup.style.display = 'none';
    }

    function retryGame() {
        hideGameOverPopup();
        startGame();
    }

    document.getElementById('game-container').addEventListener('click', startGame);

    retryButton.addEventListener('click', retryGame);
});
