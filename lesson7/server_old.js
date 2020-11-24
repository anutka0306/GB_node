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
