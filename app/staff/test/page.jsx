'use client'

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const DivToPNG = () => {
  const divRef = useRef(null);

  const downloadDivAsPNG = () => {
    const div = divRef.current;

    // Render the div as a canvas
    html2canvas(div).then((canvas) => {
      // Convert the canvas to a PNG image data URL
      const imageUrl = canvas.toDataURL("image/png");

      // Create an anchor tag to trigger the download
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'div-image.png'; // Name of the downloaded file
      link.click(); // Trigger the download
    });
  };

  return (
    <div>
      <div
        ref={divRef}
        style={{
          width: '500px',
          height: '500px',
          backgroundColor: '#f0f0f0',
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid black',
          fontSize: '20px'
        }}
      >
        <p>Content inside the div</p>
      </div>
      <br />
      <button onClick={downloadDivAsPNG}>Download Div as PNG</button>
    </div>
  );
};

export default DivToPNG;
