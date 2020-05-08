const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(express.static('static'));

app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const Issue = require('./issue.js');

let db;
MongoClient.connect('mongodb://localhost', (err,client)=> {
    db = client.db('issuetracker');
    app.listen(3000,()=> {
        console.log('App started on port 3000')
    })
});

app.disable('etag');
 
app.get('/api/issues', (req,res)=> {
    db.collection('issues').find().toArray().then(issues=>{
        const metadata = {total_count: issues.length};
        res.json({_metadata: metadata, records:issues});
    }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});


app.post('/api/issues', (req,res)=> {
    const newIssue = req.body;
    newIssue.created = new Date();

    if(!newIssue.status)
        newIssue.status = 'New';
    const err = Issue.validateIssue(newIssue);
    if(err) {
        res.status(422).json({ message: `Invalid request: ${err}`});
        return;
    }

    db.collection('issues').insertOne(newIssue).then(result=> 
        db.collection('issues').find({_id: result.insertedId}).limit(1).next()
        ).then(newIssue => {
            res.json(newIssue);
        }).catch(error=> {
            console.log(error);
            res.status(500, json({message: `Internal Server Error: ${error}` } ));
        });
});
