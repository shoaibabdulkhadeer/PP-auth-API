import { useEffect, useState } from "react";
import { Input, Button, List, Row, Empty, Spin, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddCertificate from "./AddCertificate";
import { downloadEmployeeCertificate } from "../../redux/features/employee/employeeDownloadCertificateSlice";
import "./CertificationsContent.css";
import { toast } from "react-toastify";
import { ErrorPages } from "../../shared/enums";
import { useNavigate } from "react-router-dom";

const CertificationsContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [childData, setChildData] = useState<any>(null);

  const handleChildData = (data: any) => {
    setChildData(data);
  };

  const { certificateData, certificateDataLoading }: any = useSelector(
    (state: RootState) => state.EmpGetCertificateAction,
  );

  useEffect(() => {}, [certificateData]);
  let data = certificateData?.slice();
  let certificateDetail = data?.sort(
    (a: any, b: any) => b.CreatedAt - a.CreatedAt,
  );
  const newdata = certificateDetail?.map((cert: any) => {
    const date = new Date(parseInt(cert.CreatedAt) * 1000).toString();
    const inputDate = new Date(date);
    const options: any = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = inputDate.toLocaleDateString("en-IN", options);
    return {
      CertificateName: cert?.CertificationName,
      CreatedAt: formattedDate,
      CertificateGuid: cert?.CertificationGuId,
    };
  });

  const uniqueCertificates: any = [];

  newdata?.forEach((cert: any) => {
    const existingCertificate = uniqueCertificates?.find(
      (uniqueCert: any) =>
        uniqueCert?.CertificateName === cert?.CertificateName,
    );

    if (!existingCertificate) {
      uniqueCertificates.push(cert);
    }
  });

  const certificates = uniqueCertificates;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: any) => {
    setSearchTerm(value);
  };

  let filteredCertificates = certificates?.filter(
    (cert: any) =>
      cert?.CertificateName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  //#region DOWNLOAD CERTIFICATES FUNCTION
  const handleDownloadButton = async (event: any) => {
    const certificateName = event.currentTarget.getAttribute(
      "data-certificatename",
    );
    const cert = uniqueCertificates.find(
      (uniqueCert: any) => uniqueCert.CertificateName === certificateName,
    );

    if (cert) {
      const downloadedCertificateName = `${cert.CertificateName?.split(
        " ",
      ).join("-")}_${new Date().getTime()}.pdf`;

      const payloadData = {
        CertificationGuId: cert.CertificateGuid,
        downloadCertName: downloadedCertificateName,
      };
      const resDownload = await dispatch(
        downloadEmployeeCertificate(payloadData),
      );

      if (resDownload?.payload?.code === 400) {
        toast.warning("Something went wrong please try again later");
      } else if (resDownload?.payload?.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }
    }
  };
  //#endregion

  return (
    <>
      {certificateDataLoading ? (
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
        <div>
          <Row className="input-parent">
            <div>
              <div className="child-a">
                <Input
                  placeholder="Type to search certificate from the list available below"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ marginBottom: "10px", height: "2.1rem" }}
                />
              </div>
            </div>
            <div>
              <div className="child-b">
                <AddCertificate
                  certificates={certificates}
                  onChildData={handleChildData}
                />
              </div>
            </div>
          </Row>
          {filteredCertificates.length <= 0 ? (
            <Empty
              style={{ padding: "0.5rem" }}
              description="No Certificates Found"
            />
          ) : (
            <Card className="new-card">
              <List
                className="new-card-list"
                style={{ marginBottom: "5rem" }}
                dataSource={filteredCertificates}
                locale={{ emptyText: <></> }}
                renderItem={(certificate: any) => (
                  <List.Item>
                    <Card className="new-card-child">
                      <div>
                        <div
                          style={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "15px",
                            color: "rgba(76, 78, 100, 0.87)",
                          }}
                        >
                          {certificate.CertificateName}
                        </div>
                        <div style={{ color: "#757575", fontSize: "13px" }}>
                          Uploaded On: {certificate.CreatedAt}
                        </div>
                      </div>
                      <Button
                        data-certificatename={certificate.CertificateName}
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "13px",
                          marginLeft: "10px",
                          backgroundColor: "#61C0C2",
                          color: "#fff",
                        }}
                        onClick={handleDownloadButton}
                      >
                        <FontAwesomeIcon size="lg" icon={faDownload} />{" "}
                        &nbsp;&nbsp;DOWNLOAD
                      </Button>
                      <Button
                        data-certificatename={certificate.CertificateName}
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "13px",
                          marginLeft: "10px",
                          backgroundColor: "#61C0C2",
                          color: "#fff",
                        }}
                        onClick={handleDownloadButton}
                      >
                        <FontAwesomeIcon size="lg" icon={faEye} />{" "}
                        &nbsp;&nbsp;PREVIEW
                      </Button>
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          )}
        </div>
      )}
      <span>{`child data: ${childData}`}</span>
    </>
  );
};

export default CertificationsContent;
