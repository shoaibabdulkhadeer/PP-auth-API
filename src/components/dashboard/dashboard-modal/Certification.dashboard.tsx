import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Descriptions, Empty, Row, Tooltip } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import NoSkills from "../../../assets/image/No-Certification.svg";
import { RootState } from "../../../redux/store";
import { LoadingOutlined } from "@ant-design/icons";

const CertificatesData: React.FC = () => {
  const { Certification } = useSelector(
    (state: RootState) => state.ModalAction.modalData || {},
  );
  const { modalLoading }: any = useSelector(
    (state: RootState) => state.ModalAction,
  );

  if (modalLoading) {
    return (
      <LoadingOutlined
        style={{
          fontSize: 30,
          display: "flex",
          justifyContent: "center",
          marginTop: "1%",
        }}
      />
    );
  }

  if (Certification && Certification.length === 0) {
    return (
      <Empty
        className="err-message400"
        image={NoSkills}
        imageStyle={{ height: 200 }}
        description="No certification achieved"
      />
    );
  }

  return (
    <Row gutter={16}>
      {Certification.map((certificate: any, index: number) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={12} key={index}>
          <Card
            size="small"
            title={certificate.CertificationName}
            extra={
              <Tooltip
                color="#626477"
                placement="bottomRight"
                title={
                  <>
                    <span>DESCRIPTION</span>
                    <hr />
                    <span>{certificate.Description}</span>
                  </>
                }
              >
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ fontSize: "15px" }}
                />
              </Tooltip>
            }
            className="certification-card"
          >
            <Descriptions
              items={[
                {
                  key: certificate.UploadedOn,
                  label: "Uploaded On",
                  children: new Date(
                    Number(certificate.UploadedOn * 1000),
                  ).toLocaleString(),
                },
              ]}
              column={1}
              layout="horizontal"
              size="middle"
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CertificatesData;
