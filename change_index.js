const fs = require('fs');
require('dotenv').config();


// Read the HTML file
const filePath = 'src/frontend/public/index.html';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Replace the placeholder with your actual API key
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('No API key found in environment variables. ADD THE .env FILE!');
    return;
  }

  const updatedData = data.replace('key= ', `key=${apiKey}`);

  // Write the updated HTML back to the file
  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    console.log('API key has been added to the HTML file.');
  });
});
