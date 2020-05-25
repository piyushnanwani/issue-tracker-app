'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IssueList = require('./IssueList');

var _IssueList2 = _interopRequireDefault(_IssueList);

var _IssueEdit = require('./IssueEdit');

var _IssueEdit2 = _interopRequireDefault(_IssueEdit);

var _IssueFilter = require('./IssueFilter');

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');
var NoMatch = function NoMatch() {
    return _react2.default.createElement(
        'p',
        null,
        'Page Not Found'
    );
};

var App = function App(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h1',
                { className: 'jumbotron', style: { marginTop: "0px", height: "5px" } },
                'Issue Tracker'
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'container', style: { marginLeft: '0px' } },
            props.children
        ),
        _react2.default.createElement(
            'div',
            { className: 'panel-footer', style: { marginTop: '100px', fontFamily: 'Helvetics', fontSize: '14px' } },
            'Full source code available at this ',
            _react2.default.createElement(
                'a',
                { href: 'https://github.com/piyushnanwani/issue-tracker-app' },
                'Github repository'
            )
        )
    );
};
App.propTypes = {
    children: _propTypes2.default.object.isRequired
};
var RoutedApp = function RoutedApp() {
    return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        { history: _reactRouterDom.hashHistory },
        _react2.default.createElement(_reactRouter.Redirect, { from: '/', to: '/issues' }),
        _react2.default.createElement(
            _reactRouter.Switch,
            null,
            _react2.default.createElement(
                App,
                null,
                _react2.default.createElement(
                    _reactRouter.Switch,
                    null,
                    _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/issues', component: _IssueList2.default }),
                    _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/issues/:id', component: _IssueEdit2.default })
                )
            ),
            _react2.default.createElement(_reactRouter.Route, { path: '/404', component: NoMatch })
        )
    );
};

_reactDom2.default.render(_react2.default.createElement(RoutedApp, null), contentNode);