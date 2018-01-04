import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { connect } from 'react-redux';

@connect((store)=> {
  return {
    aboutView: store.user.aboutView,
  }
})



export default class About extends React.Component {

render () {
  return (
    <div>
    { this.props.aboutView ?
  <div>
    <h2 className="center-text">About Pax</h2>
      <div className="container width500">
        <div className="row">
          <p className='center-text'>
            The idea for Pax emerged as a beacon of hope to counter the rise of fake news that pollute our minds.
            Not sure if you can trust an article? Plug it in, and let's see its reliability score based on our secret recipe!
          </p>
        </div>
      </div>
          <h2 className="center-text">Engineers</h2>
            <Card>
              <CardHeader
                title='Alexander'
                subtitle='Software Engineer'
                avatar='https://static.boredpanda.com/blog/wp-content/uploads/2017/10/aaaa-59d5dd1097701__700.jpg'
              />

              <CardTitle title='Card title' subtitle='Card subtitle' />

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

            <Card>
              <CardHeader
                title='Alexander'
                subtitle='Software Engineer'
                avatar='https://static.boredpanda.com/blog/wp-content/uploads/2017/10/aaaa-59d5dd1097701__700.jpg'
              />

              <CardTitle title='Card title' subtitle='Card subtitle' />

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

            <Card>
              <CardHeader
                title='Alexander'
                subtitle='Software Engineer'
                avatar='https://static.boredpanda.com/blog/wp-content/uploads/2017/10/aaaa-59d5dd1097701__700.jpg'
              />

              <CardTitle title='Card title' subtitle='Card subtitle' />

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

            <Card>
              <CardHeader
                title='Alexander'
                subtitle='Software Engineer'
                avatar='https://static.boredpanda.com/blog/wp-content/uploads/2017/10/aaaa-59d5dd1097701__700.jpg'
              />

              <CardTitle title='Card title' subtitle='Card subtitle' />

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
            :
            <div></div>
          }
          </div>
    )
}
}

// 'Know the enemy and know yourself; in a hundred battles you will never be in peril.'
// 'When you are ignorant of the enemy, but know yourself, your chances of winning or losing are equal.'
// 'If ignorant both of your enemy and yourself, you are certain in every battle to be in peril.'

// '― Sun Tzu, The Art of War'