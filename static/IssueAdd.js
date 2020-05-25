"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueAdd = function (_React$Component) {
    _inherits(IssueAdd, _React$Component);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        var _this = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(IssueAdd, [{
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.IssueAdd;
            this.props.createIssue({
                owner: form.owner.value,
                title: form.title.value,
                status: "New",
                created: new Date()
            });
            // clear the form for the next input
            form.owner.value = "";form.title.value = "";
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "container", id: "events" },
                _react2.default.createElement(
                    "div",
                    { className: "row" },
                    _react2.default.createElement(
                        "div",
                        { className: "panel panel-default" },
                        _react2.default.createElement(
                            "div",
                            { className: "panel-heading", style: { width: "500px", border: "none" } },
                            _react2.default.createElement(
                                "h3",
                                null,
                                "Add an Event"
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "container" },
                    _react2.default.createElement(
                        "form",
                        { name: "IssueAdd", onSubmit: this.handleSubmit },
                        _react2.default.createElement(
                            "div",
                            { className: "row", style: { marginTop: "5px" } },
                            _react2.default.createElement("input", { type: "text", name: "owner", placeholder: "Owner" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "row", style: { marginTop: "5px" } },
                            _react2.default.createElement("input", { type: "text", name: "title", placeholder: "Title" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "row", style: { marginTop: "5px" } },
                            _react2.default.createElement(
                                "button",
                                { className: "btn btn-primary" },
                                "Add"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return IssueAdd;
}(_react2.default.Component);

exports.default = IssueAdd;