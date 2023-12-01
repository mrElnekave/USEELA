import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function submit(e) {
		e.preventDefault()
		try {
			const response = await axios.get('/api/user_info/login', {email, password}) 
			if (response.data === "exist"){
				alert("Signed In")
				navigate('/', {state:{id:email}})
			}
			else if (response.data === "notexist"){
				alert("Authentication Failed!")
			}
		}
		catch (error){
			console.log(error);
		}
	}

	return (
		<div className="login">
			<h1>UCLA GEOGUESSER</h1>
			<h2>Log In</h2>
			<form action="POST">
				<input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="" id="" />
				<br/>
				<br/>
				<input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="" id="" />
				<br/>
				<br/>
				<input type="submit" onClick={submit} />
			</form>
			<br />
			<p>OR</p>
			<br />
			<Link to="/sign_up">Sign Up Here</Link>
		</div>
	);
}
