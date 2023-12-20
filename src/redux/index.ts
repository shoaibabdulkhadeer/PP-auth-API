import { combineReducers } from "redux";
import { LogoutSlice } from "./features/authentication/logoutSlice";
import { DesignationSlice } from "./features/common-features/designationSlice";
import { DepartmentSlice } from "./features/common-features/departmentSlice";
import { ReportingMgrSlice } from "./features/common-features/reportingMangerSlice";
import { RolesSlice } from "./features/common-features/roleSlice";
import { EmpDetailsSlice } from "./features/employee-management/empPostSlice";
import { ProjectSlice } from "./features/common-features/projectSlice";
import { EmpGetAllSlice } from "./features/employee-management/empGetAllSlice";
import { EmpStatusSlice } from "./features/employee-management/empStatusSlice";
import { EmpUpdateSlice } from "./features/employee-management/empUpdateSlice";
import {
  CertificateSlice,
  EmpDownloadCertificateSlice,
} from "./features/common-features/certificateSlice";
import { SkillSlice } from "./features/common-features/skillSlice";
import { EmpGetCertificateSlice } from "./features/common-features/empCertificateSlice";
import {
  DisableEmpSkillSlSlice,
  EmpGetSkillSlice,
  PostEmpSkillSlice,
  RmSkillRatingSlice,
} from "./features/employee-management/empSkillSlice";
import { ModalDataSlice } from "./features/modal-slice/modalSlice";
import { RatingSlice } from "./features/TeamsDashboard/top5EmployeeSlice";
import { Bill_Nonbill_hrsSlice } from "./features/TeamsDashboard/billableNonbillableSlice";
import { NineBoxModelSlice } from "./features/TeamsDashboard/9BoxModelSlice";
import { LoginSlice } from "./features/authentication/loginSlice";
import { certificateSlice } from "./features/certificates/certificateSlice";
import { EmpProfileSlice } from "./features/employee/employeeProfileSlice";
import { ProjectDetailsSlice } from "./features/employee/projectDetailsSlice";
import { EmpSkillsSlice } from "./features/employee/employeeSkillsSlice";
import { UpdateEmpSkillsSlice } from "./features/employee/employeeSkillsPatchSlice";
import { EmpAllCertificateSlice } from "./features/employee/employeeFetchAllCertificateSlice";
import { EmpAddCertificateSlice } from "./features/employee/employeeAddCertificateSlice";
import { EmpDownloadCsvSlice } from "./features/employee/employeeDownloadCsvSlice";
import { ProjectsSlice } from "./features/projects/projectsSlice";
import { SkillsSlice } from "./features/skills/skillsSlice";
import { EmployeeSlice } from "./features/employee-efficiency-slice/employeeSlice.redux";
import { NineBoxSlice } from "./features/monthly-report/nineBoxSlice";
import { EmpNameSlice } from "./features/monthly-report/basic-info-emp-name";
import { empMontlyReportdataSlice } from "./features/monthly-report/montly-emp-report";
import { addMonthlyReportSlice } from "./features/monthly-report/add-monthly-report";
import { EditMonReportSlice } from "./features/monthly-report/edit-emp-report";
import { exportMonthReportDataSlice } from "./features/monthly-report/export-monthly-report";
import { AddCertificateSlice } from "./features/certificates/addCertificateSlice";
import { UpdateCertificateSlice } from "./features/certificates/updateCertificateSlice";
import { availCertificateSlice } from "./features/certificates/updateAvilCertificationslice";
import { switchRolesSlice } from "./features/employee-management/switchRolesSlice";
import { LastThreemonthWorkingHoursSlice } from "./features/TeamsDashboard/Last3MonthWorking";
import { MaxBillableHoursSlice } from "./features/TeamsDashboard/maxBillableHours";
import { addProjectsSlice } from "./features/projects/addProjectSlice";
import { updateProjectsSlice } from "./features/projects/updateProjectSlice";
import { addSkillSlice } from "./features/skills/addSkillSlice";
import { updateSkillSlice } from "./features/skills/updateSkillSlice";
import { disableSkillSlice } from "./features/skills/disableSkillSlice";
import { providersSlice } from "./features/certificates/providersSlice";

export default combineReducers({
  LogOutAction: LogoutSlice,
  DesignationAction: DesignationSlice,
  DepartmentAction: DepartmentSlice,
  ReportingManagerAction: ReportingMgrSlice,
  RolesAction: RolesSlice,
  EmpDetailsAction: EmpDetailsSlice,
  ProjectAction: ProjectSlice,
  EmpGetALlAction: EmpGetAllSlice,
  EmpStatusAction: EmpStatusSlice,
  EmpUpdateAction: EmpUpdateSlice,
  CertificateAction: CertificateSlice,
  SkillAction: SkillSlice,
  EmpCertificateGetAction: EmpGetCertificateSlice,
  EmpDownloadCertificateAction: EmpDownloadCertificateSlice,
  EmpGetSkillAction: EmpGetSkillSlice,
  RmRatingSkillAction: RmSkillRatingSlice,
  EmpSkillPostAction: PostEmpSkillSlice,
  EmpSkillDisableAction: DisableEmpSkillSlSlice,
  EmployeeAction: EmployeeSlice,
  ModalAction: ModalDataSlice,
  RatingAction: RatingSlice,
  Billable_NonBillableHoursAction: Bill_Nonbill_hrsSlice,
  NineBoxAction: NineBoxModelSlice,
  LoginAction: LoginSlice,
  CertificatesAction: certificateSlice,
  AddCertificateAction: AddCertificateSlice,
  UpdateCertificationAction: UpdateCertificateSlice,
  UpdateAvailCertificationAction: availCertificateSlice,
  FetchProvideraction: providersSlice,
  EmpProfileAction: EmpProfileSlice,
  ProjectDetailsAction: ProjectDetailsSlice,
  EmployeeSkillsAction: EmpSkillsSlice,
  UpdateEmpSkillSelfRatingAction: UpdateEmpSkillsSlice,
  EmpGetCertificateAction: EmpGetCertificateSlice,
  EmpAllCertificateAction: EmpAllCertificateSlice,
  EmpAddCertificateAction: EmpAddCertificateSlice,
  EmpDownloadCsvAction: EmpDownloadCsvSlice,
  ProjectsAction: ProjectsSlice,
  SkillsAction: SkillsSlice,
  switchRolesSlc: switchRolesSlice,
  NineBoxData: NineBoxSlice,
  EmpNameId: EmpNameSlice,
  EmpMonthlyReport: empMontlyReportdataSlice,
  AddingMonthlyReport: addMonthlyReportSlice,
  EditMonthReport: EditMonReportSlice,
  ExportMonthReport: exportMonthReportDataSlice,
  LastThreemonthWorkingHoursAction: LastThreemonthWorkingHoursSlice,
  MaxBillableHourPreviousMonthAction: MaxBillableHoursSlice,
  AddProjectAction: addProjectsSlice,
  UpdateProjectAction: updateProjectsSlice,
  AddSkillAction: addSkillSlice,
  UpdateSkillAction: updateSkillSlice,
  DisableSkillAction: disableSkillSlice,
});
