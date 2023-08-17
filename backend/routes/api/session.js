const router = require("express").Router();
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, restoreUser } = require("../../util/auth");
const { User } = require("../../db/models");
const { UnauthorizedError } = require("../../errors");
const { validateLogin } = require("../../middleware");

router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return res.json({ user: safeUser });
  }
  return res.json({ user: null });
});

router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  console.log();
  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new UnauthorizedError(
      "Login failed",
      {
        credential: "the provided credentials were invalid",
      },
      "Invalid credentials"
    );
    return next(err);
  }
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  setTokenCookie(res, safeUser);
  return res.json({
    user: safeUser,
  });
});

router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
