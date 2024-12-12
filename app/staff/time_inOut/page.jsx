'use client';
import React, { useState, useEffect } from 'react';
// import QRCode from 'react-qr-code';
import {
  // Card,
  // CardHeader,
  // Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

import { useRouter } from 'next/navigation';
import { decodeToken } from '@/app/utils/decodeToken';
import Scann from '../component/scann';
import QRcodescann from '../component/QRcode';
import axios from 'axios';
export default function HRIS() {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', id: '', role: '' });

  const [timeinOut, setTimeinOut] = useState([]);

  useEffect(() => {
    getimeInOutData();

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

  const getimeInOutData = async () => {
    try {
      const responesTimeInout = await axios.get(
        `http://localhost:5000/api/collection/getTimeinOut`,
      );
      setTimeinOut(responesTimeInout.data);
    } catch (error) {
      console.log('Faild to fetch', error);
    }
  };

  return (
    <>
      <div className="justify-start w-full mb-3 border border-gray-200 rounded-lg shadow">
        <div className="w-full max-w-sm  bg-white  dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-5">
            <img
              className="w-10 h-10 mb-3 rounded-full shadow-lg"
              src="/male-avatar.png"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              {user.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.role}
            </span>
            <div className="flex mt-2 ">
             
              <QRcodescann className="inline-flex items-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
             
              <Scann
                onSucess={getimeInOutData}
                className="bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              />
            </div>
          </div>
        </div>
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
          {timeinOut.map((timeinout) => (
            <TableRow key={timeinout.id}>
              <TableCell>{timeinout.date}</TableCell>
              <TableCell>{timeinout.timein}</TableCell>
              <TableCell>{timeinout.timeout}</TableCell>
              <TableCell>{timeinout.overtime}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
