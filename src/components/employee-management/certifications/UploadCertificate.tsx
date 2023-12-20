import {
  DeleteFilled,
  FilePdfOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Button, Divider, Form, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployeeCertificate } from "../../../redux/features/employee/employeeAddCertificateSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import "./certificate.css";
// import '../../employee-profile/AddCertificate.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
export const AddNewCerticate = ({
  modalControll,
  open,
  empCertificateGuids,
}: any) => {
  const { certificateData } = useSelector(
    (state: RootState) => state.CertificateAction,
  );
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  const [certificate, setCertificate] = useState<{
    EmployeeGuID: string;
    CertificationGuId: string;
    pdf: any;
  }>({ EmployeeGuID: empID, CertificationGuId: "", pdf: null });
  const [fileName, setFileName] = useState<string | null>();
  const [form] = useForm();
  const fileInputRef = useRef<any>(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };
  const disPatch = useDispatch<AppDispatch>();
  useEffect(() => {}, [disPatch]);
  return (
    <>
      <Modal
        title={
          <span>
            <SafetyCertificateOutlined />
            &nbsp;&nbsp; ADD CERTIFICATE
          </span>
        }
        open={open}
        maskClosable={false}
        closeIcon={false}
        onCancel={modalControll}
        cancelText="Cancel"
        centered
        footer={null}
      >
        <Form
          form={form}
          style={{ padding: "1rem" }}
          onFinish={async (value) => {
            if (
              certificate.CertificationGuId &&
              certificate.EmployeeGuID &&
              certificate.pdf
            ) {
              const formData = new FormData();
              formData.append("pdf", certificate.pdf);
              formData.append("EmployeeGuID", certificate.EmployeeGuID);
              formData.append(
                "CertificationGuId",
                certificate.CertificationGuId,
              );
              await disPatch(addEmployeeCertificate(formData));
              form.resetFields();
              modalControll();
              setCertificate({
                EmployeeGuID: empID,
                CertificationGuId: "",
                pdf: null,
              });
              setFileName("");
            }
          }}
        >
          <Form.Item
            label="Certificate Name :"
            className="cert_label"
            required
            labelCol={{ span: 24 }}
          >
            <Select
              showSearch
              placeholder="Select Certificate Type"
              optionFilterProp="children"
              allowClear
              value={
                certificate.CertificationGuId
                  ? certificate.CertificationGuId
                  : null
              }
              onChange={(value) => {
                setCertificate({ ...certificate, CertificationGuId: value });
              }}
              listHeight={140}
            >
              {certificateData.map((certificate: any) =>
                !empCertificateGuids.includes(certificate.CertificationGuId) ? (
                  <Select.Option
                    key={certificate.CertificationGuId}
                    value={certificate.CertificationGuId}
                  >
                    {certificate.CertificationName}
                  </Select.Option>
                ) : (
                  ""
                ),
              )}
            </Select>
          </Form.Item>

          <Form.Item>
            <div
              style={{
                margin: "0.3rem 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleFileSelect}
                // icon={<FilePdfOutlined />}
                type="primary"
                disabled={certificate.CertificationGuId ? false : true}
              >
                Select File &nbsp;{" "}
                <FontAwesomeIcon size="sm" icon={faArrowUpFromBracket} />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".pdf"
                  onChange={(e) => {
                    setFileName(fileInputRef.current.files[0].name);
                    if (e.target && e.target.files && e.target.files[0]) {
                      const selectedFile = e.target.files[0];
                      setCertificate({ ...certificate, pdf: selectedFile });
                    }
                  }}
                />
              </Button>
              {fileName && (
                <p style={{ color: "#736f6f", padding: "0.5rem", margin: "0" }}>
                  <FilePdfOutlined />
                  {fileName}
                  <Button
                    danger
                    style={{
                      padding: "0",
                      border: "none",
                      marginLeft: "0.5rem",
                    }}
                    onClick={() => {
                      setFileName("");
                      setCertificate({
                        EmployeeGuID: empID,
                        CertificationGuId: "",
                        pdf: null,
                      });
                    }}
                  >
                    <DeleteFilled />
                  </Button>
                </p>
              )}
            </div>
          </Form.Item>

          <Divider style={{ margin: "0" }} />
          <Row justify={"end"} align={"middle"}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setCertificate({
                  EmployeeGuID: "",
                  CertificationGuId: "",
                  pdf: null,
                });
                modalControll();
              }}
            >
              Cancel
            </Button>
            <Button
              className="upload-btn"
              htmlType="submit"
              type="text"
              style={{
                marginLeft: "1rem",
                background: "#4b5667",
                color: "#ffff",
              }}
              disabled={!Boolean(certificate.CertificationGuId && fileName)}
            >
              Add Certificate
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
