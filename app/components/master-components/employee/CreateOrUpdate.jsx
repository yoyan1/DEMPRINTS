"use client";
import React, { useState, useEffect} from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  DatePicker,
  Select,
  SelectItem,
  Input,
  Spinner,
  Tabs,
  Tab
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import validateEmail from "@/app/composables/validateEmail";
import JobDetails from '../form/JobDetails'
import { UploadImage } from '@/app/composables/uploadImage'
import { useUserStore } from "@/app/stores/userStore";

export default function CreateUser({done}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {create} = useUserStore()
  const { toast } = useToast()
  const [selected, setSelected] = useState("job");
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [jobData, setJobData] = useState({
    job_title: [],
    department: [],
    compensation_basis: [],
    frequency: []
  })
  const [mandatoryBenefit, setMandatoryBenefit] = useState({
    ss_no: 0,
    pab_ibig_no: 0,
    philhealth: 0,
  });

  const [contactPerson, setContactPerson] = useState({
    name: "",
    address: "",
    contact_number: 0,
    relationship: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "staff",
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    birth_date: "",
    address: "",
    contact_number: "",
    contact_email: "",
    contact_person: "",
    mandatory_benefit: "",
    job_title: "",
    department: "",
    hire_date: "",
    wage: "",
    basis: "",
    frequency: "",
    leave_entitlement: "",
    contract: "",
    pre_employment: "",
    certificates: "",
    review: "",
  });
  const [contract, setContract] = useState(null)
  const [preEmploment, setPreEmployment] = useState(null)
  const [certificates, setcertificates] = useState(null)

  const handleBirthDateChange = (date) => {
    setCredentials((prevData) => ({
      ...prevData,
      birth_date: `${date.month}/${date.day}/${date.year}`,
    }));
  };

  const handleHireDateChange = (date) => {
    setCredentials((prevData) => ({
      ...prevData,
      hire_date: `${date.month}/${date.day}/${date.year}`,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChangeContact = (e) => {
    const { name, value } = e.target;

    setContactPerson((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setCredentials((prevData) => ({
      ...prevData,
      contact_person: contactPerson,
    }));
  };
  const handleChangeBenefit = (e) => {
    const { name, value } = e.target;

    setMandatoryBenefit((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setCredentials((prevData) => ({
      ...prevData,
      mandatory_benefit: mandatoryBenefit,
    }));
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleClose = () => {
    if (step === 1 || step === 4) {
      onClose();
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  };

 


  const isValidStepOne = () =>{
    const errors = {};
    if (!credentials.email) errors.email = "Email is required.";
    if (credentials.email && !validateEmail(credentials.email))
      errors.email = "Email is invalid.";
    if (!credentials.password) errors.password = "Password is required.";
    
    setErrorMessages(errors);
    return errors;
  }

  const isValidStepTwo = () =>{
    const errors = {};
    if (!credentials.firstname) errors.firstname = "First name is required.";
    if (!credentials.lastname) errors.lastname = "Last name is required.";
    if (!credentials.gender) errors.gender = "Gender is required.";
    if (!credentials.birth_date) errors.birth_date = "Birth date is required.";
    if (!mandatoryBenefit.ss_no === 0) errors.ss_no = "SS number is required.";
    if (!mandatoryBenefit.pab_ibig_no === 0) errors.pag_ibig_no = "Pag-ibig number is required.";
    if (!mandatoryBenefit.philhealth === 0) errors.philhealth = "Philhealth number is required.";
    if (!contactPerson.name) errors.name = "Contact name is required.";
    if (!contactPerson.address) errors.contact_address = "Contact address is required.";
    if (!contactPerson.contact_number) errors.person_contact_number = "Person contact number is required.";
    if (!contactPerson.relationship) errors.relationship = "Contact person relationship is required.";
    if (!credentials.address) errors.address = "Address is required.";
    if (!credentials.contact_email)
      errors.contact_email = "Contact email is required.";
    
    setErrorMessages(errors);
    return errors;
  }

  const isInvalidStepThree = () => {
    const errors = {};

    if (!credentials.job_title) errors.job_title = "Job Title is required.";
    if (!credentials.department) errors.department = "Department is required.";
    if (!credentials.hire_date) errors.hire_date = "Hire date is required.";
    if (!credentials.wage) errors.wage = "Salary Wage is required.";
    if (!credentials.basis) errors.basis = "Basis is required.";
    if (!credentials.frequency) errors.frequency = "Frequency is required.";

    // Add additional validation checks as needed
    setErrorMessages(errors);
    return errors;
  };

  const handleButtonClick = () => {
    const errors = isValidStepOne();
    const errorsStepTwo = step === 2? isValidStepTwo() : {}
    if (Object.keys(errors).length !== 0) {
      return;
    } else if (Object.keys(errorsStepTwo).length !== 0 && step === 2) {
      return;
    } 
    
    if (step === 3) {
      console.log("Done");
    } else {
      setStep((prevStep) => prevStep + 1);
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
  
  useEffect(() =>{
    fetchJobData()
  }, [])

  const upload = async () => {
    const files = [
      { key: 'contract', value: contract },
      { key: 'pre_employment', value: preEmploment },
      { key: 'certificates', value: certificates },
    ];
    let contractID = ''
    let preEmploymentID = ''
    let certID = ''
    for (const { key, value } of files) {
      if (value !== '') {
        try {
          const result = await UploadImage(value);
          setCredentials((prevData) => ({
            ...prevData,
            [key]: result,
          }));
          if(key === 'contract'){
            contractID = result
          } 
          if(key === 'pre_employment'){
            preEmploymentID = result
          } 
          if(key === 'certificates'){
            certID = result
          } 
          console.log(result);
        } catch (error) {
          console.error(`Error uploading ${key}:`, error);
          // Handle error as needed (e.g., set error state)
        }
      }
    }
    submit(contractID, preEmploymentID, certID)
  };

const [isLoading, setIsLoading] = useState(false)
const submit = async (id, id2, id3) => {

  const errorsStepThree = isInvalidStepThree()
  if (Object.keys(errorsStepThree).length !== 0 && step === 3) {
    return;
  }

  setStep(4);
  setIsLoading(true);
  
  try {
    const newData = {
      email: credentials.email,
      password: credentials.password,
      role: "staff",
      firstname: credentials.firstname,
      middlename: credentials.middlename,
      lastname: credentials.lastname,
      gender: credentials.gender,
      birth_date: credentials.birth_date,
      address: credentials.address,
      contact_number: credentials.contact_number,
      contact_email: credentials.contact_email,
      contact_person: credentials.contact_person,
      mandatory_benefit: credentials.mandatory_benefit,
      job_title: credentials.job_title,
      department: credentials.department,
      hire_date: credentials.hire_date,
      wage: credentials.wage,
      basis: credentials.basis,
      frequency: credentials.frequency,
      leave_entitlement: credentials.leave_entitlement,
      contract: id,
      pre_employment: id2,
      certificates: id3,
      review: credentials.review,
    }
    console.log(newData)
    const response = await create(newData);
    if (response.status === 201) {
      setSuccess('Registration successful');
      toast({
        variant: "outline",
        title: "Success!",
        color: "success",
        description: "Registration successful",
      })
      done('')
    } else {
      setError('Unexpected response from server');
      toast({
        variant: "destructive",
        title: "Error!",
        color: "success",
        description: "Unexpected response from server",
      })
      
    }
  } catch (error) {
    console.error("Error during submission:", error);
    setError("An error occurred during submission.");
    toast({
      variant: "destructive",
      title: "Error!",
      color: "success",
      description: "An error occurred during submission.",
    })
  } finally {
    setIsLoading(false);
    setStep(1)
  }

  console.log(credentials);
};

  return (
    <>
      <div className="p-md">
        <Button color="primary" onPress={onOpen}>
        <FaPlus /> employee
        </Button>
        <form onSubmit={submit}>
          <Modal
            size="2xl"
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="outside"
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    User Registration
                  </ModalHeader>
                  <ModalBody>
                      <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        color="primary"
                        radius="full"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                      >
                        <Tab key="job" title="Job Details">
                            <JobDetails fetch={fetchJobData}/>
                        </Tab>
                        <Tab key="new" title="New Employee">
                            {step === 1 ? (
                              <div className="flex flex-col">
                                <span>Credentials</span>
                                <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-5 pt-3">
                                  <Input radius="sm"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter Email"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    className="max-w-xs"
                                    name="email"
                                    isInvalid={errorMessages.email ? true : false}
                                    color={errorMessages.email ? "danger" : ""}
                                    errorMessage={errorMessages.email}
                                    value={credentials.email}
                                    onChange={handleChange}
                                  />
                                  <Input radius="sm"
                                    label="Password"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    placeholder="Enter password"
                                    name="password"
                                    isInvalid={errorMessages.password ? true : false}
                                    color={errorMessages.password ? "danger" : ""}
                                    errorMessage={errorMessages.password}
                                    onChange={handleChange}
                                    endContent={
                                      <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                        aria-label="toggle password visibility"
                                      >
                                        {isVisible ? (
                                          <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                          <BsEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                      </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-xs"
                                    
                                  />
                                </div>
                              </div>
                            ) : step === 2 ? (
                              <div className="bg-grey-300">
                                <span className="text-xl">Personal Information</span>
                                <div className="mt-2">
                                  <div className="flex flex-col gap-4 mx-2 ">
                                    <div className="flex flex-col gap-2">
                                      <span className="bg-primary text-white px-3">Personal details</span>
                                      <div className="flex flex-col md:flex-row lg:flex-row gap-5 py-2">
                                        <Input radius="sm"
                                          type="text"
                                          label="Firstname"
                                          placeholder="Enter first name"
                                          className="max-w-xs"
                                          name="firstname"
                                          isInvalid={errorMessages.firstname? true : false}
                                          color={errorMessages.firstname ? "danger" : ""}
                                          errorMessage={errorMessages.firstname}
                                          value={credentials.firstname}
                                          onChange={handleChange}
                                        />
                                        <Input radius="sm"
                                          type="text"
                                          label="Middlename (optional)"
                                          placeholder="Enter middlename"
                                          name="middlename"
                                          value={credentials.middlename}
                                          onChange={handleChange}
                                        />
                                        <Input radius="sm"
                                          type="text"
                                          label="Lastname"
                                          placeholder="Enter lastname"
                                          name="lastname"
                                          isInvalid={errorMessages.lastname? true : false}
                                          color={errorMessages.lastname ? "danger" : ""}
                                          errorMessage={errorMessages.lastname}
                                          value={credentials.lastname}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                                        <Select
                                          label="Gender"
                                          placeholder="Select gender"
                                          name="gender"
                                          isInvalid={errorMessages.gender? true : false}
                                          color={errorMessages.gender ? "danger" : ""}
                                          errorMessage={errorMessages.gender}
                                          value={credentials.gender}
                                          onChange={handleChange}
                                        >
                                          <SelectItem key="male">Male</SelectItem>
                                          <SelectItem key="female">Female</SelectItem>
                                        </Select>
                                        <DatePicker
                                          label="Birth date"
                                          isInvalid={errorMessages.birth_date? true : false}
                                          color={errorMessages.birth_date ? "danger" : ""}
                                          errorMessage={errorMessages.birth_date}
                                          clearable
                                          initialValue={new Date()}
                                          onChange={handleBirthDateChange}
                                          showMonthAndYearPickers
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                      <span className="bg-primary text-white my-5 px-3">Mandatory Benefit</span>
                                      <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                                        <Input radius="sm"
                                          type="number"
                                          label="SS No."
                                          className="max-w-xs"
                                          name="ss_no"
                                          isInvalid={errorMessages.ss_no? true : false}
                                          color={errorMessages.ss_no ? "danger" : ""}
                                          errorMessage={errorMessages.ss_no}
                                          value={mandatoryBenefit.ss_no}
                                          onChange={handleChangeBenefit}
                                        />
                                        <Input radius="sm"
                                          type="number"
                                          label="Pag-Ibig No."
                                          name="pab_ibig_no"
                                          isInvalid={errorMessages.pag_ibig_no? true : false}
                                          color={errorMessages.pag_ibig_no ? "danger" : ""}
                                          errorMessage={errorMessages.pag_ibig_no}
                                          value={mandatoryBenefit.pab_ibig_no}
                                          onChange={handleChangeBenefit}
                                        />
                                        <Input radius="sm"
                                          type="number"
                                          label="Philhealth"
                                          name="philhealth"
                                          isInvalid={errorMessages.philhealth? true : false}
                                          color={errorMessages.philhealth ? "danger" : ""}
                                          errorMessage={errorMessages.philhealth}
                                          value={mandatoryBenefit.philhealth}
                                          onChange={handleChangeBenefit}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col py-2 px-3">
                                    <span className="bg-primary text-white my-5 px-3">Contact Information</span>
                                    <Input radius="sm"
                                      type="text"
                                      
                                      label="Address"
                                      placeholder="Enter complete address"
                                      
                                      className="pt-2"
                                      name="address"
                                      isInvalid={errorMessages.address? true : false}
                                      color={errorMessages.address ? "danger" : ""}
                                      errorMessage={errorMessages.address}
                                      value={credentials.address}
                                      onChange={handleChange}
                                    />
                                    <div className="flex gap-5 py-5">
                                      <Input radius="sm"
                                        type="number"
                                        
                                        label="Contact #"
                                        placeholder="Enter contact number"
                                        
                                        name="contact_number"
                                        isInvalid={errorMessages.contact_number? true : false}
                                        color={errorMessages.contact_number ? "danger" : ""}
                                        errorMessage={errorMessages.contact_number}
                                        value={credentials.contact_number}
                                        onChange={handleChange}
                                      />
                                      <Input radius="sm"
                                        type="email"
                                        label="Email"
                                        placeholder="Enter contact email"
                                        name="contact_email"
                                        osInvalid={errorMessages.contact_email? true : false}
                                        color={errorMessages.contact_email ? "danger" : ""}
                                        errorMessage={errorMessages.contact_email}
                                        value={credentials.contact_email}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="border p-3 mt-5">
                                      <span>Contact Person</span>
                                      <div className="flex gap-5 py-2">
                                        <Input radius="sm"
                                          type="text"
                                          placeholder="Enter name"
                                          label="Name"
                                          name="name"
                                          isInvalid={errorMessages.name? true : false}
                                          color={errorMessages.name ? "danger" : ""}
                                          errorMessage={errorMessages.name}
                                          value={contactPerson.name}
                                          onChange={handleChangeContact}
                                        />
                                        
                                        <Input radius="sm"
                                          type="text"
                                          label="Relationship"
                                          placeholder="Relationship of contact person"
                                          name="relationship"
                                          isInvalid={errorMessages.relationship? true : false}
                                          color={errorMessages.relationship ? "danger" : ""}
                                          errorMessage={errorMessages.relationship}
                                          value={contactPerson.relationship}
                                          onChange={handleChangeContact}
                                        />
                                      </div>
                                      <div className="flex gap-5 pb-2">
                                        <Input radius="sm"
                                          type="number"
                                          label="Contact #"
                                          placeholder="Enter person contact number"
                                          name="contact_number"
                                          isInvalid={errorMessages.person_contact_number? true : false}
                                          color={errorMessages.person_contact_number ? "danger" : ""}
                                          errorMessage={errorMessages.person_contact_number}
                                          value={contactPerson.contact_number}
                                          onChange={handleChangeContact}
                                        />
                                        {/* <Input radius="sm"
                                          type="email"
                                          
                                          label="Email"
                                          isInvalid={errorMessages.? true : false}
                                          color={errorMessages. ? "danger" : ""}
                                          errorMessage={errorMessages.}
                                          
                                        /> */}
                                      </div>
                                      <Input radius="sm"
                                        type="text"
                                        label="Address"
                                        placeholder="Enter contact person address"
                                        name="address"
                                        isInvalid={errorMessages.contact_address? true : false}
                                        color={errorMessages.contact_address ? "danger" : ""}
                                        errorMessage={errorMessages.contact_address}
                                        value={contactPerson.address}
                                        onChange={handleChangeContact}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : step === 3 ? (
                              <div className="flex flex-col gap-5 max-h-[20rem] overflow-y-scroll">
                                <div>
                                  <span>Employment Details</span>
                                  <div className="flex flex-col md:flex-row lg:flex-row gap-5 pt-3">
                                    <Select
                                      label="Select Job Title"
                                      className="max-w-"
                                      name="job_title"
                                      isInvalid={errorMessages.job_title? true : false}
                                      color={errorMessages.job_title ? "danger" : ""}
                                      errorMessage={errorMessages.job_title}
                                      value={credentials.job_title}
                                      onChange={handleChange}
                                    >
                                      {jobData.job_title.map((job) => (
                                        <SelectItem key={job}>{job}</SelectItem>
                                      ))}
                                    </Select>
                                    <Select
                                      label="Select Department"
                                      className="max-w-"
                                      name="department"
                                      isInvalid={errorMessages.department? true : false}
                                      color={errorMessages.department ? "danger" : ""}
                                      errorMessage={errorMessages.department}
                                      value={credentials.department}
                                      onChange={handleChange}
                                    >
                                      {jobData.department.map((dep) => (
                                        <SelectItem key={dep}>{dep}</SelectItem>
                                      ))}
                                    </Select>
                                    <DatePicker
                                      label="Hired date"
                                      className="max-w-[284px]"
                                      isInvalid={errorMessages.hire_date? true : false}
                                      color={errorMessages.hire_date ? "danger" : ""}
                                      errorMessage={errorMessages.hire_date}
                                      clearable
                                      initialValue={new Date()}
                                      onChange={handleHireDateChange}
                                      showMonthAndYearPickers
                                    />
                                  </div>
                                </div>
                                <div>
                                  <span>Compensation and Benefits</span>
                                  <div className="flex flex-col md:flex-row lg:flex-row gap-5 pt-3">
                                    <Input radius="sm"
                                      type="number"
                                      placeholder="00.00"
                                      label="Wage"
                                      name="wage"
                                      isInvalid={errorMessages.wage? true : false}
                                      color={errorMessages.wage ? "danger" : ""}
                                      errorMessage={errorMessages.wage}
                                      value={credentials.wage}
                                      onChange={handleChange}
                                      startContent={
                                        <div className="pointer-events-none flex items-center">
                                          <span className="text-default-400 text-small">
                                            ₱
                                          </span>
                                        </div>
                                      }
                                    />
                                    <Select
                                      label="Compensation Basis"
                                      name="basis"
                                      isInvalid={errorMessages.basis? true : false}
                                      color={errorMessages.basis ? "danger" : ""}
                                      errorMessage={errorMessages.basis}
                                      value={credentials.basis}
                                      onChange={handleChange}
                                    >
                                      {jobData.compensation_basis.map(item => (
                                        <SelectItem key={item}>{item}</SelectItem>
                                      ))}
                                    </Select>
                                    <Select
                                      label="Frequency"
                                      name="frequency"
                                      isInvalid={errorMessages.frequency? true : false}
                                      color={errorMessages.frequency ? "danger" : ""}
                                      errorMessage={errorMessages.frequency}
                                      value={credentials.frequency}
                                      onChange={handleChange}
                                    >
                                      {jobData.frequency.map(item => (
                                        <SelectItem key={item}>{item}</SelectItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <span>Legal Compliance and Audit</span>
                                  <div className="flex flex-col md:flex-row lg:flex-row gap-5 py-2 pt-3">
                                    <Input radius="sm" type="file" label="Contract" onChange={(e)=>(setContract(e.target.files[0])) }/>
                                    <Input radius="sm"
                                      type="file"
                                      label="Pre-employment document"
                                      onChange={(e)=>(setPreEmployment(e.target.files[0])) }
                                    />
                                    <Input radius="sm" type="file" label="Training certificates" onChange={(e)=>(setcertificates(e.target.files[0])) }/>
                                  </div>
                                </div>
                              </div>
                            ) : step === 4 ?(
                              <div>
                                {isLoading? (
                                  <Spinner label="Loading..." color="primary" />
                                ): 
                                  <span>{error? error : success}</span>
                                }
                              </div>
                            ) : null}
                        </Tab>
                      </Tabs>
                  </ModalBody>
                  {selected === 'new'? (
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={handleClose}
                      >
                        {step === 1 || step === 4 ? "close" : "prev"}
                      </Button>
                      {step === 3 ? (
                        <Button 
                        color="primary" 
                        onPress={upload} 
                        type="submit"
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
                          submit
                        </Button>
                      ) :step === 4 ?(
                        <div></div>
                      ): (
                        <Button color="primary" onPress={handleButtonClick}>
                          next
                        </Button>
                      )}
                    </ModalFooter>
                  ): null}
                </>
              )}
            </ModalContent>
          </Modal>
        </form>
      </div>
    </>
  );
}
