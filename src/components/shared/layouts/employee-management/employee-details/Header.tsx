import {
  FolderOpenOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Tooltip } from "antd";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCertificateAction } from "../../../../../redux/features/common-features/certificateSlice";
import { resetEmpCertificateAction } from "../../../../../redux/features/common-features/empCertificateSlice";
import { resetProjectAction } from "../../../../../redux/features/common-features/projectSlice";
import { resetBasicEmpDatails } from "../../../../../redux/features/employee-management/empGetAllSlice";
import { empResetStatusAction } from "../../../../../redux/features/employee-management/empStatusSlice";
import { resetEmpUpdateAction } from "../../../../../redux/features/employee-management/empUpdateSlice";
import { resetAddCertificateAction } from "../../../../../redux/features/employee/employeeAddCertificateSlice";
import { AppDispatch, RootState } from "../../../../../redux/store";
import {
  EmployeeManagementLink,
  EmployeeManagementNav,
} from "../../../../../shared/enums";
import "./Header.css";
const EmployeeManagementHeader = () => {
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  const disPatch = useDispatch<AppDispatch>();
  const [activeLink, setActiveLink] = useState<string>(
    EmployeeManagementNav.BASIC_INFO,
  );
  const navigate = useNavigate();
  const handleLink = (item: string, url: string) => {
    setActiveLink(item);
    navigate(url);
  };
  return (
    <div style={{ margin: "0", borderRadius: "15px" }}>
      <Row
        gutter={[3, 3]}
        justify={"space-between"}
        align={"middle"}
        style={{
          // background: "rgb(250 250 249)",
          padding: "0 0 1rem 0",
          marginLeft: "0px !important",
          marginRight: "0px !important",
          borderRadius: "15px",
        }}
      >
        <Col xs={5}>
          <button
            className={`emp_management ${
              activeLink === EmployeeManagementNav.BASIC_INFO
                ? "active"
                : "inactive"
            } `}
            // style={listStyle}
            id="emp_management"
            onClick={() =>
              handleLink(
                EmployeeManagementNav.BASIC_INFO,
                EmployeeManagementLink.BASIC_INFO,
              )
            }
            disabled={empID ? false : true}
          >
            <UserOutlined /> BASIC INFO
          </button>
        </Col>
        <Col xs={5}>
          <button
            disabled={empID ? false : true}
            style={{ cursor: empID ? "pointer" : "not-allowed" }}
            // style={listStyle}
            id="emp_management"
            className={`emp_management ${
              activeLink === EmployeeManagementNav.PROJECT
                ? "active"
                : "inactive"
            }`}
            onClick={() =>
              handleLink(
                EmployeeManagementNav.PROJECT,
                EmployeeManagementLink.PROJECT,
              )
            }
          >
            <FolderOpenOutlined /> PROJECTS
          </button>
        </Col>
        <Col xs={5}>
          <button
            disabled={empID ? false : true}
            style={{ cursor: empID ? "pointer" : "not-allowed" }}
            id="emp_management"
            className={`emp_management ${
              activeLink === EmployeeManagementNav.CERTIFICATE
                ? "active"
                : "inactive"
            }`}
            onClick={() =>
              handleLink(
                EmployeeManagementNav.CERTIFICATE,
                EmployeeManagementLink.CERTIFICATE,
              )
            }
          >
            <SafetyCertificateOutlined /> CERTIFICATE
          </button>
        </Col>
        <Col xs={5}>
          <button
            disabled={empID ? false : true}
            style={{ cursor: empID ? "pointer" : "not-allowed" }}
            id="emp_management"
            className={`emp_management ${
              activeLink === EmployeeManagementNav.SKILLS
                ? "active"
                : "inactive"
            }`}
            onClick={() =>
              handleLink(
                EmployeeManagementNav.SKILLS,
                EmployeeManagementLink.SKILLS,
              )
            }
          >
            <StarOutlined /> SKILLS
          </button>
        </Col>
        <Col xs={2}>
          {" "}
          <Tooltip placement="top" title="Go back">
            <button
              className="btnCancel"
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
              <FaLongArrowAltLeft />
            </button>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeManagementHeader;
