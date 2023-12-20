import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../redux/features/common-features/projectSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { EmployeeManagementLink, ProjectTypes } from "../../../shared/enums";
import { useNavigate } from "react-router-dom";
import ProjectsDetails from "../../common-components/projects/Project";
import { Card, Col, Row } from "antd";
import { cardShadow } from "../../../utils/commonCSS";
import Title from "antd/es/typography/Title";
import { FolderOpenOutlined } from "@ant-design/icons";
import EmployeeInfo from "../EmployeeInfo";

const EmpProjects = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch<AppDispatch>();
  const { basicIntial, empID } = useSelector(
    (state: RootState) => state.EmpGetALlAction,
  );
  useEffect(() => {
    if (!empID) {
      navigate(EmployeeManagementLink.EMPLOYEE_LSIT);
    }
    disPatch(getProjects(basicIntial.EmployeeGuID));
  }, [disPatch, basicIntial.EmployeeGuID, empID, navigate]);

  return (
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
              <FolderOpenOutlined /> PROJECTS
            </Title>
          </Col>
          <Col md={8}>
            {" "}
            <EmployeeInfo />
          </Col>
          <Col md={8}> </Col>
        </Row>
      }
    >
      <ProjectsDetails type={ProjectTypes.EMP_MANAGEMENT} />
    </Card>
  );
};
export default EmpProjects;
