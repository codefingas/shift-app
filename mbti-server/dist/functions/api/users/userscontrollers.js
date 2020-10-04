"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Orm = _interopRequireDefault(require("../../../Orm"));

var _assessmentsController = _interopRequireDefault(require("../assessments/assessmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UsersOrm = new _Orm["default"]("users");
var assessmentOrm = new _Orm["default"]("assessments");
var controller = {
  findUser: function findUser(email) {
    return UsersOrm.find("email", email);
  },
  addAssessmentToUser: function () {
    var _addAssessmentToUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, assessmentId) {
      var _yield$controller$fin, _yield$controller$fin2, user, lastTestKey;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return controller.findUser(email);

            case 2:
              _yield$controller$fin = _context.sent;
              _yield$controller$fin2 = _slicedToArray(_yield$controller$fin, 1);
              user = _yield$controller$fin2[0];
              lastTestKey = Math.max.apply(Math, _toConsumableArray(Object.keys(user.assessments)));
              _context.next = 8;
              return UsersOrm.update({
                id: user.id,
                assessments: _objectSpread(_objectSpread({}, user.assessments), {}, _defineProperty({}, lastTestKey + 1, assessmentId))
              });

            case 8:
              return _context.abrupt("return", true);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function addAssessmentToUser(_x, _x2) {
      return _addAssessmentToUser.apply(this, arguments);
    }

    return addAssessmentToUser;
  }(),
  submitAssessment: function () {
    var _submitAssessment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var _req$body, email, assessment, result;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              /**
               * so its supposed to confirm email and return results
               *  -
               */
              _req$body = req.body, email = _req$body.email, assessment = _req$body.assessment;
              result = _assessmentsController["default"].calculateAssessment(assessment); // console.log("THE ASSESSMENT", assessment, "THE RESULT", result);

              _context3.next = 4;
              return Promise.all([controller.findUser(email), assessmentOrm.save(assessment)]).then( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
                  var _ref3, isUser, submit;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _ref3 = _slicedToArray(_ref, 2), isUser = _ref3[0], submit = _ref3[1];

                          if (!(isUser.length > 0)) {
                            _context2.next = 7;
                            break;
                          }

                          _context2.next = 4;
                          return controller.addAssessmentToUser(email, submit.id);

                        case 4:
                          //TODO: FIND A BETTER LOGIC TO SAVE USER DATA WHEN the user is accepted
                          res.status(200).json({
                            created: true,
                            email: true,
                            result: result,
                            assessmentId: submit.id
                          });
                          _context2.next = 10;
                          break;

                        case 7:
                          _context2.next = 9;
                          return UsersOrm.save({
                            email: email,
                            assessments: _defineProperty({}, 0, submit.id)
                          });

                        case 9:
                          res.status(200).json({
                            created: true,
                            email: false,
                            result: result,
                            assessmentId: submit.id
                          });

                        case 10:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x5) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function submitAssessment(_x3, _x4) {
      return _submitAssessment.apply(this, arguments);
    }

    return submitAssessment;
  }()
};
var _default = controller;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvYXBpL3VzZXJzL3VzZXJzY29udHJvbGxlcnMuanMiXSwibmFtZXMiOlsiVXNlcnNPcm0iLCJPcm0iLCJhc3Nlc3NtZW50T3JtIiwiY29udHJvbGxlciIsImZpbmRVc2VyIiwiZW1haWwiLCJmaW5kIiwiYWRkQXNzZXNzbWVudFRvVXNlciIsImFzc2Vzc21lbnRJZCIsInVzZXIiLCJsYXN0VGVzdEtleSIsIk1hdGgiLCJtYXgiLCJPYmplY3QiLCJrZXlzIiwiYXNzZXNzbWVudHMiLCJ1cGRhdGUiLCJpZCIsInN1Ym1pdEFzc2Vzc21lbnQiLCJyZXEiLCJyZXMiLCJib2R5IiwiYXNzZXNzbWVudCIsInJlc3VsdCIsImFzc2Vzc21lbnRDb250cm9sbGVyIiwiY2FsY3VsYXRlQXNzZXNzbWVudCIsIlByb21pc2UiLCJhbGwiLCJzYXZlIiwidGhlbiIsImlzVXNlciIsInN1Ym1pdCIsImxlbmd0aCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxRQUFRLEdBQUcsSUFBSUMsZUFBSixDQUFRLE9BQVIsQ0FBZjtBQUNBLElBQUlDLGFBQWEsR0FBRyxJQUFJRCxlQUFKLENBQVEsYUFBUixDQUFwQjtBQUVBLElBQU1FLFVBQVUsR0FBRztBQUNqQkMsRUFBQUEsUUFBUSxFQUFFLGtCQUFDQyxLQUFEO0FBQUEsV0FBV0wsUUFBUSxDQUFDTSxJQUFULENBQWMsT0FBZCxFQUF1QkQsS0FBdkIsQ0FBWDtBQUFBLEdBRE87QUFFakJFLEVBQUFBLG1CQUFtQjtBQUFBLHVGQUFFLGlCQUFPRixLQUFQLEVBQWNHLFlBQWQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ0FMLFVBQVUsQ0FBQ0MsUUFBWCxDQUFvQkMsS0FBcEIsQ0FEQTs7QUFBQTtBQUFBO0FBQUE7QUFDZEksY0FBQUEsSUFEYztBQUVmQyxjQUFBQSxXQUZlLEdBRURDLElBQUksQ0FBQ0MsR0FBTCxPQUFBRCxJQUFJLHFCQUFRRSxNQUFNLENBQUNDLElBQVAsQ0FBWUwsSUFBSSxDQUFDTSxXQUFqQixDQUFSLEVBRkg7QUFBQTtBQUFBLHFCQUdiZixRQUFRLENBQUNnQixNQUFULENBQWdCO0FBQ3BCQyxnQkFBQUEsRUFBRSxFQUFFUixJQUFJLENBQUNRLEVBRFc7QUFFcEJGLGdCQUFBQSxXQUFXLGtDQUFPTixJQUFJLENBQUNNLFdBQVosMkJBQTBCTCxXQUFXLEdBQUcsQ0FBeEMsRUFBNENGLFlBQTVDO0FBRlMsZUFBaEIsQ0FIYTs7QUFBQTtBQUFBLCtDQU9aLElBUFk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxLQUZGO0FBV2pCVSxFQUFBQSxnQkFBZ0I7QUFBQSxvRkFBRSxrQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDaEI7Ozs7QUFEZ0IsMEJBS1lELEdBQUcsQ0FBQ0UsSUFMaEIsRUFLVmhCLEtBTFUsYUFLVkEsS0FMVSxFQUtIaUIsVUFMRyxhQUtIQSxVQUxHO0FBTVpDLGNBQUFBLE1BTlksR0FNSEMsa0NBQXFCQyxtQkFBckIsQ0FBeUNILFVBQXpDLENBTkcsRUFPaEI7O0FBUGdCO0FBQUEscUJBU1ZJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLENBQ2hCeEIsVUFBVSxDQUFDQyxRQUFYLENBQW9CQyxLQUFwQixDQURnQixFQUVoQkgsYUFBYSxDQUFDMEIsSUFBZCxDQUFtQk4sVUFBbkIsQ0FGZ0IsQ0FBWixFQUdITyxJQUhHO0FBQUEsb0ZBR0U7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJEQUFRQyxNQUFSLGFBQWdCQyxNQUFoQjs7QUFBQSxnQ0FDRkQsTUFBTSxDQUFDRSxNQUFQLEdBQWdCLENBRGQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQ0FFRTdCLFVBQVUsQ0FBQ0ksbUJBQVgsQ0FBK0JGLEtBQS9CLEVBQXNDMEIsTUFBTSxDQUFDZCxFQUE3QyxDQUZGOztBQUFBO0FBRW9EO0FBQ3hERywwQkFBQUEsR0FBRyxDQUFDYSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDbkJDLDRCQUFBQSxPQUFPLEVBQUUsSUFEVTtBQUVuQjlCLDRCQUFBQSxLQUFLLEVBQUUsSUFGWTtBQUduQmtCLDRCQUFBQSxNQUFNLEVBQU5BLE1BSG1CO0FBSW5CZiw0QkFBQUEsWUFBWSxFQUFFdUIsTUFBTSxDQUFDZDtBQUpGLDJCQUFyQjtBQUhJO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlDQVVFakIsUUFBUSxDQUFDNEIsSUFBVCxDQUFjO0FBQUV2Qiw0QkFBQUEsS0FBSyxFQUFMQSxLQUFGO0FBQVNVLDRCQUFBQSxXQUFXLHNCQUFLLENBQUwsRUFBU2dCLE1BQU0sQ0FBQ2QsRUFBaEI7QUFBcEIsMkJBQWQsQ0FWRjs7QUFBQTtBQVlKRywwQkFBQUEsR0FBRyxDQUNBYSxNQURILENBQ1UsR0FEVixFQUVHQyxJQUZILENBRVE7QUFDSkMsNEJBQUFBLE9BQU8sRUFBRSxJQURMO0FBRUo5Qiw0QkFBQUEsS0FBSyxFQUFFLEtBRkg7QUFHSmtCLDRCQUFBQSxNQUFNLEVBQU5BLE1BSEk7QUFJSmYsNEJBQUFBLFlBQVksRUFBRXVCLE1BQU0sQ0FBQ2Q7QUFKakIsMkJBRlI7O0FBWkk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBSEY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBVFU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQVhDLENBQW5CO2VBZ0RlZCxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9ybSBmcm9tIFwiLi4vLi4vLi4vT3JtXCI7XHJcbmltcG9ydCBhc3Nlc3NtZW50Q29udHJvbGxlciBmcm9tIFwiLi4vYXNzZXNzbWVudHMvYXNzZXNzbWVudHNDb250cm9sbGVyXCI7XHJcbmxldCBVc2Vyc09ybSA9IG5ldyBPcm0oXCJ1c2Vyc1wiKTtcclxubGV0IGFzc2Vzc21lbnRPcm0gPSBuZXcgT3JtKFwiYXNzZXNzbWVudHNcIik7XHJcblxyXG5jb25zdCBjb250cm9sbGVyID0ge1xyXG4gIGZpbmRVc2VyOiAoZW1haWwpID0+IFVzZXJzT3JtLmZpbmQoXCJlbWFpbFwiLCBlbWFpbCksXHJcbiAgYWRkQXNzZXNzbWVudFRvVXNlcjogYXN5bmMgKGVtYWlsLCBhc3Nlc3NtZW50SWQpID0+IHtcclxuICAgIGxldCBbdXNlcl0gPSBhd2FpdCBjb250cm9sbGVyLmZpbmRVc2VyKGVtYWlsKTtcclxuICAgIGxldCBsYXN0VGVzdEtleSA9IE1hdGgubWF4KC4uLk9iamVjdC5rZXlzKHVzZXIuYXNzZXNzbWVudHMpKTtcclxuICAgIGF3YWl0IFVzZXJzT3JtLnVwZGF0ZSh7XHJcbiAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICBhc3Nlc3NtZW50czogeyAuLi51c2VyLmFzc2Vzc21lbnRzLCBbbGFzdFRlc3RLZXkgKyAxXTogYXNzZXNzbWVudElkIH0sXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgc3VibWl0QXNzZXNzbWVudDogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAvKipcclxuICAgICAqIHNvIGl0cyBzdXBwb3NlZCB0byBjb25maXJtIGVtYWlsIGFuZCByZXR1cm4gcmVzdWx0c1xyXG4gICAgICogIC1cclxuICAgICAqL1xyXG4gICAgbGV0IHsgZW1haWwsIGFzc2Vzc21lbnQgfSA9IHJlcS5ib2R5O1xyXG4gICAgbGV0IHJlc3VsdCA9IGFzc2Vzc21lbnRDb250cm9sbGVyLmNhbGN1bGF0ZUFzc2Vzc21lbnQoYXNzZXNzbWVudCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIlRIRSBBU1NFU1NNRU5UXCIsIGFzc2Vzc21lbnQsIFwiVEhFIFJFU1VMVFwiLCByZXN1bHQpO1xyXG4gIFxyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICBjb250cm9sbGVyLmZpbmRVc2VyKGVtYWlsKSxcclxuICAgICAgYXNzZXNzbWVudE9ybS5zYXZlKGFzc2Vzc21lbnQpLFxyXG4gICAgXSkudGhlbihhc3luYyAoW2lzVXNlciwgc3VibWl0XSkgPT4ge1xyXG4gICAgICBpZiAoaXNVc2VyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhd2FpdCBjb250cm9sbGVyLmFkZEFzc2Vzc21lbnRUb1VzZXIoZW1haWwsIHN1Ym1pdC5pZCk7IC8vVE9ETzogRklORCBBIEJFVFRFUiBMT0dJQyBUTyBTQVZFIFVTRVIgREFUQSBXSEVOIHRoZSB1c2VyIGlzIGFjY2VwdGVkXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgY3JlYXRlZDogdHJ1ZSxcclxuICAgICAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICAgICAgcmVzdWx0LFxyXG4gICAgICAgICAgYXNzZXNzbWVudElkOiBzdWJtaXQuaWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXdhaXQgVXNlcnNPcm0uc2F2ZSh7IGVtYWlsLCBhc3Nlc3NtZW50czogeyBbMF06IHN1Ym1pdC5pZCB9IH0pO1xyXG5cclxuICAgICAgICByZXNcclxuICAgICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgICAgLmpzb24oe1xyXG4gICAgICAgICAgICBjcmVhdGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWFpbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3VsdCxcclxuICAgICAgICAgICAgYXNzZXNzbWVudElkOiBzdWJtaXQuaWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXI7XHJcbiJdfQ==