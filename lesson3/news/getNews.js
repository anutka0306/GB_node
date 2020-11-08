    const request = require('request');
    const cheerio = require('cheerio');
    const fs = require('fs');
    /*if (fs.existsSync('doodle.txt')) {
        fs.unlinkSync('doodle.txt');
    }*/

module.exports = {

    freshNews: function () {
        return (new Promise(function (resolve, reject) {
            request('https://ria.ru', (error, response, html) => {
                let content = [];
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $('.cell-list__item-title').each(function (i, element) {
                        content.push($(this).text());
                    });
                } else {
                    console.log(error, response.statusCode);
                }
                resolve(content);
            });
        }))
    },

    getContent: async function(){
        try{
            let myNews = await this.freshNews();
            return 'hi';
        }catch (err) {
            return err;
        }
    }

}

   //let _request = freshNews();
   // _request.then(console.log);



   /* const _request = () =>{
        return (new Promise(function(resolve, reject) {
    request('https://ria.ru', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('.cell-list__item-title').each(function (i, element) {
                fs.appendFileSync('doodle.txt', '<p>' + $(this).text() + '</p>', 'utf8');
            });
        } else {
            console.log(error, response.statusCode);
        }
        let content = fs.readFileSync('doodle.txt', 'utf8');
        // console.log(content);
        return content;
    });
        }));
    } */


