import "regenerator-runtime/runtime";
import * as functions from "firebase-functions";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import api from "./api";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(compression());

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ ok: "ALIVE" });
});

const apis = Object.keys(api);
for (let ix = 0; ix < apis.length; ix++) {
  app.use(`/api/${apis[ix]}`, api[apis[ix]]());
}

exports.mbti = functions.https.onRequest(app);