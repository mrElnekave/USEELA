import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Card, CardContent, Typography, TextField, CardActionArea } from '@mui/material';

const LookForQuiz = () => {

  const searchQuizByName = (searchTerm, gameNames) => {
    // clear search result if the search field is empty
    if (searchTerm === "" || searchTerm === null) {
      setSearchResults([]);
    }
  
    // empty the previous search array if any
    setSearchResults([]);
    let results = [];
  
    // create a regular expression pattern for the search string
    // gi = global case-insensitive
    const pattern = new RegExp(searchTerm, "gi");
  
    gameNames.forEach((game) => {
      const gameName = game.name;
      if (pattern.test(gameName)) {
        console.log(pattern.test(gameName), gameName);

        console.log(game);
        results.push(game);
      }
    });
  
    setSearchResults(results);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [games, setGames] = useState([[{name:"boo", _id:1}]]); // [game1, game2, ...]

  useEffect(() => {
    const fetchGames = async () => {
        console.log("fetching games");
        const gameNames = await fetch('/api/game_info/getGameNames');
        if (gameNames.ok) {
            const data = [];
            console.log("pre");
            console.log(gameNames);
            data.push(
                await gameNames.json()
            );
            console.log("post");
            setGames(data);
            console.log(data);
        } else {
            console.log("error fetching data");
        }
    }
    fetchGames();
  }, []); // empty array means only run once

  
  const handleSearch = () => {
    console.log(`Searching for ${searchTerm}`);
    console.log(games[0]);
    searchQuizByName(searchTerm, games[0]);

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
      <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 2,
    }}>
      <TextField 
        label="Search for a quiz" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" onClick={handleSearch}sx={{
        mt: 1,
        ml: 1,
      }}>Search</Button>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {searchResults.map((game) => { // link to the quiz page with that id and the name
        console.log(game);
          return (
            <Card key={game.id} sx={{
              width: 300,
              height: 200,
              margin: 1,
              bgcolor: '#DAEBFE',
            }}>
              <CardActionArea onClick={() => { window.location.href = `/QuizDisplay/${game.id}`;}} sx={{
                width: 300,
                height: 200,
              }}>
              <CardContent>
              <Typography gutterBottom variant='h6'>{game.name}</Typography>
              <Typography gutterBottom variant='body1'>{game.description}</Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
      
    </Box>
    </Container>
  );
};


export default LookForQuiz;
