const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "AGE", uid: "age", sortable: true},
  {name: "ROLE", uid: "job_title", sortable: true},
  {name: "TEAM", uid: "department"},
  {name: "ID NUMBER", uid: "id_number"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

const users = [
  {
    id: '',
    email: "hansame@gmail.com",
    role: "staff",
    name: "Hansam Gwapo",
    gender: "",
    age: "85",
    address: "",
    contact_number: "",
    contact_email: "",
    contact_person: "",
    mandatory_benefit: "",
    job_title: "Executive Director",
    department: "Operational",
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
    status: "active"
  },
];

export {columns, users, statusOptions};