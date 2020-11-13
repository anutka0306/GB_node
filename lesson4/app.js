const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const myNews = require('./getNews');

app.use(express.json());
//Вот без этого в req метода post ничего не приходит
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'pug')
app.set('views', path.join(__dirname + '/public/', 'views'))


app.get('/', (req, res)=>{
    res.render('index', {title: "NEWS", message: 'Сколько новостей вы хотите увидеть?'})
})

app.post('/news', (req, res) =>{
    const request = req.body;
    console.log(request.qty);
    myNews(request).then((nres)=>{
        res.render('index',{news: nres, message: "Вот ваши новости", title: "FRESH NEWS"})
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(port, ()=>{
    console.log("Listen port 3000")
})