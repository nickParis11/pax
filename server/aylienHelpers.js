const Promise = require('bluebird');
const AYLIENTextAPI = require('aylien_textapi');

const extractArticle = (link, callback) => {
  return new Promise((resolve, reject) => {
    const textapi = new AYLIENTextAPI({
      application_id: 'cafd9f65',
      application_key: '1119add6de155823feff13857d869feb',
    });

    textapi.extract(
      {
        url: link,
        best_image: true,
      },
      (err, response) => {
        if (err) { return reject(err); }
        else { resolve(response); }
      },
    );
  });
};

const sentimentAnalysis = (article, callback) => {
  return new Promise((resolve, reject) => {
    const textapi = new AYLIENTextAPI({
      application_id: 'cafd9f65',
      application_key: '1119add6de155823feff13857d869feb',
    });
    textapi.sentiment(
      {
        text: article,
        mode: 'document',
      },
      (err, response) => {
        if (err) { return reject(err); }
        else { resolve(response); }
      },
    );
  });
};

module.exports.extractArticle = extractArticle;
module.exports.sentimentAnalysis = sentimentAnalysis;
