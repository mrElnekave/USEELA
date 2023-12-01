import React, { useEffect, useState } from 'react';

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
  const [games, setGames] = useState([{name:"boo", _id:1}]); // [game1, game2, ...]

  useEffect(() => {
    const fetchGames = async () => {
        const gameNames = await fetch('/api/game_info/getGameNames');
        if (gameNames.ok) {
            const data = [];
            data.push(
                await gameNames.json()
            );
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
    <div style={styles.container}>
      <input 
        type="text" 
        placeholder="Search for a quiz" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Search</button>
      <div>
        {searchResults.map((game) => { // link to the quiz page with that id and the name
          return (
            <div>
              <a href={`/QuizDisplay/${game.id}`}>{game.name}</a> <br/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  input: {
    padding: '10px',
    marginRight: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2774AE',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  }
};

export default LookForQuiz;
