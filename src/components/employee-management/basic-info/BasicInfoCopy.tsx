import {
  CalendarOutlined,
  CheckCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";

import { faDollarSign, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { ErrorMessage, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { GrUserManager } from "react-icons/gr";
import { ImUserCheck } from "react-icons/im";
import { MdAttachEmail, MdWork } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideImg from "../../../assets/image/add-forms-image-pulses.png";
import "../../../assets/styles/styles.css";
import {
  getDepartmentId,
  getDesignationId,
  getRoleID,
  getTitleCase,
} from "../../../common/common";
import {
  resetAddCertificateAction,
  resetCertificateAction,
} from "../../../redux/features/common-features/certificateSlice";
import {
  getDepartmentData,
  resetDepartmentAction,
} from "../../../redux/features/common-features/departmentSlice";
import {
  GetDesignationsData,
  resetDesignationAction,
} from "../../../redux/features/common-features/designationSlice";
import { resetEmpCertificateAction } from "../../../redux/features/common-features/empCertificateSlice";
import { resetProjectAction } from "../../../redux/features/common-features/projectSlice";
import {
  GetReportingManagerData,
  resetReportingMgrAction,
} from "../../../redux/features/common-features/reportingMangerSlice";
import {
  GetRolesData,
  resetRolesAction,
} from "../../../redux/features/common-features/roleSlice";
import {
  editEmpDetails,
  resetBasicEmpDatails,
  setEmpGuidID,
} from "../../../redux/features/employee-management/empGetAllSlice";
import {
  postEmployeeData,
  resetEmpPostAction,
} from "../../../redux/features/employee-management/empPostSlice";
import { empResetStatusAction } from "../../../redux/features/employee-management/empStatusSlice";
import {
  resetEmpUpdateAction,
  updateEmpDetailsApi,
} from "../../../redux/features/employee-management/empUpdateSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { EmployeeManagementLink, ErrorPages } from "../../../shared/enums";
import { cardShadow, iconColor } from "../../../utils/commonCSS";
import { IEmployee, employeeScheama } from "../../../utils/validation";
import EmployeeInfo from "../EmployeeInfo";
import "./BasicInfo.css";

const { Title } = Typography;

const BasicInfoCopy = () => {
  const currentRole = sessionStorage.getItem("role") === "Reporting Manager";
  const navigate = useNavigate();
  const { basicIntial, empID } = useSelector(
    (state: RootState) => state.EmpGetALlAction,
  );
  const [response, setResponse] = useState<boolean>(false);
  const [intailValue, setIntailValue] = useState<IEmployee>(basicIntial);
  const [loading, setLoading] = useState<boolean>(false);
  const disPatch = useDispatch<AppDispatch>();
  useEffect(() => {
    disPatch(getDepartmentData());
    disPatch(GetDesignationsData());
    disPatch(GetReportingManagerData());
    disPatch(GetRolesData());
    return () => {
      disPatch(resetReportingMgrAction());
      disPatch(resetDesignationAction());
      disPatch(resetDepartmentAction());
      disPatch(resetRolesAction());
    };
  }, [disPatch]);

  const { departments, dptData } = useSelector(
    (state: RootState) => state.DepartmentAction,
  );
  const { disgOptions, disgnationRes } = useSelector(
    (state: RootState) => state.DesignationAction,
  );
  const { rmOptions } = useSelector(
    (state: RootState) => state.ReportingManagerAction,
  );
  const { roleOptions, rolesRes } = useSelector(
    (state: RootState) => state.RolesAction,
  );

  const { empPostCode, emperror, empLoad } = useSelector(
    (state: RootState) => state.EmpDetailsAction,
  );
  const { empUpdateRes, empUpdateCode, empUpdateLoad } = useSelector(
    (state: RootState) => state.EmpUpdateAction,
  );

  useEffect(() => {
    disPatch(resetEmpPostAction());
    if (empPostCode === 200) {
      toast.success(emperror);
      setLoading(false);
    } else if (empPostCode === 400) {
      toast.warning(emperror);
      setIntailValue(basicIntial);
      setLoading(false);
    } else if (empPostCode === 500) {
      navigate(ErrorPages.ERROR_500);
    }
    disPatch(GetRolesData());
  }, [
    empLoad,
    response,
    basicIntial,
    emperror,
    disPatch,
    empPostCode,
    navigate,
  ]);

  useEffect(() => {
    if (empUpdateCode === 200) {
      toast.success(empUpdateRes);
      disPatch(resetEmpUpdateAction());
      setIntailValue(basicIntial);
    } else if (empUpdateCode === 400) {
      toast.warning(empUpdateRes);
    } else if (empUpdateCode === 500) {
      navigate(ErrorPages.ERROR_500);
    }
    // disPatch(resetEmpUpdateAction());
  }, [
    empUpdateLoad,
    empUpdateCode,
    empUpdateRes,
    disPatch,
    basicIntial,
    navigate,
  ]);
  const today = new Date();
  const year = today.getFullYear();
  let month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const todyformattedDate = `${year}-${month}`;
  return (
    <>
      <Card
        style={cardShadow}
        title={
          <Row align={"middle"}>
            <Col md={8}>
              {" "}
              <Title
                level={5}
                style={{ color: "rgb(119 123 129)", margin: "0px" }}
              >
                <FontAwesomeIcon size="sm" icon={faUserEdit} /> EMPLOYEE BASIC
                INFO
              </Title>
            </Col>
            <Col md={8}>
              {" "}
              <EmployeeInfo />
            </Col>
            <Col md={8}></Col>
          </Row>
        }
        bodyStyle={{ padding: "8px" }}
      >
        <div className="basic_info_container">
          <div className="basic_info_side_img">
            <img
              src={SideImg}
              width={"100%"}
              height={"100%"}
              loading="lazy"
              alt={SideImg}
            />
          </div>
          <div style={{ justifyItems: "center" }}>
            <Formik
              validationSchema={employeeScheama}
              initialValues={intailValue}
              onSubmit={async function (values: IEmployee, { resetForm }) {
                setLoading(true);
                // Get RM GUID
                let rmId: undefined | null | string =
                  values.ReportingManagerFullName
                    ? values.ReportingManagerFullName.split("|")[1]
                    : null;
                const roleId = getRoleID(values.AdditionalRoles, rolesRes);
                const DepartmentId = getDepartmentId(
                  values.DepartmentName,
                  dptData,
                );

                const DesignationId = getDesignationId(
                  values.DesignationName,
                  disgnationRes,
                );
                if (!empID) {
                  const joiningDate = new Date(
                    values.JoiningDate,
                  ).toISOString();
                  const EmpDetails = {
                    ...values,
                    DepartmentId: DepartmentId,
                    DesignationId: DesignationId,
                    RoleID: roleId,
                    ReportingManagerEmployeeGuID: rmId,
                    JoiningDate: joiningDate,
                  };
                  const res = await disPatch(postEmployeeData(EmpDetails));
                  if (res?.payload?.code === 200) {
                    disPatch(
                      editEmpDetails({
                        ...EmpDetails,
                        EmployeeGuID: res?.payload?.EmployeeGuID,
                      }),
                    );
                    disPatch(setEmpGuidID(res?.payload?.EmployeeGuID));
                    // resetForm();
                    setIntailValue({
                      ...EmpDetails,
                      EmployeeGuID: res?.payload?.EmployeeGuID,
                    });
                  }
                  setResponse(!response);
                  // disPatch(editEmpDetails(EmpDetails));
                } else {
                  let UpdatedDetails: any = {};
                  let roleFlag: boolean = false;
                  if (basicIntial.RoleID?.length !== roleId.length) {
                    roleFlag = true;
                  } else {
                    for (let i = 0; i < roleId.length; i++) {
                      const role = roleId[i];
                      if (!basicIntial.RoleID?.includes(role)) {
                        roleFlag = true;
                      }
                    }
                  }

                  // const rmName = values.ReportingManagerFullName
                  //   ? values.ReportingManagerFullName
                  //   : "";
                  // if (!rmName.trim()) {
                  //   rmId = null;
                  // }

                  if (
                    rmId !== basicIntial.ReportingManagerEmployeeGuID &&
                    rmId !== undefined
                  ) {
                    UpdatedDetails.ReportingManagerEmployeeGuID = rmId
                      ? rmId
                      : null;
                  }
                  if (values.FullName !== basicIntial.FullName) {
                    UpdatedDetails.FullName = values.FullName;
                  }
                  if (values.Username !== basicIntial.Username) {
                    UpdatedDetails.Username = values.Username;
                  }
                  if (
                    values.CommunicationEmailAddress !==
                    basicIntial.CommunicationEmailAddress
                  ) {
                    UpdatedDetails.CommunicationEmailAddress =
                      values.CommunicationEmailAddress;
                  }
                  if (values.EmployeeID !== basicIntial.EmployeeID) {
                    UpdatedDetails.EmployeeID = values.EmployeeID;
                  }
                  if (
                    values.TotalYearsOfExperience !==
                    basicIntial.TotalYearsOfExperience
                  ) {
                    UpdatedDetails.TotalYearsOfExperience =
                      values.TotalYearsOfExperience;
                  }
                  if (DepartmentId !== basicIntial.DepartmentId) {
                    UpdatedDetails.DepartmentId = DepartmentId;
                  }
                  if (DesignationId !== basicIntial.DesignationId) {
                    UpdatedDetails.DesignationId = DesignationId;
                  }
                  if (values.HourlyCost !== basicIntial.HourlyCost) {
                    UpdatedDetails.HourlyCost = values.HourlyCost;
                  }
                  if (roleFlag) {
                    UpdatedDetails.RoleID = roleId;
                  }
                  if (
                    new Date(basicIntial.JoiningDate).toLocaleDateString() !==
                    new Date(values.JoiningDate).toLocaleDateString()
                  ) {
                    UpdatedDetails.JoiningDate = new Date(
                      values.JoiningDate,
                    ).toISOString();
                  }

                  if (Object.keys(UpdatedDetails).length) {
                    disPatch(resetEmpUpdateAction());
                    const res = await disPatch(
                      updateEmpDetailsApi({
                        UpdatedDetails,
                        id: empID,
                      }),
                    );

                    if (res?.payload?.code === 200) {
                      // resetForm()
                      disPatch(
                        editEmpDetails({
                          ...values,
                          ...UpdatedDetails,
                          DepartmentId,
                          RoleID: roleId,
                        }),
                      );
                      setLoading(false);
                    }
                    setLoading(false);
                    UpdatedDetails = {};
                  } else {
                    toast.info("Provided details are already up to date");
                    setLoading(false);
                  }
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                getFieldProps,
                setFieldValue,
                resetForm,

                /* and other goodies */
              }) => (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="basic-info"
                >
                  <div
                    style={{
                      padding: "0rem 1.5rem",

                      borderRadius: 7,
                    }}
                  >
                    {currentRole ? (
                      <Alert
                        message={
                          currentRole
                            ? "Only admin has the access to edit employee basic Info"
                            : ""
                        }
                        type="error"
                        showIcon
                        style={{ margin: "0.1rem 0" }}
                      />
                    ) : (
                      ""
                    )}

                    <Row gutter={[8, 2]}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          style={{
                            padding: "0",
                          }}
                          label="Full Name"
                          validateStatus={
                            Boolean(errors.FullName && touched.FullName)
                              ? "error"
                              : "success"
                          }
                          help={
                            <ErrorMessage name={"FullName"} component="span" />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <Input
                            placeholder="Name"
                            style={{ width: "100%" }}
                            suffix={<UserOutlined style={iconColor} />}
                            {...getFieldProps("FullName")}
                            disabled={currentRole}
                            maxLength={100}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="User Name"
                          validateStatus={
                            Boolean(errors.Username && touched.Username)
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage name={"Username"} component="span" />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <Input
                            placeholder="example@g7cr.com"
                            style={{ width: "100%" }}
                            suffix={<ImUserCheck style={iconColor} />}
                            {...getFieldProps("Username")}
                            disabled={currentRole}
                            maxLength={150}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Communication Email"
                          validateStatus={
                            Boolean(
                              errors.CommunicationEmailAddress &&
                                touched.CommunicationEmailAddress,
                            )
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"CommunicationEmailAddress"}
                              component="span"
                            />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <Input
                            placeholder="example@gmail.com"
                            style={{ width: "100%" }}
                            suffix={<MdAttachEmail style={iconColor} />}
                            {...getFieldProps("CommunicationEmailAddress")}
                            disabled={currentRole}
                            maxLength={150}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Employee ID"
                          validateStatus={
                            Boolean(errors.EmployeeID && touched.EmployeeID)
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"EmployeeID"}
                              component="span"
                            />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <Input
                            placeholder="Employee ID"
                            type="text"
                            style={{
                              width: "100%",
                              textTransform: "capitalize",
                            }}
                            suffix={<FaUserTie style={iconColor} />}
                            {...getFieldProps("EmployeeID")}
                            disabled={currentRole}
                            maxLength={20}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Joining Date"
                          validateStatus={
                            Boolean(errors.JoiningDate && touched.JoiningDate)
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"JoiningDate"}
                              component="span"
                            />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <DatePicker
                            style={{ width: "100%", color: "#2563eb" }}
                            placeholder="Joining Date"
                            placement="topLeft"
                            value={
                              values.JoiningDate
                                ? dayjs(values.JoiningDate)
                                : undefined
                            }
                            onChange={(dateString) =>
                              setFieldValue("JoiningDate", dateString)
                            }
                            suffixIcon={<CalendarOutlined />}
                            disabled={currentRole}
                            disabledDate={(current) => {
                              return current.isAfter(
                                dayjs(todyformattedDate, "YYYY-MM"),
                                "month",
                              );
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Years Of Experience"
                          validateStatus={
                            Boolean(errors.TotalYearsOfExperience)
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"TotalYearsOfExperience"}
                              component="span"
                            />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <Input
                            placeholder="Experience In Year"
                            style={{ width: "100%" }}
                            type="number"
                            min={0}
                            suffix={<BsPersonWorkspace style={iconColor} />}
                            value={values.TotalYearsOfExperience}
                            onChange={(value) =>
                              setFieldValue(
                                "TotalYearsOfExperience",
                                parseInt(value.target.value),
                              )
                            }
                            // {...getFieldProps("TotalYearsOfExperience")}
                            disabled={currentRole}
                            pattern="[0-9]"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Designation"
                          validateStatus={
                            Boolean(
                              errors.DesignationName && touched.DesignationName,
                            )
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"DesignationName"}
                              component="span"
                            />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <Select
                            showSearch
                            allowClear
                            optionFilterProp="children"
                            value={
                              values.DesignationName
                                ? values.DesignationName
                                : null
                            }
                            placeholder="Select Designation"
                            onChange={(DesignationName) =>
                              setFieldValue("DesignationName", DesignationName)
                            }
                            suffixIcon={<MdWork style={iconColor} />}
                            disabled={currentRole}
                          >
                            {disgOptions.map((disg, index) => (
                              <Select.Option key={index} value={disg.value}>
                                {disg.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Department"
                          validateStatus={
                            Boolean(
                              errors.DepartmentName && touched.DepartmentName,
                            )
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"DepartmentName"}
                              component="span"
                            />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <Select
                            showSearch
                            allowClear
                            placeholder="Select Department"
                            optionFilterProp="children"
                            value={
                              values.DepartmentName
                                ? values.DepartmentName
                                : null
                            }
                            onChange={(DepartmentName) =>
                              setFieldValue("DepartmentName", DepartmentName)
                            }
                            suffixIcon={<FcDepartment style={iconColor} />}
                            disabled={currentRole}
                          >
                            {" "}
                            {departments.map((dept, index) => (
                              <Select.Option key={index} value={dept.value}>
                                {dept.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item
                          label={
                            <span>
                              Hourly Cost ({" "}
                              <FontAwesomeIcon
                                fontSize={14}
                                style={iconColor}
                                icon={faDollarSign}
                              />{" "}
                              )
                            </span>
                          }
                          validateStatus={
                            Boolean(errors.HourlyCost && touched.HourlyCost)
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"HourlyCost"}
                              component="span"
                            />
                          }
                          required
                          labelCol={{ span: 24 }}
                        >
                          <Input
                            placeholder="Amount"
                            style={{ width: "100%" }}
                            type="number"
                            maxLength={21}
                            suffix={
                              <FontAwesomeIcon
                                fontSize={15}
                                style={iconColor}
                                icon={faDollarSign}
                              />
                            }
                            {...getFieldProps("HourlyCost")}
                            disabled={currentRole}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                        <Form.Item
                          style={{
                            padding: "0",
                            fontSize: "5px",
                          }}
                          label="Reporting Manager"
                          validateStatus={
                            Boolean(
                              errors.ReportingManagerFullName &&
                                touched.ReportingManagerFullName,
                            )
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"ReportingManagerFullName"}
                              component="span"
                            />
                          }
                          labelCol={{ span: 24 }}
                        >
                          <Select
                            showSearch
                            allowClear
                            removeIcon
                            disabled={currentRole}
                            optionFilterProp="children"
                            value={
                              values.ReportingManagerFullName
                                ? values.ReportingManagerFullName
                                : null
                            }
                            placeholder="Select Reporting Manager"
                            onChange={(rmName) =>
                              setFieldValue("ReportingManagerFullName", rmName)
                            }
                            suffixIcon={<GrUserManager style={iconColor} />}
                            listHeight={130}
                          >
                            {rmOptions.map((rm, index) => (
                              <Select.Option
                                key={index}
                                value={rm.value}
                                disabled={rm.value.split("|")[1] === empID}
                              >
                                {getTitleCase(rm.label)}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="Additional Roles"
                          validateStatus={
                            Boolean(
                              errors.AdditionalRoles && touched.AdditionalRoles,
                            )
                              ? "error"
                              : ""
                          }
                          help={
                            <ErrorMessage
                              name={"AdditionalRoles"}
                              component="span"
                            />
                          }
                          labelCol={{ span: 24 }}
                        >
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            value={
                              values.AdditionalRoles
                                ? values.AdditionalRoles
                                : null
                            }
                            placeholder="Select Role"
                            onChange={(roles) =>
                              setFieldValue("AdditionalRoles", roles)
                            }
                            disabled={currentRole}
                          >
                            {roleOptions.map((option, index) => (
                              <Select.Option
                                key={index}
                                value={option.value}
                                disabled={
                                  option.value === "Admin" && currentRole
                                }
                              >
                                {option.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    {!currentRole ? (
                      <Alert
                        message={
                          "Every user will be assigned the default role of Employee."
                        }
                        type="info"
                        showIcon
                        style={{ margin: "1rem 0" }}
                      />
                    ) : (
                      ""
                    )}

                    <Divider />
                    {currentRole ? (
                      ""
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "1rem 0.5rem",
                          margin: "0.5rem 0",
                        }}
                      >
                        {empID ? (
                          <Button
                            className="cancel_btn"
                            onClick={() => {
                              navigate(EmployeeManagementLink.EMPLOYEE_LSIT);
                              disPatch(resetBasicEmpDatails());
                              disPatch(empResetStatusAction());
                              disPatch(resetEmpUpdateAction());
                              disPatch(resetAddCertificateAction());
                              disPatch(resetEmpCertificateAction());
                              disPatch(resetProjectAction());
                              disPatch(resetCertificateAction());
                            }}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            className="cancel_btn"
                            icon={<BiReset style={{ color: "#ffff" }} />}
                            htmlType="reset"
                            onClick={() => {
                              resetForm();
                              disPatch(resetBasicEmpDatails());
                            }}
                          >
                            Reset
                          </Button>
                        )}

                        <Button
                          loading={loading}
                          className="submit_btn"
                          icon={<CheckCircleTwoTone />}
                          htmlType="submit"
                        >
                          {loading ? "Processing" : "Submit"}
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BasicInfoCopy;
