import React, { useEffect, useState } from 'react';
import { Box, Container, Card, Typography } from '@mui/material';
import image from '../pictures/bruin.png';
import { useParams } from 'react-router-dom';

const Profile = () => {
  // Replace with actual data
  const [userData, setUserData] = useState(null);
  const userId = (useParams().userid);
  const fetchUser = async () => {
    // Call to getUser API
    const response = await fetch(`/api/user_info/${userId}`);
    if (!response.ok) {
        console.log("error fetching data");
        return;
    }
    const data = await response.json();
    setUserData(data);
    console.log(data)
};
useEffect(()=>{
  fetchUser();
}, [userId]);


  return (
    <Container sx={{
      display: 'inline',
    }}>
      <button onClick={() => { window.location.href = '/lobby'; }}>U See LA</button>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      {userData && (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 0.5,
      bgcolor: '#DAEBFE',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
      }}><img src={image} alt='profile picture' style=
      {{ maxWidth: '200px', marginBottom: '15px', WebkitClipPath: 'circle(75px at 50% 50%)', clipPath: 'circle(75px at 50% 50%)', }} /></Box>
      <Typography variant='h4' gutterBottom sx={{fontWeight: 'bold',}}>{userData.email.split("@")[0]}</Typography>
      <Typography variant='h6' gutterBottom>Rank: {userData.rank}</Typography>
      <Typography variant='body1' sx={{mb:5,}}>Contributed Quizzes: {userData.quizzes}</Typography>
    </Card>
      )}
    </Box>
    </Container>
  );
};


export default Profile;
