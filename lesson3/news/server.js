const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();



app.set("view engine", "pug");
app.set("views", path.join(__dirname + '/public/', "views"));

router.get("/", (req, res) => {
    res.render("index", { title: "Hey", message: "What do you want to do?" });
});

router.get("/news", (req, res) => {
    res.render("news", {
        title: "Fresh News", message: require('./getNews').getRes()
    });
});


app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");