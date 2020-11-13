const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');

function collectPromises(content){
    let promiseCollection = [];

    for (let item of Object.keys(content)) {

            promiseCollection.push(content[item]['children']);
    }

    return promiseCollection;
}

module.exports = function myNews(request) {
    let qty = request.qty;
    return axios.get('https://rbc.ru/').then((res) => {
        let $ = cheerio.load(res.data);

        let content = $(".main__feed__title");

        return Promise.all(collectPromises(content));


    }).then(values => {
        let forSend = [];
        let i = 0;
        if(qty > values.length){
            qty = values.length;
        }
        while (i < qty){
                if(typeof values[i] === "undefined" || typeof values[i][0] === "undefined"){
                    console.log("undefined item");
                }else {
                    forSend.push(values[i][0]['next']['data']);
                }

            i++;
        }
        return forSend;
    }).catch((err) => {
        console.log(err);
    })
}