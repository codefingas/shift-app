"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userscontrollers = _interopRequireDefault(require("./userscontrollers"));

var _assessmentsController = _interopRequireDefault(require("../assessments/assessmentsController"));

var _mailController = _interopRequireDefault(require("../../../services/mailing/mailController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var users = function users() {
  var router = (0, _express.Router)();
  router.post("/signup", function (req, res) {
    _userscontrollers["default"].signup(req, res);
  });
  router.get("/emailconfirm/:email", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var email;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              email = req.params.email;
              _context.next = 3;
              return _userscontrollers["default"].findUser(email).then(function (users) {
                if (!!users) {
                  res.status(200).json({
                    message: "is not a user",
                    isUser: false
                  });
                  return;
                } else {
                  res.status(200).json({
                    message: "is a user",
                    isUser: true
                  });
                  return;
                }
              })["catch"](function (err) {
                res.status(500).json({
                  isUser: false,
                  message: "an error occured ".concat(err)
                });
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  router.post("/assessment", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _userscontrollers["default"].submitAssessment(req, res);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.get("/test/:id", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var test;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _assessmentsController["default"].getTest(req.params.id);

            case 2:
              test = _context3.sent;
              res.status(200).json(test);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  router.post("/mail/send", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var body, email, result, _yield$MailController, _yield$MailController2, sendTestToUser;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              body = req.body;
              email = body.email, result = body.result;

              if (!(!email || !result)) {
                _context4.next = 7;
                break;
              }

              res.status(400).json({
                message: "You need to provide an email"
              });
              return _context4.abrupt("return");

            case 7:
              _context4.next = 9;
              return _mailController["default"].sendToOne(email, "Your MBTI test result", "You are ".concat(result));

            case 9:
              _yield$MailController = _context4.sent;
              _yield$MailController2 = _slicedToArray(_yield$MailController, 1);
              sendTestToUser = _yield$MailController2[0];
              res.status(sendTestToUser.statusCode).json({
                message: "sent"
              });
              return _context4.abrupt("return");

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
  return router;
};

var _default = users;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvYXBpL3VzZXJzL3VzZXJzUm91dGVzLmpzIl0sIm5hbWVzIjpbInVzZXJzIiwicm91dGVyIiwicG9zdCIsInJlcSIsInJlcyIsImNvbnRyb2xsZXIiLCJzaWdudXAiLCJnZXQiLCJlbWFpbCIsInBhcmFtcyIsImZpbmRVc2VyIiwidGhlbiIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiaXNVc2VyIiwiZXJyIiwic3VibWl0QXNzZXNzbWVudCIsImFzc2Vzc21lbnRDb250cm9sbGVyIiwiZ2V0VGVzdCIsImlkIiwidGVzdCIsImJvZHkiLCJyZXN1bHQiLCJNYWlsQ29udHJvbGxlciIsInNlbmRUb09uZSIsInNlbmRUZXN0VG9Vc2VyIiwic3RhdHVzQ29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBRyxTQUFSQSxLQUFRLEdBQU07QUFDbEIsTUFBTUMsTUFBTSxHQUFHLHNCQUFmO0FBRUFBLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFNBQVosRUFBdUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbkNDLGlDQUFXQyxNQUFYLENBQWtCSCxHQUFsQixFQUF1QkMsR0FBdkI7QUFDRCxHQUZEO0FBSUFILEVBQUFBLE1BQU0sQ0FBQ00sR0FBUDtBQUFBLHVFQUFtQyxpQkFBT0osR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUMzQkksY0FBQUEsS0FEMkIsR0FDakJMLEdBQUcsQ0FBQ00sTUFEYSxDQUMzQkQsS0FEMkI7QUFBQTtBQUFBLHFCQUUzQkgsNkJBQ0hLLFFBREcsQ0FDTUYsS0FETixFQUVIRyxJQUZHLENBRUUsVUFBQ1gsS0FBRCxFQUFXO0FBQ2Ysb0JBQUksQ0FBQyxDQUFDQSxLQUFOLEVBQWE7QUFDWEksa0JBQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLG9CQUFBQSxPQUFPLEVBQUUsZUFBWDtBQUE0QkMsb0JBQUFBLE1BQU0sRUFBRTtBQUFwQyxtQkFBckI7QUFDQTtBQUNELGlCQUhELE1BR087QUFDTFgsa0JBQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLG9CQUFBQSxPQUFPLEVBQUUsV0FBWDtBQUF3QkMsb0JBQUFBLE1BQU0sRUFBRTtBQUFoQyxtQkFBckI7QUFDQTtBQUNEO0FBQ0YsZUFWRyxXQVdHLFVBQUNDLEdBQUQsRUFBUztBQUNkWixnQkFBQUEsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUUsa0JBQUFBLE1BQU0sRUFBRSxLQUFWO0FBQWlCRCxrQkFBQUEsT0FBTyw2QkFBc0JFLEdBQXRCO0FBQXhCLGlCQUFyQjtBQUNELGVBYkcsQ0FGMkI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBbkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrQkFmLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGFBQVo7QUFBQSx3RUFBMkIsa0JBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3pCQywyQ0FBV1ksZ0JBQVgsQ0FBNEJkLEdBQTVCLEVBQWlDQyxHQUFqQzs7QUFEeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBM0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQUgsRUFBQUEsTUFBTSxDQUFDTSxHQUFQLENBQVcsV0FBWDtBQUFBLHdFQUF3QixrQkFBT0osR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ0xjLGtDQUFxQkMsT0FBckIsQ0FBNkJoQixHQUFHLENBQUNNLE1BQUosQ0FBV1csRUFBeEMsQ0FESzs7QUFBQTtBQUNsQkMsY0FBQUEsSUFEa0I7QUFFdEJqQixjQUFBQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQlEsSUFBckI7O0FBRnNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0FwQixFQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSxZQUFaO0FBQUEsd0VBQTBCLGtCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNsQmtCLGNBQUFBLElBRGtCLEdBQ1RuQixHQURTLENBQ2xCbUIsSUFEa0I7QUFFbEJkLGNBQUFBLEtBRmtCLEdBRUFjLElBRkEsQ0FFbEJkLEtBRmtCLEVBRVhlLE1BRlcsR0FFQUQsSUFGQSxDQUVYQyxNQUZXOztBQUFBLG9CQUdwQixDQUFDZixLQUFELElBQVUsQ0FBQ2UsTUFIUztBQUFBO0FBQUE7QUFBQTs7QUFJdEJuQixjQUFBQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxnQkFBQUEsT0FBTyxFQUFFO0FBQVgsZUFBckI7QUFKc0I7O0FBQUE7QUFBQTtBQUFBLHFCQU9PVSwyQkFBZUMsU0FBZixDQUMzQmpCLEtBRDJCLEVBRTNCLHVCQUYyQixvQkFHaEJlLE1BSGdCLEVBUFA7O0FBQUE7QUFBQTtBQUFBO0FBT2pCRyxjQUFBQSxjQVBpQjtBQVl0QnRCLGNBQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXYyxjQUFjLENBQUNDLFVBQTFCLEVBQXNDZCxJQUF0QyxDQUEyQztBQUFFQyxnQkFBQUEsT0FBTyxFQUFFO0FBQVgsZUFBM0M7QUFac0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBMUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkEsU0FBT2IsTUFBUDtBQUNELENBcEREOztlQXNEZUQsSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBjb250cm9sbGVyIGZyb20gXCIuL3VzZXJzY29udHJvbGxlcnNcIjtcclxuaW1wb3J0IGFzc2Vzc21lbnRDb250cm9sbGVyIGZyb20gXCIuLi9hc3Nlc3NtZW50cy9hc3Nlc3NtZW50c0NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IE1haWxDb250cm9sbGVyIGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9tYWlsaW5nL21haWxDb250cm9sbGVyXCI7XHJcblxyXG5jb25zdCB1c2VycyA9ICgpID0+IHtcclxuICBjb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbiAgcm91dGVyLnBvc3QoXCIvc2lnbnVwXCIsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29udHJvbGxlci5zaWdudXAocmVxLCByZXMpO1xyXG4gIH0pO1xyXG5cclxuICByb3V0ZXIuZ2V0KGAvZW1haWxjb25maXJtLzplbWFpbGAsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgbGV0IHsgZW1haWwgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICBhd2FpdCBjb250cm9sbGVyXHJcbiAgICAgIC5maW5kVXNlcihlbWFpbClcclxuICAgICAgLnRoZW4oKHVzZXJzKSA9PiB7XHJcbiAgICAgICAgaWYgKCEhdXNlcnMpIHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogXCJpcyBub3QgYSB1c2VyXCIsIGlzVXNlcjogZmFsc2UgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogXCJpcyBhIHVzZXJcIiwgaXNVc2VyOiB0cnVlIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGlzVXNlcjogZmFsc2UsIG1lc3NhZ2U6IGBhbiBlcnJvciBvY2N1cmVkICR7ZXJyfWAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICByb3V0ZXIucG9zdChcIi9hc3Nlc3NtZW50XCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29udHJvbGxlci5zdWJtaXRBc3Nlc3NtZW50KHJlcSwgcmVzKTtcclxuICB9KTtcclxuXHJcbiAgcm91dGVyLmdldChcIi90ZXN0LzppZFwiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGxldCB0ZXN0ID0gYXdhaXQgYXNzZXNzbWVudENvbnRyb2xsZXIuZ2V0VGVzdChyZXEucGFyYW1zLmlkKTtcclxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHRlc3QpO1xyXG4gIH0pO1xyXG5cclxuICByb3V0ZXIucG9zdChcIi9tYWlsL3NlbmRcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBsZXQgeyBib2R5IH0gPSByZXE7XHJcbiAgICBsZXQgeyBlbWFpbCwgcmVzdWx0IH0gPSBib2R5O1xyXG4gICAgaWYgKCFlbWFpbCB8fCAhcmVzdWx0KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJZb3UgbmVlZCB0byBwcm92aWRlIGFuIGVtYWlsXCIgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBbc2VuZFRlc3RUb1VzZXJdID0gYXdhaXQgTWFpbENvbnRyb2xsZXIuc2VuZFRvT25lKFxyXG4gICAgICAgIGVtYWlsLFxyXG4gICAgICAgIFwiWW91ciBNQlRJIHRlc3QgcmVzdWx0XCIsXHJcbiAgICAgICAgYFlvdSBhcmUgJHtyZXN1bHR9YFxyXG4gICAgICApO1xyXG4gICAgICByZXMuc3RhdHVzKHNlbmRUZXN0VG9Vc2VyLnN0YXR1c0NvZGUpLmpzb24oeyBtZXNzYWdlOiBcInNlbnRcIiB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcm91dGVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlcnM7XHJcbiJdfQ==