"use client";

import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
// import {animals} from "./data";

export default function App() {
  const [tests, setTest] = useState([]);

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    try {
      const response = await axios.get(
        `https://demprints-backend.vercel.app/api/master/getPaymentOptions`
      );
      setTest(response.data)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div className="w-full flex flex-col gap-4  mt-5">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Select size='' className="max-w-xs">
            {tests.map((test) => (
                <SelectItem>{test.name}</SelectItem>
            ))}
        </Select>
      </div>
    </div>
  );
}
