"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Orm = _interopRequireDefault(require("../../Orm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UsersOrm = new _Orm["default"]('users');
var NotificationsOrm = new _Orm["default"]("notifications");
var controller = {
  notifyUser: function notifyUser(user, data) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var theUser;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return UsersOrm.getOne(user);

            case 2:
              theUser = _context2.sent;
              _context2.next = 5;
              return NotificationsOrm.save(data).then( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(notification) {
                  var notifications;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          notifications = theUser.notifications !== undefined ? [].concat(_toConsumableArray(theUser.notifications), [{
                            value: notification.id,
                            seen: false
                          }]) : [{
                            value: notification.id,
                            seen: false
                          }];
                          _context.next = 3;
                          return UsersOrm.update({
                            id: user,
                            notifications: notifications
                          });

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
var _default = controller;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbkNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiVXNlcnNPcm0iLCJPcm0iLCJOb3RpZmljYXRpb25zT3JtIiwiY29udHJvbGxlciIsIm5vdGlmeVVzZXIiLCJ1c2VyIiwiZGF0YSIsImdldE9uZSIsInRoZVVzZXIiLCJzYXZlIiwidGhlbiIsIm5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbnMiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImlkIiwic2VlbiIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFFBQVEsR0FBRyxJQUFJQyxlQUFKLENBQVEsT0FBUixDQUFqQjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLElBQUlELGVBQUosQ0FBUSxlQUFSLENBQXpCO0FBRUEsSUFBTUUsVUFBVSxHQUFHO0FBQ1RDLEVBQUFBLFVBRFMsc0JBQ0VDLElBREYsRUFDUUMsSUFEUixFQUNhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDRk4sUUFBUSxDQUFDTyxNQUFULENBQWdCRixJQUFoQixDQURFOztBQUFBO0FBQ2xCRyxjQUFBQSxPQURrQjtBQUFBO0FBQUEscUJBRWxCTixnQkFBZ0IsQ0FBQ08sSUFBakIsQ0FBc0JILElBQXRCLEVBQTRCSSxJQUE1QjtBQUFBLG1GQUFpQyxpQkFBT0MsWUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDakNDLDBCQUFBQSxhQURpQyxHQUNqQkosT0FBTyxDQUFDSSxhQUFSLEtBQTBCQyxTQUExQixnQ0FBMENMLE9BQU8sQ0FBQ0ksYUFBbEQsSUFBaUU7QUFBQ0UsNEJBQUFBLEtBQUssRUFBRUgsWUFBWSxDQUFDSSxFQUFyQjtBQUF5QkMsNEJBQUFBLElBQUksRUFBRTtBQUEvQiwyQkFBakUsS0FBMEcsQ0FBQztBQUFDRiw0QkFBQUEsS0FBSyxFQUFFSCxZQUFZLENBQUNJLEVBQXJCO0FBQXlCQyw0QkFBQUEsSUFBSSxFQUFFO0FBQS9CLDJCQUFELENBRHpGO0FBQUE7QUFBQSxpQ0FFL0JoQixRQUFRLENBQUNpQixNQUFULENBQWdCO0FBQUNGLDRCQUFBQSxFQUFFLEVBQUVWLElBQUw7QUFBV08sNEJBQUFBLGFBQWEsRUFBYkE7QUFBWCwyQkFBaEIsQ0FGK0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWpDOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUZrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU0zQjtBQVBjLENBQW5CO2VBVWVULFUiLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlIHByb21pc2UvYWx3YXlzLXJldHVybiAqL1xyXG5pbXBvcnQgT3JtIGZyb20gXCIuLi8uLi9Pcm1cIjtcclxuY29uc3QgVXNlcnNPcm0gPSBuZXcgT3JtKCd1c2VycycpO1xyXG5jb25zdCBOb3RpZmljYXRpb25zT3JtID0gbmV3IE9ybShcIm5vdGlmaWNhdGlvbnNcIik7XHJcblxyXG5jb25zdCBjb250cm9sbGVyID0ge1xyXG4gICAgYXN5bmMgbm90aWZ5VXNlcih1c2VyLCBkYXRhKXsvL2RhdGEgaXMgYW4gb2JqZWN0IG9mIHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IHRoZVVzZXIgPSBhd2FpdCBVc2Vyc09ybS5nZXRPbmUodXNlcik7XHJcbiAgICAgICAgYXdhaXQgTm90aWZpY2F0aW9uc09ybS5zYXZlKGRhdGEpLnRoZW4oYXN5bmMgKG5vdGlmaWNhdGlvbikgPT4ge1xyXG4gICAgICAgICAgbGV0IG5vdGlmaWNhdGlvbnMgPSB0aGVVc2VyLm5vdGlmaWNhdGlvbnMgIT09IHVuZGVmaW5lZCA/IFsuLi50aGVVc2VyLm5vdGlmaWNhdGlvbnMsIHt2YWx1ZTogbm90aWZpY2F0aW9uLmlkLCBzZWVuOiBmYWxzZX1dIDogW3t2YWx1ZTogbm90aWZpY2F0aW9uLmlkLCBzZWVuOiBmYWxzZX1dO1xyXG4gICAgICAgICAgYXdhaXQgVXNlcnNPcm0udXBkYXRlKHtpZDogdXNlciwgbm90aWZpY2F0aW9uc30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udHJvbGxlcjsiXX0=