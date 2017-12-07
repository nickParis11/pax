const chai = require('chai');
const { expect } = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

chai.request('http://localhost:3000')
  .get('/')
  .end((err, res) => {
    expect(err).to.be.null;
    expect(res).to.have.status(200);
  });
