"use client";
import React, { useState } from 'react';
import axios from 'axios';
// import Toast from '../components/public/toast';

const UploadForm = () => {
  const [contractFiles, setContractFiles] = useState([]);
  const [preEmploymentFiles, setPreEmploymentFiles] = useState([]);
  const [certificateFiles, setCertificateFiles] = useState([]);

  const handleFileChange = (e, setFiles) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    contractFiles.forEach(file => formData.append('contract', file));
    preEmploymentFiles.forEach(file => formData.append('pre_employment', file));
    certificateFiles.forEach(file => formData.append('certificates', file));

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files', error);
    }
  };

  return (
    <div>
      {/* <Toast /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contracts:</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, setContractFiles)} />
        </div>
        <div>
          <label>Pre-Employment:</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, setPreEmploymentFiles)} />
        </div>
        <div>
          <label>Certificates:</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, setCertificateFiles)} />
        </div>
        <button type="submit">Upload</button>
      </form>

      {/* Display an uploaded image (update as needed based on your app) */}
      {/* Example for displaying an uploaded image; you may need to adjust this */}
      <img
        src={'http://localhost:5000/api/users/images/6716bf9c7bcd2c53092090e4'}
        alt="Uploaded"
        style={{ width: '200px', height: '200px' }}
      />
    </div>
  );
};

export default UploadForm;
