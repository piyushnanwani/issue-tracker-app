'use strict';

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
};

const issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
};

function validateIssue(issue) {
    for (const field in issueFieldType) {
        const type = issueFieldType[field];
        console.log(type);
        if (!type) {
            delete issue[field];
        } else if (type === 'required' && !issue[field]) {
            return `${field} is required`;
        }
    }
    if (!validIssueStatus[issue.status])
        return `$[issue.status] is not a valid status.`

    return null;
}

function convertIssue(issue) {
    if (issue.created)  issue.created = new Date(issue.created);
    if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);

    return issue; 
}
module.exports = {
    validateIssue: validateIssue, 
    convertIssue: convertIssue,
};