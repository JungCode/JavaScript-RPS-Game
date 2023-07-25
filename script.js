
function userChoose(option) {
    //pick random number
    let randomNumber = Math.floor(Math.random() * 10) + 20;
    let comChoose;
    //declire score object
    const score = JSON.parse(localStorage.getItem("score")) || {
        win: 0,
        loose: 0,
        tie: 0,
        cheat: 0
    };
    //reset all <p> tag and button
    document.querySelector('.result').innerHTML = ``;
    document.querySelector('.theSelect').innerHTML = ``;
    document.querySelector(".scores").innerHTML = ``;

    document.querySelector(".btn1").innerHTML = `<img class="img-button" src="asset/scissors-emoji.png" alt="">`;
    document.querySelector(".btn2").innerHTML = `<img class="img-button" src="asset/rock-emoji.png" alt="">`;
    document.querySelector(".btn3").innerHTML = `<img class="img-button" src="asset/paper-emoji.png" alt="">`;
    document.querySelector(".btn4").innerHTML = `<img class="img-button-special" src="asset/middle-emoji.png" alt="">`;
    document.querySelector(".btn5").innerHTML = `<img class="img-button-special" src="asset/point-emoji.png" alt="">`;
    // disable button
    disableButton(option);
    //declire variable
    let num = 1;
    let array = ["scissors", "rock", "paper"];
    // set interval
    let process = setInterval(show, 90);
    // show computer's select on screen
    function show() {
        comChoose = num % 3;
        document.querySelector('.com-choose').innerHTML = `  <img class="img-select" src="asset/${array[comChoose]}-emoji.png"alt=""> `;
        if (num == randomNumber) {
            clearInterval(process);
            compare(option, array[comChoose], score);
        }
        num++;
    }

}
function disableButton(option) {
    const btn1 = document.querySelector(".btn1");
    const btn2 = document.querySelector(".btn2");
    const btn3 = document.querySelector(".btn3");
    const btn4 = document.querySelector(".btn4");
    const btn5 = document.querySelector(".btn5");
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;
    btn5.disabled = true;

    if (option != "scissors") {
        btn1.innerHTML = `<img class="img-button" src="asset/scissors-disable-emoji.png" alt="">`;
    }
    if (option != "rock") {
        btn2.innerHTML = `<img class="img-button" src="asset/rock-disable-emoji.png" alt="">`;
    }
    if (option != "paper") {
        btn3.innerHTML = `<img class="img-button" src="asset/paper-disable-emoji.png" alt="">`;
    }
    if (option != "middle") {
        btn4.innerHTML = `<img class="img-button-special" src="asset/middle-disable-emoji.png" alt="">`;
    }
    if (option != "point") {
        btn5.innerHTML = `<img class="img-button-special" src="asset/point-disable-emoji.png" alt="">`;
    }
}
// compare 2 option
function compare(user, com, score) {
    printYourSelect(user, com);
    if (user == "scissors") {
        if (com == "rock") {
            score.loose++;
            printResult("loose");
        }
        else if (com == "paper") {
            score.win++;
            printResult("win");
        }
        else {
            score.tie++;
            printResult("tie");
        }
    }
    if (user == "rock") {
        if (com == "paper") {
            score.loose++;
            printResult("loose");
        }
        else if (com == "scissors") {
            score.win++;
            printResult("win");
        }
        else {
            score.tie++;
            printResult("tie");
        }
    }
    if (user == "paper") {
        if (com == "scissors") {
            score.loose++;
            printResult("loose");
        }
        else if (com == "rock") {
            score.win++;
            printResult("win");
        }
        else {
            score.tie++;
            printResult("tie");
        }
    }
    if (user == "middle") {
        score.win++;
        score.cheat++;
        printResult("win");
    }
    if (user == "point") {
        printResult("??");
    }
    printScore(score);

    const btn1 = document.querySelector(".btn1");
    const btn2 = document.querySelector(".btn2");
    const btn3 = document.querySelector(".btn3");
    const btn4 = document.querySelector(".btn4");
    const btn5 = document.querySelector(".btn5");
    btn1.disabled = false;
    btn2.disabled = false;
    btn3.disabled = false;
    btn4.disabled = false;
    btn5.disabled = false;
}
// print on screen your select
function printYourSelect(user, com) {
    document.querySelector('.theSelect').innerHTML = `you choose: <img class="img-select" src="asset/${user}-emoji.png"alt="">  vs <img class="img-select" src="asset/${com}-emoji.png"alt="">`;
}
// print result on your screen
function printResult(result) {
    if (result == "win") {
        document.querySelector('.result').innerHTML = `Win <img src="asset/winEmo.png"alt="">`;
        winEffect();
    }
    else if (result == "loose") {
        document.querySelector('.result').innerHTML = `Loose <img src="asset/looseEmo.png"alt="">`;
        looseEffect();
    }
    else if (result == "tie") {
        document.querySelector('.result').innerHTML = `Tie <img src="asset/tieEmo.png"alt="">`;
        confetti();
    }
    else if (result == "??") {
        document.querySelector('.result').innerHTML = `??? <img src="asset/question-face.png"alt="">`;
        fireWork();
    }
}
function printScore(score) {
    document.querySelector(".scores").innerHTML = `Win:${score.win},Loose:${score.loose},Tie:${score.tie},Cheat:${score.cheat}`;
    localStorage.setItem("score", JSON.stringify(score));
}




//effect
function fireWork() {
    var duration = 15 * 300;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
function winEffect() {
    var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}
function looseEffect() {
    var duration = 15 * 20;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        var timeLeft = animationEnd - Date.now();
        var ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                // since particles fall down, skew start toward the top
                y: (Math.random() * skew) - 0.2
            },
            colors: ['#ffffff'],
            shapes: ['circle'],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4)
        });

        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    }());
}