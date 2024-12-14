'use client';
import React, { useState, useEffect, useMemo } from 'react';
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
    getTimeInOutData();

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

  const getTimeInOutData = async () => {
    try {
      const responseTimeInOut = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/collection/getHRIStimeinOut`,
      );

      let descending = responseTimeInOut.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setTimeinOut(descending);
      console.log('hahay kapoi', descending);
    } catch (error) {
      console.log('Failed to fetch', error);
    }
  };

  function calculateOvertime(timeIn, timeOut, requiredHours) {
    function timeToSeconds(time) {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }

    const timeInSeconds = timeToSeconds(timeIn);
    const timeOutSeconds = timeToSeconds(timeOut);

    let totalWorkedSeconds = timeOutSeconds - timeInSeconds;

    if (totalWorkedSeconds < 0) {
      totalWorkedSeconds += 24 * 3600;
    }

    const totalWorkedHours = Math.floor(totalWorkedSeconds / 3600);
    const totalWorkedMinutes = Math.floor((totalWorkedSeconds % 3600) / 60);
    const totalWorkedSecondsFinal = totalWorkedSeconds % 60;

    const requiredSeconds = timeToSeconds(requiredHours);

    const overtimeSeconds = totalWorkedSeconds - requiredSeconds;

    let overtimeHours = 0,
      overtimeMinutes = 0,
      overtimeSecondsFinal = 0;
    if (overtimeSeconds > 0) {
      overtimeHours = Math.floor(overtimeSeconds / 3600);
      overtimeMinutes = Math.floor((overtimeSeconds % 3600) / 60);
      overtimeSecondsFinal = overtimeSeconds % 60;
    }

    return {
      totalWorked: `${totalWorkedHours}:${totalWorkedMinutes}:${totalWorkedSecondsFinal}`,
      overtime: `${overtimeHours}:${overtimeMinutes}:${overtimeSecondsFinal}`,
    };
  }

  
  const employeeRecords = useMemo(() => {
    let newData = [];

    timeinOut.map((data) => {
      const { totalWorked, overtime } = calculateOvertime(
        data.timein,
        data.timeout,
        '8:00:00',
      );

      const [hours, minutes] = totalWorked.split(':');
      const totalHours = `${hours}hr : ${minutes}mins`;


      newData.push({ ...data, totalHours: totalHours, overtime: overtime });
    });

    return newData;
  }, [timeinOut]);

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
                onSucess={getTimeInOutData}
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
          {employeeRecords.map((timeinout) => (
            <TableRow key={timeinout.id}>
              <TableCell>{timeinout.date}</TableCell>
              <TableCell>{timeinout.timein}</TableCell>
              <TableCell>{timeinout.timeout}</TableCell>
              <TableCell>{timeinout.overtime}</TableCell>
              <TableCell>{timeinout.totalHours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
