import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button,
  TableContainer, TableRow, TableCell, TablePagination, TableHead, TableBody } from '@mui/material';

function createData(username, score) {
  return {username, score}
}
const Leaderboard = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([0, 10]);
  const rowsPerPage = 10;
  const [allUsers, setAllUsers] = useState([]);
  const fetchAllUsers = async () => {
    // Call to getUser API
    const response = await fetch(`/api/user_info`);
    if (!response.ok) {
        console.log("error fetching data");
        return;
    }
    const data = await response.json();
    setAllUsers(data);
    console.log(data)
};
useEffect(()=>{
  fetchAllUsers();
}, []);

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
      {allUsers && (
      <TableContainer sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#DAEBFE',
      }}>
        <TableHead component="div" sx={{bgcolor: '#005587',}}>
          <TableRow component="div">
            <TableCell component="div" sx={{
              width: 200,
              fontWeight: 'bold',
            }}>RANKING #</TableCell>
            <TableCell component="div" sx={{
              width: 10000,
              fontWeight: 'bold',
            }}>USERNAME</TableCell>
            <TableCell component="div" align='right' sx={{ fontWeight: 'bold',}}>SCORE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody component="div">
      {allUsers.slice(rows[0], rows[1]).map((user, index) => (
        <TableRow component="div" key={index}>
        <TableCell component="div" sx={{width: 480,}}><Typography variant='h5' key={index} sx={{fontWeight: 'bold',}}>{index+1+rows[0]}.</Typography></TableCell>
        <TableCell component="div" sx={{
          width: 10000,
        }}><button id='profile' onClick={() => { window.location.href = `/profile/${user._id}`; }}
         key={index} >{user.email.split('@')[0]}</button></TableCell>
        <TableCell component="div" align='right'><Typography variant='h5' key={index} sx={{
          color: '#2774AE',
          }}>{user.score}</Typography></TableCell>
        </TableRow>
      ))}
      </TableBody>
      </TableContainer>
      )}
      <Box sx={{
        bgcolor: '#DAEBFE',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}>
      <TablePagination 
      rowsPerPageOptions={[10]}
      component="div"
      count={allUsers.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={changePage}
      />
      </Box>
    </Box>
    </Container>
  );
};



export default Leaderboard;
