import React from 'react';
import { Box, Container, Card, Typography } from '@mui/material';
import image from '../pictures/bruin.png';

const Profile = () => {
  // Replace with actual data
  const userData = {
    username: 'User123',
    rank: 5,
    contributedQuizzes: ['Quiz 1', 'Quiz 2']
  };

  return (
    <Container sx={{
      display: 'inline',
    }}>
      <button onClick={() => { window.location.href = '/lobby'; }}>U See LA</button>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
    }}>
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
      <Typography variant='h4' gutterBottom sx={{fontWeight: 'bold',}}>{userData.username}</Typography>
      <Typography variant='h6' gutterBottom>Rank: {userData.rank}</Typography>
      <Typography variant='body1' sx={{mb:5,}}>Contributed Quizzes: {userData.contributedQuizzes.join(', ')}</Typography>
    </Card>
    </Box>
    </Container>
  );
};


export default Profile;
