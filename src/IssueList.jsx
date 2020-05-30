import React from 'react';
import 'whatwg-fetch';
import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {  Glyphicon } from 'react-bootstrap';
import { auto } from 'async';

const IssueRow = (props) => {
    function onDeleteClick() {
        props.deleteIssue(props.issue._id);
    }
    return (
      <tr>
        <td><Link to={`/issues/${props.issue._id}`}> {props.issue._id.substr(-4)} </Link></td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ?
            props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
            <td><button className="btn btn-danger" onClick={onDeleteClick}>
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> 
            </button> </td>
    </tr>
    );
};




function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                    <th>Delete Issue</th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table>
    );
}

IssueTable.propTypes = {
    issues : PropTypes.array.isRequired,
    deleteIssue : PropTypes.func.isRequired,
}
export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        const oldQuery = prevProps.location.search;
        const newQuery = this.props.location.search;
        
        if (oldQuery === newQuery)
            return;
        this.loadData();

    }

    loadData() {
        fetch(`/api/issues${this.props.location.search} `).then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        console.log("Total count of records:", data._metadata.total_count);
                        data.records.forEach(issue => {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate)
                                issue.completionDate = new Date(issue.completionDate);
                        });
                        this.setState({ issues: data.records });
                    });
            } else {
                response.json().then(error => {
                    alert("Failed to fetch issues:" + error.message);
                });
            }
        }).catch(err => {
            alert("Error in fetching data from server:", err);
        });
    }

    createIssue(newIssue) {
        fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue),
        }).then(response => {

            if (response.ok) {
                response.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate)
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    const newIssues = this.state.issues.concat(updatedIssue);
                    this.setState({ issues: newIssues });
                });
            } else {
                response.json().then(error => {
                    alert("Failed to add issue: " + error.message)
                });
            }
        }).catch(err => {
            alert("Error in sending data to server: " + err.message);
        });
    }

    deleteIssue(id){
        fetch(`/api/issues/${id}`, { method: 'DELETE'}).then(response => {
            if(!response.ok) alert('Failed to delete issue');
            else this.loadData();
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <IssueFilter />
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue}/>
                    </div>
                    <div className="col-sm-4">
                        <IssueAdd createIssue={this.createIssue} />
                    </div>
                </div>
            </div>
        );
    }
}
IssueList.propTypes = {
    location: PropTypes.object.isRequired,
};
