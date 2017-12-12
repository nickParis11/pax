/*
const disgustLimit = 40;
const JoyLimit = 40;
const emotionalToneTotal = 0;
*/

// anger
// disgust
// fear
// joy
// sadness

// analytical
// confident
// tentative

// opennness
// conscientiousness
// extraversion
// agreeableness
// emotional range

// analyzer.tone.document_tone.tone_categories.0.tones.0 <-- anger

// input is an analysis object
// output is a number?

/*
const scoreAnalysis = (analysis) => {
  const score = 0;

  return score;
};
*/

// STEPS
// If tentativeness > 50, PROMOTE (GRADED)
// If analytical > 70, PROMOTE (GRADED)
// If emotional range > 85, DEMOTE (GRADED)
// If anger > 50, DEMOTE (GRADED)

// If disgust > 40 + joy > 40, DEMOTE (SIGNIFICANT)
// If analytical < 50 OR concientiousness < 50 AND emotional range > 65, DEMOTE (SIGNIFICANT)

// If upvotes for domain name > downvotes for domain name, PROMOTE / DEMOTE accordingly

