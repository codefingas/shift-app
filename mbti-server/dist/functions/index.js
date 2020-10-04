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
  app.use("/api/".concat(apis[ix]), _api["default"][apis[ix]]());
}

exports.mbti = functions.https.onRequest(app);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvaW5kZXguanMiXSwibmFtZXMiOlsiYXBwIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInJlcSIsInJlcyIsIm5leHQiLCJzZXRIZWFkZXIiLCJqc29uIiwiZ2V0Iiwic3RhdHVzIiwib2siLCJhcGlzIiwiT2JqZWN0Iiwia2V5cyIsImFwaSIsIml4IiwibGVuZ3RoIiwiZXhwb3J0cyIsIm1idGkiLCJmdW5jdGlvbnMiLCJodHRwcyIsIm9uUmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLEdBQUcsR0FBRywwQkFBWjtBQUVBQSxHQUFHLENBQUNDLEdBQUosQ0FBUUMsdUJBQVdDLFVBQVgsQ0FBc0I7QUFBRUMsRUFBQUEsUUFBUSxFQUFFO0FBQVosQ0FBdEIsQ0FBUjtBQUVBSixHQUFHLENBQUNDLEdBQUosQ0FBUSxVQUFDSSxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjtBQUMxQkQsRUFBQUEsR0FBRyxDQUFDRSxTQUFKLENBQWMsNkJBQWQsRUFBNkMsR0FBN0M7QUFDQUYsRUFBQUEsR0FBRyxDQUFDRSxTQUFKLENBQ0UsOEJBREYsRUFFRSx3Q0FGRjtBQUlBRixFQUFBQSxHQUFHLENBQUNFLFNBQUosQ0FDRSw4QkFERixFQUVFLDZDQUZGO0FBSUFGLEVBQUFBLEdBQUcsQ0FBQ0UsU0FBSixDQUFjLGtDQUFkLEVBQWtELElBQWxEO0FBQ0FELEVBQUFBLElBQUk7QUFDTCxDQVpEO0FBY0FQLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLDhCQUFSLEUsQ0FFQTs7QUFDQUQsR0FBRyxDQUFDQyxHQUFKLENBQVFDLHVCQUFXTyxJQUFYLEVBQVI7QUFFQVQsR0FBRyxDQUFDVSxHQUFKLENBQVEsR0FBUixFQUFhLFVBQUNMLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3pCQSxFQUFBQSxHQUFHLENBQUNLLE1BQUosQ0FBVyxHQUFYLEVBQWdCRixJQUFoQixDQUFxQjtBQUFFRyxJQUFBQSxFQUFFLEVBQUU7QUFBTixHQUFyQjtBQUNELENBRkQ7QUFJQSxJQUFNQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZQyxlQUFaLENBQWI7O0FBQ0EsS0FBSyxJQUFJQyxFQUFFLEdBQUcsQ0FBZCxFQUFpQkEsRUFBRSxHQUFHSixJQUFJLENBQUNLLE1BQTNCLEVBQW1DRCxFQUFFLEVBQXJDLEVBQXlDO0FBQ3ZDakIsRUFBQUEsR0FBRyxDQUFDQyxHQUFKLGdCQUFnQlksSUFBSSxDQUFDSSxFQUFELENBQXBCLEdBQTRCRCxnQkFBSUgsSUFBSSxDQUFDSSxFQUFELENBQVIsR0FBNUI7QUFDRDs7QUFFREUsT0FBTyxDQUFDQyxJQUFSLEdBQWVDLFNBQVMsQ0FBQ0MsS0FBVixDQUFnQkMsU0FBaEIsQ0FBMEJ2QixHQUExQixDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBmdW5jdGlvbnMgZnJvbSBcImZpcmViYXNlLWZ1bmN0aW9uc1wiO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gXCJjb21wcmVzc2lvblwiO1xuaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIjtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5cbmFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHJlcy5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICByZXMuc2V0SGVhZGVyKFxuICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLFxuICAgIFwiR0VULCBQT1NULCBPUFRJT05TLCBQVVQsIFBBVENILCBERUxFVEVcIlxuICApO1xuICByZXMuc2V0SGVhZGVyKFxuICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLFxuICAgIFwiQXV0aG9yaXphdGlvbiwgT3JpZ2luLCBDb250ZW50LVR5cGUsIEFjY2VwdFwiXG4gICk7XG4gIHJlcy5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiLCB0cnVlKTtcbiAgbmV4dCgpO1xufSk7XG5cbmFwcC51c2UoY29tcHJlc3Npb24oKSk7XG5cbi8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG5hcHAuZ2V0KFwiL1wiLCAocmVxLCByZXMpID0+IHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogXCJBTElWRVwiIH0pO1xufSk7XG5cbmNvbnN0IGFwaXMgPSBPYmplY3Qua2V5cyhhcGkpO1xuZm9yIChsZXQgaXggPSAwOyBpeCA8IGFwaXMubGVuZ3RoOyBpeCsrKSB7XG4gIGFwcC51c2UoYC9hcGkvJHthcGlzW2l4XX1gLCBhcGlbYXBpc1tpeF1dKCkpO1xufVxuXG5leHBvcnRzLm1idGkgPSBmdW5jdGlvbnMuaHR0cHMub25SZXF1ZXN0KGFwcCk7Il19