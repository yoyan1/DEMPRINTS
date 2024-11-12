"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/button';

export default function UserList () {
  const [imageUrl, setImageUrl] = useState()

  const getImage = async () => {
    const response = await axios.get('http://localhost:5000/api/users/images/6732c73e89f917d12bb244c3', {
      responseType: 'blob',  
    });
    return URL.createObjectURL(response.data);
  }

  const loadImage = async() =>{
    const contractImage = await getImage()
    setImageUrl(contractImage)
  }

  useEffect(()=>{
    loadImage()
  }, [])

  return (
    <div>
      <img src={imageUrl}/>
      <Button onClick={getImage}>get</Button>
    </div>
  );
};

