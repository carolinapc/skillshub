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
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

//allow cors
app.use(cors(corsOptions));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : `${__dirname}/public/images/uploads/tmp/`
}));

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true
}));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(express.static("client/build/images/uploads"));
}

app.use(express.static("client/public/images/uploads"));  

// API routes
app.use(routes);

// Send every other request to the React app
// Any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const server = http.createServer(app);
const io = socketIO(server);

// socket
io.on("connect", socket => {

  //CHAT: when user send a msg
  socket.on("chat_msg_sent", contactMsg => {
    //broadcast the message for the contact chat
    io.emit("chat_msg_received", contactMsg);

    io.emit("chat_notification", contactMsg);
  });

  //CONTACT: when a contact is created
  socket.on("new_contact_created", msg => {
    io.emit("new_contact_notification", msg);
  });

  //CONTACT: when a contact is removed
  socket.on("remove_contact", msg => {
    io.emit("contact_removed", msg);
  });

  //CONTACT: when a contact is updated
  socket.on("update_contact", msg => {
    io.emit("contact_updated", msg);
  });

});

function runServer() {
  server.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
}

let syncOptions = { force: false };

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