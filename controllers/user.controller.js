const db = require("../models");
const JwtSecret = require("../config/JwtConfigSecret");
const User = db.user;
let brycypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "langu.maluks@gmail.com",
    pass: "ulcbjnnzcjifeypm",
  },
});

exports.create = (req, res) => {
  if (
    !(
      req.body.firstName &&
      req.body.lastName &&
      req.body.email &&
      req.body.cellNumber &&
      req.body.password
    )
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    cellNumber: req.body.cellNumber,
    password: brycypt.hashSync(req.body.password, 10),
    confirmPassword: brycypt.hashSync(req.body.confirmPassword, 10),
  });


   
  const userPromise = user.save(user);

  userPromise
    .then(() => {
      const mailConfigurations = {
        from: "langu.maluks@gmail.com",
        to: req.body.email,
        subject: "Email Verification",
        // This would be the text of email body
        html:
          "<h1>Thank you</h1><br/>" +
          req.body.email +
          `<p>For Signing up with Food Market Online Store <br/><br/>
                 Made with 🖤 From Food Market</p>`,
      };

      transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log("Email Sent Successfully");
        console.log(info);
      });
      console.log({ message: "User successfully created!" });
      res.status(200).send({ message: "User successfully created!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });

  setTimeout(() => {
    userPromise;
  }, 5000);
};

exports.findAll = (req, res) => {
  const firstName = req.query.firstName;
  var condition = firstName
    ? { firstName: { $regex: new RegExp(firstName), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          res.message || "Some error occurred while retrieving all the users.",
      });
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User with id" + id + "not found!" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      err.status(500).send({ message: "Error retrivieing user with id" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update a user with id=${id}. Maybe User was not found!`,
        });
      } else
        res.status(200).send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user with id=" + id });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      } else {
        res.status(200).send({ message: "User was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete user with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.status(200).send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// Signing in with jwt and Bycrypt
exports.signIn = (req, res) => {
  // Find one user by using their email
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // Pass the user password to a variable called dbPass
      let dbPass = user.password;
      // If that user cant be found throw in an error
      if (!user) {
        return res.status(404).send({ message: "Bad Credentials" });
      }
      // Password validation Function
      let passwordIsValid = (userPassword, enteredPassword) => {
        if (enteredPassword === userPassword) {
          return true;
        }
        return false;
      };
      let pass = brycypt.compare(req.body.password, dbPass);
      // If the password entered is not equal to the user of that email password,
      // throw in this
      if (!pass) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password",
        });
      }
      // Create an access token for 24hours
      let token = jwt.sign({ id: user.id }, JwtSecret.secret, {
        expiresIn: 86400,
      });
      res.status(200).send({
        id: user.__id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        cellNumber: user.cellNumber,
        accessToken: token,
      });
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: err.message + "Testing" });
        return;
      }
    });
};
