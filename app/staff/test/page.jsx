'use client'

import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
// import './App.css';

function App() {
  const [scanResult, setScanerResult] = useState(null);

  useEffect(() => {
    const readerElement = document.getElementById('reader');
    if (readerElement) {
      const scanner = new Html5QrcodeScanner(
        'reader',
        {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        },
        false,
      );

      scanner.render(success, error);

      function success(result) {
        scanner.clear();
        setScanerResult(result);
      }
      function error(err) {
        console.warn(err);
      }
    }
  }, []);

  return (
    <>
      <div className="" style={{backgroundColor:'skyblue'}}>
        <h3>Scan QR Code </h3>
        {scanResult ? (
          <div>
            Success: <p>{scanResult}</p>
          </div>
        ) : (
          <div id="reader"></div>
        )}
      </div>
    </>
  );
}

export default App;
