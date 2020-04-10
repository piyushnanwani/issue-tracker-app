var contentNode = document.getElementById('contents');

class IssueFilter extends React.Component{
    render() {
        return (
            <div>This is a placeholder for the Issue Filter</div>
        )
    }
}

class IssueRow extends React.Component{
    render(){
        const borderStyle = {border:"1px solid silver", padding:4};
        return (
            <tr>
                <td style={borderStyle}>{this.props.issue_id}</td>
                <td style={borderStyle}>{this.props.issue_title}</td>
            </tr>
        )
    }
}
class IssueTable extends React.Component{
    render(){
        const borderStyle= {border: "1px solid silver", padding:6};
        return(
            <table style={{borderCollapse:"collapse"}}>
                <thead>
                    <tr>
                        <th style={borderStyle}>Id</th>
                        <th style={borderStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow issue_id={1}
                    issue_title="Error in console when clicking Add"/>
                    
                    <IssueRow issue_id={2}
                    issue_title="Missing bottom border on panel"/>
                </tbody>
            </table>
        )
    }
}

class IssueAdd extends React.Component{
    render(){
        return (
            <div>This is a placeholder for an Issue Add entry form</div>
        )
    }
}
class IssueList extends React.Component {
    render(){
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter/>
                <hr/>
                <IssueTable/>
                <hr/>
                <IssueAdd/>
            </div>
        );
    }
}
ReactDOM.render(<IssueList/>, contentNode);
