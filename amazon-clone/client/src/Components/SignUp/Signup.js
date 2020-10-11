import React, { useState } from "react";
import "./signup.css";
import loginLogo from "../../images/logo/signIn.png";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useStateValue } from "../../StateProvider";

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [dispatch] = useStateValue();

	const register = (e) => {
		e.preventDefault();
		let reqst = {
			name: document.getElementById("name").value,
			email: document.getElementById("email").value,
			password: document.getElementById("password").value,
		};
		axios.post("/signup", reqst).then((resp) => {
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
				<img className="login__logo" src={loginLogo} alt="Amazon Login Logo" />
			</Link>
			<div className="login__container">
				<h1>Sign-Up</h1>
				<form>
					<h5>Name</h5>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<h5>E-mail</h5>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5>Password</h5>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="termsAndCondition">
						<p>Registering Policy Goes Here</p>
					</div>
					<button
						type="submit"
						onClick={register}
						className="login__registerButton"
					>
						Register
					</button>
					<h1 className="or"> OR </h1>
					<Link to="/login">
						<button className="login__signInButton">Sign in </button>
					</Link>
				</form>
			</div>
		</div>
	);
}

export default Signup;
