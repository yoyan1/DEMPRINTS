"use client"
import React, { useState } from 'react'
import { Input, Button } from '@nextui-org/react'

export default function JobDetails() {
    const [jobData, setJobData] = useState({
        job_title: [],
        department: [],
        compensation_basis: [],
        frequency: []
    })
    const [inputTitle, setInputTitle] = useState('')

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
  
    };
  return (
    <div>
        {jobData.job_title.map(item => (
            item
        ))}
        <Input label="job Title" placeholder='enter new jobe title' value={inputTitle} onChange={(e)=>(setInputTitle(e.target.value))} />
        <Button onPress={addItemToList}>Add</Button>
    </div>
  )
}
