const jwt = require("jsonwebtoken");
require("dotenv").config();
exports = {};

exports.getToken = (email, user) => {
    const token = jwt.sign({email, identifier: user._id}, process.env.JWT_SECRET);
    return token;
};

module.exports = exports;