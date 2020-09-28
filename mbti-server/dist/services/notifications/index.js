"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinCycle = void 0;

var _messages = _interopRequireDefault(require("./messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var joinCycle = function joinCycle(subject, object, owner) {
  return {
    owner: owner,
    action: _messages["default"].joinCycleRequests.message,
    subject: subject,
    object: object
  };
};

exports.joinCycle = joinCycle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9ub3RpZmljYXRpb25zL2luZGV4LmpzIl0sIm5hbWVzIjpbImpvaW5DeWNsZSIsInN1YmplY3QiLCJvYmplY3QiLCJvd25lciIsImFjdGlvbiIsIm1lc3NhZ2VzIiwiam9pbkN5Y2xlUmVxdWVzdHMiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFTyxJQUFNQSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBa0JDLEtBQWxCO0FBQUEsU0FBNkI7QUFBQ0EsSUFBQUEsS0FBSyxFQUFMQSxLQUFEO0FBQVFDLElBQUFBLE1BQU0sRUFBRUMscUJBQVNDLGlCQUFULENBQTJCQyxPQUEzQztBQUFvRE4sSUFBQUEsT0FBTyxFQUFQQSxPQUFwRDtBQUE2REMsSUFBQUEsTUFBTSxFQUFOQTtBQUE3RCxHQUE3QjtBQUFBLENBQWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1lc3NhZ2VzIGZyb20gJy4vbWVzc2FnZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGpvaW5DeWNsZSA9IChzdWJqZWN0LCBvYmplY3QsIG93bmVyKSA9PiAoe293bmVyLCBhY3Rpb246IG1lc3NhZ2VzLmpvaW5DeWNsZVJlcXVlc3RzLm1lc3NhZ2UsIHN1YmplY3QsIG9iamVjdH0pOyJdfQ==