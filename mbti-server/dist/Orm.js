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

      if (referralCode) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Pcm0uanMiXSwibmFtZXMiOlsiQXV0aCIsIkZpcmVmZWF0dXJlcyIsIkZpcmVkYiIsIk9ybSIsIm5hbWUiLCJkYiIsImNvbGxlY3Rpb24iLCJlbWFpbCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2V0VXNlckJ5RW1haWwiLCJ0aGVuIiwicmVzcCIsInN0YXR1cyIsImRhdGEiLCJ0b0pTT04iLCJlcnIiLCJyZWZlcnJhbENvZGUiLCJyZXN0IiwicGFzc3dvcmQiLCJ1c2VyRGV0YWlscyIsImNvbnNvbGUiLCJsb2ciLCJyZWplY3QiLCJjcmVhdGVVc2VyIiwidXNlciIsInNhdmUiLCJ1aWQiLCJjcmVhdGVkIiwiRGF0ZSIsIm5vdyIsImZpZWxkIiwidmFsdWUiLCJ3aGVyZSIsImdldCIsInNuYXBzaG90IiwiZG9jcyIsIm1hcCIsImRvYyIsImlkIiwiY3JlYXRlZERhdGVWYWx1ZXMiLCJ0b0lTT1N0cmluZyIsInN1YnN0cmluZyIsInNwbGl0IiwiY2RfZGF5IiwiTnVtYmVyIiwiY2RfbW9udGgiLCJjZF95ZWFyIiwiYWRkIiwidmFsIiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLEksR0FBaUJDLDJCLENBQWpCRCxJO0lBQU1FLE0sR0FBV0QsMkIsQ0FBWEMsTTs7SUFDUkMsRztBQUNKLGVBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsRUFBTCxHQUFVSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0JGLElBQWxCLENBQVY7QUFDRDs7OzsyQkFFTUcsSyxFQUFPO0FBQ1osYUFBT0MsT0FBTyxDQUFDQyxPQUFSLENBQ0xULElBQUksQ0FBQ1UsY0FBTCxDQUFvQkgsS0FBcEIsRUFDR0ksSUFESCxDQUNRLFVBQUNDLElBQUQsRUFBVTtBQUNkLGVBQU87QUFBRUMsVUFBQUEsTUFBTSxFQUFFLEdBQVY7QUFBZUMsVUFBQUEsSUFBSSxFQUFF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aUJBQVVILE9BQU87QUFBRThCLFlBQUFBLEVBQUUsRUFBRkE7QUFBRixhQUFTM0IsSUFBSSxDQUFDRSxJQUFMLEVBQVQsRUFBakI7QUFBQSxTQUhQLFdBSVEsVUFBQ0UsR0FBRDtBQUFBLGlCQUFTTyxNQUFNLENBQUNQLEdBQUQsQ0FBZjtBQUFBLFNBSlI7QUFLRixPQU5NLENBQVA7QUFPRDs7Ozs7O2VBR1liLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1hc3luYy1wcm9taXNlLWV4ZWN1dG9yICovXHJcbi8qZXNsaW50LWRpc2FibGUgcHJvbWlzZS9hbHdheXMtcmV0dXJuICovXHJcbi8qZXNsaW50LWRpc2FibGUgcHJvbWlzZS9uby1uZXN0aW5nICovXHJcbmltcG9ydCBGaXJlZmVhdHVyZXMgZnJvbSBcIi4vZmlyZUNvbm5lY3Rpb25zXCI7XHJcblxyXG5jb25zdCB7IEF1dGgsIEZpcmVkYiB9ID0gRmlyZWZlYXR1cmVzO1xyXG5jbGFzcyBPcm0ge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmRiID0gRmlyZWRiLmNvbGxlY3Rpb24obmFtZSk7XHJcbiAgfVxyXG5cclxuICBzaWduSW4oZW1haWwpIHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoXHJcbiAgICAgIEF1dGguZ2V0VXNlckJ5RW1haWwoZW1haWwpXHJcbiAgICAgICAgLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICAgIHJldHVybiB7IHN0YXR1czogMjAwLCBkYXRhOiByZXNwLnRvSlNPTigpIH07XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiA0MDEsIGRhdGE6IGVyciB9O1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2lnblVwKGRhdGEpIHtcclxuICAgIGxldCB7IHJlZmVycmFsQ29kZSwgLi4ucmVzdCB9ID0gZGF0YTtcclxuICAgIGxldCB7IHBhc3N3b3JkLCAuLi51c2VyRGV0YWlscyB9ID0gcmVzdDtcclxuICAgIGlmIChyZWZlcnJhbENvZGUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJOTyBSRUZFUlJBTFwiLCByZWZlcnJhbENvZGUpOyAvL1RPRE86IERPIFNPTUVUSElORyBXSVRIIFJFRkVSUkFMIENPREVcclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKFwiU0lHTiBVUCBUSElTIFVTRVJcIiwgZGF0YSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgQXV0aC5jcmVhdGVVc2VyKGRhdGEpXHJcbiAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2F2ZSh7XHJcbiAgICAgICAgICAgIHVpZDogdXNlci51aWQsXHJcbiAgICAgICAgICAgIGNyZWF0ZWQ6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIC4uLnVzZXJEZXRhaWxzLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHJlc29sdmUoZGF0YSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4gcmVqZWN0KGVycikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmaW5kKGZpZWxkLCB2YWx1ZSkgey8vdGhlIGZpZWxkIHNob3VsZCBiZSBwYXNzZWQgYXMgYSBzdHJpbmdcclxuICAgIGNvbnN0IGRiID0gdGhpcy5kYjtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGRiLndoZXJlKGZpZWxkLCBcIj09XCIsIHZhbHVlKVxyXG4gICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC50aGVuKChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IHNuYXBzaG90LmRvY3MubWFwKChkb2MpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGRvYy5pZCwgLi4uZG9jLmRhdGEoKSB9O1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNhdmUodmFsdWUpIHtcclxuICAgIC8vcmVzb2x2ZXMgdG8gYW4gSURcclxuICAgIGNvbnN0IGRiID0gdGhpcy5kYjtcclxuICAgIGNvbnN0IGNyZWF0ZWREYXRlVmFsdWVzID0gbmV3IERhdGUoKVxyXG4gICAgICAudG9JU09TdHJpbmcoKVxyXG4gICAgICAuc3Vic3RyaW5nKDAsIDEwKVxyXG4gICAgICAuc3BsaXQoXCItXCIpO1xyXG4gICAgdmFsdWUuY2RfZGF5ID0gTnVtYmVyKGNyZWF0ZWREYXRlVmFsdWVzWzJdKTtcclxuICAgIHZhbHVlLmNkX21vbnRoID0gTnVtYmVyKGNyZWF0ZWREYXRlVmFsdWVzWzFdKTtcclxuICAgIHZhbHVlLmNkX3llYXIgPSBOdW1iZXIoY3JlYXRlZERhdGVWYWx1ZXNbMF0pO1xyXG4gICAgdmFsdWUuY3JlYXRlZCA9IERhdGUubm93KCk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZGIuYWRkKHZhbHVlKVxyXG4gICAgICAgIC50aGVuKCh2YWwpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUodmFsKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShkYXRhKSB7XHJcbiAgICAvLyBzZW5kIHRoZSBkYXRhIHdpdGggYW4gaWQgcHJvcGV0eSBpbiBpdFxyXG4gICAgY29uc3QgeyBpZCwgLi4ucmVzdCB9ID0gZGF0YSxcclxuICAgICAgZGIgPSB0aGlzLmRiO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZGIuZG9jKGlkKVxyXG4gICAgICAgIC51cGRhdGUocmVzdClcclxuICAgICAgICAudGhlbigocmVzcCkgPT4gcmVzb2x2ZShyZXNwKSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4gcmVqZWN0KGVycikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRPbmUoaWQpIHtcclxuICAgIGNvbnN0IGRiID0gdGhpcy5kYjtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICBkYlxyXG4gICAgICAgIC5kb2MoaWQpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4oKHJlc3ApID0+IHJlc29sdmUoe2lkLCAuLi5yZXNwLmRhdGEoKX0pKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9ybTtcclxuIl19