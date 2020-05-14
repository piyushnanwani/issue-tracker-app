'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

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
var RoutedApp = function RoutedApp() {
    return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(_reactRouter.Redirect, { from: '/', to: '/issues' }),
        _react2.default.createElement(_reactRouter.Route, { path: '/issues', component: _IssueList2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/issues/id', component: _IssueEdit2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
    );
};

_reactDom2.default.render(_react2.default.createElement(RoutedApp, null), contentNode);

if (module.hot) {
    module.hot.accept();
}