import React, { useState, useMemo } from 'react';
import { Box, Container, Typography, Button, 
  TableContainer, TableRow, TableCell, TablePagination } from '@mui/material';

function createData(username, score) {
  return {username, score}
}
const Leaderboard = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([0, 10]);
  const rowsPerPage = 10;
  // Replace with actual leaderboard data
  const players = [
    createData('Player1', 120),
    createData('Player1', 110),
    createData('Player1', 120),
    createData('Player1', 110),
    createData('Player1', 120),
    createData('Player1', 110),
    createData('Player1', 120),
    createData('Player1', 110),
    createData('Player1', 120),
    createData('Player1', 110),
    createData('Player1', 120),
    createData('Player1', 110),
    // more players...
  ];

  const changePage = (event, newPage) => {
    setPage(newPage);

    const start = rowsPerPage * newPage;
    const end = rowsPerPage * newPage + rowsPerPage;
    setRows([start, end])
  };


  return (
    <Container sx={{
      display: 'inline',
    }}>
    <button onClick={() => { window.location.href = '/lobby'; }}>U See LA</button>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography variant='h3' color='#2774AE'>Leaderboard</Typography>
      <TableContainer sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        width: 0.5,
        boxShadow: 10,
        borderRadius: 2,
      }}>
      {players.slice(rows[0], rows[1]).map((player, index) => (
        <TableRow component="div" key={index}>
        <TableCell component="div" sx={{

        }}><Typography variant='h4' key={index}>{index+1}</Typography></TableCell>
        <TableCell component="div" align="right" sx={{
          width: 10,
        }}><Typography variant='h5' key={index}>{player.username}</Typography></TableCell>
        <TableCell component="div" align="right" sx={{
          width: 450,
        }}><Typography variant='h6' key={index}>{player.score}</Typography></TableCell>
        </TableRow>
      ))}
      </TableContainer>
      <TablePagination 
      rowsPerPageOptions={[10]}
      component="div"
      count={players.length}
      rowsPerPage={10}
      page={page}
      onPageChange={changePage}
      />
    </Box>
    </Container>
  );
};



export default Leaderboard;
