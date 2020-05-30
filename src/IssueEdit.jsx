import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import NumInput from './NumInput'
import DateInput from './DateInput';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Panel, Form, Col} from 'react-bootstrap';
export default class IssueEdit extends React.Component
{ 
    constructor(){
        super();
        this.state = {
            issue: {
                _id: '', title:'', status: '', owner:'', effort:null,
                completionDate: null, created:null
            },
            invalidFields: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        if(Object.keys(this.state.invalidFields).length !== 0) {
            return;
        }
        fetch(`/api/issues/${this.props.match.params.id}`,{
            method: 'PUT', 
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.issue),
        }).then(response => {
            if(response.ok) {
                response.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if(updatedIssue.completionDate) {
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    }
                    this.setState({ issue: updatedIssue });
                    alert('Updated issue successfully.');
                });
            }
        }).catch(err => {
            alert(`Error in sending data to server: ${err.message}`);
        });
    }
    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id != this.props.match.params.id){
            this.loadData();
        }
    }
    onChange(event, convertedValue){
        const issue = Object.assign({}, this.state.issue);
        const value = (convertedValue !== undefined)? convertedValue : event.target.value;
        issue[event.target.name] = value;
        this.setState({issue});
    }
    loadData() {

        fetch(`/api/issues/${this.props.match.params.id}`).then(response => {
            if(response.ok){
                response.json().then(issue => {
                    issue.created = new Date(issue.created);
                    issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate):
                        '';
                    this.setState(issue);
                });
            } else {
                response.json().then(error=> {
                    alert(`Failed to fetch issue: ${error.message}`);
                });
            }
        }). catch(err=>{
            alert(`Error in fetching data from server: ${err.message}`);
        });
    }

    onValidityChange(event, valid) {
        const invalidFields = Object.assign({}, this.state.invalidFields);

        if(!valid) {
            invalidFields[event.target.value] = true;
        } else {
            delete invalidFields[event.target.value];
        }
        this.setState({ invalidFields });
    }

    render(){
        const issue = this.state.issue;
        const validationMessage = Object.keys(this.state.invalidFields).length
        === 0 ? null : (<div className="error">Please correct invalid fields 
        before submitting</div>);
        return (
            <div>
                <div className="panel panel-default" >
                    <div className="panel-heading">Edit Issue</div>
                    <div className="panel-body">
                        <div className="row" style={{marginLeft:"10px"}}>
                            <form onSubmit={this.onSubmit} >
                                <div className="form-group">
                                    ID: {issue._id}
                                </div>
                                <div className="form-group">
                                Created: {issue.created ? issue.created.toString() : ''}
                                </div>
                                <div className="form-group">
                                    <div >
                                    Title: <input className="form-control" name="title" size={50} value={issue.title} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="col-xs-3">
                                        Status : <select className="form-control col-md-6" name="status" value={issue.status} onChange={this.onChange}>
                                        <option value="New">New</option>
                                        <option value="Open">Open</option>
                                        <option value="Assigned">Assigned</option>
                                        <option value="Fixed">Fixed</option>
                                        <option value="Verified">Verified</option>
                                        <option value="Closed">Closed</option>
                                        </select>
                                        </div>
                                </div>

                                <div className="form-group">
                                    <div class="col-xs-3">
                                    Owner : <input className="form-control" name="owner" value={issue.owner} onChange={this.onChange}/>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="col-xs-3">
                                    Effort : <NumInput className="form-control " size={5} name="effort" value={issue.effort} onChange={this.onChange} />

                                    </div>
                                </div>
                                <div className="form-group ">
                                    Completion Date :<DateInput className="form-control" name="completionDate" value={this.completionDate} 
                                onChange={this.onChange} onValidityChange={this.onValidityChange} />
                                </div>
                                <div className="form-group">
                                {validationMessage}
                                </div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                                <Link to="/issues"> Back</Link>
                            </form>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }

}

IssueEdit.propTypes = {
    params: PropTypes.object,
};