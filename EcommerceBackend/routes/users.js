const express = require("express");
const Users = require("../models/usersModel");
const router = express.Router();


async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  try {
    const user = await Users.findById(token).lean();
    req.claims = user;
    next();
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}
// Listing single user details using the unique id int the token of the user - profile
router.post("/register", async (req, res) => {
  try {
    const users = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const userData = await Users.find({ email: req.body.email });
    let user = userData[0];
    if (user != null) {
      res.status(400).send({ status: false, result: "Email already in use" });
    } else {
      const u1 = await users.save();
      res.status(200).send({ status: true, result: u1 });
    }
  } catch (error) {
    res.status(400).send({ status: false, result: error });
  }

});

router.post("/login", async (req, res) => {
  try {
    const userData = await Users.find({
      "email": req.body.email,
      "password": req.body.password,
    });
    if (userData.length == 0) {
      return res.status(400).send({ status: false, result: "Email or password incorrect" });

    }
    res.status(200).send({ status: true, result: userData });

  } catch (error) {
    res.status(404).send({ status: false, result: error });
  }
});

router.get("/profile", authenticateToken, async (req, res) => {

  try {
    const user = await Users.findById(req.claims._id);
    if (user == null) {
      res.status(400).send("Users does not exist");
    } else {
      res.status(200).send({ status: true, result: user });
    }

  } catch (error) {
    res.status(404).send({ status: false, result: error })
  }
});

router.get("/getuser", async (req, res) => {
  try {

    const uid = (req.body.id);
    const users = await Users.findById(uid);
    if (users != "null") {
      return res.status(200).send({ status: true, result: users })
    }
    res.status(404).send({ status: false, result: "Not found" })
  } catch (error) {
    res.status(404).send({ status: false, result: error });
  }
})


// update profile api
router.patch("/profile/passwordupdate", authenticateToken, async (req, res) => {
  const user = await Users.findById(req.claims._id);
  if (user != null) {
    const password = req.body.password;
    console.log(password)
    if (password === user.password) {
      return res.status(403).send("Old password and new password cannot be same!")
    }
    if (password != null) {
      user.password = password;
    }
  } else {
    res.status(404).send("User not found");
    return;
  }
  const u1 = await user.save();
  res.send("Password updated");
});

//admin login api
router.post("/adminlogin", async (req, res) => {
  try {
    let result;
    const userData = await Users.find({
      "email": req.body.email,
      "password": req.body.password,
      "role": "admin"
    });
    if (userData.length > 0) {
      result = userData;
      return res.status(200).send({ status: true, result: result });
    } else {
      return res.status(400).send({ status: false, result: "User not found" });
    }
  } catch (error) {
    res.status(404).send({ status: false, result: error });
  }
});

module.exports = router;
