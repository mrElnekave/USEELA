import React from 'react';

const Leaderboard = () => {
  // Replace with actual leaderboard data
  const players = [
    { username: 'Player1', score: 120 },
    { username: 'Player2', score: 110 },
    // more players...
  ];

  return (
    <div style={styles.container}>
      <h2>Leaderboard</h2>
      {players.map((player, index) => (
        <p key={index}>{player.username}: {player.score}</p>
      ))}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  }
};

export default Leaderboard;
