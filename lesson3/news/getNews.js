    const request = require('request');
    const cheerio = require('cheerio');
    const fs = require('fs');
    const axios = require('axios');

    async function getPage() {
        try {
            const { data } = await axios.get('https://ria.ru');
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

module.exports = {

   getRes: function() {
        getPage().then((res) => {
            let content=[];
            let $ = cheerio.load(res);
            $('.cell-list__item-title').each(function (i, element) {
                content.push($(this).text() + '//end');
            });
            fs.writeFileSync('news.txt', content);

        }).catch((err) => {
            console.log(err);
        });

        let news = fs.readFileSync('news.txt', 'utf8');
        news = news.split('//end,');
        console.log(news);
        return news;
    }

}




