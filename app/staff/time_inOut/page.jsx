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
import { getDateAndTime } from '../../composables/dateAndTime';
import { formatDate, formatTime } from '../../composables/formateDateAndTime';
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/app/utils/decodeToken';
import Scann from '../component/scann';
import QRcodescann from '../component/QRcode';
import axios from 'axios';
export default function HRIS() {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', id: '', role: '' });

  const [timeinOut, setTimeinOut] = useState([]);
  const [remarks, setRemarks] = useState([]);

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
    const requiredHours = 480;

    timeinOut.map((data) => {
      const { totalWorked, overtime } = calculateOvertime(
        data.timein,
        data.timeout,
        '8:00:00',
      );

      const timeToMinutes = (time) => {
        const [hours, minutes, seconds = 0] = time.split(':').map(Number);
        return hours * 60 + minutes + seconds / 60;
      };

      // const overtimeMinutes = timeToMinutes(overtime);
      const totalWorkedMinutes = timeToMinutes(totalWorked);

      const remark =
        totalWorkedMinutes > requiredHours ? 'OVERTIME' : 'UNDERTIME';

      const [hours, minutes] = totalWorked.split(':');

      const timeCounted = `${hours}hr : ${minutes}mins`;
      const adjustedHours = hours - 1;
      const totalHours = `${adjustedHours}hr : ${minutes}mins`;

      newData.push({
        ...data,
        remark: remark,
        totalHours: totalHours,
        timeCounted: timeCounted,
        overtime: overtime,
      });
    });

    return newData;
  }, [timeinOut]);

  const { date, time } = getDateAndTime();

  return (
    <>
      {/* <div className="justify-start w-full mb-3 border border-gray-200 rounded-lg shadow">
        <div className="w-full   bg-white  dark:bg-gray-800 dark:border-gray-700">
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
      </div> */}

      <div className=" card w-full mb-6 bg-gradient-to-r from-blue-900 to-blue-500 dark:bg-gray-800 rounded-lg shadow p-3">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              className="w-12 h-12 rounded-full shadow-lg"
              src="/male-avatar.png"
              alt="User Avatar"
            />
            <div>
              <p className="text-white text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-300">{user.role}</p>
            </div>
          </div>
          <div>
            <Scann
              onSucess={getTimeInOutData}
              className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-blue-700 font-medium hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            />
          </div>
        </div>

      
        <div className="mt-4 space-y-4">
          {employeeRecords
            .filter((record) => record.date === date)
            .map((current) => (
              <div
                key={current.id}
                className="bg-white flex justify-between rounded-lg shadow-md p-4 "
              >
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Date:</span>{' '}
                  {formatDate(current.date)}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Time-in:</span>{' '}
                  {formatTime(current.timein)}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Time-out:</span>{' '}
                  {formatTime(current.timeout)}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Overtime:</span>{' '}
                  {current.overtime}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Time Counted:</span>{' '}
                  {current.timeCounted}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Time-rendered:</span>{' '}
                  {current.totalHours}
                </p>
              </div>
            ))}
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
          <TableColumn>Hours Rendered </TableColumn>
          <TableColumn>Time Counted </TableColumn>
          <TableColumn>Remarks</TableColumn>
        </TableHeader>
        <TableBody>
          {employeeRecords.map((timeinout) => (
            <TableRow key={timeinout.id}>
              <TableCell className="text-black dark:text-white">
                {formatDate(timeinout.date)}
              </TableCell>
              <TableCell className="text-black dark:text-white">
                {formatTime(timeinout.timein)}
              </TableCell>
              <TableCell className="text-black dark:text-white">
                {formatTime(timeinout.timeout)}
              </TableCell>
              <TableCell className="text-black dark:text-white">
                {timeinout.overtime}
              </TableCell>
              <TableCell className="text-black dark:text-white">
                {timeinout.timeCounted}
              </TableCell>
              <TableCell className="text-black dark:text-white">
                {timeinout.totalHours}
              </TableCell>
              <TableCell className="text-black dark:text-white">
                {timeinout.remark}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
