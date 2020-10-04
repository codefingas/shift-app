import * as fireadmin from "firebase-admin";
import serviceAccount from "./serviceAccounts.json";
// import firebase from 'firebase';
import config from './config';



fireadmin.initializeApp({
  credential: fireadmin.credential.cert(serviceAccount),
  databaseURL: config.databaseurl
}); 


export default {
    Firebase: fireadmin,
    Firedb : fireadmin.firestore(fireadmin),
    Auth : fireadmin.auth()
};