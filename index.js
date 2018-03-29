const mongoose = require("mongoose");
const user = require("./models/user");

mongoose.connect("mongodb://admin:admin@ds117859.mlab.com:17859/auth");
