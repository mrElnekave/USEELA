import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, Container, Typography, TextField} from '@mui/material';
import axios from "axios";                    

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault(); 
		try {
            const response = await axios.post("/api/user_info/signup/", {email, password})
			//console.log("Response: ", response.data);
            if (response){
                localStorage.setItem('userobj', JSON.stringify({response}));   
                navigate('/home');
            }
        }
        catch(error){
            alert("Failed to Create User");
            console.log(error);
        }
    }

    return (
        <Container clssName='Sign Up' sx={{
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
			<Typography variant='h6' sx={{paddingTop: 5,}} gutterBottom>Sign Up</Typography>
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
			<Link to="/login">Already have an account? Sign in</Link>
		</Box>
		</Container>
    );
}
