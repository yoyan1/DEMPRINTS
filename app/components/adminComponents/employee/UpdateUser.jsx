"use client"
import React, { useState, useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, useDisclosure, image, Tabs, Tab} from "@nextui-org/react";
import { BiEditAlt } from "react-icons/bi";
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar'
import { CiMail } from "react-icons/ci";
import axios from 'axios';
import { useUserStore } from '../../../stores/userStore';
import { UploadImage } from '@/app/composables/uploadImage'
import ViewImage from './Image';

export default function UpdateUser({user, isUser, refresh}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [ newData, setNewData ] = useState({image: null, ...user})
  const [image, setImages] = useState({
    profile: null,
    contract: null,
    preEmployment: null,
    certificates: null
  })
  const [ jobData, setJobData ] = useState({})
  const {update, loading} = useUserStore()
  const [selected, setSelected] = useState("personal")
  const [contract, setContract] = useState(null)
  const [preEmployment, setPreEmployment] = useState(null)
  const [certificates, setcertificates] = useState(null)
  
  const [isLoading, setLoading] = useState(false)
  const fetchJobData = async () =>{
    setLoading(true)
    const result = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/getJobData')
      if(result.data){
        const data = result.data[0]
        console.log(result.data)
        setJobData({
          id: data._id,
          job_title: data.job_title,
          department: data.department,
          compensation_basis: data.compensation_basis,
          frequency: data.frequency,
        })

      }
  }

  useEffect(() =>{
    const load = async () => {
      await fetchJobData() 
      setLoading(false)
    }

    load()
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target

    setNewData((prevData) => ({...prevData, [name]: value}))
  }


  const handleFileChange = (e) => {
    const {name, value} = e.target
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevData)=> ({
          ...prevData,
          [name]: reader.result
        }))
      };
      reader.readAsDataURL(file); 
    }
  }

  const [loadSubmit, setLoad] = useState(false);

  const upload = async (image) => {
    let imageID;
    if (image !== '') {
      try {
        const result = await UploadImage(image);
        console.log(result);
        imageID = result; 
      } catch (error) {
        console.error(`Error uploading :`, error);
      }
    }
    return imageID;
  };
  
  const onSubmit = async (imageID) => {
    setLoad(true);
    const uploadedImageID = newData.image? await upload(newData.image) : newData.image_id
    const uploadedContractID = contract? await upload(contract) : newData.contract
    const uploadedPreID = preEmployment? await upload(preEmployment): newData.pre_employment
    const uploadedCertID = certificates? await upload(certificates) : newData.certificates
  
    // if (uploadedImageID) {
    const newImageID = {
      image_id: uploadedImageID,
      contract: uploadedContractID,
      pre_employment: uploadedPreID,
      certificates: uploadedCertID,
    }
      const result = await update(user.id, { ...newData, ...newImageID });
      onClose();
      setImages({
        profile: null,
        contract: null,
        preEmployment: null,
        certificates: null
      }); 

      !isUser? refresh("done") : null 
    // }
    setLoad(false); 
  };
  
  return (
    <>
      <Button onPress={onOpen} isIconOnly variant='light'><BiEditAlt className='h-5 w-5 text-gray-600'/></Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior='outside'>
        <ModalContent >
          {() => (
            <>
              <ModalBody>
                <div>
                <Avatar className="w-20 h-20" isLoading={isLoading}>
                  {user.imageUrl? (
                    <ViewImage imageUrl={user.imageUrl} image={<AvatarImage src={user.imageUrl} />}/>
                  ) : (
                    <AvatarImage src={user.gender === 'male'? '/male-avatar.png' : '/female-avatar.png' } />
                  )}
                    <AvatarFallback>l</AvatarFallback>
                </Avatar>
                </div>
                <div>
                  <h2>{user.name}</h2>
                  <span className="text-sm text-slate-400">{user.id_number}</span>
                </div><hr />
                <Tabs
                  fullWidth
                  size="md"
                  aria-label="Tabs form"
                  color="primary"
                  radius="full"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab name="personal" title="Personal Details">
                    <div className='flex flex-col gap-5'>
                      <div className='flex gap-5'>
                        <span>Name</span>
                        <Input variant='bordered' value={newData.firstname} name='firstname' onChange={handleChange}  radius='sm'/>
                        <Input variant='bordered' value={newData.middlename} name='middlename' onChange={handleChange} radius='sm'/>
                        <Input variant='bordered' value={newData.lastname} name='lastname' onChange={handleChange} radius='sm'/>
                      </div><hr />
                      <div className='flex gap-5'>
                        <span className='w-full'>Email Address</span>
                        <Input 
                        variant='bordered' 
                        radius='sm' 
                        value={newData.contact_email}
                        startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }/>
                      </div><hr />
                      <div className='flex gap-5'>
                        <span className='w-full'>ID Number</span>
                        <Input variant='bordered'  value={newData.id_number} name='id_number' onChange={handleChange} radius='sm'/>
                      </div><hr />
                      <div className='flex items-start gap-5'>
                        <span>Profile photo</span>
                        <Avatar className="w-20 h-20">
                          {image.profile? (
                            <ViewImage imageUrl={image.profile} image={<AvatarImage src={image.profile} />}/>
                          ) : user.imageUrl? (
                            <ViewImage imageUrl={user.imageUrl} image={<AvatarImage src={user.imageUrl} />}/>
                          ): (
                            <AvatarImage src={user.gender === 'male'? '/male-avatar.png' : '/female-avatar.png' } />
                          )}
                            <AvatarFallback>l</AvatarFallback>
                        </Avatar>
                        <label for="image" className='p-2 bg-gray-300 rounded-xl '>Click to replace</label>
                        <input type="file" id="image" name='profile' className='hidden' 
                          onChange={(e) => {
                          handleFileChange(e)
                          setNewData((prevData) => ({...prevData, image: e.target.files[0]}))
                          }}/>
                      </div><hr />
                    </div>
                  </Tab>
                  {!isUser? (
                    <Tab name="job" title="Job Details">
                      <div className='flex flex-col gap-5'>
                        <div className='flex gap-5'>
                          <span className='w-full'>Job Title</span>
                          <Select placeholder='Job title' defaultSelectedKeys={[newData.job_title]} isLoading={isLoading} name='job_title' onChange={handleChange}>
                            {jobData.job_title.map((job) => (
                              <SelectItem key={job}>{job}</SelectItem>
                            ))}
                          </Select>
                        </div><hr />
                        <div className='flex gap-5'>
                          <span className='w-full'>Department</span>
                          <Select placeholder='Department' defaultSelectedKeys={[newData.department]} isLoading={isLoading} name='department' onChange={handleChange}>
                            {jobData.department.map((dep) => (
                              <SelectItem key={dep}>{dep}</SelectItem>
                            ))}
                          </Select>
                        </div><hr />
                        <div className='flex gap-5'>
                          <span className='w-full'>Hire Date</span>
                          <Input variant='bordered'  value={newData.hire_date} isDisabled/>
                        </div><hr />
                        <div className='flex gap-5'>
                          <span className='w-full'>Compensation and Benefits</span>
                        </div><hr />
                        <div className='flex gap-5'>
                          <span className='w-full'>Hire Date</span>
                          <Input radius="sm"
                              type="number"
                              placeholder="00.00"
                              label="Wage"
                              name="wage"
                              onChange={handleChange}
                              value={newData.wage}
                              startContent={
                              <div className="pointer-events-none flex items-center">
                                  <span className="text-default-400 text-small">
                                  ₱
                                  </span>
                              </div>
                              }
                          />
                        </div><hr />
                        <div className='flex gap-5'>
                          <span className='w-full'>Compensation Basis</span>
                          <Select placeholder='Basis' defaultSelectedKeys={[newData.basis]} isLoading={isLoading} name='basis' onChange={handleChange}>
                            {jobData.compensation_basis.map(item => (
                              <SelectItem key={item}>{item}</SelectItem>
                            ))}
                          </Select>
                        </div><hr />
                        <div className='flex gap-5'>
                          <span className='w-full'>Frequency</span>
                          <Select placeholder='Frequency' defaultSelectedKeys={[newData.frequency]} isLoading={isLoading} name='frequency' onChange={handleChange}>
                            {jobData.frequency.map(item => (
                              <SelectItem key={item}>{item}</SelectItem>
                              ))}
                          </Select>
                        </div><hr />
                      </div>
                    </Tab>
                  ) : null}
                  <Tab name="attachment" title="Attachment">
                    <div>
                        <span>Legal Compliance and Audit</span>
                        <div className="grid grid-cols-2 gap-4 py-2 pt-3">
                          <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                            <div class="md:flex">
                              <div class="w-full p-3">
                                <div
                                  class="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                                >
                                  <div class="absolute flex flex-col items-center">
                                    {image.contract? (
                                      <img
                                        alt="File Icon"
                                        class="mb-3 w-20 h-20"
                                        src={image.contract}
                                      />
                                    ): newData.contract? (
                                      <img
                                        alt="File Icon"
                                        class="mb-3 w-20 h-20"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/users/images/${newData.contract}`}
                                      />
                                    ) : (
                                      <img
                                        alt="File Icon"
                                        class="mb-3"
                                        src="https://img.icons8.com/dusk/64/000000/file.png"
                                      />
                                    )}
                                    <span class="block text-gray-500 font-semibold"
                                      >Drag &amp; drop your files here</span
                                    >
                                    <span class="block text-gray-400 font-normal mt-1"
                                      >or click to upload contract</span
                                    >
                                  </div>

                                  <input
                                    class="h-full w-full opacity-0 cursor-pointer"
                                    type="file"
                                    name="contract"
                                    onChange={(e)=>{
                                      setContract(e.target.files[0])
                                      handleFileChange(e)
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                            <div class="md:flex">
                              <div class="w-full p-3">
                                <div
                                  class="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                                >
                                  <div class="absolute flex flex-col items-center">
                                    {image.preEmployment? (
                                      <img
                                        alt="File Icon"
                                        class="mb-3 w-20 h-20"
                                        src={image.preEmployment}
                                      />
                                    ): newData.pre_employment? (
                                      <img
                                        alt="File Icon"
                                        class="mb-3 w-20 h-20"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/users/images/${newData.pre_employment}`}
                                      />
                                    ) : (
                                      <img
                                        alt="File Icon"
                                        class="mb-3"
                                        src="https://img.icons8.com/dusk/64/000000/file.png"
                                      />
                                    )}
                                    <span class="block text-gray-500 font-semibold"
                                      >Drag &amp; drop your files here</span
                                    >
                                    <span class="block text-gray-400 font-normal mt-1 text-center"
                                      >or click to upload pre employment</span
                                    >
                                  </div>

                                  <input
                                    class="h-full w-full opacity-0 cursor-pointer"
                                    type="file"
                                    name="preEmployment"
                                    onChange={(e)=>{
                                      setPreEmployment(e.target.files[0])
                                      handleFileChange(e)
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                            <div class="md:flex">
                              <div class="w-full p-3">
                                <div
                                  class="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                                >
                                  <div class="absolute flex flex-col items-center">
                                    {image.certificates? (
                                      <img
                                        alt="File Icon"
                                        class="mb-3 w-20 h-20"
                                        src={image.certificates}
                                      />
                                    ): newData.certificates? (
                                      <img
                                        alt="File Icon"
                                        class="mb-3 w-20 h-20"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/users/images/${newData.certificates}`}
                                      />
                                    ) : (
                                      <img
                                        alt="File Icon"
                                        class="mb-3"
                                        src="https://img.icons8.com/dusk/64/000000/file.png"
                                      />
                                    )}
                                    <span class="block text-gray-500 font-semibold"
                                      >Drag &amp; drop your files here</span
                                    >
                                    <span class="block text-gray-400 font-normal mt-1 text-center"
                                      >or click to upload certificates</span
                                    >
                                  </div>

                                  <input
                                    class="h-full w-full opacity-0 cursor-pointer"
                                    type="file"
                                    name="certificates"
                                    onChange={(e)=>{
                                      setcertificates(e.target.files[0])
                                      handleFileChange(e)
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </Tab>
                  {!isUser? (
                    <Tab name="role" title="System Role">
                      <div className='flex gap-5'>
                        <span className='w-full'>Role</span>
                        <Select placeholder='system role' defaultSelectedKeys={[newData.role]} isLoading={isLoading} name='role' onChange={handleChange}>
                          <SelectItem key="admin">System Admin</SelectItem>
                          <SelectItem key="super admin">Admin</SelectItem>
                          <SelectItem key="staff">Staff</SelectItem>
                        </Select>
                      </div>
                    </Tab>
                  ):null}
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" isLoading={loadSubmit} onPress={onSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}