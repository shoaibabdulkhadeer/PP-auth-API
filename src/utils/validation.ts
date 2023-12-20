import * as Yup from "yup";
import { RegExpresions } from "./regExp";

const rolesToValidate = [
  {
    roleName: "Admin",
    permissions: ["Admin", "ReportingManager", "Employee"],
  },
  {
    roleName: "Reporting Manager",
    permissions: ["Reporting Manager", "Employee"],
  },

  {
    roleName: "Default",
    permissions: ["Employee"],
  },
];
export const employeeScheama = Yup.object().shape({
  FullName: Yup.string()
    .required("Full name is required")
    .matches(RegExpresions.NameReg, "Enter proper name"),
  Username: Yup.string()
    .required(" User name is required")
    .matches(RegExpresions.G7CREmailReg, "Invalid user name"),
  CommunicationEmailAddress: Yup.string()
    .required("Communication email is required ")
    .matches(RegExpresions.EmailReg, "Invalid communication mail"),
  EmployeeID: Yup.string()
    .required("Employee ID is required")
    .max(20, "Employee ID not more than 20 character"),
  JoiningDate: Yup.string().required("Joining date is required"),
  TotalYearsOfExperience: Yup.number()
    .required("Experience is required")
    .min(0, "Experice should not be negative")
    .max(40, "Experience not more than 40"),
  DesignationName: Yup.string().required("Designation is required"),
  DesignationId: Yup.number(),
  DepartmentId: Yup.number(),
  DepartmentName: Yup.string().required("Department name is required"),
  HourlyCost: Yup.string()
    .required("Hourly cost is required")
    .min(0, "Hourly cost not be negative")
    .test(
      "moneyFormat",
      "Invalid Amount / Only 2 decimal places allowed",
      (value) => {
        if (!value) return true; // Allow empty value
        return /^(?!0\d)[0-9]{1,18}(\.\d{2})?$/.test(value);
      },
    )
    .transform((value, originalValue) => {
      if (!originalValue) return undefined; // Convert empty string to undefined
      return value;
    }),
  RoleID: Yup.number(),
  AdditionalRoles: Yup.array()
    .of(Yup.string())
    .test("isValidRoles", "Invalid Role Name", (value: any) => {
      // Check if all roles in the value array exist in rolesToValidate
      for (const role of value) {
        const foundRole = rolesToValidate.find((r) => r.roleName === role);
        if (!foundRole) {
          return false;
        }
      }
      return true;
    }),
  ReportingManagerFullName: Yup.string().nullable().notRequired(),
  ReportingManagerEmployeeGuID: Yup.string().nullable(),
});

export interface IEmployee {
  FullName: string;
  Username: string;
  CommunicationEmailAddress: string;
  EmployeeID: string;
  JoiningDate: string;
  TotalYearsOfExperience: string;
  DesignationName?: string;
  DesignationId?: string;
  DepartmentId?: number;
  DepartmentName?: string;
  HourlyCost: string;
  RoleID?: number[];
  AdditionalRoles?: string[];
  ReportingManagerFullName?: string | null;
  ReportingManagerEmployeeGuID?: string | null;
  EmployeeGuID?: string;
}
export const intailEMployeeData: IEmployee = {
  FullName: "",
  Username: "",
  CommunicationEmailAddress: "",
  EmployeeID: "",
  JoiningDate: "",
  TotalYearsOfExperience: "",
  DesignationName: "",
  DesignationId: "",
  DepartmentId: 0,
  DepartmentName: "",
  HourlyCost: "",
  RoleID: [3],
  AdditionalRoles: [],
  ReportingManagerFullName: "",
  ReportingManagerEmployeeGuID: "",
  EmployeeGuID: "",
};

export const certificateSchema = Yup.object().shape({
  CertificationName: Yup.string()
    .required("Please enter Certificate Name")
    .max(100, "Certificate Name should be at most 100 characters"),
  CertificationDescription: Yup.string()
    .required("Please enter Certificate Description")
    .max(500, "Certificate Description should be at most 500 characters"),
  CertificationProvider: Yup.string().required(
    "Please select Certificate Provider",
  ),
});
