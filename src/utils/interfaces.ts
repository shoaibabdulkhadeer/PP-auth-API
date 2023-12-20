import { IEmployee } from "./validation";

export interface ICertificate {
  key: string;
  certificationName: string;
  CertificationGuId?: string;
}
export interface IEmployeeTable {
  FullName: string;
  Username: string;
  CommunicationEmailAddress: string;
  DesignationName: string;
  DepartmentName: string;
  ReportingManagerFullName: string;
  IsActive?: boolean;
  EmployeeGuID?: string;
  DepartmentId?: number;
  AdditionalRoles: [];
  DesignationId: number;
  TotalYearsOfExperience: number;
  HourlyCost: number;
  JoiningDate: string;
}
export interface IProjectTable {
  key: string;
  ProjectName: string;
  ProjectDescription: string;
  DailyAllocatedHours: string;
  StartDate: string;
  EndDate: string;
}

// redux slice interfaces
type TSelectOption = {
  value: string;
  label: string;
};
type TDepartmentId = {
  value: number;
  label: string;
};

interface ProjectModal {
  ProjectName: string;
  ProjectDescription: string;
  StartDate: string;
  EndDate: string;
  DailyAllocatedHours: number;
}
export interface IDesignation {
  disgnationRes: [];
  disgnationLoad: boolean;
  disgnationerror: string;
  disgOptions: TSelectOption[];
}
export interface IReportingMgrSl {
  reportingMRes: [];
  reportingMLoad: boolean;
  reportingMerror: string;
  rmOptions: TSelectOption[];
}
export interface IRolesSl {
  rolesRes: [];
  rolesLoad: boolean;
  roleserror: string;
  roleOptions: TSelectOption[];
}

//Interface for Departments Data in Dashboard Dropdown
export interface IDepartments {
  dptData: [];
  dptName: string;
  dptLoading: boolean;
  dptError: string;
  departments: TSelectOption[];
  departmentsId: TDepartmentId[];
}

export interface IEmployeePostSl {
  empRes: [];
  empLoad: boolean;
  emperror: string | number;
  empPostCode: number;
  empID: string;
}
interface ProjectModal {
  ProjectName: string;
  ProjectDescription: string;
  StartDate: string;
  EndDate: string;
  DailyAllocatedHours: number;
}
export interface IProjectSl {
  activeCount: number;
  upcomingCount: number;
  pastCount: number;
  activeProjects: ProjectModal[];
  upcomingProjects: ProjectModal[];
  pastProjects: ProjectModal[];
  projectLoad: boolean;
  projecterror: string;
  isProjectLoaded: boolean;
}
export interface IGetALLEmpSl {
  empGetRes: [];
  empGetLoad: boolean;
  empGeterror: string;
  basicIntial: IEmployee;
  basicLoad: boolean;
  basicResetLoad: boolean;
  empID: string;
  totalCount: number;
  empGetCode: number;
  pageId: number;
}
export interface IEmpStatusSl {
  empStatusRes: "";
  empStatusLoad: boolean;
  empStatusCode: number;
}
export interface IEmpUpdate {
  empUpdateRes: string;
  empUpdateCode: number;
  empUpdateLoad: boolean;
}

export interface ICertificateSl {
  certificateData: [];
  certificateMsg: string;
  certificateLoad: boolean;
  certificateOptions: [];
}
export interface IGetAllSkillsSl {
  skillData: [];
  skillMsg: string;
  skillLoad: boolean;
}
export interface IEmpCertificateSl {
  certificateData: [];
  certificateDataLoading: boolean;
  error: string;
  certificateCode: number;
}
export interface IEmpSkillGetSl {
  empSkillData: [];
  empSkillMsg: string;
  empSkillLoad: boolean;
}
export interface IRMRatingSl {
  rmRatingCode: number;
  rmRatingMsg: string;
  rmRatingLoad: boolean;
}
export interface IEmpSkillPostSl {
  empSkillPostMsg: string;
  empSkillPostLoad: boolean;
  empSkillPostCode: number;
}
export interface IEmpSkillDiable {
  empSkillDisMsg: string;
  empSkillDisLoad: boolean;
  empSkillDisCode: number;
}

//Interface for Modal Popup Data in Dashboard
interface BasicInfo {
  FullName: string;
  Username: string;
  Email: string;
  Designation: string;
  JoiningDate: string;
  ReportingManagerName: string | null;
  HourlyCost: number;
  YearsOfExperience: number;
  DepartmentName: string;
}

interface Project {
  Project: string;
  DailyAllocatedHours: number;
  StartDate: string;
  EndDate: string;
}

export interface Skill {
  SkillName: string;
  SelfRating: number;
  ReportingManagerRating: number;
  SkillTags: string;
}

interface Certification {
  CertificationName: string;
  Description: string;
  UploadedOn: string;
}

export interface ModalDataType {
  modalData: {
    BasicInfo: BasicInfo;
    Project: Project[];
    Skills: Skill[];
    Certification: Certification[];
  };
  modalState: boolean;
  modalLoading: boolean;
  modalError: string;
}

//Interface for Employee Dashboard Data
interface IAllocationHours {
  FullName: string;
  EmployeeGuID: string;
  Designation: string;
  ReportingManagerName: string | null;
  HourlyCost: number;
  Project: {
    Project: string;
    DailyAllocatedHours: number;
  }[];
}

interface OnBenchData {
  FullName: string;
  EmployeeGuID: string;
  Designation: string;
  ReportingManagerName: string;
  HourlyCost: number;
}

export interface IEmployeeSl {
  employeeData: {
    OnBench?: OnBenchData[];
    AllocationHoursgte8?: IAllocationHours[];
    AllocationHourslt8?: IAllocationHours[];
  };
  empLoading: boolean;
  empError: string;
}
export interface IGet9Box {
  nineBox: [];
  nineBoxloading: boolean;
  nineBoxerror: string | undefined;
}

export interface IEmpNameId {
  EmpNameId: [];
  EmpNameIdloading: boolean;
  EmpNameIderror: string | undefined;
}
export interface IEmpMonthlyReport {
  empMontlyReport: [];
  empMontlyReportdataloading: boolean;
  empMontlyReportdataerror: string | undefined;
  monthdate: string;
  editOpen: boolean;
  editChange: any;
  selectedDate: Date | string;
  editOrAdd: string;
  submitData: [];
  saveButton: boolean;
  submitbutton: boolean;
  editButton: boolean;
  uniqueMonth: [];
  submitDate: string;
  editOn: boolean;
  reload: number;
  checkdays: number;
  buttonTorF: boolean;
}

export interface IEditMonthlyReport {
  EditMonthlyReport: [];
  EditMonthlyReportloading: boolean;
  EditMonthlyReporterror: string | undefined;
}

export interface IaddMonthlyReport {
  addMonthlyReport: [];
  addMonthlyReportloading: boolean;
  addMonthlyReporterror: string;
  loadingClose: boolean;
  submitBoolean: boolean;
  fileds: boolean;
  submitDatee: number;
}

export interface IexportMonthReport {
  exportMonthReport: [];
  exportMonthReportloading: boolean;
  exportMonthReporterror: string;
}

export interface MasterCertificate {
  CertificationName?: string;
  CertificationDescription?: string;
  CertificationProvider?: string | null;
  CertificationGuId?: string;
  CertificationProviderId?: number;
  CertificationProviderIdInfo?: any;
}

export interface logCred {
  authType:string;
  Username: string;
  Password: string;
}

/*Employee profile interfaces */

export interface IAddCertificateSl {
  addCertResCode: number;
  addCertificateDataLoading: boolean;
  addCertMsg: string;
}

export interface IDownloadCertificateSl {
  downloadCertificateData: [];
  downloadCertificateDataLoading: boolean;
  error: string;
}

export interface IEmpCsvReportSl {
  csvData: [];
  csvDataLoading: boolean;
  error: string;
}

export interface IFetchAllCertificateSl {
  allCertificateData: [];
  allCertificateDataLoading: boolean;
  error: string;
}

export interface IEmplCertificateSl {
  certificateData: [];
  certificateDataLoading: boolean;
  error: string;
}

export interface IEmpProfileSl {
  employeeData: [];
  employeeDataLoading: boolean;
  error: string;
}

export interface IEmpSkillsPatchSl {
  patchedEmpSelfRating: [];
  patchedEmpSelfRatingLoading: boolean;
  message: string;
  code: number;
}

export interface IEmpSkillsSl {
  employeeSkillsData: [];
  employeeSkillsDataLoading: boolean;
  error: string;
}

export interface IProjectDetailsSl {
  projectData: any[];
  activeProjects: any[];
  pastProjects: any[];
  upcomingProjects: any[];
  projectDataLoading: boolean;
  error: string;
}
