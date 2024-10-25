"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbMailbox } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

export default function ViewDetails({data}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const name = data.name.split(" ")
  return (
    <>
      <Button isIconOnly variant="light" onPress={onOpen}><FaRegEye className="text-default-400 h-5 w-5"/></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} size="xl" scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Employee profile</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 border p-4 rounded-md">
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
                        <div className="flex-1 flex justify-between">
                            <div>
                                <h3>{data.name}</h3>
                                <h5 className="text-default-400 text-sm">{data.job_title}</h5>
                                <h5 className="text-default-400 text-sm">{data.department}</h5>
                            </div>
                            <Button isIconOnly variant="faded"><BiEditAlt className="h-5 w-5 text-default-400"/></Button>
                        </div>
                    </div>
                    <div className="border p-4 rounded-md">
                        <h3 className="pb-4 text-lg">Personal Information</h3>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex  justify-between w-full">
                                <div className="flex-1">
                                    <h4>First name</h4>
                                    <span className="text-default-500 text-sm">{name[0]}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Middle name</h4>
                                    <span className="text-default-500 text-sm">{name[1]}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Last name</h4>
                                    <span className="text-default-500 text-sm">{name[2]}</span>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="flex-1">
                                    <h4>Gender</h4>
                                    <span className="text-default-500 text-sm">{data.gender}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Birth Date</h4>
                                    <span className="text-default-500 text-sm">january 1, 2001</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Age</h4>
                                    <span className="text-default-500 text-sm">85</span>
                                </div>
                            </div>
                            <div className="w-full border rounded-md p-3">
                                <h3 className="text-md pb-2">Contact details</h3>
                                <div className="flex justify-between">
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <FaPhoneFlip/>
                                        <span className="text-sm text-default-500 pl-2">+63({data.contact_number})</span>
                                    </h3>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <MdEmail/>
                                        <span className="text-sm text-default-500 pl-2">{data.contact_email}</span>
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <TbMailbox/>
                                        <span className="text-sm text-default-500 pl-2">{data.address}</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="w-full border rounded-md p-3">
                                <h3 className="text-md pb-2">Contact Person <span className="text-default-500 text-sm">( father)</span></h3>
                                <div className="flex justify-between">
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <FaUser/>
                                        <span className="text-sm text-default-500 pl-2">{data.contact_person.name}</span>
                                    </h3>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <FaPhoneFlip/>
                                        <span className="text-sm text-default-500 pl-2">+63({data.contact_person.contact_number})</span>
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <TbMailbox/>
                                        <span className="text-sm text-default-500 pl-2">{data.contact_person.address}</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="text-md pb-2">Mandatory Benefit</h3>
                                <div className="flex justify-between">
                                    <h3 className="flex-1 flex items-center text-sm">
                                        SS No.:
                                        <span className="text-sm text-default-500 pl-2">{data.mandatory_benefit.ss_no}</span>
                                    </h3>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        Pag-ibig No.:
                                        <span className="text-sm text-default-500 pl-2">{data.mandatory_benefit.pab_ibig_no}</span>
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        Philhealth:
                                        <span className="text-sm text-default-500 pl-2">{data.mandatory_benefit.philhealt}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border p-4 rounded-md">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg">Employment Details</h3>
                            <Button isIconOnly variant="light"><BiEditAlt className="h-5 w-5 text-default-400"/></Button>
                        </div>
                        <div className="flex  justify-between w-full">
                            <div className="flex-1">
                                <h4 className="text-sm">Job Title</h4>
                                <span className="text-default-500 text-sm">{data.job_title}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm">Department</h4>
                                <span className="text-default-500 text-sm">{data.department}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm">Hire Date</h4>
                                <span className="text-default-500 text-sm">{data.hire_date}</span>
                            </div>
                        </div>
                    </div>
                </div>
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