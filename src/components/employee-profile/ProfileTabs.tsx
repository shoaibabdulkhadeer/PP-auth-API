import { FolderOpenFilled, SafetyCertificateFilled } from "@ant-design/icons";
import {
  faFileDownload,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { downloadEmployeeCsvReport } from "../../redux/features/employee/employeeDownloadCsvSlice";
import { RootState } from "../../redux/store";
import CertificationsContent from "./CertificationsContent";
import EmployeeProfileCard from "./EmployeeProfileCard";
import "./ProfileTabs.css";
import ProjectDetailsContent from "./ProjectDetailsContent";
import SkillsContent from "./SkillsContent";
import { useNavigate } from "react-router-dom";
import { ErrorPages, ProjectTypes } from "../../shared/enums";
import { getProjects } from "../../redux/features/common-features/projectSlice";

const ProfileTabs2 = () => {
  const [selectedButton, setSelectedButton] = useState("Employee Profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // GETTING EMPLOYEE DATA FROM STORE
  const { employeeData }: any = useSelector(
    (state: RootState) => state.EmpProfileAction,
  );
  //GETTING CSV REPORT LOADING VALUE FROM DOWNLOAD CSV REPORT SLICE
  const { csvDataLoading }: any = useSelector(
    (state: RootState) => state.EmpDownloadCsvAction,
  );

  const buttonStyle = {
    fontFamily: "'Roboto', sans-serif",
    height: "43px",
    color: "rgba(76, 78, 100, 0.87)",
    cursor: "pointer",
    transition: "all 0.3s",
    border: "none",
    width: "100%",
    backgroundColor: "#f5f5f5",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  };

  const reportButtonStyle = {
    fontFamily: "'Roboto', sans-serif",
    height: "43px",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s",
    border: "none",
    width: "100%",
    backgroundColor: "#87D068",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  };

  const selectedButtonStyle = {
    ...buttonStyle,
    height: "43px",
    backgroundColor: "#666CFF ",
    color: "#fff",
  };

  const handleButtonClick = (buttonName: any) => {
    setSelectedButton(buttonName);
  };

  //#region MONTHLY REPORT DOWNLOAD
  const handleReportDownload = async () => {
    try {
      const reportResponse = await dispatch(downloadEmployeeCsvReport());

      if (reportResponse?.payload?.data?.code === 500) {
        navigate(ErrorPages.ERROR_500);
      } else if (
        reportResponse?.payload?.data?.code === 200 &&
        reportResponse?.payload?.data?.data.length === 0
      ) {
        toast.warning("No report uploaded yet");
      } else {
        // CREATE A BLOB CONTAINING THE CSV DATA
        const blob = new Blob([reportResponse?.payload?.data], {
          type: "text/csv",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Report_${
          employeeData.Username
        }_${new Date().getTime()}.csv`;
        document.body.appendChild(a);

        a.click();

        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast.warning("Something went wrong please try again later");
    }
  };
  //#endregion

  return (
    <React.Fragment>
      <Row gutter={[16, 16]} className="tabs-parent">
        <div>
          <div className="grid-child-a">
            <Button
              className="tabs-buttons"
              style={
                selectedButton === "Employee Profile"
                  ? selectedButtonStyle
                  : buttonStyle
              }
              block
              onClick={() => handleButtonClick("Employee Profile")}
            >
              <FontAwesomeIcon
                size="lg"
                icon={faUser}
                style={{ marginRight: "8px" }}
              />{" "}
              PROFILE
            </Button>
          </div>
        </div>

        <div>
          <div className="grid-child-b">
            <Button
              className="tabs-buttons"
              style={
                selectedButton === "Projects"
                  ? selectedButtonStyle
                  : buttonStyle
              }
              block
              onClick={async () => {
                await dispatch(
                  getProjects({ projectStatus: ProjectTypes.ACTIVE, page: 1 }),
                );
                handleButtonClick("Projects");
              }}
            >
              <FolderOpenFilled style={{ fontSize: "1.1rem" }} />
              PROJECTS
            </Button>
          </div>
        </div>

        <div>
          <div className="grid-child-c">
            <Button
              className="tabs-buttons"
              style={
                selectedButton === "Certifications"
                  ? selectedButtonStyle
                  : buttonStyle
              }
              block
              onClick={() => handleButtonClick("Certifications")}
            >
              <SafetyCertificateFilled style={{ fontSize: "1.1rem" }} />
              &nbsp;&nbsp; CERTIFICATIONS
            </Button>
          </div>
        </div>

        <div>
          <div className="grid-child-d">
            <Button
              className="tabs-buttons"
              style={
                selectedButton === "Skills" ? selectedButtonStyle : buttonStyle
              }
              block
              onClick={() => handleButtonClick("Skills")}
            >
              <FontAwesomeIcon
                size="lg"
                icon={faTrophy}
                style={{ marginRight: "8px" }}
              />{" "}
              SKILLS
            </Button>
          </div>
        </div>
        <div>
          <div className="grid-child-e">
            <Button
              loading={csvDataLoading}
              className="tabs-export-buttons"
              size="large"
              onClick={handleReportDownload}
              style={reportButtonStyle}
            >
              <FontAwesomeIcon size="lg" icon={faFileDownload} />
              &nbsp;&nbsp;EXPORT MONTHLY REPORT
            </Button>
          </div>
        </div>
      </Row>

      {selectedButton === "Employee Profile" && <EmployeeProfileCard />}
      {selectedButton === "Projects" && <ProjectDetailsContent />}
      {selectedButton === "Certifications" && <CertificationsContent />}
      {selectedButton === "Skills" && <SkillsContent />}
    </React.Fragment>
  );
};

export default ProfileTabs2;
