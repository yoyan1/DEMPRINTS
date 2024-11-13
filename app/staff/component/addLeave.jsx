"use client";

import { Input, Textarea, Button } from "@nextui-org/react";
import React from "react";

export default function AddLeave() {
  return (
    <>
      <Input className="mb-2" label="Leave Tittle" placeholder="Leave Title" variant="bordered" autoFocus />
      <Input className='mb-2' type="file" label="Upload" />

      <Textarea label='Description' variant="bordered" autoFocus/>

      <div>

      <Button color='primary' size='sm'>Submit</Button>
      </div>
    </>
  );
}
