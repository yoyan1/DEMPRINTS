"use client"
import React, { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Input, Button, Listbox, ListboxItem } from '@nextui-org/react'
import { MdAdd } from 'react-icons/md'
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from 'axios';

export default function JobDetails({fetch}) {
    const { toast } = useToast()
    const [jobData, setJobData] = useState({
        id: '',
        job_title: [],
        department: [],
        compensation_basis: [],
        frequency: []
    })
    const [inputTitle, setInputTitle] = useState('')
    const [inputDepartment, setInputDepartment] = useState('')
    const [inputBasis, setInputBasis] = useState('')
    const [inputFrequency, setInputFrequency] = useState('')

    const addItemToList = () => {
        if(inputTitle.trim() !== ''){
            const newItem = inputTitle;
            if (newItem) {
            setJobData((prevData) => ({
                ...prevData,
                job_title: [...prevData.job_title, newItem],
            }));
            }
            setInputTitle('')
        }
        else if(inputDepartment.trim() !== ''){
            const newItem = inputDepartment;
            if (newItem) {
            setJobData((prevData) => ({
                ...prevData,
                department: [...prevData.department, newItem],
            }));
            }
            setInputDepartment('')
        }
        else if(inputBasis.trim() !== ''){
            const newItem = inputBasis;
            if (newItem) {
            setJobData((prevData) => ({
                ...prevData,
                compensation_basis: [...prevData.compensation_basis, newItem],
            }));
            }
            setInputBasis('')
        }
        else if(inputFrequency.trim() !== ''){
            const newItem = inputFrequency;
            if (newItem) {
            setJobData((prevData) => ({
                ...prevData,
                frequency: [...prevData.frequency, newItem],
            }));
            }
            setInputFrequency('')
        }
    };
    const removeItem = (index, type) => {
        if(type === 'job'){
            setJobData((prevData) => {
                const newList = [...prevData.job_title];
                newList.splice(index, 1);
                return { ...prevData, job_title: newList };
            })
        }
        else if(type === 'department'){
            setJobData((prevData) => {
                const newList = [...prevData.department];
                newList.splice(index, 1);
                return { ...prevData, department: newList };
            })
        }
        else if(type === 'basis'){
            setJobData((prevData) => {
                const newList = [...prevData.compensation_basis];
                newList.splice(index, 1);
                return { ...prevData, compensation_basis: newList };
            })
        }
        else if(type === 'frequency'){
            setJobData((prevData) => {
                const newList = [...prevData.frequency];
                newList.splice(index, 1);
                return { ...prevData, frequency: newList };
            })
        }
    };

    const fetchJobData = async () =>{
        const result = await axios.get('https://demprints-backend.vercel.app/api/master/getJobData')
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

    useEffect(()=>{
        fetchJobData()
    }, [])

    const [isLoading, setIsLoading] = useState(false)
    const submit = async () => {
        setIsLoading(true)
        try{
            console.log(jobData.id)
            const response = await axios.post('https://demprints-backend.vercel.app/api/master/createJobData', jobData)
            console.log(response);
            toast({
                variant: "outline",
                title: "Success!",
                color: "success",
                description: response.data,
              })
        } catch(e){
            console.log(e)
        }
        setIsLoading(false)
        fetch(true)
    }
  return (
    <div>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row lg:flex-row justify-evenly'>
                <div>
                    <div className='flex gap-2 items-end'>
                        <Input radius='sm' variant='bordered' labelPlacement='outside' placeholder='Enter new job title' value={inputTitle} onChange={(e)=>(setInputTitle(e.target.value))} />
                        <Button isIconOnly onPress={addItemToList} color='primary'><MdAdd/></Button>
                    </div>
                    <div className='p-2 bg-gray-100  my-2 max-h-[11rem] overflow-y-scroll w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                        <Listbox
                        variant='flat'
                        aria-label="Listbox Variants"
                        color="solid" 
                        showDivider
                        topContent={<span className='text-sm'>Job Title</span>}
                        >
                            {jobData.job_title.map((list, index) => (
                                <ListboxItem key={list}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">{list}</span>
                                        <Button size='sm' isIconOnly color="danger" variant="light" onPress={() => removeItem(index, 'job')}>
                                            <MdOutlineDeleteOutline className="h-5 w-5"/>
                                        </Button>
                                    </div>
                                </ListboxItem>

                            ))}
                        </Listbox>
                    </div>
                </div>
                <div>
                    <div className='flex gap-2 items-end'>
                        <Input radius='sm' variant='bordered' labelPlacement='outside' placeholder='Enter new department' value={inputDepartment} onChange={(e)=>(setInputDepartment(e.target.value))} />
                        <Button isIconOnly onPress={addItemToList} color='primary'><MdAdd/></Button>
                    </div>
                    <div className='p-2 bg-gray-100  my-2 max-h-[11rem] overflow-y-scroll w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                        <Listbox
                        variant='flat'
                        aria-label="Listbox Variants"
                        color="solid" 
                        showDivider
                        topContent={<span className='text-sm'>Department:</span>}
                        >
                            {jobData.department.map((list, index) => (
                                <ListboxItem key={list}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">{list}</span>
                                        <Button size='sm' isIconOnly color="danger" variant="light" onPress={() => removeItem(index, 'department')}>
                                            <MdOutlineDeleteOutline className="h-5 w-5"/>
                                        </Button>
                                    </div>
                                </ListboxItem>

                            ))}
                        </Listbox>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-row justify-evenly'>
                <div>
                    <div className='flex gap-2 items-end'>
                        <Input radius='sm' variant='bordered' labelPlacement='outside' placeholder='Enter new compensation basis' value={inputBasis} onChange={(e)=>(setInputBasis(e.target.value))} />
                        <Button isIconOnly onPress={addItemToList} color='primary'><MdAdd/></Button>
                    </div>
                    <div className='p-2 bg-gray-100  my-2 max-h-[11rem] overflow-y-scroll w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                        <Listbox
                        variant='flat'
                        aria-label="Listbox Variants"
                        color="solid" 
                        showDivider
                        topContent={<span className='text-sm'>Compensation Basis:</span>}
                        >
                            {jobData.compensation_basis.map((list, index) => (
                                <ListboxItem key={list}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">{list}</span>
                                        <Button size='sm' isIconOnly color="danger" variant="light" onPress={() => removeItem(index, 'basis')}>
                                            <MdOutlineDeleteOutline className="h-5 w-5"/>
                                        </Button>
                                    </div>
                                </ListboxItem>

                            ))}
                        </Listbox>
                    </div>
                </div>
                <div>
                    <div className='flex gap-2 items-end'>
                        <Input radius='sm' variant='bordered' labelPlacement='outside' placeholder='Enter new salary frequency' value={inputFrequency} onChange={(e)=>(setInputFrequency(e.target.value))} />
                        <Button isIconOnly onPress={addItemToList} color='primary'><MdAdd/></Button>
                    </div>
                    <div className='p-2 bg-gray-100  my-2 max-h-[11rem] overflow-y-scroll w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                        <Listbox
                        variant='flat'
                        aria-label="Listbox Variants"
                        color="solid" 
                        showDivider
                        topContent={<span className='text-sm'>Frequency:</span>}
                        >
                            {jobData.frequency.map((list, index) => (
                                <ListboxItem key={list}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">{list}</span>
                                        <Button size='sm' isIconOnly color="danger" variant="light" onPress={() => removeItem(index, 'frequency')}>
                                            <MdOutlineDeleteOutline className="h-5 w-5"/>
                                        </Button>
                                    </div>
                                </ListboxItem>

                            ))}
                        </Listbox>
                    </div>
                </div>
            </div>
            <div className='flex justify-center py-3'>
                <Button color="primary" className='w-48'
                onPress={submit}
                isLoading={isLoading}
                spinner={
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                >
                    Submit
                </Button>
            </div>
        </div>
    </div>
  )
}
