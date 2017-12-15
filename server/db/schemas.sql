CREATE DATABASE pax;

USE pax;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(15) NOT NULL UNIQUE,
  sessionId NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE articles (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT REFERENCES users (id),
  text VARCHAR(1500),
  is_link BOOLEAN,
  result INT,
  polarity VARCHAR(10),
  polarity_score VARCHAR(10),
  anger VARCHAR(10),
  disgust VARCHAR(10),
  fear VARCHAR(10),
  joy VARCHAR(10),
  sadness VARCHAR(10),
  analytical VARCHAR(10),
  confident VARCHAR(10),
  tentative VARCHAR(10),
  openness VARCHAR(10),
  conscientiousness VARCHAR(10),
  extraversion VARCHAR(10),
  agreeableness VARCHAR(10),
  emotional_range VARCHAR(10),
);

CREATE TABLE votes (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT REFERENCES users (id),
  article_id INT REFERENCES articles (id),
  voted BOOLEAN,
  upvote BOOLEAN,
  downvote BOOLEAN
);
