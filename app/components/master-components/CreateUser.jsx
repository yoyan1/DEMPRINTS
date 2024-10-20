"use client";
import React, { useState} from "react";
import axios from "axios";
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
} from "@nextui-org/react";
import { MdAdd } from "react-icons/md";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import validateEmail from "@/app/composables/validateEmail";

export default function CreateUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
    actions: "",
  });

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

  const handleButtonClick = () => {
    if (step === 3) {
      console.log("Done");
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const jobOptions = [
    "Executive Director",
    "HR Officer",
    "Operation Head",
    "Graphic Artist",
  ];
  const depOptions = ["Management", "Operation", "Executive"];

  const isInvalid = () => {
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
    if (!credentials.job_title) errors.job_title = "Job Title is required.";
    if (!credentials.department) errors.department = "Department is required.";
    if (!credentials.hire_date) errors.hire_date = "Hire date is required.";
    if (!credentials.wage) errors.wage = "Salary Wage is required.";
    if (!credentials.basis) errors.basis = "Basis is required.";
    if (!credentials.frequency) errors.frequency = "Frequency is required.";
    if (!credentials.email) errors.email = "Email is required.";
    if (credentials.email && !validateEmail(credentials.email))
      errors.email = "Email is invalid.";
    if (!credentials.password) errors.password = "Password is required.";

    // Add additional validation checks as needed

    setErrorMessages(errors);
    return errors;
  };
  
  const [isLoading, setIsLoading] = useState(false)
  const submit = async () => {
    const errors = isInvalid();
    if (Object.keys(errors).length !== 0) {
      console.log(credentials);
      return;
    }
    setStep(4)
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', credentials);
      if (response.status === 201) {
        setIsLoading(false)
        setSuccess('Registration successful')
        setError(null);
        // onClose();
      } else {
        setIsLoading(false)
        setError('Unexpected response from server');
      }

    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        setError(
          error.response.data.message || "Error occurred during registration"
        );
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setError("No response from server. Please try again later.");
      } else {
        console.error("Error setting up the request:", error.message);
        setError("Error setting up request");
      }
    }
    console.log(error);
  };
  return (
    <>
      <div className="p-md">
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="py-3 px-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Employee
            </h5>
          </div>
          <div className="p-6 pt-0">
            <Button color="primary" onPress={onOpen}>
              <MdAdd /> employee
            </Button>
          </div>
        </div>
        <form onSubmit={submit}>
          <Modal
            size={step === 2 ? "5xl" : "2xl"}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    User Registration
                  </ModalHeader>
                  <ModalBody>
                    {step === 1 ? (
                      <div className="flex flex-col">
                        <span>Credentials</span>
                        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-5 pt-3">
                          <Input
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
                          <Input
                            label="Password"
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
                            labelPlacement="outside"
                          />
                        </div>
                      </div>
                    ) : step === 2 ? (
                      <div className="max-h-[30rem] bg-grey-300 overflow-y-scroll">
                        <span className="text-xl">Personal Information</span>
                        <div className="flex flex-col lg:flex-row mt-2">
                          <div className="flex flex-col gap-4 px-3 mx-2 border-r">
                            <div className="flex flex-col">
                              <div className="flex flex-col md:flex-row lg:flex-row gap-5 py-2">
                                <Input
                                  type="text"
                                  labelPlacement="outside"
                                  label="Firstname"
                                  placeholder="Enter first name"
                                  variant="bordered"
                                  className="max-w-xs"
                                  name="firstname"
                                  isInvalid={errorMessages.firstname? true : false}
                                  color={errorMessages.firstname ? "danger" : ""}
                                  errorMessage={errorMessages.firstname}
                                  value={credentials.firstname}
                                  onChange={handleChange}
                                />
                                <Input
                                  type="text"
                                  labelPlacement="outside"
                                  label="Middlename (optional)"
                                  placeholder="Enter middlename"
                                  variant="bordered"
                                  name="middlename"
                                  value={credentials.middlename}
                                  onChange={handleChange}
                                />
                                <Input
                                  type="text"
                                  labelPlacement="outside"
                                  label="Lastname"
                                  placeholder="Enter lastname"
                                  variant="bordered"
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
                                  labelPlacement="outside"
                                  className="max-w-[163px]"
                                  variant="bordered"
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
                                  labelPlacement="outside"
                                  label="Birth date"
                                  variant="bordered"
                                  className="max-w-[284px]"
                                  isInvalid={errorMessages.birth_date? true : false}
                                  color={errorMessages.birth_date ? "danger" : ""}
                                  errorMessage={errorMessages.birth_date}
                                  clearable
                                  initialValue={new Date()}
                                  onChange={handleBirthDateChange}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col border-t mt-3">
                              <span>Mandatory Benefit</span>
                              <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                                <Input
                                  type="number"
                                  labelPlacement="outside"
                                  label="SS No."
                                  variant="bordered"
                                  className="max-w-xs"
                                  name="ss_no"
                                  isInvalid={errorMessages.ss_no? true : false}
                                  color={errorMessages.ss_no ? "danger" : ""}
                                  errorMessage={errorMessages.ss_no}
                                  value={mandatoryBenefit.ss_no}
                                  onChange={handleChangeBenefit}
                                />
                                <Input
                                  type="number"
                                  labelPlacement="outside"
                                  label="Pag-Ibig No."
                                  variant="bordered"
                                  name="pab_ibig_no"
                                  isInvalid={errorMessages.pag_ibig_no? true : false}
                                  color={errorMessages.pag_ibig_no ? "danger" : ""}
                                  errorMessage={errorMessages.pag_ibig_no}
                                  value={mandatoryBenefit.pab_ibig_no}
                                  onChange={handleChangeBenefit}
                                />
                                <Input
                                  type="number"
                                  labelPlacement="outside"
                                  label="Philhealth"
                                  variant="bordered"
                                  name="philhealth"
                                  isInvalid={errorMessages.philhealth? true : false}
                                  color={errorMessages.philhealth ? "danger" : ""}
                                  errorMessage={errorMessages.philhealth}
                                  value={mandatoryBenefit.philhealth}
                                  onChange={handleChangeBenefit}
                                />
                              </div>
                            </div>
                            <div className="h-52 bg-slate-400"></div>
                          </div>
                          <div className="flex flex-col py-2 px-3">
                            <span>Contact Information</span>
                            <Input
                              type="text"
                              labelPlacement="outside"
                              label="Address"
                              placeholder="Enter complete address"
                              variant="bordered"
                              className="pt-2"
                              name="address"
                              isInvalid={errorMessages.address? true : false}
                              color={errorMessages.address ? "danger" : ""}
                              errorMessage={errorMessages.address}
                              value={credentials.address}
                              onChange={handleChange}
                            />
                            <div className="flex gap-5 py-5">
                              <Input
                                type="number"
                                labelPlacement="outside"
                                label="Contact #"
                                placeholder="Enter contact number"
                                variant="bordered"
                                name="contact_number"
                                isInvalid={errorMessages.contact_number? true : false}
                                color={errorMessages.contact_number ? "danger" : ""}
                                errorMessage={errorMessages.contact_number}
                                value={credentials.contact_number}
                                onChange={handleChange}
                              />
                              <Input
                                type="email"
                                labelPlacement="outside"
                                label="Email"
                                placeholder="Enter contact email"
                                variant="bordered"
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
                                <Input
                                  type="text"
                                  labelPlacement="outside"
                                  placeholder="Enter name"
                                  label="Name"
                                  variant="bordered"
                                  name="name"
                                  isInvalid={errorMessages.name? true : false}
                                  color={errorMessages.name ? "danger" : ""}
                                  errorMessage={errorMessages.name}
                                  value={contactPerson.name}
                                  onChange={handleChangeContact}
                                />
                                
                                <Input
                                  type="text"
                                  labelPlacement="outside"
                                  label="Relationship"
                                  placeholder="Relationship of contact person"
                                  variant="bordered"
                                  name="relationship"
                                  isInvalid={errorMessages.relationship? true : false}
                                  color={errorMessages.relationship ? "danger" : ""}
                                  errorMessage={errorMessages.relationship}
                                  value={contactPerson.relationship}
                                  onChange={handleChangeContact}
                                />
                              </div>
                              <div className="flex gap-5 pb-2">
                                <Input
                                  type="number"
                                  labelPlacement="outside"
                                  label="Contact #"
                                  placeholder="Enter person contact number"
                                  variant="bordered"
                                  name="contact_number"
                                  isInvalid={errorMessages.person_contact_number? true : false}
                                  color={errorMessages.person_contact_number ? "danger" : ""}
                                  errorMessage={errorMessages.person_contact_number}
                                  value={contactPerson.contact_number}
                                  onChange={handleChangeContact}
                                />
                                {/* <Input
                                  type="email"
                                  labelPlacement="outside"
                                  label="Email"
                                  isInvalid={errorMessages.? true : false}
                                  color={errorMessages. ? "danger" : ""}
                                  errorMessage={errorMessages.}
                                  variant="bordered"
                                /> */}
                              </div>
                              <Input
                                type="text"
                                labelPlacement="outside"
                                label="Address"
                                placeholder="Enter contact person address"
                                variant="bordered"
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
                              {jobOptions.map((job) => (
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
                              {depOptions.map((dep) => (
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
                            />
                          </div>
                        </div>
                        <div>
                          <span>Compensation and Benefits</span>
                          <div className="flex flex-col md:flex-row lg:flex-row gap-5 pt-3">
                            <Input
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
                              <SelectItem key="hourly">Hourly</SelectItem>
                              <SelectItem key="daily">Daily</SelectItem>
                              <SelectItem key="basic pay">basic Pay</SelectItem>
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
                              <SelectItem key="daily">Daily</SelectItem>
                              <SelectItem key="weekly">Weekly</SelectItem>
                              <SelectItem key="bi-monthly">
                                Bi-monthly
                              </SelectItem>
                              <SelectItem key="monthly">Monthly</SelectItem>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <span>Legal Compliance and Audit</span>
                          <div className="flex flex-col md:flex-row lg:flex-row gap-5 py-2 pt-3">
                            <Input type="file" label="Contract" />
                            <Input
                              type="file"
                              label="Pre-employment document"
                            />
                            <Input type="file" label="Training certificates" />
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
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleClose}
                    >
                      {step === 1 || step === 4 ? "close" : "prev"}
                    </Button>
                    {step === 3 ? (
                      <Button color="primary" onPress={submit} type="submit">
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
                </>
              )}
            </ModalContent>
          </Modal>
        </form>
      </div>
    </>
  );
}
