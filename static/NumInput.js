'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumInput = function (_React$Component) {
    _inherits(NumInput, _React$Component);

    function NumInput(props) {
        _classCallCheck(this, NumInput);

        var _this = _possibleConstructorReturn(this, (NumInput.__proto__ || Object.getPrototypeOf(NumInput)).call(this, props));

        _this.state = { value: _this.format(props.value) };
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(NumInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.setState({ value: this.format(newProps.value) });
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            this.props.onChange(e, this.unformat(this.state.value));
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            if (e.target.value.match(/^\d*$/)) {
                this.setState({ value: e.target.value });
            }
        }
    }, {
        key: 'format',
        value: function format(num) {
            return num != null ? num.toString() : '';
        }
    }, {
        key: 'unformat',
        value: function unformat(str) {
            var val = parseInt(str, 10);
            return isNaN(val) ? null : val;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('input', _extends({ type: 'text' }, this.props, { value: this.state.value,
                onBlur: this.onChange
            }));
        }
    }]);

    return NumInput;
}(_react2.default.Component);

exports.default = NumInput;


NumInput.propTypes = {
    value: _propTypes2.default.number,
    onChange: _propTypes2.default.func.isRequired
};