import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
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

        <h2 className="center-text padTop">Engineering Team</h2>

        <div className='row'>
          <Card className="column center-text">
            <CardHeader
              avatar={<Avatar src='https://avatars0.githubusercontent.com/u/26661703?s=400&v=4' size={150} style={{'margin':'0 auto'}}/>}
              style={{'width': '150px', 'height': '150px', 'padding': '0', 'margin': '0 auto'}}
            />
            <CardTitle
              title={<h3>Alexander Mire</h3>}
              subtitle='Product Owner and Software Engineer'
            />
            <CardText>
              <a href='https://github.com/bobdaball'><i className="fa fa-2x fa-github pad" /></a>
              <a href='www.linkedin.com/in/alexander-mire-6034a0126'><i className="fa fa-2x fa-linkedin-square pad" /></a>
              <a href='mailto:amire51117@gmail.com'><i className="fa fa-2x fa-envelope pad" /></a>
            </CardText>
          </Card>

          <Card className="column center-text">
            <CardHeader
              avatar={<Avatar src='https://avatars2.githubusercontent.com/u/11858278?s=460&v=4' size={150} style={{'margin':'0 auto'}}/>}
              style={{'width': '150px', 'height': '150px', 'padding': '0', 'margin': '0 auto'}}
            />
            <CardTitle
              title={<h3>Katelyn Stamas</h3>}
              subtitle='Scrum Master and Software Engineer'
            />
            <CardText>
              <a href='https://github.com/cakelyn'><i className="fa fa-2x fa-github pad" /></a>
              <a href='https://linkedin.com/in/katestamas'><i className="fa fa-2x fa-linkedin-square pad" /></a>
              <a href='mailto:cakelyn@gmail.com'><i className="fa fa-2x fa-envelope pad" /></a>
            </CardText>
          </Card>

          <Card className="column center-text">
            <CardHeader
              avatar={<Avatar src='https://avatars3.githubusercontent.com/u/24529486?s=460&v=4' size={150} style={{'margin':'0 auto'}}/>}
              style={{'width': '150px', 'height': '150px', 'padding': '0', 'margin': '0 auto'}}
            />
            <CardTitle
              title={<h3>Nicholas Orr</h3>}
              subtitle='Software Engineer'
            />
            <CardText>
              <a href='https://github.com/nickParis11'><i className="fa fa-2x fa-github pad" /></a>
              <a href='https://www.linkedin.com/in/nsoen/'><i className="fa fa-2x fa-linkedin-square pad" /></a>
              <a href='mailto:orr.nicholas.sean@gmail.com'><i className="fa fa-2x fa-envelope pad" /></a>
            </CardText>
          </Card>

          <Card className="column center-text">
            <CardHeader
              avatar={<Avatar src='https://avatars0.githubusercontent.com/u/21134999?s=460&v=4' size={150} style={{'margin':'0 auto'}}/>}
              style={{'width': '150px', 'height': '150px', 'padding': '0', 'margin': '0 auto'}}
            />
            <CardTitle
              title={<h3>David Wen Riccardi-Zhu</h3>}
              subtitle='Software Engineer'
            />
            <CardText>
              <a href='https://github.com/dwrz'><i className="fa fa-2x fa-github pad" /></a>
              <a href='https://www.linkedin.com/in/dwriccardizhu/'><i className="fa fa-2x fa-linkedin-square pad" /></a>
              <a a href='mailto:dwrz@dwrz.net'><i className="fa fa-2x fa-envelope pad" /></a>
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