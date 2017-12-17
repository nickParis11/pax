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
};

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
};

const emoRangeCheck = (emoRange) => {
  if (emoRange === 100) {
    return 15;
  } else if (emoRange > 95) {
    return 12;
  } else if (emoRange > 90) {
    return 9;
  } else if (emoRange > 85) {
    return 5;
  }

  return 0;
};

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
};

const disgustJoyCheck = (disgust, joy) => {
  if (disgust > 40 && joy > 40) {
    return 25;
  }

  return 0;
};

const emoAnalyticCheck = (analytical, concientiousness, emoRange) => {
  if ((analytical < 50 || concientiousness < 50) && emoRange > 65) {
    return 15;
  }

  return 0;
};

const trustAnalysis = (analysis) => {
  let trust = 70;
  const anger = analysis.document_tone.tone_categories[0].tones[0].score * 100;
  const disgust = analysis.document_tone.tone_categories[0].tones[1].score * 100;
  const joy = analysis.document_tone.tone_categories[0].tones[3].score * 100;
  const analytical = analysis.document_tone.tone_categories[1].tones[0].score * 100;
  const tentative = analysis.document_tone.tone_categories[1].tones[2].score * 100;
  const concientiousness = analysis.document_tone.tone_categories[2].tones[1].score * 100;
  const emoRange = analysis.document_tone.tone_categories[2].tones[4].score * 100;

  trust += ((tentativeCheck(tentative)
        + analyticalCheck(analytical))
        - emoRangeCheck(emoRange)
        - angerCheck(anger)
        - disgustJoyCheck(disgust, joy)
        - emoAnalyticCheck(analytical, concientiousness, emoRange));

  return trust;
};

module.exports.trustAnalysis = trustAnalysis;
