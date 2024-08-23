const fs = require('fs');
const path = require('path');
const readline = require('readline');

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Укажите имя файла для логирования.');
    process.exit(1);
}

const logFileName = args[0];
const logFilePath = path.resolve(__dirname, logFileName);

function logResult(result) {
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
    logStream.write(result + '\n');
    logStream.end();
}

function playGame() {
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Угадайте, что выпало: Орёл (1) или Решка (2)? ', (answer) => {
        const userGuess = parseInt(answer, 10);
        let result;

        if (userGuess === randomNumber) {
            console.log('Вы угадали!');
            result = `Выбор: ${userGuess}, Верно`;
        } else {
            console.log('Вы не угадали.');
            result = `Выбор: ${userGuess}, Неверно`;
        }

        logResult(result);

        rl.close();
    });
}

playGame();