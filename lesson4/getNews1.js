const cheerio = require('cheerio');
const axios = require('axios');
module.exports = function myNews(request) {
    let qty = request.qty;
    return axios.get('https://rbc.ru/').then((res) => {
        let $ = cheerio.load(res.data);
        const content=[];
        $('.main__feed__title').each(function(i, element){
            if (content.length < qty) {
                content.push($(this).text());
            }
        });
        return content;
    }).catch((err) => {
        console.log(err);
        return err;
    })
}