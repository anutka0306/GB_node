 https = require('https');

const IAM_TOKEN = 't1.9f7L7euelZqOlMaNl4qOx4vHjc2JzY_IjuXz91UJVwL67wcNB0_93fP3FThUAvrvBw0HT_0.-FlO24ax1BwIMBZDjkogy_6KgwFXSw3egqQOxdV6byfaXcArF_ETHdD8UD3sXWukJqRS9vMaMihkRc9SmRHqBQ';
const FOLDER = 'b1gfdl2tnbciiqv1a0sv';

 var options = {
     hostname: 'translate.api.cloud.yandex.net',
    path: '/translate/v2/translate/',
    method: 'POST',
     headers: {
        'Content-Type': 'aaplication/json',
         'Authorization': 'Bearer ' + IAM_TOKEN
    }
 }

 var req = https.request(options, (res) => {
     console.log('STATUS: ' + res.statusCode);
     console.log('HEADERS: ' + JSON.stringify(res.headers));
     res.setEncoding('utf8');
     res.on('data', function (chunk) {
         console.log('BODY: ' + chunk);
    });
 })

 req.write(`{
    "folder_id": "${FOLDER}",
     "texts": ["В этом примере показано, как перевести на русский язык две строки с текстом", "World is very big"],
     "targetLanguageCode": "en"
 }`);
 req.end();