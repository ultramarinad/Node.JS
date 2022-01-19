const colors = require("colors/safe");

const args = process.argv.slice(2);

let argOne = parseInt(args[0])
let argTwo = parseInt(args[1])

if (argOne && argTwo) {
    if (argOne < 2) {
        argOne = 2;
    }
    getPrimNumb();
} else {
    console.log(colors.red('Ошибка! Один или несколько переданных аргументов не число.'));
}

function getPrimNumb() {
    let counter = 1;

    let flag = false;

    primNumb:
        for (let i = argOne; i <= argTwo; i++) {
            for (let j = 2; j < i; j++) {
                if (i % j === 0) continue primNumb;
            }
            flag = true;
            writeColorNumb(i);
        }

    function writeColorNumb(numb) {
        if (counter > 3) counter = 1;

        switch (counter) {
            case 1:
                console.log(
                    colors.green(numb)
                );
                break;
            case 2:
                console.log(
                    colors.yellow(numb)
                );
                break;
            case 3:
                console.log(
                    colors.red(numb)
                );
                break;
        }
        counter++;
    }
    if (flag === false) {
        console.log(colors.red('Простых чисел в указанном диапазоне не обнаружено'));
    }
}