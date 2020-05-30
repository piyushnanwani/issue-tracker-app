'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('whatwg-fetch');

var _IssueAdd = require('./IssueAdd');

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = require('./IssueFilter');

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _async = require('async');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueRow = function IssueRow(props) {
    function onDeleteClick() {
        props.deleteIssue(props.issue._id);
    }
    return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/issues/' + props.issue._id },
                ' ',
                props.issue._id.substr(-4),
                ' '
            )
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.status
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.owner
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.created.toDateString()
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.effort
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
        ),
        _react2.default.createElement(
            'td',
            null,
            props.issue.title
        ),
        _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
                'button',
                { className: 'btn btn-danger', onClick: onDeleteClick },
                _react2.default.createElement('span', { className: 'glyphicon glyphicon-trash', 'aria-hidden': 'true' })
            ),
            ' '
        )
    );
};

function IssueTable(props) {
    var issueRows = props.issues.map(function (issue) {
        return _react2.default.createElement(IssueRow, { key: issue._id, issue: issue, deleteIssue: props.deleteIssue });
    });
    return _react2.default.createElement(
        'table',
        { className: 'bordered-table' },
        _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'th',
                    null,
                    'Id'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Status'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Created'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Completion Date'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'Title'
                ),
                _react2.default.createElement('th', null)
            )
        ),
        _react2.default.createElement(
            'tbody',
            null,
            issueRows
        )
    );
}

IssueTable.propTypes = {
    issues: _propTypes2.default.array.isRequired,
    deleteIssue: _propTypes2.default.func.isRequired
};

var IssueList = function (_React$Component) {
    _inherits(IssueList, _React$Component);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this.state = { issues: [] };
        _this.createIssue = _this.createIssue.bind(_this);
        _this.deleteIssue = _this.deleteIssue.bind(_this);
        return _this;
    }

    _createClass(IssueList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var oldQuery = prevProps.location.search;
            var newQuery = this.props.location.search;

            if (oldQuery === newQuery) return;
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            fetch('/api/issues' + this.props.location.search + ' ').then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log("Total count of records:", data._metadata.total_count);
                        data.records.forEach(function (issue) {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
                        });
                        _this2.setState({ issues: data.records });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to fetch issues:" + error.message);
                    });
                }
            }).catch(function (err) {
                alert("Error in fetching data from server:", err);
            });
        }
    }, {
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var _this3 = this;

            fetch('/api/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIssue)
            }).then(function (response) {

                if (response.ok) {
                    response.json().then(function (updatedIssue) {
                        updatedIssue.created = new Date(updatedIssue.created);
                        if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                        var newIssues = _this3.state.issues.concat(updatedIssue);
                        _this3.setState({ issues: newIssues });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to add issue: " + error.message);
                    });
                }
            }).catch(function (err) {
                alert("Error in sending data to server: " + err.message);
            });
        }
    }, {
        key: 'deleteIssue',
        value: function deleteIssue(id) {
            var _this4 = this;

            fetch('/api/issues/' + id, { method: 'DELETE' }).then(function (response) {
                if (!response.ok) alert('Failed to delete issue');else _this4.loadData();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(_IssueFilter2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-8' },
                        _react2.default.createElement(IssueTable, { issues: this.state.issues, deleteIssue: this.deleteIssue })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-4' },
                        _react2.default.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
                    )
                )
            );
        }
    }]);

    return IssueList;
}(_react2.default.Component);

exports.default = IssueList;

IssueList.propTypes = {
    location: _propTypes2.default.object.isRequired
};