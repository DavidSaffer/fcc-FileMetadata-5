var express = require("express");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Setup storage options
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads"); // specify the folder to store the files
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  console.log("File has been received");
  if (req.file) {
    let response = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    };
    console.log(response);
    res.json(response);
  } else {
    res.status(400).send("No file uploaded.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
