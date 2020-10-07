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
  router.post("/signup", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _userscontrollers["default"].signup(req, res);

            case 2:
              return _context.abrupt("return");

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
  router.post("/getUserData", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var _yield$controller$get, _yield$controller$get2, user;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _userscontrollers["default"].getUser(req.body.uid);

            case 2:
              _yield$controller$get = _context2.sent;
              _yield$controller$get2 = _slicedToArray(_yield$controller$get, 1);
              user = _yield$controller$get2[0];
              res.status(200).json(user);
              return _context2.abrupt("return");

            case 7:
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
  router.get("/emailconfirm/:email", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var email;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              email = req.params.email;
              _context3.next = 3;
              return _userscontrollers["default"].findUser(email).then(function (users) {
                if (users.length === 0) {
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
              return _context3.abrupt("return");

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
  router.post("/assessment", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _userscontrollers["default"].submitAssessment(req, res);

            case 2:
              return _context4.abrupt("return");

            case 3:
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
  router.get("/getTests/:userId", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var tests;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _userscontrollers["default"].getUserTests(req.params.userId);

            case 2:
              tests = _context5.sent;
              res.status(200).json(tests);
              return _context5.abrupt("return");

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
  router.get("/test/:id", /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var test;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _assessmentsController["default"].getTest(req.params.id);

            case 2:
              test = _context6.sent;
              res.status(200).json(test);
              return _context6.abrupt("return");

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
  router.post("/mail/send", /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var body, email, result, _yield$MailController, _yield$MailController2, sendTestToUser;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              body = req.body;
              email = body.email, result = body.result;

              if (!(!email || !result)) {
                _context7.next = 7;
                break;
              }

              res.status(400).json({
                message: "You need to provide an email"
              });
              return _context7.abrupt("return");

            case 7:
              _context7.next = 9;
              return _mailController["default"].sendToOne(email, "Your MBTI test result", "You are ".concat(result));

            case 9:
              _yield$MailController = _context7.sent;
              _yield$MailController2 = _slicedToArray(_yield$MailController, 1);
              sendTestToUser = _yield$MailController2[0];
              res.status(sendTestToUser.statusCode).json({
                message: "sent"
              });
              return _context7.abrupt("return");

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
  return router;
};

var _default = users;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvYXBpL3VzZXJzL3VzZXJzUm91dGVzLmpzIl0sIm5hbWVzIjpbInVzZXJzIiwicm91dGVyIiwicG9zdCIsInJlcSIsInJlcyIsImNvbnRyb2xsZXIiLCJzaWdudXAiLCJnZXRVc2VyIiwiYm9keSIsInVpZCIsInVzZXIiLCJzdGF0dXMiLCJqc29uIiwiZ2V0IiwiZW1haWwiLCJwYXJhbXMiLCJmaW5kVXNlciIsInRoZW4iLCJsZW5ndGgiLCJtZXNzYWdlIiwiaXNVc2VyIiwiZXJyIiwic3VibWl0QXNzZXNzbWVudCIsImdldFVzZXJUZXN0cyIsInVzZXJJZCIsInRlc3RzIiwiYXNzZXNzbWVudENvbnRyb2xsZXIiLCJnZXRUZXN0IiwiaWQiLCJ0ZXN0IiwicmVzdWx0IiwiTWFpbENvbnRyb2xsZXIiLCJzZW5kVG9PbmUiLCJzZW5kVGVzdFRvVXNlciIsInN0YXR1c0NvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxHQUFNO0FBQ2xCLE1BQU1DLE1BQU0sR0FBRyxzQkFBZjtBQUVBQSxFQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSxTQUFaO0FBQUEsdUVBQXVCLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ2ZDLDZCQUFXQyxNQUFYLENBQWtCSCxHQUFsQixFQUF1QkMsR0FBdkIsQ0FEZTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXZCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0FILEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGNBQVo7QUFBQSx3RUFBNEIsa0JBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDUEMs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TUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCaUIsSUFBckI7QUFGc0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTVCLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFlBQVo7QUFBQSx3RUFBMEIsa0JBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2xCSSxjQUFBQSxJQURrQixHQUNUTCxHQURTLENBQ2xCSyxJQURrQjtBQUVsQk0sY0FBQUEsS0FGa0IsR0FFQU4sSUFGQSxDQUVsQk0sS0FGa0IsRUFFWGdCLE1BRlcsR0FFQXRCLElBRkEsQ0FFWHNCLE1BRlc7O0FBQUEsb0JBR3BCLENBQUNoQixLQUFELElBQVUsQ0FBQ2dCLE1BSFM7QUFBQTtBQUFBO0FBQUE7O0FBSXRCMUIsY0FBQUEsR0FBRyxDQUFDTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRU8sZ0JBQUFBLE9BQU8sRUFBRTtBQUFYLGVBQXJCO0FBSnNCOztBQUFBO0FBQUE7QUFBQSxxQkFPT1ksMkJBQWVDLFNBQWYsQ0FDM0JsQixLQUQyQixFQUUzQix1QkFGMkIsb0JBR2hCZ0IsTUFIZ0IsRUFQUDs7QUFBQTtBQUFBO0FBQUE7QUFPakJHLGNBQUFBLGNBUGlCO0FBWXRCN0IsY0FBQUEsR0FBRyxDQUFDTyxNQUFKLENBQVdzQixjQUFjLENBQUNDLFVBQTFCLEVBQXNDdEIsSUFBdEMsQ0FBMkM7QUFBRU8sZ0JBQUFBLE9BQU8sRUFBRTtBQUFYLGVBQTNDO0FBWnNCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQTFCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUJBLFNBQU9sQixNQUFQO0FBQ0QsQ0F0RUQ7O2VBd0VlRCxLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IGNvbnRyb2xsZXIgZnJvbSBcIi4vdXNlcnNjb250cm9sbGVyc1wiO1xyXG5pbXBvcnQgYXNzZXNzbWVudENvbnRyb2xsZXIgZnJvbSBcIi4uL2Fzc2Vzc21lbnRzL2Fzc2Vzc21lbnRzQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgTWFpbENvbnRyb2xsZXIgZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL21haWxpbmcvbWFpbENvbnRyb2xsZXJcIjtcclxuXHJcbmNvbnN0IHVzZXJzID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xyXG5cclxuICByb3V0ZXIucG9zdChcIi9zaWdudXBcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBhd2FpdCBjb250cm9sbGVyLnNpZ251cChyZXEsIHJlcyk7XHJcbiAgICByZXR1cm47XHJcbiAgfSk7XHJcblxyXG4gIHJvdXRlci5wb3N0KFwiL2dldFVzZXJEYXRhXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgbGV0IFt1c2VyXSA9IGF3YWl0IGNvbnRyb2xsZXIuZ2V0VXNlcihyZXEuYm9keS51aWQpO1xyXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24odXNlcik7XHJcbiAgICByZXR1cm47XHJcbiAgfSlcclxuXHJcbiAgcm91dGVyLmdldChgL2VtYWlsY29uZmlybS86ZW1haWxgLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGxldCB7IGVtYWlsIH0gPSByZXEucGFyYW1zO1xyXG4gICAgYXdhaXQgY29udHJvbGxlclxyXG4gICAgICAuZmluZFVzZXIoZW1haWwpXHJcbiAgICAgIC50aGVuKCh1c2VycykgPT4ge1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogXCJpcyBub3QgYSB1c2VyXCIsIGlzVXNlcjogZmFsc2UgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogXCJpcyBhIHVzZXJcIiwgaXNVc2VyOiB0cnVlIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXNcclxuICAgICAgICAgIC5zdGF0dXMoNTAwKVxyXG4gICAgICAgICAgLmpzb24oeyBpc1VzZXI6IGZhbHNlLCBtZXNzYWdlOiBgYW4gZXJyb3Igb2NjdXJlZCAke2Vycn1gIH0pO1xyXG4gICAgICB9KTtcclxuICAgIHJldHVybjtcclxuICB9KTtcclxuXHJcbiAgcm91dGVyLnBvc3QoXCIvYXNzZXNzbWVudFwiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGF3YWl0IGNvbnRyb2xsZXIuc3VibWl0QXNzZXNzbWVudChyZXEsIHJlcyk7XHJcbiAgICByZXR1cm47XHJcbiAgfSk7XHJcblxyXG4gIHJvdXRlci5nZXQoXCIvZ2V0VGVzdHMvOnVzZXJJZFwiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGxldCB0ZXN0cyA9IGF3YWl0IGNvbnRyb2xsZXIuZ2V0VXNlclRlc3RzKHJlcS5wYXJhbXMudXNlcklkKTtcclxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHRlc3RzKTtcclxuICAgIHJldHVybjtcclxuICB9KTtcclxuXHJcbiAgcm91dGVyLmdldChcIi90ZXN0LzppZFwiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGxldCB0ZXN0ID0gYXdhaXQgYXNzZXNzbWVudENvbnRyb2xsZXIuZ2V0VGVzdChyZXEucGFyYW1zLmlkKTtcclxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHRlc3QpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH0pO1xyXG5cclxuICByb3V0ZXIucG9zdChcIi9tYWlsL3NlbmRcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBsZXQgeyBib2R5IH0gPSByZXE7XHJcbiAgICBsZXQgeyBlbWFpbCwgcmVzdWx0IH0gPSBib2R5O1xyXG4gICAgaWYgKCFlbWFpbCB8fCAhcmVzdWx0KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJZb3UgbmVlZCB0byBwcm92aWRlIGFuIGVtYWlsXCIgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBbc2VuZFRlc3RUb1VzZXJdID0gYXdhaXQgTWFpbENvbnRyb2xsZXIuc2VuZFRvT25lKFxyXG4gICAgICAgIGVtYWlsLFxyXG4gICAgICAgIFwiWW91ciBNQlRJIHRlc3QgcmVzdWx0XCIsXHJcbiAgICAgICAgYFlvdSBhcmUgJHtyZXN1bHR9YFxyXG4gICAgICApO1xyXG4gICAgICByZXMuc3RhdHVzKHNlbmRUZXN0VG9Vc2VyLnN0YXR1c0NvZGUpLmpzb24oeyBtZXNzYWdlOiBcInNlbnRcIiB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcm91dGVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlcnM7XHJcbiJdfQ==