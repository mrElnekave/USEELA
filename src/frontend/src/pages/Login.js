import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, Container, Typography, TextField} from '@mui/material';
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    
    useEffect(() => {
		    const userToken = localStorage.getItem('userobj');
        if (userToken){
            navigate('/home');
        }
	  }, [navigate]);

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
            
        }
        catch (error){
            console.log(error);
            setEmailValue('');
            setPasswordValue('');
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
                <TextField type="email" value={emailValue} onChange={(e) => { setEmail(e.target.value); setEmailValue(e.target.value) }} 
                label="Email" 
                required 
                fullWidth
                sx={{
                    mt: 1,
                }}/>
                <TextField type="password" value={passwordValue} onChange={(e) => { setPassword(e.target.value); setPasswordValue(e.target.value) }} 
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