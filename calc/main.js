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
        let addedText = document.getElementsByTagName('h2')[i].textContent;

        if (current.getAttribute('class') === 'number' || current.getAttribute('class') === 'dot') {
            if (val.textContent.length > 15) {
                val.textContent = '0';
                return alert('that is too big, man');
            }
            if (op[val.textContent]) {
                val.textContent = '';
            }

            if (addedText === '0' && val.textContent === '0') {
                val.textContent = '0';
            }
            else if (val.textContent === '0' && current.getAttribute('class') === 'number') {
                val.textContent[0] = '';
                val.textContent = addedText;
            }
            else {
                val.textContent += addedText;
            }
            if (val.textContent.includes('.')) {
                dotB.disabled = true;
            } else {
                dotB.disabled = false;
            }
        }
    });
}

let clearButton = document.getElementById('bAC');
clearButton.addEventListener('click', function () {
    val.textContent = '0';
    queue.textContent = '';
});

let operators = document.getElementsByClassName('operator');
for (let j = 0; j < operators.length; j++) {
    let currentOp = operators[j];
    currentOp.addEventListener('click', function operate() {
        if (!op[val.textContent]) {
            if (val.textContent !== '0' && val.textContent !== '0.') {
                queue.textContent += val.textContent;
                queue.textContent += currentOp.textContent;
                val.textContent = currentOp.textContent;
            } else if (val.textContent === '0') {
                queue.textContent += val.textContent;
                queue.textContent += currentOp.textContent;
                val.textContent = currentOp.textContent;
            }
        }
    })
}

let eqButton = document.getElementById('bEq');
eqButton.addEventListener('click', function evaluate() {
    queue.textContent += val.textContent;

    let endWithNum = /[0-9]$/;
    if (queue.textContent && endWithNum.test(queue.textContent)) {

        let opFun = {
            '+': function (x, y) { return x + y },
            '-': function (a, b) { return a - b },
            '*': function (c, d) { return c * d },
            '/': function (e, f) { return e / f }
        }

        let regex = /([0-9]+\.[0-9]+e\+[0-9]+)|([0-9]+\.[0-9]*)|[0-9]+|[\+\-\*\/]/g;
        let path = queue.textContent.match(regex);
        let total = Number(path[0]);
        for (let i = 1; i < path.length; i++) {
            let current = path[i];
            if (opFun[`${current}`]) {
                total = opFun[`${current}`](total, Number(path[i + 1]));
            }
        }
        queue.textContent = '';
        if (String(total).length > 15) {
            total = Number.parseFloat(total).toExponential();
        }
        return val.textContent = String(total);
    }
});