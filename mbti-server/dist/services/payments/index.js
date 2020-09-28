"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = _interopRequireDefault(require("./controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pay = function pay() {
  var router = (0, _express.Router)();
  router.post("/fund", function (req, res) {
    return _controllers["default"].fund(req, res);
  });
  return router;
};

var _default = pay;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9wYXltZW50cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJwYXkiLCJyb3V0ZXIiLCJwb3N0IiwicmVxIiwicmVzIiwiY29udHJvbGxlciIsImZ1bmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQU1BLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQU07QUFDaEIsTUFBTUMsTUFBTSxHQUFHLHNCQUFmO0FBRUFBLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLE9BQVosRUFBcUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOO0FBQUEsV0FBY0Msd0JBQVdDLElBQVgsQ0FBZ0JILEdBQWhCLEVBQXFCQyxHQUFyQixDQUFkO0FBQUEsR0FBckI7QUFFQSxTQUFPSCxNQUFQO0FBQ0QsQ0FORDs7ZUFRZUQsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBjb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJzXCI7XHJcblxyXG5jb25zdCBwYXkgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XHJcblxyXG4gIHJvdXRlci5wb3N0KFwiL2Z1bmRcIiwgKHJlcSwgcmVzKSA9PiBjb250cm9sbGVyLmZ1bmQocmVxLCByZXMpKTtcclxuXHJcbiAgcmV0dXJuIHJvdXRlcjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBheTtcclxuIl19