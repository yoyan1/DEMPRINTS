"use client"
import React, {useEffect} from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, User} from "@nextui-org/react";
import { IoNotificationsCircle } from "react-icons/io5";
import { FaCodePullRequest } from "react-icons/fa6";
import { useRequestStore } from "@/app/stores/requestStore"
import Action from './Action'

export default function Requests() {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const { requestData, fetchRequest } = useRequestStore()

  useEffect(()=> {
    fetchRequest()
  }, [requestData])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light" 
          isIconOnly
        >
          <IoNotificationsCircle className="h-8 w-8"/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description" closeOnSelect={false}>
      <DropdownSection title="Notifications" showDivider>
        {requestData.map((row) => (
          <DropdownItem
            key={row.id}
            description="Request changing password"
            startContent={<FaCodePullRequest className={iconClasses} />}
            endContent={<Action data={row}/>}
          >
            {row.name}
          </DropdownItem>
        ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}