'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateInput = function (_React$Component) {
    _inherits(DateInput, _React$Component);

    function DateInput(props) {
        _classCallCheck(this, DateInput);

        var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

        _this.state = { value: _this.editFormat(props.value), focused: false, valid: true };
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(DateInput, [{
        key: 'UNSAFE_componentWillReceiveProps',
        value: function UNSAFE_componentWillReceiveProps(newProps) {
            if (newProps.value !== this.props.value) {
                this.setState({ value: this.editFormat(newProps.value) });
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.setState({ focused: true });
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            var value = this.unformat(this.state.value);
            var valid = this.state.value === '' || value != null;
            if (valid !== this.state.valid && this.props.onValidityChange) {
                this.props.onValidityChange(e, valid);
            }
            this.setState({ focused: false, value: value });
            if (valid) this.props.onChange(e, value);
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            if (e.target.value.match(/^[\d-]*$/)) {
                this.setState({ value: e.target.value });
            }
        }
    }, {
        key: 'displayFormat',
        value: function displayFormat(date) {
            return date != null ? date.toDateString() : '';
        }
    }, {
        key: 'editFormat',
        value: function editFormat(date) {
            return date != null ? date.toDateString() : '';
        }
    }, {
        key: 'unformat',
        value: function unformat(str) {
            var val = new Date(str);
            return isNaN(val.getTime()) ? null : val;
        }
    }, {
        key: 'render',
        value: function render() {
            var className = !this.state.valid && !this.state.focused ? 'invalid' : null;
            var value = this.state.focused || !this.state.valid ? this.state.value : this.displayFormat(this.props.value);
            return _react2.default.createElement('input', {
                type: 'text', size: 20, name: this.props.name, className: className,
                value: value,
                placeholder: this.state.focused ? 'yyyy-mm-dd' : null,
                onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange
            });
        }
    }]);

    return DateInput;
}(_react2.default.Component);

exports.default = DateInput;