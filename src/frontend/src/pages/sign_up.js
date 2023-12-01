import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"                             

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault(); 
		try {
            const response = await axios.post("/api/user_info/signup/", {email, password})
			console.log("Response: ", response.data);
            if (response){
                navigate('/', {state:{id:email}})
            }
        }
        catch(error){
            alert("Failed to Create User");
            console.log(error);
        }
    }

    return (
        <div className="Sign Up">
            <h1>UCLA GEOGUESSER</h1>
            <h2>Sign Up</h2>
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
            <Link to="/login">Login Here</Link> 
        </div>
    );
}
