class Dice {
    constructor(num) {
        this.value = Math.floor(1 + Math.random() * 6);
        this.locked = false;
        this.img_source = `./yahtzee/resources/img/dice_${this.value}.png`;
        this.position = num;
        this.current_rotation = 0;
    }

    roll() {
        if (this.locked === false) {
            this.value = Math.floor(1 + Math.random() * 6);
        }
        this.img_source = `./yahtzee/resources/img/dice_${this.value}.png`;
    }

    toggle_lock() {
        this.locked = !this.locked;
    }

    shake() {
        if (this.locked === false) {
            let parent_div = document.querySelector(`.dice-number-${this.position}`);
            this.current_rotation += 360;
            parent_div.style.transform = `rotate(${this.current_rotation}deg) scale(1.0)`;
            parent_div.style.transition = "transform 0.5s"
        }
    }
}

function check_scores() {
    let result_roll = [0, 0, 0, 0, 0, 0, 0];

    arr_dices.forEach((elem) => {
        result_roll[elem.dice.value]++;
    });


    checkNums(result_roll);
    check_trips_poker_chance_yahtzee(result_roll);
    check_full(result_roll);
    check_short_straight(result_roll);
    check_large_straight(result_roll);
}

function checkNums(result_roll) {
    let ones_cell = document.querySelector('.js-ones-value');
    let twos_cell = document.querySelector('.js-twos-value');
    let threes_cell = document.querySelector('.js-threes-value');
    let fours_cell = document.querySelector('.js-fours-value');
    let fives_cell = document.querySelector('.js-fives-value');
    let sixes_cell = document.querySelector('.js-sixes-value');

    let nums_sum = 0;

    if (ones_cell.locked === false) {
        ones_cell.innerHTML = String(result_roll[1] * 1);
    } else {
        nums_sum += Number(ones_cell.innerHTML);
    }

    if (twos_cell.locked === false) {
        twos_cell.innerHTML = String(result_roll[2] * 2);
    } else {
        nums_sum += Number(twos_cell.innerHTML);
    }

    if (threes_cell.locked === false) {
        threes_cell.innerHTML = String(result_roll[3] * 3);
    } else {
        nums_sum += Number(threes_cell.innerHTML);
    }

    if (fours_cell.locked === false) {
        fours_cell.innerHTML = String(result_roll[4] * 4);
    } else {
        nums_sum += Number(fours_cell.innerHTML);
    }

    if (fives_cell.locked === false) {
        fives_cell.innerHTML = String(result_roll[5] * 5);
    } else {
        nums_sum += Number(fives_cell.innerHTML);
    }

    if (sixes_cell.locked === false) {
        sixes_cell.innerHTML = String(result_roll[6] * 6);
    } else {
        nums_sum += Number(sixes_cell.innerHTML);
    }

    document.querySelector('.js-sum-value').innerHTML = String(nums_sum);
    document.querySelector('.js-bonus-value').innerHTML = (nums_sum > 62 ? "35" : "0");
}

function check_trips_poker_chance_yahtzee(result_roll) {
    let trips_cell = document.querySelector('.js-trips-value');
    let poker_cell = document.querySelector('.js-poker-value');
    let yahtzee_cell = document.querySelector('.js-yahtzee-value');
    let chance_cell = document.querySelector('.js-chance-value');

    let found_trips = false;
    let found_poker = false;
    let found_yahtzee = false;

    let result_sum = 0;

    for (let i = 0; i < result_roll.length; i++) {
        if (result_roll[i] > 2) {
            found_trips = true;
        }
        if (result_roll[i] > 3) {
            found_poker = true;
        }
        if (result_roll[i] > 4) {
            found_yahtzee = true;
        }

        result_sum += result_roll[i] * i;
    }

    if (trips_cell.locked === false) {
        trips_cell.innerHTML = (found_trips ? String(result_sum) : '0');
    }
    if (poker_cell.locked === false) {
        poker_cell.innerHTML = (found_poker ? String(result_sum) : '0');
    }
    if (yahtzee_cell.locked === false) {
        yahtzee_cell.innerHTML = (found_yahtzee ? '50' : '0');
    }
    if (chance_cell.locked === false) {
        chance_cell.innerHTML = String(result_sum);
    }
}

function check_full(result_roll) {
    let full_cell = document.querySelector('.js-full-value');

    let found_two = false;
    let found_three = false;

    for (const resultRollElement of result_roll) {
        if (resultRollElement === 2) {
            found_two = true;
        }
        if (resultRollElement === 3) {
            found_three = true;
        }
    }

    if (full_cell.locked === false) {
        full_cell.innerHTML = (found_three && found_two ? '25' : '0');
    }
}

function check_short_straight(result_roll) {
    let small_cell = document.querySelector('.js-small-value');

    let count = 0;
    let found_straight = false;

    for (const resultRollElement of result_roll) {
        if (resultRollElement > 0) {
            count++;
        }
    }

    if (count === 4) {
        if (result_roll[5] === 0 && result_roll[6] === 0) {
            found_straight = true;
        }
        if (result_roll[1] === 0 && result_roll[6] === 0) {
            found_straight = true;
        }
        if (result_roll[1] === 0 && result_roll[2] === 0) {
            found_straight = true;
        }
    }
    if (count === 5 && (result_roll[1] === 0 || result_roll[6] === 0 || result_roll[2] === 0 || result_roll[5] === 0)) {
        found_straight = true;
    }

    if (small_cell.locked === false) {
        small_cell.innerHTML = (found_straight ? '30' : '0');
    }
}

function check_large_straight(result_roll) {
    let large_cell = document.querySelector('.js-large-value');

    let count = 0;
    let found_straight = false;

    for (const resultRollElement of result_roll) {
        if (resultRollElement > 0) {
            count++;
        }
    }

    if (count === 5 && (result_roll[1] === 0 || result_roll[6] === 0)) {
        found_straight = true;
    }

    if (large_cell.locked === false) {
        large_cell.innerHTML = (found_straight ? '40' : '0');
    }
}

function resetBoard() {
    arr_dices.forEach(elem => {
        elem.dice.locked = false;
        board.appendChild(elem);
    })
    roll_sequence();
    setTimeout(test_shake, 0);
}

function initialize_game() {
    initialize_dices();
    initialize_roll_button()
}

function initialize_dices() {
    for (let i = 0; i < 5; i++) {
        let tmp_dice = new Dice(i);
        let tmp_div = document.createElement('div');
        tmp_div.dice = tmp_dice;
        tmp_div.classList.add('dice');
        tmp_div.classList.add('dice-hover');
        tmp_div.classList.add(`dice-number-${i}`);

        let tmp_img = document.createElement('img');
        tmp_img.src = tmp_div.dice.img_source;
        tmp_div.appendChild(tmp_img);

        tmp_div.style.cursor = 'pointer';

        tmp_div.addEventListener('click', () => {
            tmp_div.dice.toggle_lock();
            if (tmp_div.dice.locked) {
                hand.appendChild(tmp_div);
            } else {
                board.appendChild(tmp_div);
            }
        });

        tmp_div.addEventListener('mouseover', () => {
            tmp_div.style.transform = `rotate(${tmp_div.dice.current_rotation}deg) scale(1.2)`;
        });

        tmp_div.addEventListener('mouseleave', () => {
            tmp_div.style.transform = `rotate(${tmp_div.dice.current_rotation}deg) scale(1.0)`;
        });

        board.appendChild(tmp_div);
        arr_dices.push(tmp_div);
    }
}

function roll_sequence() {
    if (rolls_this_turn < 3) {
        rolls_this_turn++;
        let progress_bar = document.querySelector('.progress-bar');
        switch (rolls_this_turn) {
            case 1:
                progress_bar.style.width = "33%";
                break;
            case 2:
                progress_bar.style.width = "66%";
                break;
            case 3:
                document.querySelector('.js-roll-button').style.background = "#73023e"
                document.querySelector('.js-roll-button').style.cursor = "default"
                progress_bar.style.width = "100%";
                break;
        }
        // arr_dices.forEach((elem) => {
        //     elem.dice.roll();
        //     elem.querySelector('img').src = elem.dice.img_source;
        // });
        setTimeout(test_shake, 0);
        // check_scores();
    }
}

function initialize_roll_button() {
    roll_button.addEventListener('click', roll_sequence)
}

function update_round() {
    if (game_round === 13) {
        finish_game();
    } else {
        game_round++;
        document.querySelector('.current-round').innerHTML = String(game_round);
    }

    resetBoard();

    arr_dices.forEach((elem) => {
        elem.dice.roll();
        elem.querySelector('img').src = elem.dice.img_source;
    });
    check_scores();
}

function finish_game() {
    let total_result_text = document.querySelector('.js-end-text');
    let total_result_cell = document.querySelector('.js-total-value')
    let total_sum = 0;

    values_cells.forEach(elem => {
        total_sum += Number(elem.innerHTML);
    });
    total_sum += Number(document.querySelector('.js-bonus-value').innerHTML);

    total_result_cell.innerHTML = String(total_sum);

    total_result_text.innerHTML = `You got a total of ${total_sum} points. Nice!`;
}


// "Main function starts here"
let board = document.querySelector('.board');
let hand = document.querySelector('.hand');
let roll_button = document.querySelector('.js-roll-button');
let values_cells = document.querySelectorAll('.js-values');
let rolls_this_turn = 0;
let game_round = 1;

let arr_dices = []

values_cells.forEach((elem) => {
    elem.locked = false;
    elem.style.cursor = 'pointer';
    elem.addEventListener('click', function locks() {
        elem.locked = true;
        elem.style.color = '#c80060';
        elem.style.fontWeight = "700";
        elem.style.cursor = 'default';
        elem.removeEventListener('click', locks);

        update_round();

        //yeah, not so great
        document.querySelector('.progress-bar').style.width = "33%";
        document.querySelector('.js-roll-button').style.background = "#c80060"
        document.querySelector('.js-roll-button').style.cursor = "pointer"
        rolls_this_turn = 1;

        check_scores();
    });
});


initialize_game();
resetBoard();

function test_shake() {
    for (let i = 0; i < arr_dices.length; i++) {
        setTimeout(function () {
            arr_dices[i].dice.shake();
            arr_dices[i].dice.roll();
            arr_dices[i].querySelector('img').src = arr_dices[i].dice.img_source;

        }, 200 * i);
    }
    setTimeout(check_scores, 1000);
}

