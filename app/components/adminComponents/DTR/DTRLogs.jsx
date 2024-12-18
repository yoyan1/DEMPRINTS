"use client"
import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
const rows = [
    {
        _id: 1,
        date: 'December 16, 2024',
        status: 'Present',
        name: 'Lady Bug',
        time_in: '09: 00 am',
        time_out: '07: 00 pm',
        total: '8 hours and 20 min',
        overtime_status: 'accepted',
        overtime: '20 min',
        remarks: 'Completed'
    }
];

const columns = [
    { key: "date", label: "DATE",},
    { key: "status", label: "STATUS", },
    { key: "name", label: "NAME", },
    { key: "time_in", label: "TIME IN", },
    { key: "time_out", label: "TIME OUT", },
    { key: "total", label: "HOURS RENDERED", },
    { key: "overtime",label: "OVERTIME",},
    { key: "overtime_status",label: "OVERTIME STATUS",},
    {key: "remarks",label: "REMARKS",},
    {key: "action",label: "ACTION",},
  ];

export default function DTRLogs() {

    const renderCell = React.useCallback((Item, columnKey) => {
            const cellValue = Item[columnKey];
        
            switch (columnKey) {
                case "date":
                    return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize text-gray-600">{cellValue}</p>
                    </div>
                    );
                case "status":
                    return (
                    <div className="flex flex-col">
                        <p className="font-bold text-small text-green-600">{cellValue}</p>
                    </div>
                    );
                case "time_in":
                    return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize text-gray-600">{cellValue}</p>
                    </div>
                    );
                case "time_out":
                    return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize text-gray-600">{cellValue}</p>
                    </div>
                    );
                case "total":
                    return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize text-gray-600">{cellValue}</p>
                    </div>
                    );
                case "overtime":
                    return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize text-gray-600">{cellValue}</p>
                    </div>
                    );
                default:
                    return cellValue;
            }
          }, []);
  return (
    <div>
        <div className='p-5 py-3 bg-blue-900 text-white'>
            Daily Time Records
        </div>
        <div>
            <Table aria-label="Example table with dynamic content" removeWrapper>
            <TableHeader>
                {columns.map((column) =>
                <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody>
                {rows.map((row) =>
                <TableRow key={row._id}>
                    {(columnKey) => <TableCell>{renderCell(row, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
    </div>
  );
}