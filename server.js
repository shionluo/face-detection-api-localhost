const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
});

const app = express();

app.listen(3001, () => {
  console.log(`App is running on port 3001`);
});

app.use(morgan("combined"));
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
