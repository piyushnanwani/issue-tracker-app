var contentNode = document.getElementById('contents');

class IssueFilter extends React.Component{
    render() {
        return (
            <div>This is a placeholder for the Issue Filter</div>
            )
        }
    }

const IssueRow = (props)=> (

    <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate? 
            props.issue.completionDate.toDateString(): ''}</td>
        <td>{props.issue.title}</td>
    </tr>
    
)

function IssueTable(props){
    const issueRows = props.issues.map( issue=> <IssueRow key={issue.id} issue={issue}/>)
        return(
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


class IssueAdd extends React.Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        var form = document.forms.IssueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: "New" ,
            created: new Date(),
        }) ;
        // clear the form for the next input
        form.owner.value=""; form.title.value=""; 

    }
    render(){
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
const issues = [
    {
        id: 1, status:'Open', owner:'Raven',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined, 
        title: 'Error in console when clicking Add',
    }, 
    {
        id: 2, status:'Assigned', owner:'Eddie',
        created: new Date('2016-08-16'), effort: 14, 
        completionDate: new Date('2016-08-30'), 
        title: 'Missing bottom border on panel',        
    }
]

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues: []};
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({issues: issues});
        }, 500);
    }
    
    createIssue(newIssue)
    {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({issues: newIssues});
    }

    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        );
    }
}
ReactDOM.render(<IssueList/>, contentNode);
