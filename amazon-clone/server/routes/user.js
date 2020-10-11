var router = require("express").Router();
var User = require("../models/user");
var passport = require("passport");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
var passportConf = require("../config/passport");
const user = require("../models/user");

router.post("/login", async (req, res, next) => {
	passport.authenticate("local-login", (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error("An error occurred");
				return next(error);
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);
				const body = {
					_id: user._id,
					email: user.email,
					name: user.profile.name,
				};
				const token = jwt.sign({ user: body }, secret.secretKey);
				// console.log(token);
				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.post(
	"/signup",
	passport.authenticate("signup", { session: false }),
	async (req, res, next) => {
		res.redirect("/login", 307);
	},
);

module.exports = router;
