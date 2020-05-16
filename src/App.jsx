import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect, hashHistory} from 'react-router-dom';


import IssueList from './IssueList';
import IssueEdit from './IssueEdit';
import IssueFilter from './IssueFilter';

const  contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;
const RoutedApp = () => (
    <Router history={hashHistory} >
            <Redirect from ="/" to ="/issues"/>
            <Route exact path="/issues" component={IssueList} />
            <Route exact path="/issues/:id" component={IssueEdit} />
            <Route exact path="*" component={NoMatch}  />

        
    </Router>
);

ReactDOM.render(<RoutedApp/>, contentNode);

if(module.hot){
    module.hot.accept();
}









