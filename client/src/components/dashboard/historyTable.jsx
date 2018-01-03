/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
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



const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

@connect((store) => {
  return {
    data: store.dashboard.articles,
    visible: false, // $$$$$$$$$$$$$$$$$$$
    defaultInternalView: true, // $$$$$$$$$$$$$$$$$$$
    errorInternalView: false, // $$$$$$$$$$$$$$$$$$$
    visible: store.user.dashboardView,
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: true,
    showRowHover: true,
    selectable: true,
    multiSelectable: true,
    enableSelectAll: true,
    deselectOnClickaway: true,
    showCheckboxes: true,
    //height: '300px',
  };
}) 

export default class HistoryTable extends React.Component {

  componentDidMount() {
    console.log('historyTable mounted !!!!!!!!!!')
  }

  handleToggle  (event, toggled)  {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange (event)  {
    this.setState({height: event.target.value});
  };

  render() {
    return (
      <div>
        <Table
          height={this.props.height}
          fixedHeader={this.props.fixedHeader}
          fixedFooter={this.props.fixedFooter}
          selectable={this.props.selectable}
          multiSelectable={this.props.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.props.showCheckboxes}
            adjustForCheckbox={this.props.showCheckboxes}
            enableSelectAll={this.props.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID"></TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name"> Search</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">type</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Overall score</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status"> Voted </TableHeaderColumn>
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
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{
           article.user_text.length > 20 ? article.user_text.slice(0,20)+ '...' : article.user_text 
          }   </TableRowColumn>

                <TableRowColumn>{article.is_link ? 'Link search' : 'text search' }</TableRowColumn>
                <TableRowColumn>{article.result}</TableRowColumn>
                
                <TableRowColumn>{ article.voted ? article.upvote ? <img src="assets/thumbs_up.svg" width="50px" height="50px" /> : <img src="assets/thumbs_down.svg" width="50px" height="50px" /> : null }</TableRowColumn>

              </TableRow>
              ))}

          </TableBody>
          <TableFooter
            adjustForCheckbox={this.props.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

 //<TableRowColumn>{ article.voted ? article.upvote ? '+++' : '---' : null }</TableRowColumn>

/*
<TableRowColumn> <img src="assets/697707.jpg" width="100px" height="100px" />
                  <img src="assets/thumbs_up.svg" width="100px" height="100px" />
                </TableRowColumn>
*/
