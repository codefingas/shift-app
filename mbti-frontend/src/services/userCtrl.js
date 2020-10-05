/* eslint-disable no-console */
/* eslint-disable  no-async-promise-executor */
/* eslint-disable no-unused-vars */
import firebase from "firebase";
import router from "../router";
import asc from "./asc";

const Auth = firebase.auth();
const UserCalls = new asc("users");

class UserController {
  static login(email, password) {
    return new Promise(async (resolve, reject) => {
      Auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          Auth.onAuthStateChanged((user) => {
            if (user) {
              UserCalls.postCalls("/getUserData", { uid: user.uid })
                .then((resp) => {
                  resolve(resp);
                })
                .catch((err) => {
                  reject(err);
                });
            }
          });
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  static logout() {
    return new Promise(async (resolve, reject) => {
      Auth.signOut()
        .then(() => {
          router.push("/");
          location.reload(); // TODO: THIS was done to resolve the issue with admin badge not showing, look for a more effecient mean
          resolve();
        })
        .catch((err) => {
          console.log("SIGN OUT ERR", err);
          reject(err);
        });
    });
  }

  static sendEmailToLogin() {
    //TODO: CREATE SEND EMAIL TO LOGIN FUNCTIONALITY - SSO
  }

  static getUserData() {
    return new Promise(async (resolve, reject) => {
      await Auth.onAuthStateChanged(async (user) => {
        if (user) {
          await UserCalls.postCalls("/getUserData", { uid: user.uid })
            .then((resp) => {
              resolve(resp);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          resolve(null);
        }
      });
    });
  }

  static signUp(data) {
    return new Promise(async (resolve, reject) => {
      //TODO: RESOLVE THIS BLOCK PROPERLY
      UserCalls.postCalls("/signup", data)
        .then()
        .then(async (resp) => {
          if (resp.created === true) {
            await this.login(data.email, data.password).then((user) => {
              resolve(user);
            });
          }
        })
        .catch((err) => reject(err));
    });
  }

  static confirmUserByEmail(email) {
    return new Promise(async (resolve, reject) => {
      await UserCalls.getCalls(`/emailconfirm/${email}`)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }

  static submitAssessment(data) {
    return new Promise(async (resolve, reject) => {
      await UserCalls.postCalls(`/assessment`, data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  static getTest(id) {
    return new Promise(async (resolve, reject) => {
      await UserCalls.getCalls(`/test/${id}`)
        .then((test) => resolve(test))
        .catch((err) => reject(err));
    });
  }

  static sendEmail(data = {}) {
    return new Promise(async (resolve, reject) => {
      await UserCalls.postCalls(`/mail/send`, data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

export default UserController;
