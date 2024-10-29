import axios from 'axios';

export const UploadImage = async(data) => {
    const formData = new FormData();
    formData.append('image', data); 

    try {
      const response = await axios.post('http://localhost:5000/api/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file', error);
    }
}