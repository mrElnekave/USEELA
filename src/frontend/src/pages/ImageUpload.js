import React, { useState } from 'react';
import { Box, Container, Button, Typography, TextField, Input, Card, CardActionArea } from '@mui/material';
import { useDropzone } from 'react-dropzone';

function ImageUpload() {
  const [files, setFiles] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles);
      console.log(files);
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true); // loading animation
    const formData = new FormData();
    files.forEach(file => {
        formData.append('photos', file);
    });
    formData.append('name', quizName);
    formData.append('description', quizDescription);

    try {
        const response = await fetch('/api/game_info/', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }
        const data = await response.json();
        if (data.images) {
            setUploadedImages(data.images);
        }

        const userObj = JSON.parse(localStorage.getItem('userobj'));
            const userId = userObj.response.data._id;
            const userQuiz = userObj.response.data.quizzes;
            userQuiz.push(quizName);
            userObj.response.data.quizzes = userQuiz;
            localStorage.setItem('userobj', JSON.stringify(userObj));
            console.log(userObj);
            fetch(`/api/user_info/${userId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({quizzes: userQuiz})
            })
            .then(response=>response.json())
            .then(data=> {console.log("Success: " + data);})
            .catch(error => {console.error('Error: ', error);});
        // console.log("File uploaded successfully");
        reset();
    } catch (error) {
        console.error('Error uploading file:', error);
        alert(error.message);
    } finally {
        setIsLoading(false); //end animation
    }
};


  const reset = () => {
    setFiles([]);
    setQuizName('');
    setQuizDescription('');
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
        <form onSubmit={handleSubmit}>
          <Box>
              <Typography variant='h6' sx={{color: '#2774AE', mb: 1}}>Quiz Name: </Typography>
              <TextField 
                label='Enter name'
                value={quizName} 
                onChange={(e) => setQuizName(e.target.value)} 
                variant='outlined'
                sx={{width: '300px'}}
              />
          </Box>
          <Box sx={{
            mt: 1, 
            mb: 1,
          }}>
          <Typography variant='h6' sx={{color: '#2774AE'}}>Quiz Description: </Typography>
              <TextField 
                label='Enter description'
                multiline
                rows={4}
                variant='filled'
                value={quizDescription} 
                onChange={(e) => setQuizDescription(e.target.value)} 
                sx={{width:'300px'}}
              />
          </Box>
          <Card {...getRootProps()} className="upload-button" sx={{
            width: '300px',
            height: '200px',
            borderRadius: 7,
          }}
          >
            <CardActionArea sx={{
            width: '300px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 7,
            bgcolor: '#DAEBFE',
            }}>
            <Typography variant='h6' sx={{fontWeight: 'bold'}}>Drag & drop images here</Typography> 
            <Typography>or click to browse from device</Typography>
            <Input type='file' {...getInputProps()} />
            </CardActionArea>
          </Card>
          <Button type="submit" disabled={files.length === 0 || quizName === ''} variant='contained' sx={{mt: 1,}}>Upload</Button>
        </form>
        {isLoading && <div className="loader"></div>}
            <Box>
                {uploadedImages.map((image, index) => (
                    <img key={index} src={`/api/images/${image.id}`} alt={`Uploaded ${index}`} />
                ))}
            </Box>
        </Box>
      </Container>

  );
};
// img key={index} src={image.url} alt={`Uploaded ${index}`} 

export default ImageUpload;