import React, { useState, useEffect} from 'react';
import { Container, Box, Typography, Button, CssBaseline } from '@mui/material';
import topbanners from '../../src/pictures/topbanner2.avif';

export default function Home() {

  return (
    <>
      <CssBaseline /> {/* 用于确保跨浏览器的一致性，并设置默认背景色 */}
      <Container maxWidth={false} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', padding: 0 }}> {/* 移除最大宽度限制和内边距 */}
        
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            backgroundImage: `url('${topbanners}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            minHeight: '500px',
            alignItems: 'center',
            justifyContent: 'space-between', 
          }}
        >
          <Typography
            variant="h1"
            style={{
              fontFamily: 'Montserrat',
              color: '#FDFDFD',
              textShadow: '3px 2px 3px rgb(22, 82, 240)',
            }}
          >
            U See LA
          </Typography>
        </Box>

        {/* Modals */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1, // 让这个 Box 填满所有可用空间
            padding: '20px 0',
          }}
        >
          <Button variant="contained" color="primary" onClick={() => { window.location.href = '/lobby'; }}>
            Go To Lobby
          </Button>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 0, textAlign: 'center', padding: '5px 0' }}>
          <Typography variant="h2" style={{ fontFamily: 'Montserrat', color: 'white' }}>
            U See LA is a free to play Geoguessr clone.
          </Typography>
          <Typography variant="body1" style={{ fontFamily: 'Montserrat', color: 'white' }}>
            U See LA is an open-source and free to play alternative to the game Geoguessr.
          </Typography>
        </Box>

        {/* Footer */}
        <Box sx={{ backgroundColor: 'black' }}> {/* 用 Box 替代 Paper */}
          <Typography variant="body1" align="center" style={{ fontSize: '1.3em', color: 'white' }}>
            Made with 💖 by Neiro Cabrera, Yamm Elnekave, Rakil Kim, Xiaohan Song, Cixuan Zhang
          </Typography>
        </Box>
      </Container>
    </>
  );
}
