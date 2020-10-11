var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./../models/user");

// serialize and deserialize
passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id).then(function (user) {
		console.log(user);
		if (user) {
			done(null, user.get());
		} else {
			done(user, null);
		}
	});
});

passport.use(
	"signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			name = req.body.name;
			try {
				// const user = await User.create({ name, email, password });
				var user = new User();
				user.profile.name = user.profile.name = req.body.name;
				user.email = email;
				user.password = password;
				user.profile.picture = user.gravatar();
				user.save();
				return done(null, user);
			} catch (error) {
				done(error);
			}
		},
	),
);

// Middleware
passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			if (email) {
				email = email.toLowerCase();
			}
			try {
				const user = await User.findOne({ email: email });

				if (!user) {
					return done(null, false, { message: "User not found" });
				}

				const validate = await user.comparePassword(password);

				if (!validate) {
					return done(null, false, { message: "Wrong Password" });
				}

				return done(null, user, { message: "Logged in Successfully" });
			} catch (error) {
				return done(error);
			}
			// User.findOne({ email: email }, function (err, user) {
			// 	if (err) return done(err);

			// 	if (!user) {
			// 		console.log("succ2");
			// 		return done(
			// 			null,
			// 			false,
			// 			req.flash("loginMessage", "No user has been found"),
			// 		);
			// 	}

			// 	if (!user.comparePassword(password)) {
			// 		console.log("succ1");
			// 		return done(
			// 			null,
			// 			false,
			// 			req.flash("loginMessage", "Oops! Wrong Password"),
			// 		);
			// 	}
			// 	console.log("succ");
			// 	return done(null, user);
			// }
			// );
		},
	),
);

//custom function to validate
exports.isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};
