const db = require('../db-index.js');
const user = require('./userController.js');

module.exports = {
  store: (analysis, username, link, isLink) => {
    user.get({ body: { username } }, (found) => {
      const tone = analysis.tone.document_tone.tone_categories;
      db.Article.findOrCreate({
        where: {
          userId: found.id,
          user_text: link,
          is_link: isLink,
          result: analysis.score,
          polarity: analysis.sentiment.polarity,
          polarity_score: analysis.sentiment.polarity_confidence * 100,
          anger: tone[0].tones[0].score,
          disgust: tone[0].tones[1].score,
          fear: tone[0].tones[2].score,
          joy: tone[0].tones[3].score,
          sadness: tone[0].tones[4].score,
          analytical: tone[1].tones[0].score,
          confident: tone[1].tones[1].score,
          tentative: tone[1].tones[2].score,
          openness: tone[2].tones[0].score,
          conscientiousness: tone[2].tones[0].score,
          extraversion: tone[2].tones[1].score,
          agreeableness: tone[2].tones[2].score,
          emotional_range: tone[2].tones[3].score,
        },
      });
    });
  },
};
