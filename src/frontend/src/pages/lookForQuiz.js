import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';
import SearchResults from '../providers/SearchResults.js'

const LookForQuiz = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const data = useNavigate()
  const [gameImages, setGameImages] = useState(["testPics/pic1.jpeg"]); // an array with image paths
  const [gameAnswers, setGameAnswers] = useState([{lat: 45.464664, lon: 9.188540}]);
  const [names, setNames] = useState(['quiz name'])
  const handleSearch = () => {
    // Here's the function to tell backend the name to search and fetch names from backend
    // TODO: We need to know the backend function we should call
    console.log(`Searching for ${searchTerm}`);
    const n = searchTerm;
    setNames(n);
    // TODO: need to set the name of the quizzes that we get from database
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: 8,
      marginBottom: 2,
    }}>
      <TextField
        label="Search for a quiz" 
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}
      sx={{
        mt: 1,
        ml: 1,
      }}
      >Search</Button>
    </Box>
    <SearchResults results={names}/>
    </Box>
  );
};

export default LookForQuiz;
