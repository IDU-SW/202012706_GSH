const express = require('express');
const router = express.Router();
const games = require('../model/Model10');
const path = require('path');


router.get('/init', initTable);

router.post('/game', addGame);
router.get('/', showIndex);
router.put('/game', editGame);
router.delete('/game/:gameId', deleteGame);

module.exports = router;

// index.html 정렬 포함
function showIndex(req, res) {
    console.log('\nGET Requst : Index');
    const sort = req.query.sort;
    const direction = req.query.direction;
    // promise 함수의 결과물은 .then에서 출력하지 않으면 promise object가 되어 출력되지 않음
    // 기존은 async로 되어있어서 됐던거임
    games.readList(sort, direction).then((result) => {
        res.render('index',{games:result, sort:sort, direction:direction});
    });
}

async function addGame(req, res) {
    console.log('\nPOST Requst : ADD');
    const game = {
        title: req.body.title,
        genre: req.body.genre,
        developer: req.body.developer,
        releaseDate: parseInt(req.body.releaseDate),
        score: parseInt(req.body.score),
        platform: req.body.platform
    }

    if (!game.title) {
        res.status(400).send({error:'title 누락'});
        return;
    }

    try {
        const result = await games.create(game);
        console.log(result);
        res.redirect('/');
    }
    catch ( error ) {
        console.log('추가 실패');
        res.status(500).send(error.msg);
    }
}

async function editGame(req, res) {
    console.log('\nPUT Requst : EDIT');
    const id = req.body._id;
    const game = {
        title: req.body.title,
        genre: req.body.genre,
        developer: req.body.developer,
        releaseDate: parseInt(req.body.releaseDate),
        score: parseInt(req.body.score),
        platform: req.body.platform
    }
    
    if (!game.title) {
        res.status(400).send({error:'title 누락'});
        return;
    }

    try {
        console.log('gameId : ', id);
        const result = await games.update(id, game);
        console.log(result);
        res.redirect('/');
    }
    catch ( error ) {
        console.log('수정 실패');
        res.status(500).send(error.msg);
    }
}

async function deleteGame(req, res) {
    console.log('\nDELETE Requst : DELETE');
    try {
        const id = req.params.gameId;
        console.log('Id : ', id);
        const result = await games.delete(id);
        console.log(result);
        res.redirect('/');
    }
    catch ( error ) {
        console.log('삭제 실패');
        res.status(500).send({msg:error.msg});
    }
}

function initTable(req, res){
   games.init().then(res.redirect('/'));
}