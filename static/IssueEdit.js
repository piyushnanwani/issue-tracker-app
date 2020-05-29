'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NumInput = require('./NumInput');

var _NumInput2 = _interopRequireDefault(_NumInput);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueEdit = function (_React$Component) {
    _inherits(IssueEdit, _React$Component);

    function IssueEdit() {
        _classCallCheck(this, IssueEdit);

        var _this = _possibleConstructorReturn(this, (IssueEdit.__proto__ || Object.getPrototypeOf(IssueEdit)).call(this));

        _this.state = {
            issue: {
                _id: '', title: '', status: '', owner: '', effort: null,
                completionDate: null, created: null
            },
            invalidFields: {}
        };
        _this.onChange = _this.onChange.bind(_this);
        _this.onValidityChange = _this.onValidityChange.bind(_this);
        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }

    _createClass(IssueEdit, [{
        key: 'onSubmit',
        value: function onSubmit(event) {
            var _this2 = this;

            event.preventDefault();
            if (Object.keys(this.state.invalidFields).length !== 0) {
                return;
            }
            fetch('/api/issues/' + this.props.match.params.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.issue)
            }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (updatedIssue) {
                        updatedIssue.created = new Date(updatedIssue.created);
                        if (updatedIssue.completionDate) {
                            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                        }
                        _this2.setState({ issue: updatedIssue });
                        alert('Updated issue successfully.');
                    });
                }
            }).catch(function (err) {
                alert('Error in sending data to server: ' + err.message);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.match.params.id != this.props.match.params.id) {
                this.loadData();
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(event, convertedValue) {
            var issue = Object.assign({}, this.state.issue);
            var value = convertedValue !== undefined ? convertedValue : event.target.value;
            issue[event.target.name] = value;
            this.setState({ issue: issue });
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this3 = this;

            fetch('/api/issues/' + this.props.match.params.id).then(function (response) {
                if (response.ok) {
                    response.json().then(function (issue) {
                        issue.created = new Date(issue.created);
                        issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : '';
                        _this3.setState(issue);
                    });
                } else {
                    response.json().then(function (error) {
                        alert('Failed to fetch issue: ' + error.message);
                    });
                }
            }).catch(function (err) {
                alert('Error in fetching data from server: ' + err.message);
            });
        }
    }, {
        key: 'onValidityChange',
        value: function onValidityChange(event, valid) {
            var invalidFields = Object.assign({}, this.state.invalidFields);

            if (!valid) {
                invalidFields[event.target.value] = true;
            } else {
                delete invalidFields[event.target.value];
            }
            this.setState({ invalidFields: invalidFields });
        }
    }, {
        key: 'render',
        value: function render() {
            var issue = this.state.issue;
            var validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null : _react2.default.createElement(
                'div',
                { className: 'error' },
                'Please correct invalid fields before submitting'
            );
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.onSubmit },
                    'ID: ',
                    issue._id,
                    _react2.default.createElement('br', null),
                    'Created: ',
                    issue.created ? issue.created.toString() : '',
                    _react2.default.createElement('br', null),
                    'Status: ',
                    _react2.default.createElement(
                        'select',
                        { name: 'status', value: issue.status, onChange: this.onChange },
                        _react2.default.createElement(
                            'option',
                            { value: 'New' },
                            'New'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: 'Open' },
                            'Open'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: 'Assigned' },
                            'Assigned'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: 'Fixed' },
                            'Fixed'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: 'Verified' },
                            'Verified'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: 'Closed' },
                            'Closed'
                        )
                    ),
                    _react2.default.createElement('br', null),
                    'Owner: ',
                    _react2.default.createElement('input', { name: 'owner', value: issue.owner, onChange: this.onChange }),
                    _react2.default.createElement('br', null),
                    'Effort: ',
                    _react2.default.createElement(_NumInput2.default, { size: 5, name: 'effort', value: issue.effort, onChange: this.onChange }),
                    _react2.default.createElement('br', null),
                    'Completion Date ',
                    _react2.default.createElement(_DateInput2.default, { name: 'completionDate', value: this.completionDate,
                        onChange: this.onChange, onValidityChange: this.onValidityChange }),
                    _react2.default.createElement('br', null),
                    'Title: ',
                    _react2.default.createElement('input', { name: 'title', size: 50, value: issue.title, onChange: this.onChange }),
                    _react2.default.createElement('br', null),
                    validationMessage,
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'button',
                        { type: 'submit' },
                        'Submit'
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/issues' },
                        ' Back to issue list'
                    )
                )
            );
        }
    }]);

    return IssueEdit;
}(_react2.default.Component);

exports.default = IssueEdit;


IssueEdit.propTypes = {
    params: _propTypes2.default.object
};