import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUpload() {
  const [files, setFiles] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles);
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
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
      const data = await response.json();
      console.log('File uploaded successfully:', data);

      // 更新状态，存储从服务器返回的图片信息
      if (data.images) {
        setUploadedImages(data.images);
      }

      reset(); 
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const reset = () => {
    setFiles([]);
    setQuizName('');
    setQuizDescription('');
  };
  
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Quiz Name:
              <input 
                type="text" 
                value={quizName} 
                onChange={(e) => setQuizName(e.target.value)} 
              />
            </label>
          </div>
          <div>
            <label>
              Quiz Description:
              <textarea 
                value={quizDescription} 
                onChange={(e) => setQuizDescription(e.target.value)} 
              />
            </label>
          </div>
          <div {...getRootProps()} className="upload-button">
            <input {...getInputProps()} />
            <p>Drag & drop some images here, or click to select images</p>
          </div>
          <button type="submit" disabled={files.length === 0}>Upload</button>
        </form>
        <div>
        {uploadedImages.map((image, index) => (
          <img key={index} src={image.url} alt={`Uploaded ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;