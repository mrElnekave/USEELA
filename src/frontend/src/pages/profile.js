import React from 'react';

const Profile = () => {
  // Replace with actual data
  const userData = {
    username: 'User123',
    rank: 5,
    contributedQuizzes: ['Quiz 1', 'Quiz 2']
  };

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      <p>Username: {userData.username}</p>
      <p>Rank: {userData.rank}</p>
      <p>Contributed Quizzes: {userData.contributedQuizzes.join(', ')}</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  }
};

export default Profile;
