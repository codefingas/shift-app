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
              return _userscontrollers["default"].confirmEmail(email).then(function (user) {
                return console.log("THE USER", user);
              })["catch"](function (err) {
                return console.log("THE ERROR", err);
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
              console.log("GOT HERE THE BODY", body);
              email = body.email, result = body.result;
              /**
               * should take the user id / the UID to get the information of who to send to
               *  for now we can work with email
               *      -
               */

              if (!(!email || !result)) {
                _context4.next = 8;
                break;
              }

              res.status(400).json({
                message: "You need to provide an email"
              });
              return _context4.abrupt("return");

            case 8:
              _context4.next = 10;
              return _mailController["default"].sendToOne(email, "Your MBTI test result", "You are ".concat(result));

            case 10:
              _yield$MailController = _context4.sent;
              _yield$MailController2 = _slicedToArray(_yield$MailController, 1);
              sendTestToUser = _yield$MailController2[0];
              console.log("THE SENT MAIL", sendTestToUser);
              res.status(sendTestToUser.statusCode).json({
                message: 'sent'
              });
              return _context4.abrupt("return");

            case 16:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvYXBpL3VzZXJzL3VzZXJzUm91dGVzLmpzIl0sIm5hbWVzIjpbInVzZXJzIiwicm91dGVyIiwicG9zdCIsInJlcSIsInJlcyIsImNvbnRyb2xsZXIiLCJzaWdudXAiLCJnZXQiLCJlbWFpbCIsInBhcmFtcyIsImNvbmZpcm1FbWFpbCIsInRoZW4iLCJ1c2VyIiwiY29uc29sZSIsImxvZyIsImVyciIsInN1Ym1pdEFzc2Vzc21lbnQiLCJhc3Nlc3NtZW50Q29udHJvbGxlciIsImdldFRlc3QiLCJpZCIsInRlc3QiLCJzdGF0dXMiLCJqc29uIiwiYm9keSIsInJlc3VsdCIsIm1lc3NhZ2UiLCJNYWlsQ29udHJvbGxlciIsInNlbmRUb09uZSIsInNlbmRUZXN0VG9Vc2VyIiwic3RhdHVzQ29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBRyxTQUFSQSxLQUFRLEdBQU07QUFDbEIsTUFBTUMsTUFBTSxHQUFHLHNCQUFmO0FBRUFBLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFNBQVosRUFBdUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbkNDLGlDQUFXQyxNQUFYLENBQWtCSCxHQUFsQixFQUF1QkMsR0FBdkI7QUFDRCxHQUZEO0FBSUFILEVBQUFBLE1BQU0sQ0FBQ00sR0FBUDtBQUFBLHVFQUFtQyxpQkFBT0osR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUMzQkksY0FBQUEsS0FEMkIsR0FDakJMLEdBQUcsQ0FBQ00sTUFEYSxDQUMzQkQsS0FEMkI7QUFBQTtBQUFBLHFCQUUzQkgsNkJBQ0hLLFlBREcsQ0FDVUYsS0FEVixFQUVIRyxJQUZHLENBRUUsVUFBQ0MsSUFBRDtBQUFBLHVCQUFVQyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCRixJQUF4QixDQUFWO0FBQUEsZUFGRixXQUdHLFVBQUNHLEdBQUQ7QUFBQSx1QkFBU0YsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QkMsR0FBekIsQ0FBVDtBQUFBLGVBSEgsQ0FGMkI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBbkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRQWQsRUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksYUFBWjtBQUFBLHdFQUEyQixrQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDekJDLDJDQUFXVyxnQkFBWCxDQUE0QmIsR0FBNUIsRUFBaUNDLEdBQWpDOztBQUR5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUEzQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBSCxFQUFBQSxNQUFNLENBQUNNLEdBQVAsQ0FBVyxXQUFYO0FBQUEsd0VBQXdCLGtCQUFPSixHQUFQLEVBQVlDLEdBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDTGEsa0NBQXFCQyxPQUFyQixDQUE2QmYsR0FBRyxDQUFDTSxNQUFKLENBQVdVLEVBQXhDLENBREs7O0FBQUE7QUFDbEJDLGNBQUFBLElBRGtCO0FBRXRCaEIsY0FBQUEsR0FBRyxDQUFDaUIsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCRixJQUFyQjs7QUFGc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQW5CLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFlBQVo7QUFBQSx3RUFBMEIsa0JBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2xCbUIsY0FBQUEsSUFEa0IsR0FDVHBCLEdBRFMsQ0FDbEJvQixJQURrQjtBQUV4QlYsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUNTLElBQWpDO0FBQ01mLGNBQUFBLEtBSGtCLEdBR0FlLElBSEEsQ0FHbEJmLEtBSGtCLEVBR1hnQixNQUhXLEdBR0FELElBSEEsQ0FHWEMsTUFIVztBQUt4Qjs7Ozs7O0FBTHdCLG9CQVVwQixDQUFDaEIsS0FBRCxJQUFVLENBQUNnQixNQVZTO0FBQUE7QUFBQTtBQUFBOztBQVd0QnBCLGNBQUFBLEdBQUcsQ0FBQ2lCLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFRyxnQkFBQUEsT0FBTyxFQUFFO0FBQVgsZUFBckI7QUFYc0I7O0FBQUE7QUFBQTtBQUFBLHFCQWNPQywyQkFBZUMsU0FBZixDQUMzQm5CLEtBRDJCLEVBRTNCLHVCQUYyQixvQkFHaEJnQixNQUhnQixFQWRQOztBQUFBO0FBQUE7QUFBQTtBQWNqQkksY0FBQUEsY0FkaUI7QUFtQnRCZixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCYyxjQUE3QjtBQUNBeEIsY0FBQUEsR0FBRyxDQUFDaUIsTUFBSixDQUFXTyxjQUFjLENBQUNDLFVBQTFCLEVBQXNDUCxJQUF0QyxDQUEyQztBQUFDRyxnQkFBQUEsT0FBTyxFQUFFO0FBQVYsZUFBM0M7QUFwQnNCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQTFCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJBLFNBQU94QixNQUFQO0FBQ0QsQ0FsREQ7O2VBb0RlRCxLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IGNvbnRyb2xsZXIgZnJvbSBcIi4vdXNlcnNjb250cm9sbGVyc1wiO1xyXG5pbXBvcnQgYXNzZXNzbWVudENvbnRyb2xsZXIgZnJvbSBcIi4uL2Fzc2Vzc21lbnRzL2Fzc2Vzc21lbnRzQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgTWFpbENvbnRyb2xsZXIgZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL21haWxpbmcvbWFpbENvbnRyb2xsZXJcIjtcclxuXHJcbmNvbnN0IHVzZXJzID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xyXG5cclxuICByb3V0ZXIucG9zdChcIi9zaWdudXBcIiwgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb250cm9sbGVyLnNpZ251cChyZXEsIHJlcyk7XHJcbiAgfSk7XHJcblxyXG4gIHJvdXRlci5nZXQoYC9lbWFpbGNvbmZpcm0vOmVtYWlsYCwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBsZXQgeyBlbWFpbCB9ID0gcmVxLnBhcmFtcztcclxuICAgIGF3YWl0IGNvbnRyb2xsZXJcclxuICAgICAgLmNvbmZpcm1FbWFpbChlbWFpbClcclxuICAgICAgLnRoZW4oKHVzZXIpID0+IGNvbnNvbGUubG9nKFwiVEhFIFVTRVJcIiwgdXNlcikpXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRIRSBFUlJPUlwiLCBlcnIpKTtcclxuICB9KTtcclxuXHJcbiAgcm91dGVyLnBvc3QoXCIvYXNzZXNzbWVudFwiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnRyb2xsZXIuc3VibWl0QXNzZXNzbWVudChyZXEsIHJlcyk7XHJcbiAgfSk7XHJcblxyXG4gIHJvdXRlci5nZXQoXCIvdGVzdC86aWRcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBsZXQgdGVzdCA9IGF3YWl0IGFzc2Vzc21lbnRDb250cm9sbGVyLmdldFRlc3QocmVxLnBhcmFtcy5pZCk7XHJcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih0ZXN0KTtcclxuICB9KTtcclxuXHJcbiAgcm91dGVyLnBvc3QoXCIvbWFpbC9zZW5kXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgbGV0IHsgYm9keSB9ID0gcmVxO1xyXG4gICAgY29uc29sZS5sb2coXCJHT1QgSEVSRSBUSEUgQk9EWVwiLCBib2R5KTtcclxuICAgIGxldCB7IGVtYWlsLCByZXN1bHQgfSA9IGJvZHk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzaG91bGQgdGFrZSB0aGUgdXNlciBpZCAvIHRoZSBVSUQgdG8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBvZiB3aG8gdG8gc2VuZCB0b1xyXG4gICAgICogIGZvciBub3cgd2UgY2FuIHdvcmsgd2l0aCBlbWFpbFxyXG4gICAgICogICAgICAtXHJcbiAgICAgKi9cclxuICAgIGlmICghZW1haWwgfHwgIXJlc3VsdCkge1xyXG4gICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiWW91IG5lZWQgdG8gcHJvdmlkZSBhbiBlbWFpbFwiIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgW3NlbmRUZXN0VG9Vc2VyXSA9IGF3YWl0IE1haWxDb250cm9sbGVyLnNlbmRUb09uZShcclxuICAgICAgICBlbWFpbCxcclxuICAgICAgICBcIllvdXIgTUJUSSB0ZXN0IHJlc3VsdFwiLFxyXG4gICAgICAgIGBZb3UgYXJlICR7cmVzdWx0fWBcclxuICAgICAgKTtcclxuICAgICAgY29uc29sZS5sb2coXCJUSEUgU0VOVCBNQUlMXCIsIHNlbmRUZXN0VG9Vc2VyKTtcclxuICAgICAgcmVzLnN0YXR1cyhzZW5kVGVzdFRvVXNlci5zdGF0dXNDb2RlKS5qc29uKHttZXNzYWdlOiAnc2VudCd9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcm91dGVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlcnM7XHJcbiJdfQ==