import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {showDialog, hideDialog, setHoveredArticle} from '../../actions/dashboardActions';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  table: {
    margin: '0 auto',
    width: 900,
  },
};

@connect((store) => {
  return {
    data: store.dashboard.articles,
    visible: store.user.dashboardView,
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: true,
    showRowHover: true,
    selectable: false,
    multiSelectable: true,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '400px',
    dialogVisible : store.dashboard.dialogVisible,
    hoveredArticle : store.dashboard.hoveredArticle,
  };
})export default class HistoryTable extends React.Component {
  scrollToBottom() {
    this.el.scrollIntoView({ behaviour: 'smooth' });
  }

  onRowHover(rowNum) {
    console.log("let's display our top ratings here = ",rowNum)

    this.props.dispatch( showDialog ());
    this.props.dispatch(setHoveredArticle(this.getMicroScore (this.props.data[rowNum])))
    //this.scrollToBottom();
  }

  onRowHoverExit () {

    this.props.dispatch( hideDialog ());
    this.props.dispatch(setHoveredArticle(null));
  }

  getMicroScore(article) {
    var microScore = {};
    microScore.text = article.user_text;
    microScore.agreeableness = article.agreeableness;
    microScore.polarity = article.polarity;
    microScore.polarity_score = article.polarity_score;
    microScore.result = article.result;
    microScore.polarity = article.polarity;
    microScore.anger = article.polarity_score;
    microScore.digust = article.polarity_score;
    microScore.fear = article.fear;
    microScore.joy = article.joy;
    microScore.sadness = article.sadness;
    microScore.analytical = article.analytical;
    microScore.confident = article.confident;
    microScore.tentative = article.tentative;
    microScore.openness = article.openness;
    microScore.conscientiousness = article.conscientiousness;
    microScore.extraversion = article.extraversion;
    microScore.agreeableness = article.agreeableness;
    microScore.emotional_range = article.emotional_range;
    microScore.upvote = article.upvote;
    return microScore;
    //console.log('article text = ',article.user_text)
  }

  render() {
    return (
      <div>
        <Drawer
         open={this.props.dialogVisible}
         width="20%"
         z-depth="10"
        >
          {this.props.dialogVisible ?
            <Card>
              <CardHeader
                title={"Trust Rating: " + this.props.hoveredArticle.result + "%"}
                subtitle={"Polarity: " + this.props.hoveredArticle.polarity_score + "% " + this.props.hoveredArticle.polarity}
                avatar={
                  this.props.hoveredArticle.upvote ? <i className="fa fa-3x fa-thumbs-up arrowUpSelected" /> : <i className="fa fa-3x fa-thumbs-down arrowDownSelected" />
                }
              />
              <CardTitle
                title="Analysis Summary"
              />
              <CardText>
                Anger: {this.props.hoveredArticle.agreeableness} <br />
                Disgust: {this.props.hoveredArticle.disgust} <br />
                Fear: {this.props.hoveredArticle.fear} <br />
                Joy: {this.props.hoveredArticle.joy} <br />
                Sadness: {this.props.hoveredArticle.sadness} <br />
                Analytical: {this.props.hoveredArticle.analytical} <br />
                Confident: {this.props.hoveredArticle.confident} <br />
                Tentative: {this.props.hoveredArticle.tentative} <br />
                Openness: {this.props.hoveredArticle.openness} <br />
                Conscientiousness: {this.props.hoveredArticle.conscientiousness} <br />
                Extraversion: {this.props.hoveredArticle.extraversion} <br />
                Agreeableness: {this.props.hoveredArticle.agreeableness} <br />
                Emotional Range: {this.props.hoveredArticle.emotional_range} <br />
              </CardText>
            </Card>
            : null
          }
        </Drawer>

        <Table
          style={styles.table}
          height={this.props.height}
          fixedHeader={this.props.fixedHeader}
          fixedFooter={this.props.fixedFooter}
          selectable={this.props.selectable}
          multiSelectable={this.props.multiSelectable}
          onRowHover={this.onRowHover.bind(this)}
          onRowHoverExit={this.onRowHoverExit.bind(this)}
        >
          <TableHeader
            displaySelectAll={this.props.showCheckboxes}
            adjustForCheckbox={this.props.showCheckboxes}
            enableSelectAll={this.props.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="7" tooltip="Your search history">
                {<h3 className="center-text">Your Search History</h3>}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn colSpan="1" tooltip="Your vote">VOTE</TableHeaderColumn>
              <TableHeaderColumn colSpan="1" tooltip="Article score">SCORE</TableHeaderColumn>
              <TableHeaderColumn colSpan="1" tooltip="The Status">TYPE</TableHeaderColumn>
              <TableHeaderColumn colSpan="4" tooltip="The Name">SEARCH</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.props.showCheckboxes}
            deselectOnClickaway={this.props.deselectOnClickaway}
            showRowHover={this.props.showRowHover}
            stripedRows={this.props.stripedRows}
          >

            {this.props.data.map( (article, index) => (
              <TableRow key={index}>
                <TableRowColumn colSpan="1">
                  { article.voted ? article.upvote ? <i className="fa fa-2x fa-thumbs-up arrowUpSelected" /> : <i className="fa fa-2x fa-thumbs-down arrowDownSelected" /> : null }
                </TableRowColumn>
                <TableRowColumn colSpan="1">{article.result + ' %'} </TableRowColumn>
                <TableRowColumn colSpan="1">{article.is_link ? 'Link' : 'Text' }</TableRowColumn>
                <TableRowColumn colSpan="4">
                  {
                    article.is_link ? <a href={article.user_text} target="_blank" title={article.user_text} > { article.user_text }  </a> : article.user_text
                  }
                </TableRowColumn>
              </TableRow>
              ))}

          </TableBody>
          <TableFooter
            adjustForCheckbox={this.props.showCheckboxes}
          >
            <TableRow>
              <TableHeaderColumn tooltip="The Status" colSpan="1">VOTE</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status" colSpan="1">OVERALL SCORE</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status" colSpan="1">TYPE</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name" colSpan="1">SEARCH</TableHeaderColumn>
            </TableRow>

          </TableFooter>
        </Table>

      </div>
    );
  }
}