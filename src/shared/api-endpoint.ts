export enum API_ENDPOINTS {
  //  Auth
  AUTH_LOGOUT = "/auth/logout",
  AUTH_LOGIN = "/auth/login",
  ISDEFAULT_UPDATE = "/auth/isDefault-update",
  SWITCH_ROLES = "/auth/switch-roles",
  EMP_ROLES = "/auth/get-Emp-Roles",

  // Certification
  MASTER_GET_CERTIFICATES = "/certificates/get",
  GET_CERTIFICATES_PROVIDERS = "/certificates/get/providers",
  MASTER_ADD_CERTIFICATES = "/certificates/add",
  MASTER_UPDATE_CERTIFICATES = "/certificates/update",
  MASTER_UPDATE_AVAILABILITY = "/certificates/update/Avil",

  //Employee Efficiency Dashboard

  DASHBOARD_ALLOCATION = "/dashboard/allocation-summary",
  EMPLOYEES_GET = "/dashboard/employees",
  MODAL_DATA = "/dashboard/employees",

  // SOME COMMON API ENDPOINTS
  DESIGNATION_GET = "/masters/designation",
  DEPARTMENTS_GET = "/masters/departments",
  RM_GET = "/masters/reporting-managers",
  ROLES_GET = "/masters/get-roles",
  PROJECT_GET = "/profile/projects",
  CERTIFICATE_GET_ALL = "/certificates/get",
  SKILL_GET_ALL = "masters/get-skills",

  //--------------------------

  // EMPLOYEE MANAGEMENT ENDPOINTS
  EMPLOYEE_MANAGE_GETALL = "/employee/fetchemployees",
  EMPLOYEE_MANAGE_STATUS = "/employee/status-update",
  EMPLOYEE_MANAGE_UPDATE = "/employee/update-employees",
  EMPLOYEE_MANAGE_POST = "/employee/post-employees",
  EMPLOYEE_SKILL_GET = "/employee/Fetchskills",
  EMPLOYEE_SKILL_POST = "/employee/Addskill",
  RMSKILL_RATING_PATCH = "/employee/RmRating",
  EMPLOYEE_SKILL_DELETE = "/employee/DeactivateSkill",
  //-----------------------------
  AVG_RATING = "/dashboard/skillsRating",
  BILLABLE_NONBILLABLE_HOURS = "/dashboard/workingHours",
  NINE_BOX_MODEL = "/dashboard/9boxPosition",
  LAST_THREE_MONTH_WORKING_HOURS = "/dashboard/3monthProductivity",
  MAX_BILLABLEHOURS_PREVIOUS_MONTH = "/dashboard/MaxBillableHoursPreviousMonth",
  //-------------------------------------

  //EMPLOYEE PROFILE PAGE ENDPOINTS
  EMPLOYEE_BASIC_INFO_GET = "/profile/employees",
  PROJECT_BASIC_INFO_GET = "/profile/projects",
  SKILLS_BASIC_INFO_GET = "/profile/skills",
  SKILLS_UPDATE_PATCH = "/profile/patch-skill",
  EMPLOYEE_CERTIFICATE_GET = "/profile/certifications",
  EMPLOYEE_ALL_CERTIFICATE_GET = "/profile/all-certifications",
  CERTIFICATE_ADD_POST = "/profile/post-certification",
  CERTIFICATE_DOWNLOAD_POST = "/profile/download-certification",
  EMPLOYEE_DOWNLOAD_CSV_GET = "/profile/report",

  //-------------------------------------------
  MASTER_GET_SKILLS = "/skills/get",
  MASTER_GET_SKILLTAGNAMES = "/skills/skillTag",
  MASTER_ADD_SKILLS = "/skills/add",
  MASTER_DISABLE_SKILL = "/skills/disable",
  MASTER_UPDATE_SKILL = "/skills/update",

  MASTER_GET_PROJECTS = "/projects/get",
  MASTER_ADD_PROJECT = "/projects/add",
  MASTER_UPDATE_PROJECT = "/projects/update",
  FETCH_EMPLOYEES_FULLNAMES = "projects/employees",

  //Employee monthly report
  GET_9BOXMODLE = "empreport/get9box",
  GET_EMP_NAME = "empreport/getEmpNames",
  GET_EMP_REPORT = "empreport/getEmpReport",
  EDIT_EMP_REPORT = "empreport/editEmpReport",
  ADD_EMP_REPORT = "empreport/addEmpReport",
  EXPORT_MONTH_REPORT = "empreport/exportMonthReport",
}
