const db = require('./models/db.js');
const initdb = require('./models/initdb.js');
initdb();

const express = require('express');

const app = express();

app.use(express.static(__dirname+'/public'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db);

app.use(session({
    store: sessionStore,
    secret: "Большой секрет",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 600000 }
}));

/*const passport  = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
passport.use(new VKontakteStrategy({
    clientID:     '7669058',
    clientSecret: '8X5sm7mJeJm6nPMPY8Uw',
    callbackURL:  "http://localhost:3000/auth/vkontakte/callback"
}, function(accessToken, refreshToken, params, profile, done) {
    return done(null, profile);
}
));

app.get('/auth/vkontakte/',
    passport.authenticate('vkontakte'),
    function(req, res){
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });


app.get('/auth/vkontakte/callback/',
    passport.authenticate('vkontakte', {
        failureRedirect: '/login/',
        session: false
    }),
    function(req, res) {
    //res.redirect('/');
        res.send(req.user);
    }); */


/*app.use(function(req, res, next){
    const err = new Error('Ни хрена не найдено!');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    })
})*/



//app.use(passport.initialize());
//app.use(passport.session());

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

const registerHelpers = require('./views/helpers');
registerHelpers();

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const router = require('./routers');

app.use(router);

app.listen(3000, () => {
    console.log('Server listening on 3000 port.');
});
