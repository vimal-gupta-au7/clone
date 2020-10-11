var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// var ejs = require('ejs');
var engine = require("ejs-mate");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("express-flash");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");
var cors = require("cors");

var secret = require("./config/secret");
var User = require("./models/user");
var Category = require("./models/category");

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(secret.database, { useMongoClient: true }, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to the database");
	}
});

//Middleware
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: secret.secretKey,
		store: new MongoStore({
			url: secret.database,
			autoReconnect: true,
		}),
	}),
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
	res.locals.user = req.user;
	next();
});

app.use(function (req, res, next) {
	Category.find({}, function (err, categories) {
		if (err) return next(err);
		res.locals.categories = categories;
		next();
	});
});

//register routes
var mainRoutes = require("./routes/main");
var userRoutes = require("./routes/user");
var adminRoutes = require("./routes/admin");
var apiRoutes = require("./api/api");

app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use("/api", apiRoutes);

app.use(cors());
// app.use(function (req, res, next) {

// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Credentials", "true");
// 	res.setHeader("Access-Control-Max-Age", "1800");
// 	res.setHeader("Access-Control-Allow-Headers", "content-type");
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"PUT, POST, GET, DELETE, PATCH, OPTIONS",
// 	);
	
	// res.header("Access-Control-Allow-Origin", "*");
	// res.header(
	// 	"Access-Control-Allow-Headers",
	// 	", X-Requested-With, Content-Type, Accept",
	// );
	// res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
	// next();
// });

//start server
app.listen(secret.port, function (err) {
	if (err) throw err;
	console.log("Server is Running at port: " + secret.port);
});
