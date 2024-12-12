"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, User} from "@nextui-org/react";
import { useUserStore } from "@/app/stores/userStore";
import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";

export default function ForgotPassword({user}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { loading, changePassword } = useUserStore()
  const [errorMessage, setErrorMessage] = useState()
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
  const [password, setPassword] = useState({current: '', new: '', confirm: ''})
  const [successMessage, setSuccesMessage] = useState("")

  const [error, setError] = useState('')

  const isValid = () =>{
    const errors = {};

    if (!password.new) errors.password = "Password is required. Please enter your password.";
    if (password.new.length < 8) errors.password = "Password must be at least 8 characters long.";
    
    setError(errors);
    return errors;
  }

  const [loadSubmit, setLoadSubmit] = useState(false)
  const onSubmit = async () => {
    const errors = isValid();
    if (Object.keys(errors).length !== 0) {
      return;
    }

    if(password.new !== password.confirm){
      setErrorMessage("Password not matched.")
      return
    }
    setLoadSubmit(true)
    setErrorMessage("")
    
    const newData = {
      id: user.id,
      current_password: password.current,
      password: password.new
    }
    const response = await changePassword(newData)
    if(response.isSuccess){
        setSuccesMessage(response.message)
        setPassword({})
        setLoadSubmit(false)
        return
    }
    setErrorMessage(response.message)
    setLoadSubmit(false)
  }

  return (
    <>
      <span onClick={onOpen} className="text-primary">Change password?</span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Change Password</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col items-start gap-5 p-2">
                        <User
                        name={user.name}
                        description={user.id_number}
                        avatarProps={{
                            src: user.image_id ? `${process.env.NEXT_PUBLIC_API_URL}/users/images/${user.image_id}` : (user.gender === 'male' ? 'male-avatar.png' : 'female-avatar.png')
                        }}
                        />
                        <div className="flex flex-col gap-3 w-full">
                            <span>Create New Password</span>
                            <span className="text-center text-red-500">{errorMessage}</span>
                            <span className="text-center text-green-500">{successMessage}</span>
                            <Input 
                            type={isVisibleCurrent ? "text" : "password"} 
                            label="Current Password" 
                            className="w-full"
                            placeholder="Enter your current password"
                            value={password.current}
                            onChange={(e)=> setPassword((prevData) => ({...prevData, current: e.target.value}))}
                            endContent={
                            <button className="focus:outline-none" type="button" onClick={()=> setIsVisibleCurrent(!isVisibleCurrent)} aria-label="toggle password visibility">
                                {isVisibleCurrent ? (
                                <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                <IoEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                            }     
                            />
                            <Input 
                            type={isVisible ? "text" : "password"} 
                            label="Password" 
                            className="w-full"
                            placeholder="Enter your new password"
                            isInvalid={error.password? true : false}
                            color={error.password ? "danger" : ""}
                            errorMessage={error.password}
                            value={password.new}
                            onChange={(e)=> setPassword((prevData) => ({...prevData, new: e.target.value}))}
                            endContent={
                            <button className="focus:outline-none" type="button" onClick={()=> setIsVisible(!isVisible)} aria-label="toggle password visibility">
                                {isVisible ? (
                                <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                <IoEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                            }     
                            />
                            <Input 
                            type={isVisibleConfirm ? "text" : "password"}
                            label="Confirm password" 
                            className="w-full"
                            placeholder="Confirm your password"
                            value={password.confirm}
                            onChange={(e)=> setPassword((prevData) => ({...prevData, confirm: e.target.value}))}
                            endContent={
                            <button className="focus:outline-none" type="button" onClick={()=> setIsVisibleConfirm(!isVisibleConfirm)} aria-label="toggle password visibility">
                                {isVisibleConfirm ? (
                                <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                <IoEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                            }     
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
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