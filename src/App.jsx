import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {  Route,Redirect, hashHistory} from 'react-router';
import {BrowserRouter} from 'react-router-dom';


import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const  contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;
const RoutedApp = () => (
    <BrowserRouter history={hashHistory} >
        <Redirect from ="/" to ="/issues" />
        <Route path="/issues" component={IssueList} />
        <Route path="/issues:id" component={IssueEdit} />
        <Route path="/issueEdit" component={IssueEdit} />
        <Route path="*" component={NoMatch}  />
    </BrowserRouter>
);

ReactDOM.render(<RoutedApp/>, contentNode);

if(module.hot){
    module.hot.accept();
}









