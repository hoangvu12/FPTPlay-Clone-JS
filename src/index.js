const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const Cache = require("./Cache");

const Route = require("./routers");

app.use(cors());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Routers
Route(app);

app.listen(PORT, () => {
  Cache.execute();
  console.log("Listening at", PORT);
});
