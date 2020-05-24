import React from 'react';
import 'whatwg-fetch';
import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const IssueRow = (props) => (

    <tr>
        <td><Link to={`/issues/${props.issue._id}`}> {props.issue._id.substr(-4)} </Link></td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ?
            props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
    </tr>

)

function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Complettion Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table>
    );
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
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
    setFilter(query){
        this.props.history.push({pathname: this.props.location.pathname, query});
        // this.history.push({
        //     pathname: this.props.location.pathname,
        //     status: query
        // })
        // history.pushState(query, 'status', '/issues'); 
        // ({
        //     pathname: this.props.location.pathname,
        //     status: query
        // })
        console.log ("setFilter called");
        
        // if(query.status="Assigned")
            this.loadData();
        // console.log(this.props.router);
        // console.log("Heyy baby!");
        // console.log(this.props.location.pathname);
        // console.log(query);
    }
    render() {
        return (
            <div>
                <IssueFilter setFilter={this.setFilter} />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        );
    }
}
IssueList.propTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object,
};
