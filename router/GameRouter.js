const express = require('express');
const router = express.Router();
const games = require('../model/GameModel');
const path = require('path');


router.get('/games', showGameList);
router.get('/games/:method/:text', showSearchGameList);
router.get('/games/:sort', showGameListOrder);
router.get('/game/:gameId', showGameDetail);
router.post('/game', addGame);
router.put('/game', editGame);
router.delete('/game/:gameId', deleteGame);
// index.html
router.get('/', (req, res) => {
    const gameList = games.getGameList();
    res.render('index',{games:gameList});
 });
 
module.exports = router;

function showGameList(req, res) {
    console.log('-----게임 목록 불러오기-----');
    const gameList = games.getGameList();
    const result = { data:gameList, count:gameList.length };
    res.send(result);
}
function showSearchGameList(req, res) {
    console.log('-----게임 검색 목록 불러오기-----');
    const method = req.params.method;
    const text = req.params.text;
    const gameList = games.getGameListSearch(method, text);
    const result = { data:gameList, count:gameList.length };
    res.send(result);
}


function showGameListOrder(req, res) {
    console.log('-----게임 정렬 목록 불러오기-----');
    const sort = req.params.sort;
    const gameList= games.getGameListSort(sort);
    const result = { data:gameList, count:gameList.length };
    res.send(result);
}


// Async-await를 이용하기
async function showGameDetail(req, res) {
    console.log('-----게임 불러오기-----');
    try {
        const gameId = parseInt(req.params.gameId);
        console.log('gameId : ', gameId);
        const info = await games.getGameDetail(gameId);
        res.send(info);
    }
    catch ( error ) {
        console.log('불러오기 실패');
        res.status(error.code).send({msg:error.msg});
    }
}


async function addGame(req, res) {
    console.log('-----게임 추가-----');
    const title = req.body.title;

    if (!title) {
        res.status(400).send({error:'title 누락'});
        return;
    }
    const genre = req.body.genre;
    const developer = req.body.developer;
    const releaseDate = parseInt(req.body.releaseDate);
    const score = parseInt(req.body.score);
    const platform = req.body.platform;

    try {
        const result = await games.addGame(title, genre, developer, releaseDate, score, platform);
        console.log(result);
        res.redirect('/');
    }
    catch ( error ) {
        console.log('추가 실패');
        res.status(500).send(error.msg);
    }
}

async function editGame(req, res) {
    console.log('-----게임 수정-----');

    const gameId = parseInt(req.body.id);
    const title = req.body.title;
    const genre = req.body.genre;
    const developer = req.body.developer;
    const releaseDate = parseInt(req.body.releaseDate);
    const score = parseInt(req.body.score);
    const platform = req.body.platform;
    
    
    if (!title) {
        res.status(400).send({error:'title 누락'});
        return;
    }

    try {
        console.log('gameId : ', gameId);
        const result = await games.editGame(gameId, title, genre, developer, releaseDate, score, platform);
        console.log(result);
        res.redirect('/');
    }
    catch ( error ) {
        console.log('수정 실패');
        res.status(500).send(error.msg);
    }
}

async function deleteGame(req, res) {
    console.log('-----게임 삭제-----');
    try {
        const gameId = parseInt(req.params.gameId);
        console.log('gameId : ', gameId);
        const result = await games.deleteGame(gameId);
        console.log(result);
        res.redirect('/');
    }
    catch ( error ) {
        console.log('삭제 실패');
        res.status(500).send({msg:error.msg});
    }
}
