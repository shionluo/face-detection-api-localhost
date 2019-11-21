const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const authorization = require("./controllers/authorization");

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

//-- Register --//
app.post("/register", register.handleRegister(db, bcrypt));

//-- Signin --//
app.post("/signin", signin.signinAuthentication(db, bcrypt));

//-- Profile --//
app.get("/profile/:id", authorization.requireAuth, profile.handleProfile(db));

app.put(
  "/profile/:id",
  authorization.requireAuth,
  profile.handleProfileUpdate(db)
);

//-- Image --//
app.put("/image", authorization.requireAuth, image.handleImage(db));

app.post("/imageurl", authorization.requireAuth, image.handleApiCall());
