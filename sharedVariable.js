const express = require("express");
const http = require("http").createServer(express());
const io = require("socket.io")(http);

module.exports = { express, http, io };
