let buttons = document.getElementsByTagName('button');
let dotB = document.getElementById('b.');
let val = document.getElementById('value');
const op = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/'
};
for (let i = 0; i < buttons.length; i++) {
    let current = buttons[i];
    current.addEventListener('click', function but() {
        let addedText = document.getElementsByTagName('h2')[i].innerText;
        if (current.getAttribute('class') === 'number' || current.getAttribute('class') === 'dot') {
            if (val.innerText.length > 15) {
                val.innerText = '0';
                return alert('that is too big, man');
            }
            if (op[val.innerText]) {
                val.innerText = '';
            }

            if (addedText === '0' && val.innerText === '0') {
                val.innerText = '0';
            }
            else if (val.innerText === '0' && current.getAttribute('class') === 'number') {
                val.innerText[0] = '';
                val.innerText = addedText;
            }
            else {
                val.innerText += addedText;
            }
            if (val.innerText.includes('.')) {
                dotB.disabled = true;
            } else {
                dotB.disabled = false;
            }
        }
    });
}

let clearButton = document.getElementById('bAC');
clearButton.addEventListener('click', function () {
    val.innerText = '0';
    queue.innerText = '';
});

let operators = document.getElementsByClassName('operator');
for (let j = 0; j < operators.length; j++) {
    let currentOp = operators[j];
    currentOp.addEventListener('click', function operate() {
        if (!op[val.innerText]) {
            if (val.innerText !== '0' && val.innerText !== '0.') {
                queue.innerText += val.innerText;
                queue.innerText += currentOp.innerText;
                val.innerText = currentOp.innerText;
            } else if (val.innerText === '0') {
                queue.innerText += val.innerText;
                queue.innerText += currentOp.innerText;
                val.innerText = currentOp.innerText;
            }
        }
    })
}

let eqButton = document.getElementById('bEq');
eqButton.addEventListener('click', function evaluate() {
    queue.innerText += val.innerText;

    let endWithNum = /[0-9]$/;
    if (queue.innerText && endWithNum.test(queue.innerText)) {

        let opFun = {
            '+': function (x, y) { return x + y },
            '-': function (a, b) { return a - b },
            '*': function (c, d) { return c * d },
            '/': function (e, f) { return e / f }
        }

        let regex = /([0-9]+\.[0-9]+e\+[0-9]+)|([0-9]+\.[0-9]*)|[0-9]+|[\+\-\*\/]/g;
        let path = queue.innerText.match(regex);
        let total = Number(path[0]);
        for (let i = 1; i < path.length; i++) {
            let current = path[i];
            if (opFun[`${current}`]) {
                total = opFun[`${current}`](total, Number(path[i + 1]));
            }
        }
        queue.innerText = '';
        if (String(total).length > 15) {
            total = Number.parseFloat(total).toExponential();
        }
        return val.innerText = String(total);
    }
});