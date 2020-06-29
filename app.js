const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const method = require("method-override");
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(method('_method'));
app.use(session({
    secret: 'Secret Key',
    resave: false,
    saveUninitialized: false
    // ,cookie:{maxAge:3000} // 쿠키의 maxAge를 이용해서 세션 유효기간 설정. 3초
 }));

 app.use(setup);

 function setup(req, res, next){
     console.log(req.path);
     console.log(req.session.user);
     console.log(req.sessionID);
     if(req.session.user)
        res.locals.user = req.session.user;
     switch(req.path){
         case '/login' :
         case '/register':
         case '/favicon.ico':
             next();
             break;
         default:
             if(!req.session.user) res.render('login');
             else next();
             break;
     }
 }


const gameRouter = require('./router/GameRouter');
app.use(gameRouter);

const userRouter = require('./router/UserRouter');
app.use(userRouter);


module.exports = app;

