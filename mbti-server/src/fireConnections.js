import * as fireadmin from "firebase-admin";
// import firebase from 'firebase';
import config from './config';
const serviceAccountJsonName = `./ajo-${config.environment}-serviceAccount.json`;
const serviceAccount = require(serviceAccountJsonName);



fireadmin.initializeApp({
  credential: fireadmin.credential.cert(serviceAccount),
  databaseURL: config.databaseurl
}); 


export default {
    Firebase: fireadmin,
    Firedb : fireadmin.firestore(fireadmin),
    Auth : fireadmin.auth()
};