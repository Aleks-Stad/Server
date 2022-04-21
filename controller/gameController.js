let fs = require('fs');
const path = require('path');
const filename = path.resolve('data/gamesResult.txt');

exports.finishGame = function finishGame(req, res) {
    const body = req.body;
    const gameResultFile = fs.readFileSync(filename).toString();
    let gameNumber=0;
    

    if (gameResultFile.length - 1 < 0) {
        gameNumber = 1;
    } else {
        gameNumber = gameResultFile.split('\n').length;
    }

    fs.appendFile(filename,
        JSON.stringify({
            id: gameNumber,
            winnerId: body.winnerId,
            loserId: body.loserId,
        }) + '\n',
        (err) => {
            if (err) throw (err);
            res.send({
                id: gameNumber
            });
        })
}

exports.gamesResult = function (req, res) {
    const resultFileArray = fs.readFileSync(filename).toString().split('\n').filter(el => el !== '');
    res.send(resultFileArray.map(row => {
        if (row !== '') { return JSON.parse(row); }
    }))
}

exports.deleteGames = function (req, res) {
    fs.truncate(filename, err => {
        if(err) throw err;
     });
}