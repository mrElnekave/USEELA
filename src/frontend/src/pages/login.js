import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, Container, Typography, TextField} from '@mui/material';
import axios from "axios";

function Login() {
    // Check if cookies are enabled, auto go to home
    // Display login, have option to sign up
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user_info/login', {email, password});
            console.log(response);
            if (response){
                localStorage.setItem('userobj', JSON.stringify({response}));
                navigate('/home');
            }
            else {
                alert("Authentication Failed!");
            }
            /*if (response.data === "exist"){
                localStorage.setItem('userobj', JSON.stringify({email, password}));
                navigate('/home');
            }
            else if (response.data === "notexist"){
                alert("Authentication Failed!")
            }*/
        }
        catch (error){
            console.log(error);
        }
    }

    return (
        <Container clssName='login' sx={{
			display: 'inline',
		}}>
		<Typography variant='h5' sx={{
            fontFamily: 'Montserrat',
            ml: 1,
        }}>UCLA GEOGUESSR</Typography>
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		}}>
			<Typography variant='h6' sx={{paddingTop: 5,}} gutterBottom>Sign in</Typography>
			<form action="POST">
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: 400,
				}}>
				<TextField type="email" onChange={(e) => { setEmail(e.target.value) }} 
				label="Email" 
				required 
				fullWidth
				sx={{
					mt: 1,
				}}/>
				<TextField type="password" onChange={(e) => { setPassword(e.target.value) }} 
				label="Password"
				required 
				fullWidth
				sx={{
					mt: 3,
					mb: 5,
				}}/>
				<Button fullWidth variant='contained' type="submit" onClick={submit}>Submit</Button>
				</Box>
			</form>
			<Link to="/signup">Don't have an account? Sign up</Link>
		</Box>
		</Container>
    );
}
export default Login;