import React, { useState } from "react";
import "./login.css";
import Logo from "../../images/logo/signIn.png";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useStateValue } from "../../StateProvider";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [dispatch] = useStateValue();

	const signIn = (e) => {
		e.preventDefault();
		let reqst = {
			email: document.getElementById("loginemail").value,
			password: document.getElementById("loginpassword").value,
		};

		axios.post("/login", reqst).then((resp) => {
			var decoded = jwt_decode(resp.data.token);
			dispatch({
				type: "SET_USER",
				user: {
					name: decoded.user.name,
				},
			});
		});
	};

	return (
		<div className="login">
			<Link to="/">
				<img className="login__logo" src={Logo} alt="Amazon Login Logo" />
			</Link>
			<div className="login__container">
				<h1>Sign-in</h1>
				<form>
					<h5>E-mail</h5>
					<input
						type="text"
						id="loginemail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5>Password</h5>
					<input
						type="password"
						id="loginpassword"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="termsAndCondition">
						<p>Signing-in Policy Goes Here</p>
					</div>
					<button
						type="submit"
						onClick={signIn}
						className="login__signInButton"
					>
						Sign In
					</button>
				</form>
				<h1 className="or">OR</h1>
				<Link to="/Signup">
					<button className="login__registerButton">
						Create your Amazon Account
					</button>
				</Link>
			</div>
		</div>
	);
}

export default Login;
