import React, { useState } from 'react';

const LookForQuiz = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Add search functionality here
    console.log(`Searching for ${searchTerm}`);
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
