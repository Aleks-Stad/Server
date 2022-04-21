const area = document.querySelector('.game-field');
const h2 = document.querySelector('.gamer')
let boxes;
let move = 0;
let n = 3;
let g = 1;
let now = [];
let winner = [];
let cross = document.getElementById('cross').outerHTML;
let circle = document.getElementById('circle').outerHTML;
let game_over = false;
const api_results = new XMLHttpRequest();

window.onload = open();

function open() {
    document.getElementById("minus").disabled = true;
    document.querySelector(".game-field").innerHTML = "";
    for (let i = 0; i < n * n; i++) {
        document.querySelector(".game-field").innerHTML += '<div class ="game-field_cell" id="null""></div>';
    }
    boxes = document.getElementsByClassName('game-field_cell');

    now.length = n * n;
    winner.length = n * 2 + 2;
    for (let i = 0; i < winner.length; i++) {
        winner[i] = [];
    }

    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            winner[i][j] = i + n * j;
            winner[n + i][j] = j + n * i;
        }
        winner[n + n][i] = i * (n + 1);
        winner[n + n + 1][i] = (i + 1) * (n - 1);
    }
}

area.addEventListener('click', e => {
    if (game_over == false) {
        if (e.target.className == 'game-field_cell' && e.target.innerHTML == "") {
            if (move % 2 === 0) {
                e.target.innerHTML = cross;
                g++;
                h2.innerHTML = `Ходит игрок ${g}`;
            }
            else {
                e.target.innerHTML = circle;
                g--;
                h2.innerHTML = `Ходит игрок ${g}`;
            }
            now[move] = e.target;
            move++;
            check();
        }
    }
})

function send_result(winner_t, loser_t) {
    api_results.open("POST", "/api/game");
    api_results.setRequestHeader("Content-Type", "application/json");
    api_results.send(JSON.stringify({
        winnerId: winner_t,
        loserId: loser_t
    }));
}

function check() {
    for (i = 0; i < winner.length; i++) {
        let count_cross = 0;
        let count_circle = 0;
        for (j = 0; j < n; j++) {
            if (boxes[winner[i][j]].innerHTML == cross) {
                count_cross++;
            }
            else if (boxes[winner[i][j]].innerHTML == circle) {
                count_circle++;
            }
        }
        if (count_cross == n) {
            coloring(i);
            h2.innerHTML = `Победа игрока ${g - 1}`;
            document.getElementById("back").disabled = true;
            game_over = true;
            send_result('Игрок 1', 'Игрок 2');
        }
        else if (count_circle == n) {
            coloring(i);
            h2.innerHTML = `Победа игрока ${g + 1}`;
            document.getElementById("back").disabled = true;
            game_over = true;
            send_result('Игрок 2', 'Игрок 1');
        }
        else if (move >= n * n && game_over == false) {
            h2.innerHTML = `Ничья`;
            document.getElementById("back").disabled = true;
            game_over = true;
            console.log("adasd")
            send_result('Ничья', 'Ничья');
        }
    }
}

function coloring(i) {
    for (j = 0; j < n; j++) {
        boxes[winner[i][j]].style.backgroundColor = '#AA0000';
    }
}

function back() {
    if (move > 0) {
        move--;
        now[move].innerHTML = ""
        g == 1 ? g = 2 : g = 1;
        h2.innerHTML = `Ходит игрок ${g}`;
    }
}

function reset() {
    move = 0;
    g = 1;
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
        boxes[i].style.backgroundColor = 'white';
    }
    document.getElementById("back").disabled = false
    document.getElementById("minus").disabled = false;;
    h2.innerHTML = `Ходит игрок ${g}`;
    if (n <= 3) { document.getElementById("minus").disabled = true; }
    game_over = false;

}

function size_plus() {
    n++;
    area.style.gridTemplateColumns = `repeat(${n}, auto)`;
    reset();
    open();
    document.getElementById("minus").disabled = false;
}

function size_minus() {
    if (n > 3) {
        n--;
        area.style.gridTemplateColumns = `repeat(${n}, auto)`;
        open();
        reset();
    }
    else { document.getElementById("minus").disabled = true; }
}
