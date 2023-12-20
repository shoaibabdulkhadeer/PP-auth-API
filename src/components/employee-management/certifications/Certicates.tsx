import { PlusOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  downloadEmployeeCertificate,
  getCerificates,
} from "../../../redux/features/common-features/certificateSlice";
import { fetchCertificatesById } from "../../../redux/features/common-features/empCertificateSlice";
import { resetAddCertificateAction } from "../../../redux/features/employee/employeeAddCertificateSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { cardShadow, toolTipCss } from "../../../utils/commonCSS";
import NoData from "../NoData";
// import { UploadModal } from "./UploadCertificate";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../../common/common";
import { EmployeeManagementLink, ErrorPages } from "../../../shared/enums";
import { AddNewCerticate } from "./UploadCertificate";
import EmployeeInfo from "../EmployeeInfo";
const CertificatesTable = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch<AppDispatch>();
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  const { addCertificateDataLoading, addCertMsg, addCertResCode } = useSelector(
    (state: RootState) => state.EmpAddCertificateAction,
  );
  const { certificateData } = useSelector(
    (state: RootState) => state.EmpCertificateGetAction,
  );
  useEffect(() => {
    if (!empID) {
      navigate(EmployeeManagementLink.EMPLOYEE_LSIT);
    }
    disPatch(getCerificates());
    disPatch(fetchCertificatesById(empID));
    if (addCertResCode === 200) {
      toast.success("Certificate added successfully");
    } else if (addCertResCode === 400) {
      toast.warning(addCertMsg);
    } else if (addCertResCode === 500) {
      navigate(ErrorPages.ERROR_500);
    }
  }, [
    disPatch,
    addCertificateDataLoading,
    empID,
    addCertMsg,
    addCertResCode,
    navigate,
  ]);

  const [open, setOpen] = useState(false);

  const modalControll = () => {
    setOpen(!open);
    disPatch(resetAddCertificateAction());
  };
  const empCertificateGuids: string[] = [];
  const EmpCertificate = certificateData.map((cert: any) => {
    empCertificateGuids.push(cert.CertificationGuIdInfo.CertificationGuId);
    return {
      CertificationName: cert.CertificationGuIdInfo.CertificationName,
      CertificationGuId: cert.CertificationGuIdInfo.CertificationGuId,
      UploadedOn: getFormattedDate(cert.CreatedAt),
      CreatedAt: cert.CertificationGuIdInfo.CreatedAt,
    };
  });
  const downloadCertificateHandler = async (payload: any, fileName: string) => {
    fileName = `${fileName.split(" ").join("-")}_${new Date().getTime()}.pdf`;
    await disPatch(downloadEmployeeCertificate({ ...payload, fileName }));
  };
  const columns = [
    {
      title: "CERTIFICATE NAME",
      dataIndex: "CertificationName",
      key: "CertificationName",
    },

    {
      title: "UPLOADED ON",
      key: "UploadedOn",
      dataIndex: "UploadedOn",
    },
    {
      title: "ACTION",
      key: "action",
      width: 250,
      render: (_: any, record: any) => (
        <Space direction="horizontal">
          <Tooltip
            placement="top"
            title={
              <span style={toolTipCss}>Click Here To Download Certificate</span>
            }
          >
            <Button
              icon={<FontAwesomeIcon size="lg" icon={faDownload} />}
              style={{ background: "#2bd4ae", color: "white" }}
              onClick={() =>
                downloadCertificateHandler(
                  {
                    EmployeeGuID: empID,
                    CertificationGuId: record.CertificationGuId,
                  },
                  record.CertificationName,
                )
              }
            >
              DOWNLOAD
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Card
        style={cardShadow}
        title={
          <Row align={"middle"}>
            <Col md={8}>
              <Title
                level={5}
                style={{ color: "rgb(119 123 129)", margin: "0px" }}
              >
                <SafetyCertificateOutlined /> CERTIFICATIONS
              </Title>
            </Col>
            <Col md={8}>
              {" "}
              <EmployeeInfo />
            </Col>
            <Col md={8}>
              <Button
                type="primary"
                style={{
                  padding: "0.5rem,0",
                  marginBottom: "0.5rem",
                  background: "rgb(102 108 255)",
                  color: "#ffff",
                  border: "none",
                  float: "right",
                }}
                icon={<PlusOutlined />}
                onClick={modalControll}
              >
                Add New Certificate
              </Button>
            </Col>
          </Row>
        }
      >
        <div style={{ position: "relative" }} className="cerificate">
          <Table
            columns={columns}
            dataSource={EmpCertificate}
            pagination={
              EmpCertificate?.length > 5
                ? {
                    total: EmpCertificate?.length,
                  }
                : false
            }
            locale={{ emptyText: <NoData /> }}
            rowKey={"CertificationGuId"}
          />
          <AddNewCerticate
            open={open}
            modalControll={modalControll}
            empCertificateGuids={empCertificateGuids}
          />
        </div>
      </Card>
    </>
  );
};

export default CertificatesTable;
