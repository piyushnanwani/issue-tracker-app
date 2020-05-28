import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import NumInput from './NumInput'
import DateInput from './DateInput';

export default class IssueEdit extends React.Component
{ 
    constructor(){
        super();
        this.state = {
            issue: {
                _id: '', title:'', status: '', owner:'', effort:null,
                completionDate:'', created:''
            },
            invalidFields: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this);
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
                    issue.created = new Date(issue.created).toString();
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
                <form>
                    ID: {issue._id}
                    <br/>
                    Created: {issue.created}
                    <br/>
                    Status: <select name="status" value={issue.status} onChange={this.onChange}>
                        <option value="New">New</option>
                        <option value="Open">Open</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Verified">Verified</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <br/>
                    Owner: <input name="owner" value={issue.owner} onChange={this.onChange}/>
                    <br/>
                    Effort: <NumInput size={5} name="effort" value={issue.effort} onChange={this.onChange} />
                    <br/>
                    Completion Date <DateInput name="completionDate" value={this.completionDate} 
                    onChange={this.onChange} onValidityChange={this.onValidityChange} />
                    <br/>
                    Title: <input name="title" size={50} value={issue.title} onChange={this.onChange} />
                    <br/>
                    {validationMessage}
                    <br/>
                    <button type="submit">Submit</button>
                    <Link to="/issues"> Back to issue list</Link>
                </form>
            </div>
        )
    }

}

IssueEdit.propTypes = {
    params: PropTypes.object,
};