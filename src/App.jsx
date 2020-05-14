import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {  Route,Redirect, Switch, Router} from 'react-router';
import {BrowserRouter} from 'react-router-dom';


import IssueList from './IssueList';
import IssueEdit from './IssueEdit';
import IssueFilter from './IssueFilter';

const  contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;
const RoutedApp = () => (
    <BrowserRouter  >
            <Redirect from ="/" to ="/issues" />
        <Switch>
            <Route path="/issues" component={IssueList} />
            <Route path="/issues:id" component={IssueEdit} />
            <Route path="*" component={NoMatch}  />
            {/* <Route path="/issues" component={NoMatch} />
            <Route path="/issues" component={IssueFilter} /> */}
            {/* <Route path="/issues" component={IssueList} /> */}

        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<RoutedApp/>, contentNode);

if(module.hot){
    module.hot.accept();
}









