const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = require("../constants");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "Login Failed. Please try again!" });
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, JWT_SECRET, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "You must be logged In" });
		}
		const { _id } = payload;
		User.findById(_id).then((userdata) => {
			req.user = userdata;
			next();
		});
	});
};
