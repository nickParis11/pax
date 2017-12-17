const db = require('../db-index.js');
const user = require('./userController.js');

module.exports = {
  store: (analysis, username, input, isLink) => {
    user.get({ body: { username } }, (found) => {
      const tone = analysis.tone.document_tone.tone_categories;
      db.Article.findOrCreate({
        where: {
          userId: found.id,
          user_text: input,
          is_link: isLink,
          result: analysis.score,
          polarity: analysis.sentiment.polarity,
          polarity_score: analysis.sentiment.polarity_confidence * 100,
          anger: tone[0].tones[0].score * 100,
          disgust: tone[0].tones[1].score * 100,
          fear: tone[0].tones[2].score * 100,
          joy: tone[0].tones[3].score * 100,
          sadness: tone[0].tones[4].score * 100,
          analytical: tone[1].tones[0].score * 100,
          confident: tone[1].tones[1].score * 100,
          tentative: tone[1].tones[2].score * 100,
          openness: tone[2].tones[0].score * 100,
          conscientiousness: tone[2].tones[0].score * 100,
          extraversion: tone[2].tones[1].score * 100,
          agreeableness: tone[2].tones[2].score * 100,
          emotional_range: tone[2].tones[3].score * 100,
        },
      });
    });
  },
};
