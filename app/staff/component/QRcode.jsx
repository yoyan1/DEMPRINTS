import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from '@nextui-org/react';
import { FaDownload } from 'react-icons/fa';
import { IoQrCode } from 'react-icons/io5';

import QRCode from 'react-qr-code';
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/app/utils/decodeToken';
import html2canvas from 'html2canvas';

export default function QRcodescann() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const qrRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState({ name: '', id: '', role: '' });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decode = await decodeToken(token);
        setUser(decode);

        if (user) {
          if (!['staff'].includes(decode.role)) {
            router.replace('/');
            localStorage.removeItem('token');
          }
        }
      } else {
        router.replace('/');
      }
    };

    loadUser();
  }, [router]);

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
      <Button variant="transparent" onPress={onOpen} className="full-rounded">
        <IoQrCode className='h-6 w-6' />
      </Button>
      <Modal isOpen={isOpen} size="sm" onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody
                ref={qrRef}
                className="flex justify-center items-center"
              >
                <div className="text-center p-3 border border-black">
                  <QRCode value={user.id} />
                  <span className="capitalize mt-1 font-semibold text-black dark:text-white block">
                    {user.name}
                  </span>
                  <span className="text-black dark:text-white text-sm block">
                    {user.role}
                  </span>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="success"
                  onClick={downloadQR}
                  isLoading={loading}
                >
                  <FaDownload /> Download QR Code
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
