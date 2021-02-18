let resultValue = document.querySelector('.js-result');
let tmpValue = '';

let arrOfButtons = document.querySelectorAll('button');

// events for mouse click on the buttons
arrOfButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonText = button.innerText;
        if (buttonText === '=') {
            resultValue.value = eval(tmpValue);
        } else {
            if (buttonText === 'X') {
                tmpValue += '*';
            } else if (buttonText === 'C') {
                tmpValue = "";
            } else {
                tmpValue += buttonText;
            }
            resultValue.value = tmpValue;
        }
    });
});
// events for mouse click on the buttons


// events for keyboard keys
document.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        resultValue.value = eval(tmpValue); // JavaScript magic happens here
    } else {
        if (event.key <= 9 || event.key === '+' || event.key === '-' || event.key === '*' || event.key === '.'
            || event.key === '/' || event.key === '%' || event.key === '(' || event.key === ')') {
            tmpValue += event.key;
        }

        if (event.key === 'x') {
            tmpValue += '*';
        }

        if (event.key === 'Backspace') {
            tmpValue = tmpValue.slice(0, -1);
        }

        if (event.key === 'c') {
            tmpValue = "";
            console.clear();
        }
        resultValue.value = tmpValue;
    }
});
// events for keyboard keys


// eval() returns error if it can NOT evaluate the expression
window.onerror = function () {
    alert("ERROR: INVALID EXPRESSION");
    tmpValue = "";
    resultValue.value = tmpValue;
}

console.log("JS calculator by TehWeifu\nhttp://JulianBSL.tech");