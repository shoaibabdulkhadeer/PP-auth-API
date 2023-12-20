import { Col, Row } from "antd";
import { useState } from "react";
import {
  EmployeeManagementLink,
  EmployeeManagementNav,
} from "../../shared/enums";
import "../../assets/styles/styles.css";
import { useNavigate } from "react-router-dom";
const EmployeeManagementHeader = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const handleLink = (item: string, url: string) => {
    setActiveLink(item);
    navigate(url);
  };
  const listStyle: any = {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    margin: "0.5rem 0",
  };
  return (
    <Row
      gutter={[10, 10]}
      justify={"space-evenly"}
      style={{
        background: "rgb(250 250 249)",
        padding: "1rem",
        borderRadius: 7,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
        width: "100%",
        marginBottom: "1rem",
      }}
    >
      <Col>
        <span
          style={listStyle}
          className={`emp_management ${
            activeLink === "BASIC_INFO" ? "active" : "inactive"
          }`}
          onClick={() =>
            handleLink(
              EmployeeManagementNav.BASIC_INFO,
              EmployeeManagementLink.BASIC_INFO,
            )
          }
        >
          BASIC INFO
        </span>
      </Col>
      <Col>
        <span
          style={listStyle}
          className={`emp_management ${
            activeLink === "PROJECT" ? "active" : "inactive"
          }`}
          onClick={() =>
            handleLink(
              EmployeeManagementNav.PROJECT,
              EmployeeManagementLink.PROJECT,
            )
          }
        >
          PROJECTS
        </span>
      </Col>
      <Col>
        <span
          style={listStyle}
          className={`emp_management ${
            activeLink === "CERTIFICATE" ? "active" : "inactive"
          }`}
          onClick={() =>
            handleLink(
              EmployeeManagementNav.CERTIFICATE,
              EmployeeManagementLink.CERTIFICATE,
            )
          }
        >
          CERTIFICATE
        </span>
      </Col>
      <Col>
        <span
          style={listStyle}
          className={`emp_management ${
            activeLink === "SKILLS" ? "active" : "inactive"
          }`}
          onClick={() =>
            handleLink(
              EmployeeManagementNav.SKILLS,
              EmployeeManagementLink.SKILLS,
            )
          }
        >
          SKILLS
        </span>
      </Col>
    </Row>
  );
};

export default EmployeeManagementHeader;
