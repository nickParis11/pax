const Promise = require('bluebird');
const AYLIENTextAPI = require('aylien_textapi');
require('dotenv').config();

const extractArticle = (link) => {
  return new Promise((resolve, reject) => {
    const textapi = new AYLIENTextAPI({
      application_id: process.env.AYLIEN_APP_ID,
      application_key: process.env.AYLIEN_APP_KEY,
    });

    textapi.extract(
      {
        url: link,
        best_image: true,
      },
      (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      },
    );
  });
};

const sentimentAnalysis = (article) => {
  return new Promise((resolve, reject) => {
    const textapi = new AYLIENTextAPI({
      application_id: process.env.AYLIEN_APP_ID,
      application_key: process.env.AYLIEN_APP_KEY,
    });
    textapi.sentiment(
      {
        text: article,
        mode: 'document',
      },
      (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      },
    );
  });
};

module.exports.extractArticle = extractArticle;
module.exports.sentimentAnalysis = sentimentAnalysis;
