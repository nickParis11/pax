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
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
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
})


export default class HistoryTable extends React.Component {

  constructor(props) {
    super(props);
    //this.onCellHover = onCellHover.bind(this);
  }

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

  getMicroScore (article) {
    var microScore = {};
    microScore.text = article.user_text;
    microScore.agreeableness = article.agreeableness;
    microScore.polarity = article.polarity;
    microScore.polarityScore = article.polarity_score;
    return microScore;
    //console.log('article text = ',article.user_text)
  }

  render() {

    
    // test function rendering
    const renderDisplayText = function (text='hehe') {
      return text;
    }

    return (
      <div> 

        <RaisedButton
                  label="Toggle Drawer"
                  onClick={this.handleToggle}
                />

                <Drawer
                 open={this.props.dialogVisible}
                 width="20%"
                >
                  {this.props.dialogVisible ? 
                    <Card>
                      <CardHeader
                        title="SEARCH SUMMARY"
                        subtitle="user : fill in dynamic user"
                        avatar="assets/thumbs_up.svg"
                      />
                      <CardTitle title=" YOUR SEARCH : " subtitle={this.props.hoveredArticle.text.length > 100 ? this.props.hoveredArticle.text.slice(0,100)+'...' : this.props.hoveredArticle.text } />
                      <CardText>
                        agreeableness = {this.props.hoveredArticle.agreeableness} <br/>
                        polarity = {this.props.hoveredArticle.polarity} <br/>
                        polarityScore = {this.props.hoveredArticle.polarityScore} 
                      </CardText>
                    </Card>
                    : null 
                  }
                </Drawer>     
        <Table
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
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                YOUR SEARCH HISTORY
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID"> # </TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name"> SEARCH </TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status"> TYPE </TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status"> OVERALL SCORE</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status"> VOTE </TableHeaderColumn>
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
                <TableRowColumn>{ index}</TableRowColumn>
                <TableRowColumn>
                  {
                    article.is_link ? <a href={article.user_text} target="_blank" title={article.user_text} > { article.user_text }  </a> : article.user_text
                  } 
                </TableRowColumn>
                <TableRowColumn>{article.is_link ? 'Link search' : 'text search' }</TableRowColumn>
                <TableRowColumn>{article.result+ ' %'} </TableRowColumn>

                <TableRowColumn>{ article.voted ? article.upvote ? <i className="fa fa-2x fa-thumbs-up arrowUpSelected" /> : <i className="fa fa-2x fa-thumbs-down arrowDownSelected" /> : null }</TableRowColumn>

              </TableRow>
              ))}

          </TableBody>
          <TableFooter
            adjustForCheckbox={this.props.showCheckboxes}
          >
            <TableRow>
              <TableHeaderColumn tooltip="The ID"> # </TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name"> SEARCH</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status"> TYPE</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">OVERALL SCORE</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status"> VOTE </TableHeaderColumn>
            </TableRow>

          </TableFooter>
        </Table>

      </div>
    );
  }
}