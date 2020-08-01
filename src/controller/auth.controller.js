var jwt = require('jsonwebtoken');
const { v4: uuid } = require("uuid");
const saltRounds = 10;
const bcrypt = require('bcrypt');

async function getToken(req, res, next) {
    var token = jwt.sign({ hash: bcrypt.hashSync("caacc371-f0b2-41c1-bc22-24cea003eb40", saltRounds), id: uuid() }, 'b12d2caf-54e5-476c-9ac8-ca9f2173bed5');
    res.status(200).send({ token: token });
}

module.exports = { getToken }