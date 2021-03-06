const router = require("express").Router();
const User = require("../../../../models/User");
const bcrypt = require("bcryptjs");
const generateHandle = require("../../../../utils/generateHandle");
const toolkit = require("../../../../utils/toolkit");
const inputValidation = require("../../../../utils/inputValidation");
const jwt = require("jsonwebtoken");
const config = require("../../../../config/config");
const passport = require("passport");

router.post("/register", async (req, res) => {
  try {
    const inputErrors = await inputValidation.registration(req.body);
    if (inputErrors) {
      return toolkit.handler(res, 400, inputErrors);
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });
      newUser.handle = await generateHandle(
        newUser.firstName,
        newUser.lastName
      );
      newUser.password = await bcrypt.hashSync(req.body.password, 10);
      const user = await User.findOne({
        email: newUser.email
      });
      if (user) {
        return toolkit.handler(res, 403, "User already exists.");
      } else {
        newUser.save();
        console.log(`${newUser.handle} registered.`);
        return toolkit.handler(res, 200, newUser);
      }
    }
  } catch (error) {
    return toolkit.handler(res, 400, error);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });
  if (user) {
    const match = await bcrypt.compareSync(req.body.password, user.password);
    if (match) {
      const payload = {
        id: user.id,
        email: user.email,
        handle: user.handle,
        type: user.type
      };
      jwt.sign(
        payload,
        config.SECRET_OR_KEY,
        {
          expiresIn: "24h"
        },
        (err, token) => {
          if (err) {
            return toolkit.handler(res, 403, err);
          } else {
            return toolkit.handler(res, 200, {
              success: true,
              timestamp: Date.now(),
              token: `Bearer ${token}`
            });
          }
        }
      );
    } else {
      return toolkit.handler(res, 401, "Invalid password.");
    }
  } else {
    return toolkit.handler(res, 404, "User not found.");
  }
});

router.put(
  "/edit",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
      const inputErrors = await inputValidation.registration(req.body);
      if (inputErrors) {
        return toolkit.handler(res, 400, inputErrors);
      } else {
        (user.firstName = req.body.firstName),
          (user.lastName = req.body.lastName),
          (user.email = req.body.email),
          (user.handle = await generateHandle(user.firstName, user.lastName)),
          (user.password = await bcrypt.hashSync(req.body.password, 10));
        console.log(`${req.user.handle} edited. New handle: ${user.handle}`);
        user.save();
        return toolkit.handler(res, 200, user);
      }
    } else {
      return toolkit.handler(res, 404, "User not found.");
    }
  }
);

router.delete(
  "/delete",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    User.findByIdAndDelete(req.user.id)
      .then(user => {
        if (user) {
          console.log(`${user.handle} deleted.`);
          user.remove();
          return toolkit.handler(res, 200, {
            deleted: true,
            timestamp: Date.now()
          });
        } else {
          return toolkit.handler(res, 404, "User not found.");
        }
      })
      .catch(err => console.error(err));
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const user = {
      id: req.user.id,
      email: req.user.email,
      handle: req.user.handle,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profilePicture: req.user.profilePicture,
      type: req.user.type,
      createdAt: req.user.createdAt
    };
    return toolkit.handler(res, 200, user);
  }
);

module.exports = router;
