import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Lobby = () => {
  const navigate = useNavigate();
  
  const navigateToLookForQuiz = () => {
    navigate('/lookForQuiz');
  };

  return (
    <div style={styles.lobby}>
      <h1>Welcome to the Quiz Lobby</h1>
      <button onClick={navigateToLookForQuiz} style={styles.button}>
        Search Quizzes
      </button>
      <Link to="/profile" style={styles.button}>View Profile</Link>
      <Link to="/leaderboard" style={styles.button}>Leaderboard</Link>
      <Link to="/imageUpload" style={styles.button}>Upload Quiz Image</Link>
    </div>
  );
};

const styles = {
  lobby: {
    textAlign: 'center',
    padding: '20px',
  },
  button: {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  }
};

export default Lobby;
