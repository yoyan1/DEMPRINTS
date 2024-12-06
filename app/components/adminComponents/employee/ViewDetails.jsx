"use client"
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar'
import { FaRegEye } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbMailbox } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { formatDate } from '@/app/composables/formateDateAndTime'
import ViewImage from "./Image";


export default function ViewDetails({data}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const name = data.name.split(" ")

    const [contractImage, setContractImage] = useState()
    const [preEmploymentImage, setPreEmploymentImage] = useState()
    const [certificatesImage, setCertificatesImage] = useState()

    const getImage = async (id) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/images/${id}`, {
        responseType: 'blob',  
        });
        return URL.createObjectURL(response.data);
    }

    const loadImage = async() =>{
        // const contract =data.contract? await getImage(data.contract) : ''
        // setContractImage(contract)
        // const pre_employment = data.pre_employment? await getImage(data.pre_employment) : ''
        // setPreEmploymentImage(pre_employment)
        // const certificates = data.certificates? await getImage(data.certificates) : ''
        // setCertificatesImage(certificates)
    }

    useEffect(()=>{
        loadImage()
    }, [])


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
                    <div className="flex items-center gap-2 border p-4 rounded-xl">
                    <ViewImage imageUrl={data.imageUrl} image={
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={data.imageUrl} alt="@shadcn" />
                            <AvatarFallback>{data.firstname[0]}{data.lastname[0]}</AvatarFallback>
                        </Avatar>}/>
                        <div className="flex-1 flex justify-between">
                            <div>
                                <h3>{data.name}</h3>
                                <h5 className="text-default-400 text-sm">{data.job_title}</h5>
                                <h5 className="text-default-400 text-sm">{data.department}</h5>
                            </div>
                            {/* <Button isIconOnly variant="faded"><BiEditAlt className="h-5 w-5 text-default-400"/></Button> */}
                        </div>
                    </div>
                    <div className="border p-4 rounded-xl">
                        <h3 className="pb-4 text-lg">Personal Information</h3>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex  justify-between w-full">
                                <div className="flex-1">
                                    <h4>First name</h4>
                                    <span className="text-default-500 text-sm">{data.firstname}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Middle name</h4>
                                    <span className="text-default-500 text-sm">{data.middlename}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Last name</h4>
                                    <span className="text-default-500 text-sm">{data.lastname}</span>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="flex-1">
                                    <h4>Gender</h4>
                                    <span className="text-default-500 text-sm">{data.gender}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Birth Date</h4>
                                    <span className="text-default-500 text-sm">{formatDate(data.birth_date)}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Age</h4>
                                    <span className="text-default-500 text-sm">{data.age}</span>
                                </div>
                            </div>
                            <div className="w-full border rounded-xl p-3">
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
                            <div className="w-full border rounded-xl p-3">
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
                                        {data.mandatory_benefit.ss_no? (
                                            <span className="text-sm text-default-500 pl-2">{data.mandatory_benefit.ss_no.slice(0,2)}-{data.mandatory_benefit.ss_no.slice(2,9)}-{data.mandatory_benefit.ss_no.slice(9,10)}</span>
                                        ) : null}
                                    </h3>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        Pag-ibig No.:
                                        {data.mandatory_benefit.pab_ibig_no? (
                                            <span className="text-sm text-default-500 pl-2">{data.mandatory_benefit.pab_ibig_no.slice(0,4)}-{data.mandatory_benefit.pab_ibig_no.slice(4,8)}-{data.mandatory_benefit.pab_ibig_no.slice(8,12)}</span>
                                        ) :null }
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        Philhealth:
                                        {data.mandatory_benefit.philhealth? (
                                            <span className="text-sm text-default-500 pl-2">{data.mandatory_benefit.philhealth.slice(0,2)}-{data.mandatory_benefit.philhealth.slice(2,10)}-{data.mandatory_benefit.philhealth.slice(10,11)}</span>
                                        ): null}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border p-4 rounded-xl">
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
                                <span className="text-default-500 text-sm">{formatDate(data.hire_date)}</span>
                            </div>
                        </div>
                    </div>
                    {contractImage || preEmploymentImage || certificatesImage?(
                        <div className="border p-4 rounded-xl">
                            <span className="mb-2">Compliance and Audit</span>
                            {contractImage? <ViewImage imageUrl={contractImage}/> : null}
                            {preEmploymentImage? <ViewImage imageUrl={preEmploymentImage}/> : null }
                            {certificatesImage? <ViewImage imageUrl={certificatesImage}/> : null}
                        </div>
                    ) : null }
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