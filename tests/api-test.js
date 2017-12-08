const chai = require('chai');
const { expect } = require('chai');
const chaiHTTP = require('chai-http');
const watsonConfig = require('../config/watson-config.js');

const watsonURL = 'https://gateway.watsonplatform.net/';
const toneAnalyzer = 'tone-analyzer/api/v3/tone?version=2017-09-21';
const hamlet = '{"text":"To be, or not to be, that is the question: Whether tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep No more; and by a sleep, to say we end the heart-ache, and the thousand natural shocks that Flesh is heir to? Tis a consummation devoutly to be wished. To die, to sleep, To sleep, perchance to Dream; aye, theres the rub, for in that sleep of death, what dreams may come, when we have shuffled off this mortal coil, must give us pause. Theres the respect that makes Calamity of so long life: For who would bear the Whips and Scorns of time, the Oppressors wrong, the proud mans Contumely, the pangs of despised Love, the Law’s delay, the insolence of Office, and the spurns that patient merit of the unworthy takes, when he himself might his Quietus make with a bare Bodkin? Who would Fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscovered country, from whose bourn no traveller returns, puzzles the will, and makes us rather bear those ills we have, than fly to others that we know not of. Thus conscience does make cowards of us all, and thus the native hue of Resolution Is sicklied oer, with the pale cast of Thought, And enterprises of great pitch and moment, with this regard their Currents turn awry, And lose the name of Action."}';

chai.use(chaiHTTP);

chai.request(watsonURL)
  .post(toneAnalyzer)
  .auth(watsonConfig.username, watsonConfig.password)
  .set('Content-Type', 'application/json')
  .send(hamlet)
  .end((err, res) => {
    expect(err).to.be.null;
    expect(res).to.have.status(200);
  });

