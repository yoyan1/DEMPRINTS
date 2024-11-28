"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, User} from "@nextui-org/react";
import { useUserStore } from "@/app/stores/userStore";
import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";

export default function ForgotPassword() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {loading, findUser} = useUserStore()
  const [idNumber, setIdNumber] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState()
  const [isRequest, setIsRequest] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
  const [password, setPassword] = useState({new: '', confirm: ''})
  const [successMessage, setSuccesMessage] = useState("")

  useEffect(()=>{
    setIsRequest(false)
  }, [])

  const onSubmit = async () => {
    if(!idNumber){
      setErrorMessage("Please enter your ID Number")
      return
    }

    const result = await findUser({id_number: idNumber})
    if(result.msg !== '') {
        setErrorMessage(result.msg)
        return
      }
      setErrorMessage("")
      setUser(result.user)
    
  }

  const [error, setError] = useState('')
  const [loadSubmit, setLoadSubmit] = useState(false)
  const onSubmitRequest = async () => {
    if(password.new !== password.confirm){
      setError("Password not matched.")
      return
    }
    setLoadSubmit(true)
    setError("")
    
    const newData = {
      name: `${user.firstname} ${user.lastname}`,
      id: user._id,
      id_number: user.id_number,
      password: password.new
    }
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/users/createRequests', newData)
    setSuccesMessage(`${response.data} Please Wait for admin confirmation.`)
    setUser()
    setPassword({})
    setIsRequest(false)
    setIdNumber("")
    setLoadSubmit(false)
  }

  return (
    <>
      <span onClick={onOpen} className="text-primary">forgot your password?</span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Forgot Password</ModalHeader>
              <ModalBody>
                <span className="text-center text-green-600">{successMessage}</span>
                <Input 
                label="Account ID Number" 
                isInvalid={errorMessage? true : false}
                color={errorMessage ? "danger" : ""}
                errorMessage={errorMessage}
                value={idNumber} 
                onChange={(e)=> (setIdNumber(e.target.value))} 
                placeholder="Search your id number.."/>
                <Button color="primary" onPress={onSubmit} isLoading={loading}>Search</Button>
                {
                  user && (
                    <div className="flex flex-col items-start gap-5 p-2">
                      <span>Result found</span>
                      <User
                        name={`${user.firstname} ${user.lastname}`}
                        description={user.id_number}
                        avatarProps={{
                          src: user.image_id ? `${process.env.NEXT_PUBLIC_API_URL}/users/images/${user.image_id}` : (user.gender === 'male' ? 'male-avatar.png' : 'female-avatar.png')
                        }}
                      />
                      <span className="text-primary cursor-pointer" onClick={() => setIsRequest(true)}>Request to change password?</span>
                      {isRequest? (
                        <div className="flex flex-col gap-3 w-full">
                          <span>Create New Password</span>
                          <span className="text-center text-red-500">{error}</span>
                          <Input 
                          type={isVisible ? "text" : "password"} 
                          label="Password" 
                          className="w-full"
                          placeholder="Enter your new password"
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
                      ) : null}
                    </div>
                  )
                }

              </ModalBody>
              {isRequest? (
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={onSubmitRequest}>
                    Send Request
                  </Button>
                </ModalFooter>
              ) : null}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}