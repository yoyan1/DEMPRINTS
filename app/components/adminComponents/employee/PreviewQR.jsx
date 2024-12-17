import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { FaDownload } from 'react-icons/fa';

import QRCode from 'react-qr-code';
import { FaPrint } from "react-icons/fa6";
import html2canvas from 'html2canvas';

export default function QRcodescann({user}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const qrRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const downloadQR = async () => {
    setLoading(true);
    const qr = qrRef.current;
    await html2canvas(qr).then((canvas) => {
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${user.name}-QR-staff.png`;

        link.click();
      }, 'image/png');
    });
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Button isIconOnly color="primary" variant='light' onPress={onOpen}><FaPrint className="h-5 w-5"/></Button>
      <Modal isOpen={isOpen} size="sm" onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody
                ref={qrRef}
                className="flex justify-center items-center"
              >
                <div className="text-center p-3 border">
                  <QRCode value={user.id} />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  className='bg-blue-950 text-white'
                  onClick={downloadQR}
                  isLoading={loading}
                >
                  <FaDownload /> download
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
