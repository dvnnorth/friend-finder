const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const friends = require("/data/friends.js");

friends.push("friendo");

console.log(friends);