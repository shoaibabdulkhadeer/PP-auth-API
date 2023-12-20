export enum SidebarLink {
  DASHBOARD = "DASHBOARD",
  EMPLOYEE = "EMPLOYEE",
  RECORDS = "RECORDS",
  PROFILE = "PROFILE",
  SIGNIN = "SIGNIN",
}

export enum EmployeeManagementNav {
  BASIC_INFO = "BASIC_INFO",
  PROJECT = "PROJECT",
  CERTIFICATE = "CERTIFICATE",
  SKILLS = "SKILLS",
}
export enum EmployeeManagementLink {
  EMPLOYEE_LSIT = "/admin/empManagement/emplistTable",
  EMPLOYEE_MANAGEMENT = "/admin/empManagement/empDetails",
  BASIC_INFO = "/admin/empManagement/empDetails/empInfo",
  PROJECT = "/admin/empManagement/empDetails/projects",
  CERTIFICATE = "/admin/empManagement/empDetails/certificates",
  SKILLS = "/admin/empManagement/empDetails/skillRatings",
}

export enum DashboardLink {
  PROGRESS_HIGHLIGHTS = "/employee/dashboard/progressHighlights",
  EMP_EFFICIENCY = "/employee/dashboard/empEfficiciency",
}

export enum MastersLink {
  MASTER_PROJECTS = "/admin/masters/projects",
  MASTER_SKILLS = "/admin/masters/skills",
  MASTER_CERTIFICATE = "/admin/masters/certificate",
}

export enum EmployeeLink {
  EMP_MANAGEMENT = "/admin/empManagement/emplistTable",
  PROFILE = "/employee/profile",
  MONTHLY_REPORT = "/admin/monthlyReport",
}

export enum ErrorPages {
  ERROR_403 = "/errorPage403",
  ERROR_500 = "/errorPage500",
}

export enum ProjectTypes {
  PROFILE = "PROFILE",
  DASHBOARD = "DASHBOARD",
  EMP_MANAGEMENT = "EMP_MANAGEMENT",
  RECCENT_PROJECTS = "RECCENT_PROJECTS",
  ACTIVE = "ACTIVE",
  PAST = "PAST",
  UPCOMING = "UPCOMING",
}
