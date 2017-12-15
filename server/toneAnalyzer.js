const Promise = require('bluebird');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

module.exports = function analyzeInput(input, callback) {
  return new Promise((resolve, reject) => {
    const request = new ToneAnalyzerV3({
      username: 'c8cccfdc-ffe4-496f-af7e-c7c8d4f91ecb',
      password: 'wbymSZ7Lgp6W',
      version_date: '2016-05-19',
    });
    request.tone(
      {
        tone_input: input,
        content_type: 'text/plain',
      },
      (err, tone) => {
        if (err) { return reject(err); }
        else { resolve(tone); }
      },
    );
  });
};
