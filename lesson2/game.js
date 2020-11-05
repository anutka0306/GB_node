const fs = require('fs');
const readline = require('readline');
const log4js = require('log4js');


log4js.configure({
    appenders: {
        game: { type: "file", filename: "game.log" },
        current:{type:"file", filename: "curGame.log"}
        },
    categories: {
        default: { appenders: ["game"], level: "info" },
        current: { appenders: ["current"], level: "info"}
    }
});

const logger = log4js.getLogger("game");
const curLogger = log4js.getLogger("current");

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

console.log('### - Для выхода нажми - q');
console.log('### - Статистика всех игр - s');
console.log('### - Статистика текущей игры - c');
console.log('Выбирай: Орел(1) или Решка(2)?');

let computerChoise;
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (cmd) {
    switch (cmd) {
        case '1':
            console.log('Твой выбор - Орел');
            break;
        case '2':
            console.log('Твой выбор - Решка');
            break;
        case 'q':
            rl.close();
            fs.unlink('curGame.log', (err) => {
                if (err) throw err;
                console.log('curGame.log was deleted');
            });
            break;
        case 's':
            let file = fs.readFileSync("game.log","utf8");
            let compWin = /Computer/g;
            let userWin = /User/g;
            let comWinNumber = 0;
            let userWinNumber = 0;
            if(file.match(compWin) != null) {
                comWinNumber = file.match(compWin).length;
            }
            if(file.match(userWin) != null) {
                userWinNumber = file.match(userWin).length;
            }
            console.log("@@@@@@@@@@@@");
            console.log("ОБЩАЯ СТАТИСТИКА");
            console.log("Компьютер выиграл " + comWinNumber + " раз!");
            console.log("Человек выиграл " + userWinNumber + " раз!");
            break;
        case 'c':
            let curGameFile = fs.readFileSync("curGame.log","utf8");
            let curCompWin = /Computer/g;
            let curUserWin = /User/g;
            let curCompWinNumber = 0;
            let curUserWinNumber = 0;
            if(curGameFile.match(curCompWin) != null) {
                curCompWinNumber = curGameFile.match(curCompWin).length;
            }
            if(curGameFile.match(curUserWin) != null) {
                curUserWinNumber = curGameFile.match(curUserWin).length;
            }
            console.log("@@@@@@@@@@@@");
            console.log("СТАТИСТИКА ТЕКУЩЕЙ ИГРЫ");
            console.log("Компьютер выиграл " + curCompWinNumber + " раз!");
            console.log("Человек выиграл " + curUserWinNumber + " раз!");
            break;
        default:
            console.log("Что??? Кажется ты нажал что-то не то!");
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log('### - Для выхода нажми - q');
            console.log('### - Статистика всех игр - s');
            console.log('### - Статистика текущей игры - c');
    }
    if(cmd == '1' || cmd == '2') {
        console.log('Кидаем монетку...');
        computerChoise = randomInteger(1, 2);
        computerChoise == 1 ? console.log("Выпал Орел!") : console.log("Выпала Решка");
        if(cmd == computerChoise){
            console.log("ТЫ ВЫИГРАЛ!!! :-)");
            logger.info('User WIN');
            curLogger.info('User WIN');
        }else{
            console.log("ТЫ ПРОИГРАЛ :-(");
            logger.info('Computer WIN');
            curLogger.info('Computer WIN');
        }
        console.log("######################");
        console.log("######################");
        console.log("                      ");
        console.log("Орел(1) или Решка(2)?");
    }
    else if(cmd == 'q'){
        console.log("Bye, bye");
    }
    else{
        console.log("Орел(1) или Решка(2)?");
    }

});


/*logger.info('First log');

let data;
fs.readFile('game.log','utf8', (err, fdata) =>{
    if(err){
        console.log(err);
    }else{
        data = fdata;
        console.log(data);
    }
});*/
