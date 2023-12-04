import React from 'react';
import { Box, Button, AppBar, Toolbar, Stack, Typography } from '@mui/material';
//import AddIcon from '@mui/icons-material/Add'; // Add icon for the 'Create a quiz' button
import { CssBaseline } from '@mui/material';
import BruinImage from '../pictures/bruin.png';

export default function Lobby() {
  const userObj = JSON.parse(localStorage.getItem('userobj'));
  console.log(userObj);
  const username = userObj.response.data.email.split('@');

  const userId = userObj.response.data._id;
  console.log(userId);

  return (
    <Box sx={{
      height: '100vh',
      background: 'linear-gradient(160deg, #301934 0%, #000000 100%)',
      p: 0
    }}>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Montserrat', color: 'white' }}>
            U See LA
          </Typography>
          <Button onClick={() => { window.location.href = `/profile/${userId}`; }} sx={{ p: 0, color: 'white' }}>
            {username[0]}
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', mx: 'auto', maxWidth: 'lg', p: 3 }}>
        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={4} sx={{ color: 'white', gap: 2 }}>
          <Button variant="contained" size="large" sx={{ color: 'white', justifyContent: 'flex-start', fontSize: '1rem', py: 1.5, width: 200, height: 50 }} onClick={() => { window.location.href = '/lookForQuiz'; }}>Search Quizzes</Button>
          <Button variant="contained" size="large" sx={{ color: 'white', justifyContent: 'flex-start', fontSize: '1rem', py: 1.5, width: 200, height: 50 }} onClick={() => { window.location.href = '/leaderboard'; }}>Leaderboard</Button>
          <Button variant="contained" size="large" sx={{ color: 'white', justifyContent: 'flex-start', fontSize: '1rem', py: 1.5, width: 200, height: 50 }} onClick={() => { window.location.href = '/'; }}>Back to Home</Button>
        </Stack>
        
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h3" sx={{ fontFamily: 'Montserrat', color: 'white', textAlign: 'center', mb: 15 }}>Lobby</Typography>
          {/* Bruin image */}
          <img src={BruinImage} alt="Bruin" style={{ maxWidth: '250px', height: '350px', marginBottom: '30px' }} />
          {/* Play button */}
          <Button variant="contained" size="large" sx={{ width: 300, height: 50, mb: 4 }} onClick={() => { window.location.href = '/game'; }}>
            Quick Play
          </Button>
        </Box>
      </Box>

      {/* Add quiz button at the bottom right */}
      <Box sx={{ position: 'absolute', bottom: 20, right: 20, textAlign: 'center' }}>
        {/* <IconButton size="large" sx={{ mb: 1 }}>
          <AddIcon fontSize="inherit" />
        </IconButton> */}
        <Button variant="contained" onClick={() => { window.location.href = "/imageUpload"; }}>
          Want to create a quiz?
        </Button>
      </Box>
    </Box>
  );
}
