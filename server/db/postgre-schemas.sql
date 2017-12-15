

DROP DATABASE pax;


# sql reference for schema and queries

CREATE DATABASE pax;

\c pax

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(40) NOT NULL
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  user_Id SERIAL REFERENCES users(id),
  user_text VARCHAR(1500),
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
  emotional_range VARCHAR(10)
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id SERIAL REFERENCES users (id),
  article_id SERIAL REFERENCES articles (id),
  voted BOOLEAN,
  upvote BOOLEAN,
  downvote BOOLEAN
);

insert into users (username,email,password) values ('nick','nick@me.fr','123456')
insert into users (username,email,password) values ('Alex','alex@him.com','123456')
select * from users
insert into articles ( user_id,is_link, text) values (1,false,'i''m not a link')
select * from articles
delete from articles
insert into articles ( user_id,is_link, text) values (1,true,'i''m a link')
insert into articles ( user_id,is_link, text) values (2,true,'i''m a link as well')

select text from articles where user_id = 1
# nested select type
select text from articles where user_id = (select id from users where username = 'nick')
# INNER JOIN TYPE
select text from articles INNER JOIN users ON articles.user_id = users.id where users.username= 'nick'

select text from articles, users where users.username='Alex'

insert into votes (user_id,article_id,voted,upvote,downvote) values (1,3,true,true,false) 
insert into votes (user_id,article_id,voted,upvote,downvote) values (1,4,false,false,false) 
<<<<<<< fe1505c23e45d6e733b22e19d2149a32323e6587
insert into votes (user_id,article_id,voted,upvote,downvote) values (1,3,true,false,true) 

select * from votes
=======
insert into votes (user_id,article_id,voted,upvote,downvote) values (2,3,true,false,true) 

select * from votes

# see all unique links a user has voted
select * from votes where voted = true AND user_id=1

# inner join way
select votes.id,upvote,downvote from votes INNER JOIN users ON votes.user_id = users.id WHERE users.username = 'nick' AND voted = true

# see all unique links a user has consuted
select * from votes where user_id=1

# inner join way
select votes.id,upvote,downvote from votes INNER JOIN users ON votes.user_id = users.id WHERE users.username = 'nick'

# see all unvoted votes 
select * from votes where voted = false
# see all votes
select * from votes
>>>>>>> add non styled version of db and seed
