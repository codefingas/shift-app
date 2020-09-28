"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fireConnections = _interopRequireDefault(require("./fireConnections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Auth = _fireConnections["default"].Auth,
    Firedb = _fireConnections["default"].Firedb;

var Orm = /*#__PURE__*/function () {
  function Orm(name) {
    _classCallCheck(this, Orm);

    this.name = name;
    this.db = Firedb.collection(name);
  }

  _createClass(Orm, [{
    key: "signIn",
    value: function signIn(email) {
      return Promise.resolve(Auth.getUserByEmail(email).then(function (resp) {
        return {
          status: 200,
          data: resp.toJSON()
        };
      })["catch"](function (err) {
        return {
          status: 401,
          data: err
        };
      }));
    }
  }, {
    key: "signUp",
    value: function signUp(data) {
      var _this = this;

      var referralCode = data.referralCode,
          rest = _objectWithoutProperties(data, ["referralCode"]);

      var password = rest.password,
          userDetails = _objectWithoutProperties(rest, ["password"]);

      if (referralCode === "") {
        console.log("NO REFERRAL", referralCode); //TODO: DO SOMETHING WITH REFERRAL CODE
      } // console.log("SIGN UP THIS USER", data);


      return new Promise(function (resolve, reject) {
        Auth.createUser(data).then(function (user) {
          _this.save(_objectSpread({
            uid: user.uid,
            created: Date.now()
          }, userDetails)).then(function (data) {
            return resolve(data);
          })["catch"](function (err) {
            return reject(err);
          });
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "find",
    value: function find(field, value) {
      //the field should be passed as a string
      var db = this.db;
      return new Promise(function (resolve, reject) {
        db.where(field, "==", value).get().then(function (snapshot) {
          var data = snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          });
          resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "save",
    value: function save(value) {
      //resolves to an ID
      var db = this.db;
      var createdDateValues = new Date().toISOString().substring(0, 10).split("-");
      value.cd_day = Number(createdDateValues[2]);
      value.cd_month = Number(createdDateValues[1]);
      value.cd_year = Number(createdDateValues[0]);
      value.created = Date.now();
      return new Promise(function (resolve, reject) {
        db.add(value).then(function (val) {
          resolve(val);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "update",
    value: function update(data) {
      // send the data with an id propety in it
      var id = data.id,
          rest = _objectWithoutProperties(data, ["id"]),
          db = this.db;

      return new Promise(function (resolve, reject) {
        db.doc(id).update(rest).then(function (resp) {
          return resolve(resp);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var db = this.db;
      return new Promise(function (resolve, reject) {
        db.doc(id).get().then(function (resp) {
          return resolve(_objectSpread({
            id: id
          }, resp.data()));
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }]);

  return Orm;
}();

var _default = Orm;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Pcm0uanMiXSwibmFtZXMiOlsiQXV0aCIsIkZpcmVmZWF0dXJlcyIsIkZpcmVkYiIsIk9ybSIsIm5hbWUiLCJkYiIsImNvbGxlY3Rpb24iLCJlbWFpbCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2V0VXNlckJ5RW1haWwiLCJ0aGVuIiwicmVzcCIsInN0YXR1cyIsImRhdGEiLCJ0b0pTT04iLCJlcnIiLCJyZWZlcnJhbENvZGUiLCJyZXN0IiwicGFzc3dvcmQiLCJ1c2VyRGV0YWlscyIsImNvbnNvbGUiLCJsb2ciLCJyZWplY3QiLCJjcmVhdGVVc2VyIiwidXNlciIsInNhdmUiLCJ1aWQiLCJjcmVhdGVkIiwiRGF0ZSIsIm5vdyIsImZpZWxkIiwidmFsdWUiLCJ3aGVyZSIsImdldCIsInNuYXBzaG90IiwiZG9jcyIsIm1hcCIsImRvYyIsImlkIiwiY3JlYXRlZERhdGVWYWx1ZXMiLCJ0b0lTT1N0cmluZyIsInN1YnN0cmluZyIsInNwbGl0IiwiY2RfZGF5IiwiTnVtYmVyIiwiY2RfbW9udGgiLCJjZF95ZWFyIiwiYWRkIiwidmFsIiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLEksR0FBaUJDLDJCLENBQWpCRCxJO0lBQU1FLE0sR0FBV0QsMkIsQ0FBWEMsTTs7SUFDUkMsRztBQUNKLGVBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsRUFBTCxHQUFVSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0JGLElBQWxCLENBQVY7QUFDRDs7OzsyQkFFTUcsSyxFQUFPO0FBQ1osYUFBT0MsT0FBTyxDQUFDQyxPQUFSLENBQ0xULElBQUksQ0FBQ1UsY0FBTCxDQUFvQkgsS0FBcEIsRUFDR0ksSUFESCxDQUNRLFVBQUNDLElBQUQsRUFBVTtBQUNkLGVBQU87QUFBRUMsVUFBQUEsTUFBTSxFQUFFLEdBQVY7QUFBZUMsVUFBQUEsSUFBSSxFQUFF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LElBQUQ7QUFBQSxpQkFBVUgsT0FBTztBQUFFOEIsWUFBQUEsRUFBRSxFQUFGQTtBQUFGLGFBQVMzQixJQUFJLENBQUNFLElBQUwsRUFBVCxFQUFqQjtBQUFBLFNBSFAsV0FJUSxVQUFDRSxHQUFEO0FBQUEsaUJBQVNPLE1BQU0sQ0FBQ1AsR0FBRCxDQUFmO0FBQUEsU0FKUjtBQUtGLE9BTk0sQ0FBUDtBQU9EOzs7Ozs7ZUFHWWIsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWFzeW5jLXByb21pc2UtZXhlY3V0b3IgKi9cclxuLyplc2xpbnQtZGlzYWJsZSBwcm9taXNlL2Fsd2F5cy1yZXR1cm4gKi9cclxuLyplc2xpbnQtZGlzYWJsZSBwcm9taXNlL25vLW5lc3RpbmcgKi9cclxuaW1wb3J0IEZpcmVmZWF0dXJlcyBmcm9tIFwiLi9maXJlQ29ubmVjdGlvbnNcIjtcclxuXHJcbmNvbnN0IHsgQXV0aCwgRmlyZWRiIH0gPSBGaXJlZmVhdHVyZXM7XHJcbmNsYXNzIE9ybSB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuZGIgPSBGaXJlZGIuY29sbGVjdGlvbihuYW1lKTtcclxuICB9XHJcblxyXG4gIHNpZ25JbihlbWFpbCkge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcclxuICAgICAgQXV0aC5nZXRVc2VyQnlFbWFpbChlbWFpbClcclxuICAgICAgICAudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiAyMDAsIGRhdGE6IHJlc3AudG9KU09OKCkgfTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4geyBzdGF0dXM6IDQwMSwgZGF0YTogZXJyIH07XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzaWduVXAoZGF0YSkge1xyXG4gICAgbGV0IHsgcmVmZXJyYWxDb2RlLCAuLi5yZXN0IH0gPSBkYXRhO1xyXG4gICAgbGV0IHsgcGFzc3dvcmQsIC4uLnVzZXJEZXRhaWxzIH0gPSByZXN0O1xyXG4gICAgaWYgKHJlZmVycmFsQ29kZSA9PT0gXCJcIikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIk5PIFJFRkVSUkFMXCIsIHJlZmVycmFsQ29kZSk7IC8vVE9ETzogRE8gU09NRVRISU5HIFdJVEggUkVGRVJSQUwgQ09ERVxyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2coXCJTSUdOIFVQIFRISVMgVVNFUlwiLCBkYXRhKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBBdXRoLmNyZWF0ZVVzZXIoZGF0YSlcclxuICAgICAgICAudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zYXZlKHtcclxuICAgICAgICAgICAgdWlkOiB1c2VyLnVpZCxcclxuICAgICAgICAgICAgY3JlYXRlZDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgLi4udXNlckRldGFpbHMsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gcmVzb2x2ZShkYXRhKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlamVjdChlcnIpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZpbmQoZmllbGQsIHZhbHVlKSB7Ly90aGUgZmllbGQgc2hvdWxkIGJlIHBhc3NlZCBhcyBhIHN0cmluZ1xyXG4gICAgY29uc3QgZGIgPSB0aGlzLmRiO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZGIud2hlcmUoZmllbGQsIFwiPT1cIiwgdmFsdWUpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4oKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gc25hcHNob3QuZG9jcy5tYXAoKGRvYykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBpZDogZG9jLmlkLCAuLi5kb2MuZGF0YSgpIH07XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlamVjdChlcnIpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSh2YWx1ZSkge1xyXG4gICAgLy9yZXNvbHZlcyB0byBhbiBJRFxyXG4gICAgY29uc3QgZGIgPSB0aGlzLmRiO1xyXG4gICAgY29uc3QgY3JlYXRlZERhdGVWYWx1ZXMgPSBuZXcgRGF0ZSgpXHJcbiAgICAgIC50b0lTT1N0cmluZygpXHJcbiAgICAgIC5zdWJzdHJpbmcoMCwgMTApXHJcbiAgICAgIC5zcGxpdChcIi1cIik7XHJcbiAgICB2YWx1ZS5jZF9kYXkgPSBOdW1iZXIoY3JlYXRlZERhdGVWYWx1ZXNbMl0pO1xyXG4gICAgdmFsdWUuY2RfbW9udGggPSBOdW1iZXIoY3JlYXRlZERhdGVWYWx1ZXNbMV0pO1xyXG4gICAgdmFsdWUuY2RfeWVhciA9IE51bWJlcihjcmVhdGVkRGF0ZVZhbHVlc1swXSk7XHJcbiAgICB2YWx1ZS5jcmVhdGVkID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBkYi5hZGQodmFsdWUpXHJcbiAgICAgICAgLnRoZW4oKHZhbCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZSh2YWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlamVjdChlcnIpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGRhdGEpIHtcclxuICAgIC8vIHNlbmQgdGhlIGRhdGEgd2l0aCBhbiBpZCBwcm9wZXR5IGluIGl0XHJcbiAgICBjb25zdCB7IGlkLCAuLi5yZXN0IH0gPSBkYXRhLFxyXG4gICAgICBkYiA9IHRoaXMuZGI7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBkYi5kb2MoaWQpXHJcbiAgICAgICAgLnVwZGF0ZShyZXN0KVxyXG4gICAgICAgIC50aGVuKChyZXNwKSA9PiByZXNvbHZlKHJlc3ApKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldE9uZShpZCkge1xyXG4gICAgY29uc3QgZGIgPSB0aGlzLmRiO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgIGRiXHJcbiAgICAgICAgLmRvYyhpZClcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbigocmVzcCkgPT4gcmVzb2x2ZSh7aWQsIC4uLnJlc3AuZGF0YSgpfSkpXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlamVjdChlcnIpKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3JtO1xyXG4iXX0=