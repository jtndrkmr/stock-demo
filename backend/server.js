const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const CONFIG = require("./configuration").get(process.env.NODE_ENV); // get config stuff..

// store csv in db
const { storeDataCsvToDb } = require("./csv");

// initialize server...
const server = http.createServer(app);
app.use(cors());
app.use(express.json())

// import routes
const routes = require("./routes");
app.use(routes);
// socket connection
const io = require("./socket").io;
io.listen(server, {
  cors: {
    origin: "http://localhost:4200",
  }
});


// listening server on 3000
server.listen(3000);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  console.log("Error occuring on listening server");
}

function onListening() {
  // mongoose connection here...
  const uri = CONFIG.database.url;
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  const connection = mongoose.connection;
  connection.once("open", function () {
    console.log("Database connection established successfully!");
    console.log("Server listening on port no 3000");
    storeDataCsvToDb();
  });
}
