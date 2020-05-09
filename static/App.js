'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _IssueList = require('./IssueList');

var _IssueList2 = _interopRequireDefault(_IssueList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');
_reactDom2.default.render(_react2.default.createElement(_IssueList2.default, null), contentNode);
// import { Router, Router, hashHistory } from "react-router";


// import 'babel-polyfill';