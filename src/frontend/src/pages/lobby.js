import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Lobby = () => {
  const navigate = useNavigate();
  
  const navigateToLookForQuiz = () => {
    navigate('/lookForQuiz');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToLeaderboard = () => {
    navigate('/leaderboard');
  };
  const navigateToImageUpload = () => {
    navigate('/imageUpload');
  };
  const navigateRandomGame = () => {
    navigate('/game');
  };

  return (
    <div>
    <div style={styles.lobby}>
      <h1>Welcome to the Quiz Lobby</h1>
      <button onClick={navigateToLookForQuiz} style={styles.button}>
        Search Quizzes
      </button>
      <button onClick={navigateToProfile} style={styles.button}>
        View Profile
      </button>
      <button onClick={navigateToLeaderboard} style={styles.button}>
        Leaderboard
      </button>
      <button onClick={navigateToImageUpload} style={styles.button}>
        Upload Quiz Image
      </button>
    </div>
    <div style={styles.lobby}>
    <button onClick={navigateRandomGame} style={styles.button}>
        Play any quiz
      </button>
    </div>
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
