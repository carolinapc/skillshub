const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const express = require("express");
const app = express();
const db = require("./models");
const uploadFolder = require("./config/config").uploadFolder;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : `${uploadFolder}/tmp/`
}));


app.use(session({
  secret: "SkillshubKey",
  resave: true,
  saveUninitialized: true
}));


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
app.use(routes);

// Send every other request to the React app
// Any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

function runServer() {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
}

///GO BACK TO FALSE ONCE IS DONE!!!
let syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  
  if (syncOptions.force) {
    
    //execute the schema changes and the seeds
    let schema = fs.readFileSync("./database/schema.sql", { encoding: "utf8" });
    let seeds = fs.readFileSync("./database/seeds.sql", { encoding: "utf8" });
  
    db.sequelize.query(schema + seeds, { raw: true }).then(() => {
      runServer();
    });
  }
  else {
    runServer();
  }
  
});