import { Card, Col, Row } from "antd";
import "./ProfileProjectDetails.css";
import ProfileCertificateDetails from "./ProfileCertificateDetails";
import ProfileSkillsDetails from "./ProfileSkillsDetails";
const ProfileProjectDetails = () => {
  return (
    <>
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Card title={"CERTIFICATIONS"} bodyStyle={{ height: "14rem" }}>
              <ProfileCertificateDetails />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Card
              title={"SKILLS"}
              bodyStyle={{ height: "14rem", overflowY: "auto" }}
            >
              <ProfileSkillsDetails />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileProjectDetails;
