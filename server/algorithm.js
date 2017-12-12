/*
const disgustLimit = 40;
const JoyLimit = 40;
const emotionalToneTotal = 0;
*/


const tentativeCheck = (tentative) => {
  if (tentative === 100) {
    return 15;
  } else if (tentative > 90) {
    return 13;
  } else if (tentative > 80) {
    return 11;
  } else if (tentative > 70) {
    return 9;
  } else if (tentative > 60) {
    return 7;
  } else if (tentative > 50) {
    return 5;
  }

  return 0;
}

const analyticalCheck = (analytical) => {
  if (analytical === 100) {
    return 15;
  } else if (analytical > 90) {
    return 13;
  } else if (analytical > 80) {
    return 9;
  } else if (analytical > 70) {
    return 5;
  }

  return 0;
}

const emo_rangeCheck = (emo_range) => {
  if (emo_range === 100) {
    return 15;
  } else if (emo_range > 95) {
    return 12;
  } else if (emo_range > 90) {
    return 9;
  } else if (emo_range> 85) {
    return 5;
  }

  return 0;
}

const angerCheck = (anger) => {
  if (anger === 100) {
    return 15;
  } else if (anger > 90) {
    return 13;
  } else if (anger > 80) {
    return 11;
  } else if (anger > 70) {
    return 9;
  } else if (anger > 60) {
    return 7;
  } else if (anger > 50) {
    return 5;
  }

  return 0;
}

const disgustJoyCheck = (disgust) => {

  if (disgust > 40 && joy > 40) {
    // significant demote
  }

}

const emoAnalyticCheck = (analytical, concientiousness, emo_range) => {
  if ((analytical < 50 || concientiousness < 50) && emo_range > 65) {
    // demote
  }
}

const scoreAnalysis = (analysis) => {
  const score = 70;  // might change
  const anger = analysis.analyzer.tone.document_tone.tone_categories[0].tones[0];
  const disgust = analysis.analyzer.tone.document_tone.tone_categories[0].tones[1];
  const joy = analysis.analyzer.tone.document_tone.tone_categories[0].tones[3];
  const analytical = analysis.analyzer.tone.document_tone.tone_categories[1].tones[0];
  const tentative = analysis.analyzer.tone.document_tone.tone_categories[1].tones[2];
  const concientiousness = analysis.analyzer.tone.document_tone.tone_categories[2].tones[1];
  const emo_range = analysis.analyzer.tone.document_tone.tone_categories[2].tones[4];

  score += tentativeCheck(tentative) + analyticalCheck(analytical) - emo_rangeCheck(emo_range) - angerCheck(anger) - disgustJoyCheck(disgust) - emoAnalyticCheck(analytical, concientiousness, emo_range);

  // If upvotes for domain name > downvotes for domain name, PROMOTE / DEMOTE accordingly

  // return a score min 0 max 100
  return score;
};


