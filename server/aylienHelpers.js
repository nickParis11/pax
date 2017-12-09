const AYLIENTextAPI = require('aylien_textapi');

module.exports = function extractArticle(link, callback) {
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
      callback(err, response);
    },
  );
};

module.exports = function sentimentAnalysis(article, callback) {
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
      callback(err, response);
    },
  );
};
