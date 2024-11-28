"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, User} from "@nextui-org/react";
import { useUserStore } from "@/app/stores/userStore";
import { useState } from "react";

export default function ForgotPassword() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {loading, findUser} = useUserStore()
  const [idNumber, setIdNumber] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState()

  const onSubmit = async () => {
    const result = await findUser({id_number: idNumber})
    if(result.msg !== '') {
        setErrorMessage(result.msg)
        console.log(result.msg);
        return
    }
    setUser(result.user)
    
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
                <Input 
                label="Account ID Number" 
                isInvalid={errorMessage? true : false}
                color={errorMessage ? "danger" : ""}
                errorMessage={errorMessage}
                value={idNumber} 
                onChange={(e)=> (setIdNumber(e.target.value))} 
                placeholder="Search your id number.."/>
                <Button color="primary" onPress={onSubmit} isLoading={loading}>Search</Button>
                {() => {
                    if(user) {
                        const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/images/${user.image_id}`;
                        const  image = user.gender === 'male'? 'male-avatar.png' : 'female-avatar.png';
                        
                        <div className="flex flex-col items-start gap-5 p-2">
                            <span>Result found</span>
                            <User   
                            name={`${user.firstname} ${user.lastname}`}
                            description={(
                                user.id_number
                            )}
                            avatarProps={{
                                src: imageUrl? imageUrl : image
                            }}
                            />
                        </div>
                     }
                }}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}