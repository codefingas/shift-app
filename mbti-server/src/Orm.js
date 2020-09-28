/* eslint-disable no-async-promise-executor */
/*eslint-disable promise/always-return */
/*eslint-disable promise/no-nesting */
import Firefeatures from "./fireConnections";

const { Auth, Firedb } = Firefeatures;
class Orm {
  constructor(name) {
    this.name = name;
    this.db = Firedb.collection(name);
  }

  signIn(email) {
    return Promise.resolve(
      Auth.getUserByEmail(email)
        .then((resp) => {
          return { status: 200, data: resp.toJSON() };
        })
        .catch((err) => {
          return { status: 401, data: err };
        })
    );
  }

  signUp(data) {
    let { referralCode, ...rest } = data;
    let { password, ...userDetails } = rest;
    if (referralCode) {
      console.log("NO REFERRAL", referralCode); //TODO: DO SOMETHING WITH REFERRAL CODE
    }
    // console.log("SIGN UP THIS USER", data);

    return new Promise((resolve, reject) => {
      Auth.createUser(data)
        .then((user) => {
          this.save({
            uid: user.uid,
            created: Date.now(),
            ...userDetails,
          })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  }

  find(field, value) {//the field should be passed as a string
    const db = this.db;
    return new Promise((resolve, reject) => {
      db.where(field, "==", value)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  save(value) {
    //resolves to an ID
    const db = this.db;
    const createdDateValues = new Date()
      .toISOString()
      .substring(0, 10)
      .split("-");
    value.cd_day = Number(createdDateValues[2]);
    value.cd_month = Number(createdDateValues[1]);
    value.cd_year = Number(createdDateValues[0]);
    value.created = Date.now();

    return new Promise((resolve, reject) => {
      db.add(value)
        .then((val) => {
          resolve(val);
        })
        .catch((err) => reject(err));
    });
  }

  update(data) {
    // send the data with an id propety in it
    const { id, ...rest } = data,
      db = this.db;
    return new Promise((resolve, reject) => {
      db.doc(id)
        .update(rest)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }

  getOne(id) {
    const db = this.db;
    return new Promise((resolve, reject) => {
       db
        .doc(id)
        .get()
        .then((resp) => resolve({id, ...resp.data()}))
        .catch((err) => reject(err));
    });
  }
}

export default Orm;
