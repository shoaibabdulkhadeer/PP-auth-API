import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button, Select, Form, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCertificates } from "../../redux/features/employee/employeeFetchAllCertificateSlice";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { fetchCertificatesById } from "../../redux/features/employee/employeeFetchCertificateSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addEmployeeCertificate } from "../../redux/features/employee/employeeAddCertificateSlice";
import "./AddCertificate.css";
import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ErrorPages } from "../../shared/enums";
import { useDropzone } from "react-dropzone";

const { Option } = Select;
const AddCertificate = (props: any) => {
  const { certificates, onChildData } = props;

  const data = certificates.map((ele: any) => {
    return ele.CertificateName;
  });

  //modal-2
  const [isModalVisible, setIsModalVisible] = useState(false);

  const viewModal = () => {
    setIsModalVisible(true);
  };

  const modalOk = () => {
    setIsModalVisible(false);
  };

  const modalCancel = () => {
    setIsModalVisible(false);
    handleTogglePreview();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [selectedItems, setDocumentSelectItems] = useState<string[]>([]);
  const [documentSelect, setDocumentSelect] = useState<boolean>(true);
  const [certiSelect, setCertiSelect] = useState<boolean>(true);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const [files, setFiles] = useState<any>([]);

  const sendDataToParent = () => {
    onChildData(files[0].preview);
  };

  const [selectedFileIndex, setSelectedFileIndex] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles: any) => [
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [],
      //   'image/*': []
    },
    maxSize: 2 * 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = () => {
    setFiles([]);
  };

  const removeAll = () => {
    setFiles([]);
    setPreviewOpen(!previewOpen);
  };
  // FUNCTION TO FETCH CERTIFICATES
  const fetchAll = async () => {
    const resultFetchAllCert = await dispatch(fetchAllCertificates());
    if (resultFetchAllCert?.payload?.code === 400) {
      toast.warning(resultFetchAllCert?.payload?.message);
    } else if (resultFetchAllCert?.payload?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }
  };

  useEffect(() => {
    fetchAll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { allCertificateData }: any = useSelector(
    (state: RootState) => state.EmpAllCertificateAction,
  );
  const { addCertificateDataLoading }: any = useSelector(
    (state: RootState) => state.EmpAddCertificateAction,
  );

  const certificateDetail = allCertificateData
    ?.map((cert: any) => {
      const data = {
        CertificateGuid: cert.CertificationGuId,
        CertificateName: cert.CertificationName,
      };
      return data;
    })
    .filter((certi: any) => !data.includes(certi.CertificateName));

  const uniqueCertificateNames: any = [];

  certificateDetail?.forEach((cert: any) => {
    // CHECK IF THE CERTIFICATE NAME IS NOT ALREADY IN UNIQUE CERTIFICATE NAMES
    if (!uniqueCertificateNames.includes(cert.CertificateName)) {
      uniqueCertificateNames.push(cert.CertificateName);
    }
  });

  // DEFINE CERTIFCATE NAME TO FIND
  const targetCertificateName = selectedItems;

  //FIND CERTIFICATE MATCHING THE NAME
  const targetCertificate = certificateDetail?.find(
    (cert: any) => cert.CertificateName === targetCertificateName,
  );
  const targetCertificateGuid = targetCertificate?.CertificateGuid;

  //#region ADD CERTIFICATE FUNCTION
  const handleAddCertificate = async (event: any) => {
    event.preventDefault();
    sendDataToParent();
    let hasError = false;

    if (!hasError) {
      if (!files?.length || !targetCertificateGuid) return;
      const CertificationGuId = targetCertificateGuid;

      const formData = new FormData();
      files.forEach((file: any) => formData.append("pdf", file));
      formData.append("CertificationGuId", CertificationGuId);

      const resultAction = await dispatch(addEmployeeCertificate(formData));
      if (resultAction?.payload?.code === 200) {
        toast.success("Certificate added successfully");
      } else if (resultAction?.payload?.code === 400) {
        toast.warning(resultAction?.payload?.message);
      } else if (resultAction?.payload?.code === 500) {
        navigate(ErrorPages.ERROR_500);
      } else {
        toast.warning("Something went wrong please try again later");
      }
      await dispatch(fetchCertificatesById());

      setVisible(false);
      setDocumentSelectItems([]);
      setDocumentSelect(false);
      // setDocumentSelectFileName(null);

      removeAll();
    }
  };
  //#endregion
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
    setDocumentSelectItems([]);
    // setDocumentSelectFileName(null);
    setDocumentSelect(false);
    removeAll();
  };

  // POPULATE OPTIONS WITH CERTIFICATE NAME VALUES
  const OPTIONS = uniqueCertificateNames;

  let filteredOptions = OPTIONS.filter((o: any) => !selectedItems.includes(o));

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  };

  const addButtonStyle: React.CSSProperties = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "13px",
    color: "#fff",
    backgroundColor: "#666CFF ",
  };
  const certificateSelectHandler = () => {
    setDocumentSelect(true);
    setCertiSelect(!certiSelect);
  };

  const handleTogglePreview = () => {
    if (previewOpen) {
      //close preview
      setSelectedFileIndex(null);
      const iframe = document.getElementById(
        "certificateIframe",
      ) as HTMLIFrameElement;
      if (iframe) {
        iframe.src = "";
      }
    } else {
      //open preview
      if (files.length > 0) {
        viewModal();
        const firstFile = files[0];
        setSelectedFileIndex(firstFile.path);

        const iframe = document.getElementById(
          "certificateIframe",
        ) as HTMLIFrameElement;
        if (iframe) {
          iframe.src = firstFile.preview;
        }
      }
    }
    // Toggle the preview state
    setPreviewOpen(!previewOpen);
  };

  return (
    <div>
      <div style={buttonContainerStyle}>
        <Button
          onClick={showModal}
          style={addButtonStyle}
          className="addCertificateClsBtn"
        >
          <FontAwesomeIcon size="lg" icon={faPlus} />
          &nbsp;&nbsp;ADD CERTIFICATE
        </Button>
      </div>
      <div className="modal-parent">
        <Modal
          centered
          title={
            <span>
              <SafetyCertificateOutlined />
              &nbsp;&nbsp; ADD CERTIFICATE
            </span>
          }
          open={visible}
          onOk={handleAddCertificate}
          closeIcon={null}
          maskClosable={false}
          className="cert-modal"
          bodyStyle={{ height: "10rem" }}
          wrapClassName="add-cert-modal"
          footer={[
            <Button
              icon={<CloseCircleOutlined />}
              className="cancel-btn"
              key="cancel"
              onClick={handleCancel}
            >
              Cancel
            </Button>,
            <Button
              loading={addCertificateDataLoading}
              className="submit-btn"
              key="submit"
              icon={<CheckCircleTwoTone />}
              onClick={handleAddCertificate}
              disabled={!documentSelect || files.length === 0 || certiSelect}
            >
              Submit
            </Button>,
          ]}
        >
          <Form>
            <Form.Item label="Certificate Name" className="add-cert-label">
              <Select
                placeholder="Select or type to search"
                value={selectedItems}
                onChange={(value) => {
                  setDocumentSelectItems(value);
                  setDocumentSelect(!documentSelect);
                }}
                style={{ width: "100%" }}
                onSelect={() => certificateSelectHandler()}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={(menu) => (
                  <div style={{ maxHeight: "140px", overflowY: "auto" }}>
                    {filteredOptions.length === 0 &&
                    certificates.length === 0 ? (
                      <Empty
                        style={{
                          padding: "0.5rem",
                        }}
                        description="No certificates available"
                      />
                    ) : filteredOptions.length === 0 &&
                      certificates.length !== 0 ? (
                      <Empty
                        style={{
                          padding: "0.5rem",
                        }}
                        description="All certifications already achieved"
                      />
                    ) : (
                      menu
                    )}
                  </div>
                )}
              >
                {filteredOptions.map((item: any) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* new code */}
            <Form.Item>
              {!files.length && (
                <div className="drag-box" {...getRootProps({})}>
                  <input {...getInputProps()} />
                  <div>
                    <FontAwesomeIcon icon={faUpload} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Drag & drop files here, or click to select files</p>
                    )}
                  </div>
                </div>
              )}

              {/* Preview */}

              {/* Accepted files */}

              <div style={{ marginTop: "1rem" }}>
                {files?.map((file: any, idx: any) => (
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                    key={idx}
                  >
                    <div>
                      <span>Selected File: </span>
                      <span>{file.name}</span>
                      {/* <Button  onClick={() => removeFile(file.name)}> */}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Button onClick={() => removeFile()}>
                          <FontAwesomeIcon icon={faCancel} /> Remove File
                        </Button>
                        <Button
                          className="preview-btn"
                          key="preview"
                          onClick={handleTogglePreview}
                          disabled={files.length === 0}
                        >
                          {previewOpen ? "Close Preview" : "Preview"}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Modal
                        visible={isModalVisible}
                        onOk={modalOk}
                        onCancel={modalCancel}
                        centered
                      >
                        {selectedFileIndex === file.path && (
                          <>
                            <p>File name: {file.name}</p>
                            <iframe
                              id="certificateIframe"
                              src={file.preview}
                              title={file.name}
                              width={200}
                              height={200}
                              onLoad={() => {
                                URL.revokeObjectURL(file.preview);
                              }}
                            />
                          </>
                        )}
                      </Modal>
                    </div>
                  </div>
                ))}
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AddCertificate;
