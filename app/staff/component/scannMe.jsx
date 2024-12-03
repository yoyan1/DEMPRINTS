import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { RiQrScanLine } from 'react-icons/ri';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function ScannMe() {
  const [scanResult, setScanResult] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
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

        scanner.render(handleScanSuccess, handleScanError);

        return () => {
          scanner
            .clear()
            .catch((error) => console.error('Failed to clear scanner', error));
        };
      }
    }
  }, [isOpen]);

  const handleScanSuccess = (result) => {
    setScanResult(result);
  };

  const handleScanError = (error) => {
    console.warn('QR Code Scan Error:', error);
  };

  return (
    <>
      <Button
        className=""
        onPress={onOpen}
        color="transparent"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <RiQrScanLine className="h-6 w-6 mr-2" color="primary" />
      </Button>
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h2>QR Code Scanner</h2>
              </ModalHeader>
              <ModalBody>
                <div
                  className="flex flex-col items-center gap-4"
                  style={{
                    backgroundColor: '#f0f4f8',
                    padding: '20px',
                    borderRadius: '10px',
                  }}
                >
                  {scanResult ? (
                    <div className="text-center">
                      <h3 className="text-green-600 font-semibold">
                        Scan Successful!
                      </h3>
                      <p>{scanResult}</p>
                    </div>
                  ) : (
                    <div
                      id="reader"
                      style={{
                        width: '100%',
                        maxWidth: '300px',
                        height: '250px',
                      }}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                {scanResult && (
                  <Button
                    color="primary"
                    onPress={() => {
                      alert(`Signed in with result: ${scanResult}`);
                      onClose();
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
