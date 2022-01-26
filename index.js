const colors = require("colors/safe");

const args = process.argv.slice(2);

const regexp = /^(\d+)\-(\d+)\-(\d+)\-(\d+)$/

class Timer {
    constructor(str) {
        this.futureDate = str
    }
    getDateFromArgs(str) {
        let result = str.replace(regexp, (match, hour, day, month, year) => `${year}-${month}-${day}T${hour}`)
        result = result + ':00:00.000'
        let date = Date.parse(result)
        return date
    }
    calcTime() {
        let start = Date.now()
        let end = this.getDateFromArgs(this.futureDate)
        return end - start
    }
    showTimer() {
        const timeId = setInterval(() => {
            let ms = this.calcTime()
            if (ms > 0) {
                let days = Math.floor(ms / (1000 * 60 * 60 * 24));
                let hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
                let secs = Math.floor((ms % (1000 * 60)) / 1000);

                console.log(colors.yellow(`Осталось ${days} дней ${hours} часов ${mins}  минут ${secs}  секунд`))
            } else {
                console.log(colors.green('Завершение работы'))
                clearInterval(timeId)
            }
        }, 1000);
    }
}


for (let i = 0; i < args.length; i++) {
    if (regexp.test(args[i])) {
        setTimeout(() => {
            let timer = new Timer(args[i])
            timer.showTimer()
        })
    } else {
        console.log(colors.red(`Исправьте ${i+1} аргумент в формате час-день-месяц-год. Пример 10-01-01-2022`))
    }
}