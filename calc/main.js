let buttons = document.getElementsByTagName('button');
let dotB = document.getElementById('b.');
let val = document.getElementById('value');
let eqClick = false;
const op = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/'
};
function validateLength(val) {
    if (val.innerText.length > 15) {
        val.innerText = '0';
        return alert('that is too big, man');
    }
}
function checkIsOperation(val) {
    if (op[val.innerText]) {
        val.innerText = '';
    }
}
function isNumOrDot(button) {
    return button.getAttribute('class') === 'number' || button.getAttribute('class') === 'dot';
}
function eqClicked(hasBeenClicked) {
    if (hasBeenClicked) {
        val.innerText = '';
        eqClick = false;
    }
}
function isZero(val, added, button) {
    if (added === '0' && val.innerText === '0') {
        val.innerText = '0';
    }
    else if (val.innerText === '0' && button.getAttribute('class') === 'number') {
        val.innerText[0] = '';
        val.innerText = added;
    }
    else {
        val.innerText += added;
    }
}
function checkDotDisabled(button, val) {
    if (val.innerText.includes('.')) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}
function createNumButtons(buttons) {
    let dotB = document.getElementById('b.');
    let val = document.getElementById('value');
    for (let i = 0; i < buttons.length; i++) {
        let current = buttons[i];
        current.addEventListener('click', function but() {
            let addedText = document.getElementsByTagName('h2')[i].innerText;
            if (isNumOrDot(current)) {
                eqClicked(eqClick);
                validateLength(val);
                checkIsOperation(val);
                isZero(val, addedText, current);
                checkDotDisabled(dotB, val);
            }
        });
    }
}
function createClear(val, queue, eqClick) {
    let clearButton = document.getElementById('bAC');
    clearButton.addEventListener('click', function () {
        val.innerText = '0';
        queue.innerText = '';
        eqClick = false;
    });
}
function checkVal(val,queue,currentOp){
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
function createOpButton(op, val, queue) {
    let operators = document.getElementsByClassName('operator');
    for (let j = 0; j < operators.length; j++) {
        let currentOp = operators[j];
        currentOp.addEventListener('click', function operate() {
            eqClick = false;
            if (!op.hasOwnProperty(val.innerText)) {
                checkVal(val, queue, currentOp);
            }
        })
    }
}

function numEnd(endWithNum, val, queue) {
    if (endWithNum.test(val.innerText)) {
        queue.innerText += val.innerText;
    }
}
function validateEqual(val,queue,endWithNum,opFun){
    if (queue.innerText && endWithNum.test(queue.innerText)) {
        
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
}
let eqButton = document.getElementById('bEq');
function createEqButton(val,queue){
eqButton.addEventListener('click', function evaluate() {
    eqClick = true;
    let opFun = {
        '+': function (x, y) { return x + y },
        '-': function (a, b) { return a - b },
        '*': function (c, d) { return c * d },
        '/': function (e, f) { return e / f }
    }
    let endWithNum = /[0-9]$/;
    numEnd(endWithNum,val,queue,eqClick);
     validateEqual(val, queue, endWithNum,opFun);
});
}
  

createNumButtons(buttons);
createClear(val, queue, eqClick);
createOpButton(op, val, queue);
createEqButton(val,queue);