import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { BiEditAlt } from "react-icons/bi";
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar'
import { CiMail } from "react-icons/ci";

export default function UpdateUser() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} isIconOnly variant='light'><BiEditAlt className='h-5 w-5 text-gray-600'/></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" scrollBehavior='outside'>
        <ModalContent >
          {(onClose) => (
            <>
              <ModalBody>
                <div>
                <Avatar className="w-20 h-20">
                    <AvatarImage src={'/male-avatar.png'} alt="@shadcn" />
                    <AvatarFallback>l</AvatarFallback>
                </Avatar>
                </div>
                <div>
                  <h2>Hansam Beleganio</h2>
                  <span className="text-sm text-slate-400">hansam@gmail.com</span>
                </div><hr />
                <div className='flex gap-5'>
                  <span>Name</span>
                  <Input variant='bordered' radius='sm'/>
                  <Input variant='bordered' radius='sm'/>
                  <Input variant='bordered' radius='sm'/>
                </div><hr />
                <div className='flex gap-5'>
                  <span className='w-full'>Email Address</span>
                  <Input 
                  variant='bordered' 
                  radius='sm' 
                  startContent={
                  <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }/>
                </div><hr />
                <div className='flex gap-5'>
                  <span className='w-full'>ID Number</span>
                  <Input variant='bordered' radius='sm'/>
                </div><hr />
                <div className='flex gap-5'>
                  <span>Profile photo</span>
                  <Avatar className="w-20 h-20">
                      <AvatarImage src={'/male-avatar.png'} alt="@shadcn" />
                      <AvatarFallback>l</AvatarFallback>
                  </Avatar>
                  <Button>Click to replace</Button>
                </div><hr />
                <div>
                  <h3>Job Details</h3>
                </div>
                <div className='flex gap-5'>
                  <span className='w-full'>Job Title</span>
                  <Select placeholder='Job title' defaultSelectedKeys={["job"]}>
                    <SelectItem key="job">Job</SelectItem>
                  </Select>
                </div><hr />
                <div className='flex gap-5'>
                  <span className='w-full'>Department</span>
                  <Select placeholder='Job title' defaultSelectedKeys={["job"]}>
                    <SelectItem key="job">Job</SelectItem>
                  </Select>
                </div><hr />
                <div className='flex gap-5'>
                  <span className='w-full'>Hire Date</span>
                  <Select placeholder='Job title' defaultSelectedKeys={["job"]}>
                    <SelectItem key="job">Job</SelectItem>
                  </Select>
                </div><hr />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}