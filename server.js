const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "shionchill",
    password: "",
    database: "face-detection"
  }
});

const app = express();

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json("Tada"));

//-- Signin --//
app.post("/signin", signin.handleSignin(db, bcrypt));

//-- Register --//
app.post("/register", register.handleRegister(db, bcrypt));

//-- Profile --//
app.get("/profile/:id", profile.handleProfile(db));

//-- Image --//
app.put("/image", image.handleImage(db));

app.post("/imageurl", image.handleApiCall());
