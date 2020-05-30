import React from 'react';

export default class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.IssueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: "New",
            created: new Date(),
        });
        // clear the form for the next input
        form.owner.value = ""; form.title.value = "";

    }
    render() {
        return (
            <div className="container" id="events">
                <div className="row" >
                    <div className="panel panel-default" >
                        <div className="panel-heading" style={{width:"500px", border:"none"}}>
                            <h3>Create an Issue</h3>
                        </div>
                    </div>
                </div>
                        
                <div className="container">
                        <form name="IssueAdd" onSubmit={this.handleSubmit}>
                        <div className="row" style={{ marginTop: "5px" }}>
                                <input type="text" name="owner" placeholder="Owner"></input>
                            </div>
                        <div className="row" style={{ marginTop: "5px" }}>
                                <input type="text" name="title" placeholder="Title" ></input>
                            </div>
                            <div className="row" style={{marginTop:"5px"}}>
                                <button className="btn btn-primary"  >Add</button>
                            </div>
                        </form>
                </div>
                        
            </div>
        )
    }
}
