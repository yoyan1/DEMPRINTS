"use client"
import React, { useState, useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, useDisclosure, image} from "@nextui-org/react";
import { BiEditAlt } from "react-icons/bi";
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar'
import { CiMail } from "react-icons/ci";
import axios from 'axios';
import { useUserStore } from '../../../stores/userStore';
import { UploadImage } from '@/app/composables/uploadImage'

export default function UpdateUser({user}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [ newData, setNewData ] = useState({image: null, ...user})
  const [image, setImage] = useState(null)
  const [ jobData, setJobData ] = useState({})
  const {update, loading} = useUserStore()

  
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result)
      };
      reader.readAsDataURL(file); 
    }
  }

  const upload = async () => {
    let imageID;
      if (newData.image !== '') {
        try {
          const result = await UploadImage(newData.image);
          console.log(result);
          imageID = result
        } catch (error) {
          console.error(`Error uploading :`, error);
        }
      }
      onSubmit(imageID)
  };

  const onSubmit = async (imageID) => {
    await upload()
    console.log(imageID);
    
    const result = await update(user.id, {...newData, image_id: imageID})
    console.log(result.data.message)
    onClose()
    setImage("")
  }
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
                    <AvatarImage src={user.imageUrl} />
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
                    {image? (
                      <AvatarImage src={image} />
                    ) : user.imageUrl? (
                      <AvatarImage src={user.imageUrl} />
                    ): (
                      <AvatarImage src={user.gender === 'male'? '/male-avatar.png' : '/female-avatar.png' } />
                    )}
                      <AvatarFallback>l</AvatarFallback>
                  </Avatar>
                  <label for="image" className='p-2 bg-gray-300 rounded-xl '>Click to replace</label>
                  <input type="file" id="image" className='hidden' 
                    onChange={(e) => {
                    handleFileChange(e)
                    setNewData((prevData) => ({...prevData, image: e.target.files[0]}))
                    }}/>
                </div><hr />
                <div>
                  <h3>Job Details</h3>
                </div>
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
                {/* <div className='flex gap-5'>
                  <span className='w-full'>Hire Date</span>
                  <Select placeholder='Job title' defaultSelectedKeys={["job"]}>
                    <SelectItem key="job">Job</SelectItem>
                  </Select>
                </div><hr /> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" isLoading={loading} onPress={onSubmit}>
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