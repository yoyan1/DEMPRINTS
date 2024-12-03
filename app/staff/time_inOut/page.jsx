'use client';
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import {
  Card,
  CardHeader,
  Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

import { useRouter } from 'next/navigation';
import { decodeToken } from '@/app/utils/decodeToken';
import ScannMe from '../component/scannMe';
export default function HRIS() {
  const router = useRouter();
  const [user, setUser] = useState({});

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
  return (
    <>
      <div className="border border-gray shadow-sm rounded mb-5  p-1">
        <Card className="max-w-[400px]  item-center">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="/male-avatar.png"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{user.name}</p>
              <p>
               
                {/* <QRCode value={user.id} /> */}
              </p>
              <p className="text-small text-default-500">{user.role}</p>
            </div>
            <div className="flex-col">
              <ScannMe />
            </div>
          </CardHeader>
        </Card>
      </div>

      <Table
        isStriped
        aria-label="Example static collection table "
        color="primary"
      >
        <TableHeader>
          <TableColumn>Date</TableColumn>
          <TableColumn>Time-in</TableColumn>
          <TableColumn>Time-out</TableColumn>
          <TableColumn>Over Time</TableColumn>
          <TableColumn>Total hours</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>December 1, 2024</TableCell>
            <TableCell>8:00AM</TableCell>
            <TableCell>6:00PM</TableCell>
            <TableCell>10:00PM</TableCell>
            <TableCell>10hr 30mins</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>December 1, 2024</TableCell>
            <TableCell>8:00AM</TableCell>
            <TableCell>6:00PM</TableCell>
            <TableCell>10:00PM</TableCell>
            <TableCell>10hr 30mins</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>December 1, 2024</TableCell>
            <TableCell>8:00AM</TableCell>
            <TableCell>6:00PM</TableCell>
            <TableCell>10:00PM</TableCell>
            <TableCell>10hr 30mins</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>December 1, 2024</TableCell>
            <TableCell>8:00AM</TableCell>
            <TableCell>6:00PM</TableCell>
            <TableCell>10:00PM</TableCell>
            <TableCell>10hr 30mins</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
