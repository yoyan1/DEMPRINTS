"use client"
import React, {useEffect, useState} from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, Badge} from "@nextui-org/react";
import { IoNotificationsCircle } from "react-icons/io5";
import { FaCodePullRequest } from "react-icons/fa6";
import { useRequestStore } from "@/app/stores/requestStore"
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

export default function Requests() {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const { requestData, fetchRequest, } = useRequestStore()

  useEffect(()=> {
    fetchRequest()
  }, [fetchRequest])

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data, isAccept) => {
    setLoading(true)
    if(isAccept){
      const result = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/users/acceptRequest", {id: data._id, password: data.password});
      console.log(result)
      await axios.delete(process.env.NEXT_PUBLIC_API_URL+"/users/deleteRequests/"+data._id);
    } else{
      await axios.delete(process.env.NEXT_PUBLIC_API_URL+"/users/deleteRequests/"+data._id);
    }

    fetchRequest()
    setLoading(false)
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Badge color="danger" content={requestData.length} isInvisible={Boolean(requestData)} shape="circle">
          <Button 
            variant="light" 
            isIconOnly
          >
            <IoNotificationsCircle className="h-8 w-8"/>
          </Button>
        </Badge>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description" closeOnSelect={false}>
      <DropdownSection title="Notifications" showDivider>
        {requestData.map((row) => (
          <DropdownItem
            key={row.id}
            description="Request changing password"
            startContent={<FaCodePullRequest className={iconClasses} />}
            endContent={
              <div className="flex">
                <Button isIconOnly color="success" isLoading={loading} onPress={() =>onSubmit(row, true)} variant="light">
                  <FaCheck />
                </Button>
                <Button isIconOnly color="danger" isLoading={loading} onPress={() =>onSubmit(row, false)} variant="light">
                  <IoCloseSharp/>
                </Button>
              </div>
            }
          >
            {row.name}
          </DropdownItem>
        ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}