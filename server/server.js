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
    const filter = {};
    if(req.query.status)
        filter.status = req.query.status;

    console.log(req);
    
    db.collection('issues').find(filter).toArray().then(issues=>{
        const metadata = {total_count: issues.length};
        res.json({_metadata: metadata, records:issues});
    }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});
app.get('/api/issues/:id', (req, res)=> {
    let issueId = req.params.id;
    console.log("Hey!! Request recieved " + issueId);
})


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
app.delete('/api/issues/:id', (req,res)=> {
    let issueId = new String(req.params.id) ;
    try{
        var ObjectId = require('mongodb').ObjectID;
        issueId = new ObjectId(req.params.id);
    } catch(error) {
        res.status(422).json({message : `Invalid issue ID format: ${error}`});
        return;
    }

    db.collection('issues').deleteOne({_id: issueId}).then((delteResult)=> {
        if(delteResult.result.n === 1) res.json({ status: 'OK'});
        else res.json({status: 'Warning: object not found'});
    })
    .catch(error=> {
        console.log(error);
        res.status(500).json({message: `Internal Server Error : $(error)`});
    });
});