const express = require('express');
const router = express.Router();
const users = require('../model/UserModel');
const session = require('express-session');

module.exports = router;

router.get('/init', initTable);
router.post('/login',login);
router.get('/logout',logout);
router.get('/register',registerForm);
router.post('/register',register);


function login(req, res){
    const user = {
        id: req.body.id,
        password: req.body.pw
    }
    users.readOne(user).then((user) => {
        console.log(user);
        req.session.user = user;
        res.redirect('/');
    }).catch((err) => {res.redirect('login', err)});
}

function logout(req, res){
    req.session.user = '';
    res.redirect('/');
}
function registerForm(req, res){
    res.render('register');
}
function register(req, res){
    const user = {
        id: req.body.id,
        password: req.body.pw,
        name: req.body.name,
        email: req.body.email,
        authority: false
    }
    if(!user.id | !user.password) {
        const err = '아이디와 비밀번호를 입력해주세요.';
        res.render('register', {err: err, name: user.name, email: user.email});
        return;
    }
    users.create(user)
        .then((user) => {
            res.redirect('/');
        })
        .catch((err) => {
            const errMsg = '가입된 아이디입니다.';
            res.render('register', {err: errMsg, name: user.name, email: user.email});
        });
}
function initTable(req, res){
    users.init().then(res.redirect('/'));
 }