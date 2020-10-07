"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Orm = _interopRequireDefault(require("../../../Orm"));

var _assessmentsController = _interopRequireDefault(require("../assessments/assessmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
  signup: function () {
    var _signup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return UsersOrm.signUp(req.body).then(function (user) {
                res.status(201).json({
                  created: true
                }); //shows that the user has been created - returns the response the front end
              })["catch"](function (err) {
                res.status(501).json(err); // used 501 to mean it wasnt implemented and it lacks the ability to fulfill the request
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function signup(_x, _x2) {
      return _signup.apply(this, arguments);
    }

    return signup;
  }(),
  findUser: function findUser(email) {
    return UsersOrm.find("email", email);
  },
  getUser: function getUser(uid) {
    return UsersOrm.find("uid", uid);
  },
  addAssessmentToUser: function () {
    var _addAssessmentToUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, assessmentId) {
      var _yield$controller$fin, _yield$controller$fin2, user, lastTestKey;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return controller.findUser(email);

            case 2:
              _yield$controller$fin = _context2.sent;
              _yield$controller$fin2 = _slicedToArray(_yield$controller$fin, 1);
              user = _yield$controller$fin2[0];
              lastTestKey = user.assessments ? Math.max.apply(Math, _toConsumableArray(Object.keys(user.assessments))) : -1;
              _context2.next = 8;
              return UsersOrm.update({
                id: user.id,
                assessments: _objectSpread(_objectSpread({}, user.assessments), {}, _defineProperty({}, lastTestKey + 1, assessmentId))
              });

            case 8:
              return _context2.abrupt("return", true);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function addAssessmentToUser(_x3, _x4) {
      return _addAssessmentToUser.apply(this, arguments);
    }

    return addAssessmentToUser;
  }(),
  submitAssessment: function () {
    var _submitAssessment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var _req$body, email, assessment, result;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, assessment = _req$body.assessment;
              result = _assessmentsController["default"].calculateAssessment(assessment);
              _context4.next = 4;
              return Promise.all([controller.findUser(email), assessmentOrm.save(assessment)]).then( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref) {
                  var _ref3, isUser, submit;

                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _ref3 = _slicedToArray(_ref, 2), isUser = _ref3[0], submit = _ref3[1];

                          if (!(isUser.length > 0)) {
                            _context3.next = 7;
                            break;
                          }

                          _context3.next = 4;
                          return controller.addAssessmentToUser(email, submit.id);

                        case 4:
                          //TODO: FIND A BETTER LOGIC TO SAVE USER DATA WHEN the user is accepted
                          res.status(200).json({
                            created: true,
                            email: true,
                            result: result,
                            assessmentId: submit.id
                          });
                          _context3.next = 10;
                          break;

                        case 7:
                          _context3.next = 9;
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
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x7) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function submitAssessment(_x5, _x6) {
      return _submitAssessment.apply(this, arguments);
    }

    return submitAssessment;
  }(),
  getUserTests: function getUserTests(userId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var user, assessments, results;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return UsersOrm.getOne(userId);

            case 2:
              user = _context6.sent;
              assessments = user.assessments ? Object.keys(user.assessments).sort(function (a, b) {
                return b - a;
              }).map(function (v) {
                return user.assessments[v];
              }) : [];

              if (assessments.length) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", {
                noTests: true
              });

            case 8:
              results = assessments.map( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(v) {
                  var _yield$assessmentOrm$, id, cd_year, cd_day, cd_month, created, test;

                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return assessmentOrm.getOne(v);

                        case 2:
                          _yield$assessmentOrm$ = _context5.sent;
                          id = _yield$assessmentOrm$.id;
                          cd_year = _yield$assessmentOrm$.cd_year;
                          cd_day = _yield$assessmentOrm$.cd_day;
                          cd_month = _yield$assessmentOrm$.cd_month;
                          created = _yield$assessmentOrm$.created;
                          test = _objectWithoutProperties(_yield$assessmentOrm$, ["id", "cd_year", "cd_day", "cd_month", "created"]);
                          return _context5.abrupt("return", test);

                        case 10:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x8) {
                  return _ref4.apply(this, arguments);
                };
              }());
              return _context6.abrupt("return", {
                tests: results.map(function (v) {
                  return _assessmentsController["default"].calculateAssessment(v);
                }),
                noTests: false
              });

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
var _default = controller;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvYXBpL3VzZXJzL3VzZXJzY29udHJvbGxlcnMuanMiXSwibmFtZXMiOlsiVXNlcnNPcm0iLCJPcm0iLCJhc3Nlc3NtZW50T3JtIiwiY29udHJvbGxlciIsInNpZ251cCIsInJlcSIsInJlcyIsInNpZ25VcCIsImJvZHkiLCJ0aGVuIiwidXNlciIsInN0YXR1cyIsImpzb24iLCJjcmVhdGVkIiwiZXJyIiwiZmluZFVzZXIiLCJlbWFpbCIsImZpbmQiLCJnZXRVc2VyIiwidWlkIiwiYWRkQXNzZXNzbWVudFRvVXNlciIsImFzc2Vzc21lbnRJZCIsImxhc3RUZXN0S2V5IiwiYXNzZXNzbWVudHMiLCJNYXRoIiwibWF4IiwiT2JqZWN0Iiwia2V5cyIsInVwZGF0ZSIsImlkIiwic3VibWl0QXNzZXNzbWVudCIsImFzc2Vzc21lbnQiLCJyZXN1bHQiLCJhc3Nlc3NtZW50Q29udHJvbGxlciIsImNhbGN1bGF0ZUFzc2Vzc21lbnQiLCJQcm9taXNlIiwiYWxsIiwic2F2ZSIsImlzVXNlciIsInN1Ym1pdCIsImxlbmd0aCIsImdldFVzZXJUZXN0cyIsInVzZXJJZCIsImdldE9uZSIsInNvcnQiLCJhIiwiYiIsIm1hcCIsInYiLCJub1Rlc3RzIiwicmVzdWx0cyIsImNkX3llYXIiLCJjZF9kYXkiLCJjZF9tb250aCIsInRlc3QiLCJ0ZXN0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLFFBQVEsR0FBRyxJQUFJQyxlQUFKLENBQVEsT0FBUixDQUFmO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLElBQUlELGVBQUosQ0FBUSxhQUFSLENBQXBCO0FBRUEsSUFBTUUsVUFBVSxHQUFHO0FBQ2pCQyxFQUFBQSxNQUFNO0FBQUEsMEVBQUUsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFD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aEZnQixDQUFuQjtlQW1GZTlDLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3JtIGZyb20gXCIuLi8uLi8uLi9Pcm1cIjtcclxuaW1wb3J0IGFzc2Vzc21lbnRDb250cm9sbGVyIGZyb20gXCIuLi9hc3Nlc3NtZW50cy9hc3Nlc3NtZW50c0NvbnRyb2xsZXJcIjtcclxubGV0IFVzZXJzT3JtID0gbmV3IE9ybShcInVzZXJzXCIpO1xyXG5sZXQgYXNzZXNzbWVudE9ybSA9IG5ldyBPcm0oXCJhc3Nlc3NtZW50c1wiKTtcclxuXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSB7XHJcbiAgc2lnbnVwOiBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGF3YWl0IFVzZXJzT3JtLnNpZ25VcChyZXEuYm9keSlcclxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IGNyZWF0ZWQ6IHRydWUgfSk7IC8vc2hvd3MgdGhhdCB0aGUgdXNlciBoYXMgYmVlbiBjcmVhdGVkIC0gcmV0dXJucyB0aGUgcmVzcG9uc2UgdGhlIGZyb250IGVuZFxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAxKS5qc29uKGVycik7IC8vIHVzZWQgNTAxIHRvIG1lYW4gaXQgd2FzbnQgaW1wbGVtZW50ZWQgYW5kIGl0IGxhY2tzIHRoZSBhYmlsaXR5IHRvIGZ1bGZpbGwgdGhlIHJlcXVlc3RcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBmaW5kVXNlcjogKGVtYWlsKSA9PiBVc2Vyc09ybS5maW5kKFwiZW1haWxcIiwgZW1haWwpLFxyXG4gIGdldFVzZXI6ICh1aWQpID0+IFVzZXJzT3JtLmZpbmQoXCJ1aWRcIiwgdWlkKSxcclxuICBhZGRBc3Nlc3NtZW50VG9Vc2VyOiBhc3luYyAoZW1haWwsIGFzc2Vzc21lbnRJZCkgPT4ge1xyXG4gICAgbGV0IFt1c2VyXSA9IGF3YWl0IGNvbnRyb2xsZXIuZmluZFVzZXIoZW1haWwpO1xyXG4gICAgbGV0IGxhc3RUZXN0S2V5ID0gdXNlci5hc3Nlc3NtZW50cyA/IE1hdGgubWF4KC4uLk9iamVjdC5rZXlzKHVzZXIuYXNzZXNzbWVudHMpKSA6IC0xO1xyXG4gICAgYXdhaXQgVXNlcnNPcm0udXBkYXRlKHtcclxuICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgIGFzc2Vzc21lbnRzOiB7IC4uLnVzZXIuYXNzZXNzbWVudHMsIFtsYXN0VGVzdEtleSArIDFdOiBhc3Nlc3NtZW50SWQgfSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuXHJcbiAgc3VibWl0QXNzZXNzbWVudDogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBsZXQgeyBlbWFpbCwgYXNzZXNzbWVudCB9ID0gcmVxLmJvZHk7XHJcbiAgICBsZXQgcmVzdWx0ID0gYXNzZXNzbWVudENvbnRyb2xsZXIuY2FsY3VsYXRlQXNzZXNzbWVudChhc3Nlc3NtZW50KTtcclxuXHJcblxyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICBjb250cm9sbGVyLmZpbmRVc2VyKGVtYWlsKSxcclxuICAgICAgYXNzZXNzbWVudE9ybS5zYXZlKGFzc2Vzc21lbnQpLFxyXG4gICAgXSkudGhlbihhc3luYyAoW2lzVXNlciwgc3VibWl0XSkgPT4ge1xyXG4gICAgICBpZiAoaXNVc2VyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhd2FpdCBjb250cm9sbGVyLmFkZEFzc2Vzc21lbnRUb1VzZXIoZW1haWwsIHN1Ym1pdC5pZCk7IC8vVE9ETzogRklORCBBIEJFVFRFUiBMT0dJQyBUTyBTQVZFIFVTRVIgREFUQSBXSEVOIHRoZSB1c2VyIGlzIGFjY2VwdGVkXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgY3JlYXRlZDogdHJ1ZSxcclxuICAgICAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICAgICAgcmVzdWx0LFxyXG4gICAgICAgICAgYXNzZXNzbWVudElkOiBzdWJtaXQuaWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXdhaXQgVXNlcnNPcm0uc2F2ZSh7IGVtYWlsLCBhc3Nlc3NtZW50czogeyBbMF06IHN1Ym1pdC5pZCB9IH0pO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICBjcmVhdGVkOiB0cnVlLFxyXG4gICAgICAgICAgZW1haWw6IGZhbHNlLFxyXG4gICAgICAgICAgcmVzdWx0LFxyXG4gICAgICAgICAgYXNzZXNzbWVudElkOiBzdWJtaXQuaWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0VXNlclRlc3RzKHVzZXJJZCkge1xyXG4gICAgbGV0IHVzZXIgPSBhd2FpdCBVc2Vyc09ybS5nZXRPbmUodXNlcklkKTtcclxuICAgIGxldCBhc3Nlc3NtZW50cyA9IHVzZXIuYXNzZXNzbWVudHNcclxuICAgICAgPyBPYmplY3Qua2V5cyh1c2VyLmFzc2Vzc21lbnRzKVxyXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIgLSBhKVxyXG4gICAgICAgICAgLm1hcCgodikgPT4gdXNlci5hc3Nlc3NtZW50c1t2XSlcclxuICAgICAgOiBbXTtcclxuXHJcbiAgICBpZiAoIWFzc2Vzc21lbnRzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4geyBub1Rlc3RzOiB0cnVlIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHRzID0gYXNzZXNzbWVudHMubWFwKGFzeW5jICh2KSA9PiB7XHJcbiAgICAgIGxldCB7XHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgY2RfeWVhcixcclxuICAgICAgICBjZF9kYXksXHJcbiAgICAgICAgY2RfbW9udGgsXHJcbiAgICAgICAgY3JlYXRlZCxcclxuICAgICAgICAuLi50ZXN0XHJcbiAgICAgIH0gPSBhd2FpdCBhc3Nlc3NtZW50T3JtLmdldE9uZSh2KTtcclxuICAgICAgcmV0dXJuIHRlc3Q7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXN0czogcmVzdWx0cy5tYXAoKHYpID0+IGFzc2Vzc21lbnRDb250cm9sbGVyLmNhbGN1bGF0ZUFzc2Vzc21lbnQodikpLFxyXG4gICAgICBub1Rlc3RzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXI7XHJcbiJdfQ==