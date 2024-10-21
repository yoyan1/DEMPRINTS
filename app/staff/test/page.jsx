'use client'
import React from "react";
import { Input } from "@nextui-org/react";
// import { button } from "@nextui-org/react";

export default function Test(){
    return(
        <>
            <div>
               <form>
                 <Input type="text" label='Name'/>
                 <Input type="text" label='Last Name'/>
                 <button className="primary" type="submit">Save</button>
               </form>
            </div>
        </>
    )
}