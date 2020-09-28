"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _usersRoutes = _interopRequireDefault(require("./users/usersRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  users: _usersRoutes["default"]
};
exports["default"] = _default;