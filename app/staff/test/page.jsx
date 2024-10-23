'use client'
import React from "react";
import {useState} from 'react'
import { Input } from "@nextui-org/react";
// import { button } from "@nextui-org/react";

export default function Test(){

    const [test, setTest] = useState({
        name:'',
        age: 0
    })

    // const handlesubmit = async (e)
    return(
        <>
            <div>
               <form>
                 <Input value={test.name} type="text" label='Name'/>
                 <Input value={test.age} type="text" label='Last Name'/>
                 <button className="primary" type="submit">Save</button>
               </form>
            </div>
        </>
    )
}