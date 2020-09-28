"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fireadmin = _interopRequireWildcard(require("firebase-admin"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import firebase from 'firebase';
var serviceAccountJsonName = "./ajo-".concat(_config["default"].environment, "-serviceAccount.json");

var serviceAccount = require(serviceAccountJsonName);

fireadmin.initializeApp({
  credential: fireadmin.credential.cert(serviceAccount),
  databaseURL: _config["default"].databaseurl
});
var _default = {
  Firebase: fireadmin,
  Firedb: fireadmin.firestore(fireadmin),
  Auth: fireadmin.auth()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maXJlQ29ubmVjdGlvbnMuanMiXSwibmFtZXMiOlsic2VydmljZUFjY291bnRKc29uTmFtZSIsImNvbmZpZyIsImVudmlyb25tZW50Iiwic2VydmljZUFjY291bnQiLCJyZXF1aXJlIiwiZmlyZWFkbWluIiwiaW5pdGlhbGl6ZUFwcCIsImNyZWRlbnRpYWwiLCJjZXJ0IiwiZGF0YWJhc2VVUkwiLCJkYXRhYmFzZXVybCIsIkZpcmViYXNlIiwiRmlyZWRiIiwiZmlyZXN0b3JlIiwiQXV0aCIsImF1dGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7OztBQURBO0FBRUEsSUFBTUEsc0JBQXNCLG1CQUFZQyxtQkFBT0MsV0FBbkIseUJBQTVCOztBQUNBLElBQU1DLGNBQWMsR0FBR0MsT0FBTyxDQUFDSixzQkFBRCxDQUE5Qjs7QUFJQUssU0FBUyxDQUFDQyxhQUFWLENBQXdCO0FBQ3RCQyxFQUFBQSxVQUFVLEVBQUVGLFNBQVMsQ0FBQ0UsVUFBVixDQUFxQkMsSUFBckIsQ0FBMEJMLGNBQTFCLENBRFU7QUFFdEJNLEVBQUFBLFdBQVcsRUFBRVIsbUJBQU9TO0FBRkUsQ0FBeEI7ZUFNZTtBQUNYQyxFQUFBQSxRQUFRLEVBQUVOLFNBREM7QUFFWE8sRUFBQUEsTUFBTSxFQUFHUCxTQUFTLENBQUNRLFNBQVYsQ0FBb0JSLFNBQXBCLENBRkU7QUFHWFMsRUFBQUEsSUFBSSxFQUFHVCxTQUFTLENBQUNVLElBQVY7QUFISSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZmlyZWFkbWluIGZyb20gXCJmaXJlYmFzZS1hZG1pblwiO1xyXG4vLyBpbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UnO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcclxuY29uc3Qgc2VydmljZUFjY291bnRKc29uTmFtZSA9IGAuL2Fqby0ke2NvbmZpZy5lbnZpcm9ubWVudH0tc2VydmljZUFjY291bnQuanNvbmA7XHJcbmNvbnN0IHNlcnZpY2VBY2NvdW50ID0gcmVxdWlyZShzZXJ2aWNlQWNjb3VudEpzb25OYW1lKTtcclxuXHJcblxyXG5cclxuZmlyZWFkbWluLmluaXRpYWxpemVBcHAoe1xyXG4gIGNyZWRlbnRpYWw6IGZpcmVhZG1pbi5jcmVkZW50aWFsLmNlcnQoc2VydmljZUFjY291bnQpLFxyXG4gIGRhdGFiYXNlVVJMOiBjb25maWcuZGF0YWJhc2V1cmxcclxufSk7IFxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIEZpcmViYXNlOiBmaXJlYWRtaW4sXHJcbiAgICBGaXJlZGIgOiBmaXJlYWRtaW4uZmlyZXN0b3JlKGZpcmVhZG1pbiksXHJcbiAgICBBdXRoIDogZmlyZWFkbWluLmF1dGgoKVxyXG59OyJdfQ==