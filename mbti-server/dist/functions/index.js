"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("regenerator-runtime/runtime");

var functions = _interopRequireWildcard(require("firebase-functions"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use((0, _compression["default"])()); // parse application/json

app.use(_bodyParser["default"].json());
app.get("/", function (req, res) {
  res.status(200).json({
    ok: "ALIVE"
  });
});
var apis = Object.keys(_api["default"]);

for (var ix = 0; ix < apis.length; ix++) {
  var route = _api["default"][apis[ix]]();

  app.use("/mbti/api", route);
}

exports.mbti = functions.https.onRequest(app);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvaW5kZXguanMiXSwibmFtZXMiOlsiYXBwIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInJlcSIsInJlcyIsIm5leHQiLCJzZXRIZWFkZXIiLCJqc29uIiwiZ2V0Iiwic3RhdHVzIiwib2siLCJhcGlzIiwiT2JqZWN0Iiwia2V5cyIsImFwaSIsIml4IiwibGVuZ3RoIiwicm91dGUiLCJleHBvcnRzIiwibWJ0aSIsImZ1bmN0aW9ucyIsImh0dHBzIiwib25SZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsR0FBRyxHQUFHLDBCQUFaO0FBRUFBLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyx1QkFBV0MsVUFBWCxDQUFzQjtBQUFFQyxFQUFBQSxRQUFRLEVBQUU7QUFBWixDQUF0QixDQUFSO0FBRUFKLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLFVBQUNJLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYLEVBQW9CO0FBQzFCRCxFQUFBQSxHQUFHLENBQUNFLFNBQUosQ0FBYyw2QkFBZCxFQUE2QyxHQUE3QztBQUNBRixFQUFBQSxHQUFHLENBQUNFLFNBQUosQ0FDRSw4QkFERixFQUVFLHdDQUZGO0FBSUFGLEVBQUFBLEdBQUcsQ0FBQ0UsU0FBSixDQUNFLDhCQURGLEVBRUUsNkNBRkY7QUFJQUYsRUFBQUEsR0FBRyxDQUFDRSxTQUFKLENBQWMsa0NBQWQsRUFBa0QsSUFBbEQ7QUFDQUQsRUFBQUEsSUFBSTtBQUNMLENBWkQ7QUFjQVAsR0FBRyxDQUFDQyxHQUFKLENBQVEsOEJBQVIsRSxDQUVBOztBQUNBRCxHQUFHLENBQUNDLEdBQUosQ0FBUUMsdUJBQVdPLElBQVgsRUFBUjtBQUVBVCxHQUFHLENBQUNVLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBQ0wsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDekJBLEVBQUFBLEdBQUcsQ0FBQ0ssTUFBSixDQUFXLEdBQVgsRUFBZ0JGLElBQWhCLENBQXFCO0FBQUVHLElBQUFBLEVBQUUsRUFBRTtBQUFOLEdBQXJCO0FBQ0QsQ0FGRDtBQUlBLElBQU1DLElBQUksR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlDLGVBQVosQ0FBYjs7QUFFQSxLQUFLLElBQUlDLEVBQUUsR0FBRyxDQUFkLEVBQWlCQSxFQUFFLEdBQUdKLElBQUksQ0FBQ0ssTUFBM0IsRUFBbUNELEVBQUUsRUFBckMsRUFBeUM7QUFDdkMsTUFBSUUsS0FBSyxHQUFHSCxnQkFBSUgsSUFBSSxDQUFDSSxFQUFELENBQVIsR0FBWjs7QUFFQWpCLEVBQUFBLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLFdBQVIsRUFBcUJrQixLQUFyQjtBQUNEOztBQUVEQyxPQUFPLENBQUNDLElBQVIsR0FBZUMsU0FBUyxDQUFDQyxLQUFWLENBQWdCQyxTQUFoQixDQUEwQnhCLEdBQTFCLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcbmltcG9ydCAqIGFzIGZ1bmN0aW9ucyBmcm9tIFwiZmlyZWJhc2UtZnVuY3Rpb25zXCI7XG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSBcImNvbXByZXNzaW9uXCI7XG5pbXBvcnQgYXBpIGZyb20gXCIuL2FwaVwiO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcblxuYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgcmVzLnNldEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gIHJlcy5zZXRIZWFkZXIoXG4gICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsXG4gICAgXCJHRVQsIFBPU1QsIE9QVElPTlMsIFBVVCwgUEFUQ0gsIERFTEVURVwiXG4gICk7XG4gIHJlcy5zZXRIZWFkZXIoXG4gICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsXG4gICAgXCJBdXRob3JpemF0aW9uLCBPcmlnaW4sIENvbnRlbnQtVHlwZSwgQWNjZXB0XCJcbiAgKTtcbiAgcmVzLnNldEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCIsIHRydWUpO1xuICBuZXh0KCk7XG59KTtcblxuYXBwLnVzZShjb21wcmVzc2lvbigpKTtcblxuLy8gcGFyc2UgYXBwbGljYXRpb24vanNvblxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbmFwcC5nZXQoXCIvXCIsIChyZXEsIHJlcykgPT4ge1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiBcIkFMSVZFXCIgfSk7XG59KTtcblxuY29uc3QgYXBpcyA9IE9iamVjdC5rZXlzKGFwaSk7XG5cbmZvciAobGV0IGl4ID0gMDsgaXggPCBhcGlzLmxlbmd0aDsgaXgrKykge1xuICBsZXQgcm91dGUgPSBhcGlbYXBpc1tpeF1dKCk7XG5cbiAgYXBwLnVzZShcIi9tYnRpL2FwaVwiLCByb3V0ZSk7XG59XG5cbmV4cG9ydHMubWJ0aSA9IGZ1bmN0aW9ucy5odHRwcy5vblJlcXVlc3QoYXBwKTtcbiJdfQ==