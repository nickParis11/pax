const db = require('../db-index.js');
const user = require('./userController.js');

module.exports = {
  store: (username, article) => {
    user.get({ body: { username } }, (user) => {
      db.Vote.findOrCreate({
        where: {
          userId: user.id,
          articleId: article,
        },
        defaults: {
          voted: false,
          upvote: false,
          downvote: false,
        },
      })
      .catch((err) => {
        console.log('Error storing article in votes table:', err);
      });
    });
  },
  makeVote: (user, article, upvote, cb) => {
    if (upvote) {
      db.Vote.update({ voted: true, upvote: true, downvote: false },
        { where: { userId: user, articleId: article },
          returning: true })
        .then((res) => {
          cb(res);
        })
        .catch((err) => {
          console.log('Error upvoting article:', err);
        });
    } else {
      db.Vote.update({ voted: true, upvote: false, downvote: true },
        { where: { userId: user, articleId: article } })
        .catch((err) => {
          console.log('Error downvoting article:', err);
        });
    }
  },
  getVotes: (article) => {
    db.Vote.findAll({ where: { articleId: article, upvote: true } })
      .then((res) => {
        console.log('============> RESPONSE FROM GETVOTES', res);
      })
      .catch((err) => {
        console.log('Error getting votes for article:', err)
      });
    // for each occurence
      // if upvote is true
        // upvote + 1
      // else if downvote is true
        // downvote + 1

    // return votes
  },
};


// [ vote {
//     dataValues:
//      { id: 1,
//        voted: true,
//        upvote: true,
//        downvote: false,
//        createdAt: 2017-12-19T19:22:28.451Z,
//        updatedAt: 2017-12-19T19:22:28.451Z,
//        userId: 2,
//        articleId: 1 },
//     _previousDataValues:
//      { id: 1,
//        voted: true,
//        upvote: true,
//        downvote: false,
//        createdAt: 2017-12-19T19:22:28.451Z,
//        updatedAt: 2017-12-19T19:22:28.451Z,
//        userId: 2,
//        articleId: 1 },
//     _changed: {},
//     _modelOptions:
//      { timestamps: true,
//        validate: {},
//        freezeTableName: false,
//        underscored: false,
//        underscoredAll: false,
//        paranoid: false,
//        rejectOnEmpty: false,
//        whereCollection: [Object],
//        schema: null,
//        schemaDelimiter: '',
//        defaultScope: {},
//        scopes: [],
//        indexes: [],
//        name: [Object],
//        omitNull: false,
//        sequelize: [Object],
//        hooks: {},
//        uniqueKeys: {} },
//     _options:
//      { isNewRecord: false,
//        _schema: null,
//        _schemaDelimiter: '',
//        raw: true,
//        attributes: [Array] },
//     __eagerlyLoadedAssociations: [],
//     isNewRecord: false },
//   vote {
//     dataValues:
//      { id: 2,
//        voted: true,
//        upvote: true,
//        downvote: false,
//        createdAt: 2017-12-19T19:38:18.306Z,
//        updatedAt: 2017-12-19T19:56:24.328Z,
//        userId: 1,
//        articleId: 1 },
//     _previousDataValues:
//      { id: 2,
//        voted: true,
//        upvote: true,
//        downvote: false,
//        createdAt: 2017-12-19T19:38:18.306Z,
//        updatedAt: 2017-12-19T19:56:24.328Z,
//        userId: 1,
//        articleId: 1 },
//     _changed: {},
//     _modelOptions:
//      { timestamps: true,
//        validate: {},
//        freezeTableName: false,
//        underscored: false,
//        underscoredAll: false,
//        paranoid: false,
//        rejectOnEmpty: false,
//        whereCollection: [Object],
//        schema: null,
//        schemaDelimiter: '',
//        defaultScope: {},
//        scopes: [],
//        indexes: [],
//        name: [Object],
//        omitNull: false,
//        sequelize: [Object],
//        hooks: {},
//        uniqueKeys: {} },
//     _options:
//      { isNewRecord: false,
//        _schema: null,
//        _schemaDelimiter: '',
//        raw: true,
//        attributes: [Array] },
//     __eagerlyLoadedAssociations: [],
//     isNewRecord: false } ]
