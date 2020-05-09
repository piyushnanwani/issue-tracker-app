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
            <div>
                <form name="IssueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner"></input>
                    <input type="text" name="title" placeholder="Title"></input>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}
