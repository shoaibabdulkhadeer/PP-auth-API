import { useSelector } from "react-redux";
import { Card, Row, Col, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faIdBadge,
  faBuilding,
  faCalendar,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import "./EmployeeProfileCard.css";
import ProfileProjectDetails from "./ProfileProjectDetails";
import { RootState } from "../../redux/store";
import { getTitleCase } from "../../common/common";
import ProjectTable from "../common-components/projects/ProjectTable";
import { ProjectTypes } from "../../shared/enums";

const EmployeeProfileCard = () => {
  // GETTING DATA FROM STORE
  const { employeeData, employeeDataLoading }: any = useSelector(
    (state: RootState) => state.EmpProfileAction,
  );
  const { activeProjects, pastProjects } = useSelector(
    (state: RootState) => state.ProjectAction,
  );

  const recentActiveProjects = activeProjects.map((ele) => {
    return {
      status: true,
      ProjectName: ele.ProjectName,
      ProjectDescription: ele.ProjectDescription,
      StartDate: ele.StartDate,
      EndDate: ele.EndDate,
    };
  });
  const recentPastProjects = pastProjects.map((ele) => {
    return {
      status: false,
      ProjectName: ele.ProjectName,
      ProjectDescription: ele.ProjectDescription,
      StartDate: ele.StartDate,
      EndDate: ele.EndDate,
    };
  });
  const allProjects = [...recentActiveProjects, ...recentPastProjects];

  let recentProjectData = allProjects
    .slice()
    .sort((a: any, b: any) => {
      const dateA = new Date(a.StartDate);
      const dateB = new Date(b.StartDate);

      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 6);

  const recentProjects = {
    className: "activeProjects",
    data: recentProjectData,
    TableTitle: "RECENT PROJECTS",
    loading: false,
    noData: "No Projects",
    type: ProjectTypes.RECCENT_PROJECTS,
  };
  return (
    <div className="emp-profile-div">
      {employeeDataLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={10}>
            {/* ABOUT SECTION */}
            <Col lg={8} md={24} sm={24} xs={24}>
              <Card title="ABOUT " className="emp-profile">
                <div className="emp-profile-details">
                  <div className="child1">
                    <div>
                      <div className="emp-det-title">
                        <FontAwesomeIcon icon={faUser} />
                        &nbsp;&nbsp;Full Name
                      </div>
                      <div className="emp-det">
                        {employeeData?.FullName
                          ? getTitleCase(employeeData?.FullName)
                          : "NA"}
                      </div>
                    </div>

                    <div>
                      <div className="emp-det-title">
                        <FontAwesomeIcon icon={faIdBadge} />
                        &nbsp;&nbsp;Username
                      </div>
                      <div className="emp-det">
                        {employeeData?.Username ? employeeData?.Username : "NA"}
                      </div>
                    </div>

                    <div>
                      <div className="emp-det-title">
                        <FontAwesomeIcon icon={faBuilding} />
                        &nbsp;&nbsp;Department
                      </div>
                      <div className="emp-det">
                        {employeeData?.department?.DepartmentName
                          ? getTitleCase(
                              employeeData?.department?.DepartmentName,
                            )
                          : "NA"}
                      </div>
                    </div>

                    <div>
                      <div className="emp-det-title">
                        <FontAwesomeIcon icon={faEnvelope} />
                        &nbsp;&nbsp;Communication Email Address
                      </div>
                      <div className="emp-det">
                        {employeeData?.CommunicationEmailAddress
                          ? employeeData?.CommunicationEmailAddress
                          : "NA"}
                      </div>
                    </div>
                  </div>
                  {/* Finished Child1 */}
                  <div className="child2">
                    <div>
                      <div className="emp-det-title">
                        <FontAwesomeIcon icon={faUser} />
                        &nbsp;&nbsp;Reporting Manager
                      </div>
                      <div className="emp-det">
                        {employeeData?.reportingManager?.FullName
                          ? getTitleCase(
                              employeeData?.reportingManager?.FullName,
                            )
                          : "NA"}
                      </div>
                    </div>
                    <div>
                      <div className="emp-det-title">
                        <FontAwesomeIcon icon={faCalendar} />
                        &nbsp;&nbsp;Joining Date
                      </div>
                      <div className="emp-det">
                        {employeeData?.JoiningDate
                          ? employeeData?.JoiningDate
                          : "NA"}
                      </div>
                    </div>

                    <div>
                      <div className="emp-det-title">
                        <FontAwesomeIcon icon={faClock} />
                        &nbsp;&nbsp;Total Years Of Experience
                      </div>
                      <div className="emp-det">
                        {employeeData?.TotalYearsOfExperience
                          ? employeeData?.TotalYearsOfExperience
                          : "Fresher "}
                      </div>
                    </div>
                  </div>
                  {/* FINISHED CHILD2 */}
                </div>
              </Card>
            </Col>

            {/* PROJECT DETAILS SECTION */}
            <Col lg={16} md={24} sm={24}>
              <ProjectTable {...recentProjects} />
              <ProfileProjectDetails />
            </Col>
          </Row>
          <Row gutter={10}></Row>
        </>
      )}
    </div>
  );
};

export default EmployeeProfileCard;
