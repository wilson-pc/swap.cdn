
"use strict";
const jwt = require("jsonwebtoken");
const status = require("http-status-codes");
const bcrypt = require('bcrypt');

const checkToken = (req, res, next) => {

  let token = req.headers.app_token;

  if (!token) {
    return res.status(status.UNAUTHORIZED).send({
      message: "No hay token proporcionado!",
    });
  }


  jwt.verify(token, "b12d2caf-54e5-476c-9ac8-ca9f2173bed5", (err, decoded) => {
    if (err) {
      return res.status(status.UNAUTHORIZED).send({
        message: "No autorizado!",
      });
    }
    if (!bcrypt.compareSync("caacc371-f0b2-41c1-bc22-24cea003eb40", decoded.hash)) {
      return res.status(status.UNAUTHORIZED).send({
        message: "No autorizado!",
      });
    }
    req.user = decoded;
    next();
    return;
  });
};
module.exports = { checkToken }  