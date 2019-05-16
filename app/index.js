"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var agreeSDK = {
  camer: function (param, cb) {
    cb && cb(param.title);
  },
  saveDefault: function (a, b) {
    return a + b;
  }
};

let App = class App extends _react.Component {
  constructor(props) {
    super(props);

    this.onMessage = e => {
      let msg = e.nativeEvent.data;
      msg = JSON.parse(msg);
      if (msg.sdk == 'camer') {
        agreeSDK.camer(msg, e => {
          this.wb.postMessage(JSON.stringify({
            data: {
              url: 'http://www.baidu.com'
            },
            sdk: 'camer',
            uuid: msg.uuid
          }));
        });
      }
    };
  }

  componentDidMount() {}

  render() {
    let init = `registerSdk()`;
    return _react2.default.createElement(_reactNative.View, { style: { flex: 1 } }, _react2.default.createElement(_reactNative.WebView, { source: require('./index.html'),
      javaScriptEnabled: true,
      injectedJavaScript: `${init}`,
      onMessage: this.onMessage,
      ref: el => this.wb = el
    }));
  }
};
exports.default = App;