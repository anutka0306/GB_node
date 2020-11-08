const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const fs = require("fs");



let getNews = require('./getNews');
let content = getNews.freshNews().then(result => result);
//content = fs.readFileSync('doodle.txt', 'utf8');
//let content = await getNews.freshNews();
let fresh;
let content1 = getNews.getContent().then(console.log);

app.set("view engine", "pug");
app.set("views", path.join(__dirname + '/public/', "views"));


router.get("/", (req, res) => {
    res.render("index", { title: "Hey", message: "What do you want to do?" });
});

router.get("/news", (req, res) => {
    res.render("news", { title: "Fresh News", message: getNews.getContent().then() });
});

app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");