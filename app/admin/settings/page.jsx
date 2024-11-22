"use client"
import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/layout'
import { Tabs, Tab, Card, CardBody, Button } from '@nextui-org/react'
import { decodeToken } from '@/app/utils/decodeToken'
import { Spinner } from '@nextui-org/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar'
import { FaRegEye } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbMailbox } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { formatDate } from '@/app/composables/formateDateAndTime'
import ViewImage from '../../components/adminComponents/employee/Image'

export default function settings() {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const [contractImage, setContractImage] = useState()
  const [preEmploymentImage, setPreEmploymentImage] = useState()
  const [certificatesImage, setCertificatesImage] = useState()

  const getImage = async (id) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/images/${id}`, {
      responseType: 'blob',  
      });
      return URL.createObjectURL(response.data);
  }

  const loadImage = async(data) =>{
      const contract =data.contract? await getImage(data.contract) : ''
      setContractImage(contract)
      const pre_employment = data.pre_employment? await getImage(data.pre_employment) : ''
      setPreEmploymentImage(pre_employment)
      const certificates = data.certificates? await getImage(data.certificates) : ''
      setCertificatesImage(certificates)
  }

  useEffect(()=>{
    setLoading(true)
    const loadUser = async () =>{
      const token = localStorage.getItem("token");
      
      if (token) {
        const decode = await decodeToken(token)
        setUser(decode);
        setLoading(false)
        loadImage(decode)

      }
    }
    loadUser()
    console.log(user);
  }, [])

  if(loading){
    return <div className="h-screen flex justify-center items-center"><Spinner/></div>
  }

  if(!loading && user) {
    return (
      <AdminLayout>
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options" isVertical color='primary'>
              <Tab key="profile" title="My Profile">
                <Card>
                  <CardBody>
                    <div className="flex items-center gap-2 border p-4 rounded-md w-full">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="https://github.com/shadcn.p" alt="@shadcn" />
                        </Avatar>
                        <div className="flex-1 flex justify-between">
                            <div>
                                <h3>{user.name}</h3>
                                <h5 className="text-default-400 text-sm">{user.job_title}</h5>
                                <h5 className="text-default-400 text-sm">{user.department}</h5>
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
                                    <span className="text-default-500 text-sm">{user.firstname}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Middle name</h4>
                                    <span className="text-default-500 text-sm">{user.middlename}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Last name</h4>
                                    <span className="text-default-500 text-sm">{user.lastname}</span>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="flex-1">
                                    <h4>Gender</h4>
                                    <span className="text-default-500 text-sm">{user.gender}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Birth Date</h4>
                                    <span className="text-default-500 text-sm">{formatDate(user.birth_date)}</span>
                                </div>
                                <div className="flex-1">
                                    <h4>Age</h4>
                                    <span className="text-default-500 text-sm">{user.age}</span>
                                </div>
                            </div>
                            <div className="w-full border rounded-md p-3">
                                <h3 className="text-md pb-2">Contact details</h3>
                                <div className="flex justify-between">
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <FaPhoneFlip/>
                                        <span className="text-sm text-default-500 pl-2">+63({user.contact_number})</span>
                                    </h3>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <MdEmail/>
                                        <span className="text-sm text-default-500 pl-2">{user.contact_email}</span>
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <TbMailbox/>
                                        <span className="text-sm text-default-500 pl-2">{user.address}</span>
                                    </h3>
                                </div>
                            </div>
                            {/* <div className="w-full border rounded-md p-3">
                                <h3 className="text-md pb-2">Contact Person <span className="text-default-500 text-sm">( father)</span></h3>
                                <div className="flex justify-between">
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <FaUser/>
                                        <span className="text-sm text-default-500 pl-2">{user.contact_person.name}</span>
                                    </h3>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <FaPhoneFlip/>
                                        <span className="text-sm text-default-500 pl-2">+63({user.contact_person.contact_number})</span>
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        <TbMailbox/>
                                        <span className="text-sm text-default-500 pl-2">{user.contact_person.address}</span>
                                    </h3>
                                </div>
                            </div> */}
                            {/* <div className="w-full">
                                <h3 className="text-md pb-2">Mandatory Benefit</h3>
                                <div className="flex justify-between">
                                    <h3 className="flex-1 flex items-center text-sm">
                                        SS No.:
                                        <span className="text-sm text-default-500 pl-2">{user.mandatory_benefit.ss_no}</span>
                                    </h3>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        Pag-ibig No.:
                                        <span className="text-sm text-default-500 pl-2">{user.mandatory_benefit.pab_ibig_no}</span>
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="flex-1 flex items-center text-sm">
                                        Philhealth:
                                        <span className="text-sm text-default-500 pl-2">{user.mandatory_benefit.philhealt}</span>
                                    </h3>
                                </div>
                            </div> */}
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
                                <span className="text-default-500 text-sm">{user.job_title}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm">Department</h4>
                                <span className="text-default-500 text-sm">{user.department}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm">Hire Date</h4>
                                <span className="text-default-500 text-sm">{formatDate(user.hire_date)}</span>
                            </div>
                        </div>
                    </div>
                    {contractImage || preEmploymentImage || certificatesImage?(
                        <div className="border p-4 rounded-md">
                            <span className="mb-2">Compliance and Audit</span>
                            {contractImage? <ViewImage imageUrl={contractImage}/> : null}
                            {preEmploymentImage? <ViewImage imageUrl={preEmploymentImage}/> : null }
                            {certificatesImage? <ViewImage imageUrl={certificatesImage}/> : null}
                        </div>
                    ) : null }
                  <div className="flex flex-col gap-5 w-full">
                  </div>
                  </CardBody>
                </Card>  
              </Tab>
              <Tab key="security" title="Security">
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>  
              </Tab>
            </Tabs>
          </div>
      </AdminLayout>
    )
  }
}
