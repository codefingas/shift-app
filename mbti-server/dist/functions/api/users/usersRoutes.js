"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userscontrollers = _interopRequireDefault(require("./userscontrollers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = function users() {
  var router = (0, _express.Router)();
  router.post("/signup", function (req, res) {
    _userscontrollers["default"].signup(req, res);
  });
  return router;
};

var _default = users;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvYXBpL3VzZXJzL3VzZXJzUm91dGVzLmpzIl0sIm5hbWVzIjpbInVzZXJzIiwicm91dGVyIiwicG9zdCIsInJlcSIsInJlcyIsImNvbnRyb2xsZXIiLCJzaWdudXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBLElBQU1BLEtBQUssR0FBRyxTQUFSQSxLQUFRLEdBQU07QUFDaEIsTUFBTUMsTUFBTSxHQUFHLHNCQUFmO0FBQ0FBLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFNBQVosRUFBdUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDakNDLGlDQUFXQyxNQUFYLENBQWtCSCxHQUFsQixFQUF1QkMsR0FBdkI7QUFDSCxHQUZEO0FBSUEsU0FBT0gsTUFBUDtBQUNILENBUEQ7O2VBU2VELEsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlcn0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IGNvbnRyb2xsZXIgZnJvbSBcIi4vdXNlcnNjb250cm9sbGVyc1wiO1xyXG5jb25zdCB1c2VycyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xyXG4gICAgcm91dGVyLnBvc3QoXCIvc2lnbnVwXCIsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgIGNvbnRyb2xsZXIuc2lnbnVwKHJlcSwgcmVzKTtcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIHJvdXRlcjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlcnM7Il19