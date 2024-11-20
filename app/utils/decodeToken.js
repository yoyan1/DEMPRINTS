import jwt from 'jsonwebtoken';

export const decodeToken = async (token) => {
  try {
    const decoded = await jwt.decode(token); // Decodes the token without verifying its signature
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
