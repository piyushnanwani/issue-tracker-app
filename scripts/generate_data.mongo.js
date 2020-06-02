var db = new Mongo().getDB('issuetracker');

var owners = ['Raavan', 'Ram', 'Eve', 'Jacky','Tom', 'Jerry', 'Noddy', 'Bob the builder'];

var statuses = ['New', 'Open', 'Fixed','Assigned', 'Verfied', 'Closed'];

var i;
for(i=0; i<1000; i++) {
    var randomCreateDate = new Date(
        (new Date()) - Math.floor(Math.random() *60 ) *1000*60*60*24 );
    var randomCompletionDate = new Date(
        (new Date()) - Math.floor(Math.random() * 60) * 1000*60*60*24 );
    var randomOwner = owners[Math.floor(Math.random() *8)];
    var randomStatus = statuses[ Math.floor(Math.random() *6)];
    var randomEffort = Math.ceil(Math.random() * 20);
    var issue = {
        created: randomCreateDate, completionDate: randomCompletionDate ,
        owner: randomOwner, status: randomStatus, effort: randomEffort,
    };
    issue.title = 'Lorem ispsum dolor sit amet, ' + i;
    db.issues.insert(issue); 
}