/* eslint-disable no-console */
import firebase from "firebase/app";
import crypto from "crypto";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

export default class Orm {
  constructor(name) {
    this.name = name;
    this.db = firebase.firestore().collection(this.name);
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        let res = [];
        await this.db.get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            let item = {
              id: doc.id
            };
            item = { ...item, ...doc.data() };
            if (item.artwork === undefined) {
              item.artwork = "No featured image";
            }

            res.unshift(item);
          });
        });
        res.sort((a, b) => b.created - a.created);
        resolve(res); //resolving with data
      } catch (err) {
        reject(err); //reject with error
      }
    });
  }

  createOne(data) {
    let db = this.db,
      collection = this.name;
    data.created = new Date().getTime();
    return new Promise(async (resolve, reject) => {
      let { artwork, ...rest } = data;

      if (
        artwork != null &&
        Object.getPrototypeOf(artwork) === File.prototype
      ) {
        let destBucketName = `${process.env.VUE_APP_STORAGE_BUCKET}`,
          localFilenameSplit = artwork.name.split("."),
          extension = localFilenameSplit[localFilenameSplit.length - 1],
          fileRef = `${crypto
            .createHash("sha256")
            .update(artwork.name)
            .digest("hex")}.${extension}`,
          storageRef = firebase
            .app()
            .storage(`gs://${destBucketName}`)
            .ref(collection),
          selectedFIle = artwork,
          imageFileRef = storageRef.child(`image/${fileRef}`),
          metadata = {
            contentType: `${artwork.type}`
          };

        let uploadTask = imageFileRef.put(selectedFIle, metadata);
        console.log(" THE UPLOAD TASK ", uploadTask);
        let nowLoading = setInterval(() => {
          let uploading =
            (uploadTask.snapshot.bytesTransferred /
              uploadTask.snapshot.totalBytes) *
            100;
          console.log(
            `${Math.floor(
              uploading
            )}% at ${new Date().getHours()}:${new Date().getMinutes()}`
          );
        }, 100);

        if (uploadTask.snapshot.state === "error") {
          clearInterval(nowLoading);
          let errorMessage = `an error occurred while uploading - file was ${(uploadTask
            .snapshot.bytesTransferred /
            uploadTask.snapshot.totalBytes) *
            100}% done - Please upload again`;
          console.log(errorMessage);
        }

        uploadTask.then(() => {
          console.log(
            `Upload is ${(uploadTask.snapshot.bytesTransferred /
              uploadTask.snapshot.totalBytes) *
              100}% done`
          );
          console.log("the final upload task", uploadTask.snapshot);
          let uploading = `Upload is ${(uploadTask.snapshot.bytesTransferred /
            uploadTask.snapshot.totalBytes) *
            100}% done`;
          clearInterval(nowLoading);

          console.log(uploading);

          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function(downloadURL) {
              data.artwork = downloadURL;
              //TODO: WORK HERE

              db.add(data);
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      } else {
        if (typeof artwork === "string") {
          rest.artwork = artwork;
        }
        db.add(rest)
          .then(post => {
            resolve(post);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  }

  deleteOne(id) {
    return new Promise((resolve, reject) => {
      this.db
        .doc(id)
        .delete()
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateOne(data) {
    console.log("UPDATE DATA", data);
    let db = this.db,
      collection = this.name;
    return new Promise(async (resolve, reject) => {
      let { id, artwork, ...rest } = data;
      rest.modified = new Date().getTime();
      if (
        artwork != null &&
        Object.getPrototypeOf(artwork) === File.prototype
      ) {
        let destBucketName = `${process.env.VUE_APP_STORAGE_BUCKET}`,
          localFilenameSplit = artwork.name.split("."),
          extension = localFilenameSplit[localFilenameSplit.length - 1],
          fileRef = `${crypto
            .createHash("sha256")
            .update(artwork.name)
            .digest("hex")}.${extension}`,
          storageRef = firebase
            .app()
            .storage(`gs://${destBucketName}`)
            .ref(collection),
          selectedFIle = artwork,
          imageFileRef = storageRef.child(`image/${fileRef}`),
          metadata = {
            contentType: `${artwork.type}`
          };

        let uploadTask = imageFileRef.put(selectedFIle, metadata);
        console.log(" THE UPLOAD TASK ", uploadTask);
        let nowLoading = setInterval(() => {
          let uploading =
            (uploadTask.snapshot.bytesTransferred /
              uploadTask.snapshot.totalBytes) *
            100;
          console.log(
            `${Math.floor(
              uploading
            )}% at ${new Date().getHours()}:${new Date().getMinutes()}`
          );
        }, 100);

        if (uploadTask.snapshot.state === "error") {
          clearInterval(nowLoading);
          let errorMessage = `an error occurred while uploading - file was ${(uploadTask
            .snapshot.bytesTransferred /
            uploadTask.snapshot.totalBytes) *
            100}% done - Please upload again`;
          console.log(errorMessage);
        }

        uploadTask.then(() => {
          console.log(
            `Upload is ${(uploadTask.snapshot.bytesTransferred /
              uploadTask.snapshot.totalBytes) *
              100}% done`
          );
          console.log("the final upload task", uploadTask.snapshot);
          let uploading = `Upload is ${(uploadTask.snapshot.bytesTransferred /
            uploadTask.snapshot.totalBytes) *
            100}% done`;
          clearInterval(nowLoading);

          console.log(uploading);

          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function(downloadURL) {
              rest.artwork = downloadURL;
              //TODO: WORK HERE

              db.doc(id)
                .update(rest)
                .then(data => {
                  resolve(data);
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        });
      } else {
        if (typeof artwork === "string") {
          rest.artwork = artwork;
        }
        db.doc(id)
          .update(rest)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  }
}
