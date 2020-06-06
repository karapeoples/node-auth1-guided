const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session')

const sessionConfig = {
  name:'pecan',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, //<--make sure to change true for production
    httpOnly: true, 
  },
  secret: 'keep it secret, keep it safe',
  resave: false,
  saveUninitialized:true, //Laws require a check with client b4 setting
}

const restricted = require('./auth/restricted-middleware.js')
const usersRouter = require("../users/users-router.js");
const authRouter = require('./auth/auth-router.js')
const server = express();

server.use(helmet(),cors(),express.json(),session(sessionConfig));



server.use("/users", restricted, usersRouter);
server.use('/auth', authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
