import "regenerator-runtime/runtime";
import * as functions from "firebase-functions";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({origin: true}));

app.use((req, res, next) => {
  // console.log( "RES", res);
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





exports.mbti = functions.https.onRequest(app);