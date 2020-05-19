'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueFilter = function (_React$Component) {
    _inherits(IssueFilter, _React$Component);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        var _this = _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).call(this));

        _this.clearFilter = _this.clearFilter.bind(_this);
        _this.setFilterOpen = _this.setFilterOpen.bind(_this);
        _this.setFilterAssigned = _this.setFilterAssigned.bind(_this);
        return _this;
    }

    _createClass(IssueFilter, [{
        key: 'setFilterOpen',
        value: function setFilterOpen(e) {
            e.preventDefault();
            this.props.setFilter({ status: 'Open' });
        }
    }, {
        key: 'setFilterAssigned',
        value: function setFilterAssigned(e) {
            e.preventDefault();
            this.props.setFilter({ status: 'Assigned' });
        }
    }, {
        key: 'clearFilter',
        value: function clearFilter(e) {
            e.preventDefault();
            this.props.setFilter();
        }
    }, {
        key: 'render',
        value: function render() {
            var Separator = function Separator() {
                return _react2.default.createElement(
                    'span',
                    null,
                    ' | '
                );
            };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    { href: '#', onClick: this.clearFilter },
                    'All Issues'
                ),
                _react2.default.createElement(Separator, null),
                _react2.default.createElement(
                    'a',
                    { href: '#', onClick: this.setFilterOpen },
                    'Open Issues'
                ),
                _react2.default.createElement(Separator, null),
                _react2.default.createElement(
                    'a',
                    { href: '#', onClick: this.setFilterAssigned },
                    'Assigned Issues'
                )
            );
        }
    }]);

    return IssueFilter;
}(_react2.default.Component);

exports.default = IssueFilter;

IssueFilter.propTypes = {
    setFilter: _propTypes.PropTypes.func.isRequired
};