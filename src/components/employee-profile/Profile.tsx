import { useEffect } from "react";
import "./Profile.css";
import { Card, Col, Layout, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import ProfileTabs2 from "./ProfileTabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchEmployeeBasicInfo } from "../../redux/features/employee/employeeProfileSlice";
import { fetchCertificatesById } from "../../redux/features/employee/employeeFetchCertificateSlice";
import { fetchEmployeeSkills } from "../../redux/features/employee/employeeSkillsSlice";
import "react-toastify/dist/ReactToastify.css";
import { getTitleCase } from "../../common/common";
import { faBuilding, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ErrorPages, ProjectTypes } from "../../shared/enums";
import { getProjects } from "../../redux/features/common-features/projectSlice";

const Profile = () => {
  const { Content } = Layout;
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //#region FETCH ALL DATA ON LOADING FOR A PARTICULAR EMPLOYEE ID

  const fetchData = async () => {
    const resultFetchEmp = await dispatch(fetchEmployeeBasicInfo());

    if (resultFetchEmp?.payload?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }

    //FETCH PROJECT BASIC INFO
    const resultFetchActiveProject = await dispatch(
      getProjects({ projectStatus: ProjectTypes.ACTIVE, page: 1 }),
    );

    if (resultFetchActiveProject?.payload?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }
    //FETCH PROJECT BASIC INFO
    const resultFetchPastProject = await dispatch(
      getProjects({ projectStatus: ProjectTypes.PAST, page: 1 }),
    );

    if (resultFetchPastProject?.payload?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }

    //FETCH CERTIFICATES
    const resultFetchCert = await dispatch(fetchCertificatesById());

    if (resultFetchCert?.payload?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }
    //FETCH EMPLOYEE SKILLS
    const resultFetchSkills = await dispatch(fetchEmployeeSkills());
    if (resultFetchSkills?.payload?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }
    // }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  // GETTING EMPLOYEE DATA FROM STORE
  const { employeeData }: any = useSelector(
    (state: RootState) => state.EmpProfileAction,
  );

  return (
    <div>
      <Layout>
        <Content>
          <Card className="banner-card">
            {/* Icon starting */}
            <Row gutter={16} className="user-profile">
              <Col>
                <Avatar
                  className="profile-avatar"
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col>
                <Title className="banner-name">
                  {getTitleCase(employeeData?.FullName)}
                </Title>
              </Col>
            </Row>
          </Card>
          {/* BANNER EMPLOYEE DETAILS */}
          <div className="employee-summary">
            <Row gutter={[16, 16]}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                className="banner-details-parent"
              >
                <div>
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "14px",
                      color: "rgba(76, 78, 100, 0.87)",
                      marginRight: "1rem",
                    }}
                  >
                    <FontAwesomeIcon size="lg" icon={faEnvelope} /> &nbsp;
                    {employeeData?.CommunicationEmailAddress || "NA"}
                  </Text>
                </div>
                <div>
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "14px",
                      color: "rgba(76, 78, 100, 0.87)",
                      marginRight: "1rem",
                    }}
                  >
                    <FontAwesomeIcon size="lg" icon={faSuitcase} /> &nbsp;
                    {getTitleCase(employeeData?.designation?.DesignationName) ||
                      "NA"}
                  </Text>
                </div>
                <div>
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "14px",
                      color: "rgba(76, 78, 100, 0.87)",
                      marginRight: "1rem",
                    }}
                  >
                    <FontAwesomeIcon size="lg" icon={faBuilding} /> &nbsp;
                    {getTitleCase(employeeData?.department?.DepartmentName) ||
                      "NA"}
                  </Text>
                </div>
              </Col>
            </Row>
          </div>

          <ProfileTabs2 />
        </Content>
      </Layout>
    </div>
  );
};

export default Profile;
