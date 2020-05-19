
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Switch, Router } from 'react-router';
import { BrowserRouter, hashHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

import IssueList from './IssueList';
import IssueEdit from './IssueEdit';
import IssueFilter from './IssueFilter';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const App = (props) => (
    <div>
        <div className="header">
            <h1>Issue Tracker</h1>
        </div>
        <div className="contents">
            {props.children}
        </div>
        <div className="footer">
            Full source code available at this <a href="https://github.com/piyushnanwani/issue-tracker-app">
                Github repository
            </a>
        </div>
    </div>
);
App.propTypes = {
    children: PropTypes.object.isRequired,
}
const RoutedApp = () => (
    <BrowserRouter history={hashHistory} >
        <Redirect from="/" to="/issues" />

        <Switch>
            <App>
                    <Route exact path="/issues" component={withRouter(IssueList)} />
                    <Route exact path="/issues/:id" component={IssueEdit} />
            </App>
            <Route path="/404" component={NoMatch} />
            <Redirect to="/404" />

        </Switch>

    </BrowserRouter>
);

ReactDOM.render(<RoutedApp />, contentNode);
