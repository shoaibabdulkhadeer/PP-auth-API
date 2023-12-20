import { Button, Card, Table, Modal, Avatar, Tooltip, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Certificates.css";
import { Switch } from "antd";
import { FaEdit } from "react-icons/fa";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import CertificateDrawer from "./CertificateDrawer";
import { toast } from "react-toastify";
import { fetchCertificates } from "../../redux/features/certificates/certificateSlice";
import { updateAvailability } from "../../redux/features/certificates/updateAvilCertificationslice";
import { MasterCertificate } from "../../utils/interfaces";
import { getColor } from "../../utils/commonCSS";
import { useNavigate } from "react-router-dom";
import { ErrorPages } from "../../shared/enums";
import { getFormattedDate } from "../../common/common";
import { fetchCertificateProviders } from "../../redux/features/certificates/providersSlice";

const Certificates = () => {
  interface DataType {
    key: React.Key;
    CertificationName: string;
    IsActive: boolean;
    CertificationProviderId: string;
  }
  //#region useSelectors
  const { data, count, isLoading } = useSelector(
    (state: any) => state.CertificatesAction,
  );
  const { provideData } = useSelector(
    (state: any) => state.FetchProvideraction,
  );

  const { updateAvilData, updateAvilload } = useSelector(
    (state: any) => state.UpdateAvailCertificationAction,
  );
  //#endregion

  //#region constants & useStates
  const dispatch = useDispatch();
  const [intData, setInitData] = useState<MasterCertificate>({
    CertificationName: "",
    CertificationDescription: "",
    CertificationProvider: null,
    CertificationGuId: "",
  });
  const [dataSource, setDataSource] = useState([]);
  const [providers, setProviders] = useState([]);
  const [open, setOpen] = useState(false);
  const [addUpdate, setAddUpdate] = useState(true);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  //#endregion

  //#region ------ get Certificates data
  const fetching = async () => {
    await dispatch(fetchCertificates({ page: 1, name }));
    await dispatch(fetchCertificateProviders());
  };
  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (data?.request?.status === 200 && provideData?.request?.status === 200) {
      setDataSource(data?.data?.data?.certData);
      setProviders(provideData?.data?.data);
    } else if (
      data?.request?.status === 500 ||
      provideData?.request?.status === 500
    ) {
      navigate(ErrorPages.ERROR_500);
    }
  }, [data, provideData, navigate]);

  //#endregion

  //#region ----- updating Availability tosterAddCertificateAction

  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      const updateAvl = async () => {
        if (updateAvilData?.request?.status === 200) {
          toast.success("Certificate active status updated successfully");
          setLoading(false);
          setConfirmModalVisible(false);
          await fetching();
        } else if (updateAvilData?.request?.status === 400) {
          setLoading(false);
          toast.warning(updateAvilData.data?.message);
          setConfirmModalVisible(false);
        } else if (updateAvilData?.request?.status === 500) {
          setLoading(false);
          toast.error(updateAvilData.data?.message);
          setConfirmModalVisible(false);
        }
      };
      updateAvl();
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateAvilData]);
  //#endregion

  function debounce(func: any, timeout = 1000) {
    let timer: any;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply();
      }, timeout);
    };
  }

  // #region -------------- conform model
  const showConfirmModal = (record: any) => {
    setSelectedCertificate(record);
    setConfirmModalVisible(true);
  };
  const handleConfirmModalOk = async () => {
    setLoading(true);
    if (selectedCertificate) {
      await dispatch(updateAvailability(selectedCertificate.CertificationGuId));
    }
    setSelectedCertificate(null);
  };

  const handleConfirmModalCancel = () => {
    setSelectedCertificate(null);
    setConfirmModalVisible(false);
  };
  //#endregion

  //#region add/update drawer close
  const handleClose = () => {
    setInitData({
      CertificationName: "",
      CertificationDescription: "",
      CertificationProvider: null,
      CertificationGuId: "",
    });
    setOpen(false);
  };

  const handleOpen = () => {
    setInitData({
      CertificationName: "",
      CertificationDescription: "",
      CertificationProvider: null,
      CertificationGuId: "",
    });
    setAddUpdate(true);
    setOpen(true);
  };

  const handleCertEdit = (values: MasterCertificate) => {
    setInitData({
      CertificationGuId: values.CertificationGuId,
      CertificationName: values.CertificationName,
      CertificationDescription: values.CertificationDescription,
      CertificationProvider:
        values.CertificationProviderIdInfo?.CertificationProviderName,
    });
    setAddUpdate(false);
    setOpen(true);
  };
  //#endregion

  //#region Table data columns
  const columns: ColumnsType<DataType> = [
    {
      title: "CERTIFICATE NAME",
      className: "table-cell",
      dataIndex: "CertificationName",
      key: "CertificationName",
      render: (record: any, text: any, index: any) => (
        <div className="full-certificate-name">
          <Avatar
            size={{ sm: 20, md: 23, lg: 27, xl: 30, xxl: 30 }}
            className="cert_avatar"
            style={{
              backgroundColor: getColor(index),
            }}
          >
            {record.charAt(0).toUpperCase()}
          </Avatar>
          <Tooltip
            className="table-data short-paragraph"
            placement="right"
            color="#626477"
            title={record}
          >
            &nbsp;&nbsp; &nbsp;{record}
          </Tooltip>
        </div>
      ),
    },

    {
      title: "CERTIFICATE DESCRIPTION",
      className: "table-cell",
      dataIndex: "CertificationDescription",
      key: "CertificationDescription",
      render: (record: any) => (
        <Tooltip placement="right" color="#626477" title={record}>
          <p className="short-paragraph table-data">{record}</p>
        </Tooltip>
      ),
    },
    {
      title: "PROVIDER",
      className: "table-cell",
      dataIndex: "CertificationProviderIdInfo",
      key: "CertificationProviderIdInfo",
      render: (record: any) => (
        <p className="table-data">{record.CertificationProviderName}</p>
      ),
    },
    {
      title: "CREATED BY",
      className: "table-cell",
      dataIndex: "createdByInfo",
      key: "createdByInfo",
      render: (record: any) => <p className="table-data">{record.FullName}</p>,
      responsive: ["lg"],
    },
    {
      title: "CREATED ON",
      className: "table-cell",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      render: (record: any) => (
        <p className="table-data">{getFormattedDate(record)}</p>
      ),
      responsive: ["lg"],
    },
    {
      title: "ACTION",
      className: "table-cell",
      key: "Action",
      render: (record: any) => (
        <div className="action-buttons">
          <Tooltip
            placement="bottom"
            color="#626477"
            title="Click here to update this certificate"
          >
            <Button
              type="link"
              icon={<FaEdit style={{ color: "#FFBA00", fontSize: "25px" }} />}
              onClick={() => handleCertEdit(record)}
            ></Button>
          </Tooltip>

          <Tooltip
            placement="bottom"
            color="#626477"
            title="Click here to change status"
          >
            <Switch
              size="small"
              checked={record.IsActive}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={() => showConfirmModal(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  //#endregion

  return (
    <>
      <div>
        <Modal
          open={isConfirmModalVisible}
          centered
          width={450}
          closable={false}
          footer={null}
        >
          <p className="model-head">
            Are you sure you want to{" "}
            {selectedCertificate && selectedCertificate.IsActive
              ? "Disable"
              : "Enable"}{" "}
            {
              <span style={{ color: "blue" }}>
                {selectedCertificate?.CertificationName}
              </span>
            }{" "}
            Certificate ?
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                backgroundColor: "#ff4d4f",
                cursor: loading ? "not-allowed" : "pointer",
                marginRight: "5px",
              }}
              type="primary"
              onClick={handleConfirmModalCancel}
            >
              No
            </Button>
            <Button
              loading={updateAvilload}
              type="primary"
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                backgroundColor: "#666CFF",
                marginLeft: "5px",
              }}
              onClick={handleConfirmModalOk}
            >
              {loading ? "Updating" : "Yes"}
            </Button>
          </div>
        </Modal>
        <Card
          type="inner"
          title={
            <div className="card-header">
              <SafetyCertificateOutlined className="cert-icon" />
              &nbsp; CERTIFICATES
            </div>
          }
          extra={
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Input
                placeholder="Search Certificates"
                onChange={(e: any) => {
                  setName(e.target.value.trim());
                  if (e.target.value.trim()) {
                    debounce(() => fetching())();
                  }
                }}
              />
              <Button
                // icon={}
                className="add-button1"
                onClick={handleOpen}
              >
                <PlusOutlined />
                Add Certificate
              </Button>
              <Button
                // icon={}
                className="add-button2"
                title="Add new Certificate"
                onClick={handleOpen}
              >
                <PlusOutlined /> <p> Add</p>
              </Button>
            </div>
          }
        >
          <Table
            columns={columns}
            className="custom-table"
            loading={isLoading}
            dataSource={dataSource.map((record: any, index) => ({
              ...record,
              key: record.key || index,
            }))}
            size="middle"
            rowClassName={(_, index) =>
              index % 2 === 0 ? "odd-row" : "even-row"
            }
            pagination={
              count > 10
                ? {
                    pageSize: 10,
                    current: currentPage,
                    total: count,
                    onChange: (page) => {
                      setCurrentPage(page);
                      const pageNo = { page, name };
                      dispatch(fetchCertificates(pageNo));
                    },
                  }
                : false
            }
            scroll={{ x: true }}
          />
        </Card>
        <CertificateDrawer
          handleClose={handleClose}
          addUpdate={addUpdate}
          intData={intData}
          providers={providers}
          open={open}
          fetching={fetching}
        />
      </div>
    </>
  );
};

export default Certificates;
