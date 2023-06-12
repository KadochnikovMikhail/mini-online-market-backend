const jwt = require("jsonwebtoken");
const {SEKRET_KEY} = require("../constants");
const BadAuthError = require("../errors/bad-auth-err");

const {NODE_ENV, JWT_SECRET} = process.env;

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new BadAuthError("Необходима авторизация.");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, SEKRET_KEY);
  } catch (err) {
    throw new BadAuthError("Необходима авторизация.");
  }
  req.user = payload;

  return next();
};
