"use client"
import { useState } from 'react';
import { DatePicker } from '@nextui-org/react';

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", `${date.month}/${date.day}/${date.year}`);
  };

  return (
    <div>
      <DatePicker 
        selected={selectedDate} 
        onChange={handleDateChange} 
      />
    </div>
  );
};

export default MyDatePicker;
