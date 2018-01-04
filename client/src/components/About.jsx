import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

@connect((store)=> {
  return {
    visible: store.user.aboutView,
  }
}) export default class About extends React.Component {

  render () {
    return this.props.visible && (
      <div className="padTop">
        <h2 className="center-text">Welcome to Pax-Atlantica</h2>
        <div className="width500 center-text">
          <p>
            The idea for Pax emerged as a beacon of hope to counter the rise of fake news that pollute our minds.
            Not sure if you can trust an article? Plug it in, and let's see its reliability score based on our secret recipe!
          </p>
          <p>
            Have an article that you would like to view an analysis and trust rating of? Log in and start analyzing!
          </p>
        </div>

        <h2 className="center-text padTop">Engineers</h2>

        <div className='row'>
          <Card className="column width600">
            <a href='https://github.com/bobdaball'>
              <CardHeader
                title={<h3>Alexander Mire</h3>}
                subtitle='Product Owner'
                avatar={<Avatar src='https://avatars0.githubusercontent.com/u/26661703?s=400&v=4' size={100} />}
              />
            </a>
            <CardText>
              <p>
                Did you ever hear the tragedy of Darth Plagueis The Wise?
                I thought not. It’s not a story the Jedi would tell you.
                It’s a Sith legend.
                Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…
                He had such a knowledge of the dark side that he could even keep the ones he cared about from dying.
                The dark side of the Force is a pathway to many abilities some consider to be unnatural.
                He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did.
                Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep.
                Ironic. He could save others from death, but not himself.
              </p>
            </CardText>
          </Card>

          <Card className="column width600">
            <a href='https://github.com/cakelyn'>
              <CardHeader
                title={<h3>Katelyn Stamas</h3>}
                subtitle='Scrum Master'
                avatar={<Avatar src='https://avatars2.githubusercontent.com/u/11858278?s=460&v=4' size={100} />}
              />
            </a>
            <CardText>
              <p>
                Did you ever hear the tragedy of Darth Plagueis The Wise?
                I thought not. It’s not a story the Jedi would tell you.
                It’s a Sith legend.
                Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…
                He had such a knowledge of the dark side that he could even keep the ones he cared about from dying.
                The dark side of the Force is a pathway to many abilities some consider to be unnatural.
                He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did.
                Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep.
                Ironic. He could save others from death, but not himself.
              </p>
            </CardText>
          </Card>

          <Card className="column width600">
            <a href='https://github.com/nickParis11'>
              <CardHeader
                title={<h3>Nicholas Orr</h3>}
                subtitle='Software Engineer'
                avatar={<Avatar src='https://avatars3.githubusercontent.com/u/24529486?s=460&v=4' size={100} />}
              />
            </a>
            <CardText>
              <p>
                Did you ever hear the tragedy of Darth Plagueis The Wise?
                I thought not. It’s not a story the Jedi would tell you.
                It’s a Sith legend.
                Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…
                He had such a knowledge of the dark side that he could even keep the ones he cared about from dying.
                The dark side of the Force is a pathway to many abilities some consider to be unnatural.
                He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did.
                Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep.
                Ironic. He could save others from death, but not himself.
              </p>
            </CardText>
          </Card>

          <Card className="column width600">
            <a href='https://github.com/dwrz'>
              <CardHeader
                title={<h3>David Wen Riccardi-Zhu</h3>}
                subtitle='Software Engineer'
                avatar={<Avatar src='https://avatars0.githubusercontent.com/u/21134999?s=460&v=4' size={100} />}
              />
            </a>
            <CardText>
              <p>
                Did you ever hear the tragedy of Darth Plagueis The Wise?
                I thought not. It’s not a story the Jedi would tell you.
                It’s a Sith legend.
                Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…
                He had such a knowledge of the dark side that he could even keep the ones he cared about from dying.
                The dark side of the Force is a pathway to many abilities some consider to be unnatural.
                He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did.
                Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep.
                Ironic. He could save others from death, but not himself.
              </p>
            </CardText>
          </Card>
        </div>
      </div>
    )
  }
}

// 'Know the enemy and know yourself; in a hundred battles you will never be in peril.'
// 'When you are ignorant of the enemy, but know yourself, your chances of winning or losing are equal.'
// 'If ignorant both of your enemy and yourself, you are certain in every battle to be in peril.'

// '― Sun Tzu, The Art of War'