import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";

export const app = express();

const jsonParser = bodyParser.json();
const upload = multer();

app.use(bodyParser.urlencoded({ extended: false }));

const sleep = async (milliseconds: number): Promise<void> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

app.get("/api/v1/users", function (req, res) {
  res.status(200).json({});
});

app.get("/users", function (req, res) {
  res.status(200).json({});
});

app.get("/api/v1/users/:userId", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.get("/api/v1/users/user-:userId", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.post("/api/v1/users", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.put("/api/v1/users/:userId", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.patch("/api/v1/users/:userId", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.delete("/api/v1/users/:userId", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.head("/api/v1/users/:userId", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.options("/api/v1/users/:userId", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.get("/api/v1/search", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.post("/oauth2/authorize", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.get("/api/v1/posts", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.post("/api/v1/posts", jsonParser, function (req, res) {
  res.status(200).json({});
});

app.post("/api/v1/upload", upload.single("file"), function (req, res) {
  // get fields of form data from `req.body`
  // get files from req.files array
  res.status(200).json({});
});

app.get("/api/v1/download", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./money.png"));
});

app.get("/api/v1/file", upload.any(), function (req, res) {
  res.status(200).json({});
});

app.post("/api/v1/sms", upload.single(), function (req, res) {
  // get fields of form data from `req.body`
  // get files from req.files array
  res.status(200).json({ from: req.body.from, to: req.body.to });
});

app.post("/api/v1/groups", jsonParser, function (req, res) {
  // get fields of form data from `req.body`
  // get files from req.files array
  res.status(200).json({});
});

app.get("/api/v1/interceptor", function (req, res) {
  res.status(200).json(req.query);
});

app.post("/api/v1/interceptor", function (req, res) {
  res.status(200).json(req.body);
});

app.get("/api/v1/forbidden", function (req, res) {
  res.status(403).json("Forbidden");
});

app.get("/api/v1/header", function (req, res) {
  res.status(200).json({ role: req.header("X-Role") });
});

app.post("/api/v1/request-transformer", function (req, res) {
  res.status(200).json({});
});

app.get("/api/v1/response-transformer", function (req, res) {
  res.status(200).json({});
});

app.get("/api/v1/sleep-5000", async function (req, res) {
  await sleep(5000);
  res.status(200).json({});
});

app.get("/api/v1/config", async function (req, res) {
  await sleep(5000);
  res.status(200).json({});
});

app.get("/api/v1/abort", async function (req, res) {
  await sleep(1000);
  res.status(200).json({});
});

app.get("/ping", async function (req, res) {
  res.status(200).json({ result: "pong" });
});

app.post("/graphql", async function (req, res) {
  res.status(200).json({
    data: {
      viewer: {
        name: "nullcc",
        location: "Xiamen China",
      },
      repository: {
        stargazerCount: 45,
        forkCount: 11,
      },
    },
  });
});

app.get("/api/v1/users/:userId/pets", function (req, res) {
  res.status(200).json({});
});

/* app.listen(3000, () => console.log("App is running on port 3000")); */
