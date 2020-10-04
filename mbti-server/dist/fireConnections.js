"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fireadmin = _interopRequireWildcard(require("firebase-admin"));

var _serviceAccounts = _interopRequireDefault(require("./serviceAccounts.json"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import firebase from 'firebase';
fireadmin.initializeApp({
  credential: fireadmin.credential.cert(_serviceAccounts["default"]),
  databaseURL: _config["default"].databaseurl
});
var _default = {
  Firebase: fireadmin,
  Firedb: fireadmin.firestore(fireadmin),
  Auth: fireadmin.auth()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maXJlQ29ubmVjdGlvbnMuanMiXSwibmFtZXMiOlsiZmlyZWFkbWluIiwiaW5pdGlhbGl6ZUFwcCIsImNyZWRlbnRpYWwiLCJjZXJ0Iiwic2VydmljZUFjY291bnQiLCJkYXRhYmFzZVVSTCIsImNvbmZpZyIsImRhdGFiYXNldXJsIiwiRmlyZWJhc2UiLCJGaXJlZGIiLCJmaXJlc3RvcmUiLCJBdXRoIiwiYXV0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBREE7QUFLQUEsU0FBUyxDQUFDQyxhQUFWLENBQXdCO0FBQ3RCQyxFQUFBQSxVQUFVLEVBQUVGLFNBQVMsQ0FBQ0UsVUFBVixDQUFxQkMsSUFBckIsQ0FBMEJDLDJCQUExQixDQURVO0FBRXRCQyxFQUFBQSxXQUFXLEVBQUVDLG1CQUFPQztBQUZFLENBQXhCO2VBTWU7QUFDWEMsRUFBQUEsUUFBUSxFQUFFUixTQURDO0FBRVhTLEVBQUFBLE1BQU0sRUFBR1QsU0FBUyxDQUFDVSxTQUFWLENBQW9CVixTQUFwQixDQUZFO0FBR1hXLEVBQUFBLElBQUksRUFBR1gsU0FBUyxDQUFDWSxJQUFWO0FBSEksQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZpcmVhZG1pbiBmcm9tIFwiZmlyZWJhc2UtYWRtaW5cIjtcclxuaW1wb3J0IHNlcnZpY2VBY2NvdW50IGZyb20gXCIuL3NlcnZpY2VBY2NvdW50cy5qc29uXCI7XHJcbi8vIGltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZSc7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xyXG5cclxuXHJcblxyXG5maXJlYWRtaW4uaW5pdGlhbGl6ZUFwcCh7XHJcbiAgY3JlZGVudGlhbDogZmlyZWFkbWluLmNyZWRlbnRpYWwuY2VydChzZXJ2aWNlQWNjb3VudCksXHJcbiAgZGF0YWJhc2VVUkw6IGNvbmZpZy5kYXRhYmFzZXVybFxyXG59KTsgXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgRmlyZWJhc2U6IGZpcmVhZG1pbixcclxuICAgIEZpcmVkYiA6IGZpcmVhZG1pbi5maXJlc3RvcmUoZmlyZWFkbWluKSxcclxuICAgIEF1dGggOiBmaXJlYWRtaW4uYXV0aCgpXHJcbn07Il19