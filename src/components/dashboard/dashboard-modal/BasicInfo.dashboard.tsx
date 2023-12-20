import type { DescriptionsProps } from "antd";
import { Descriptions, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faIdBadge,
  faBuilding,
  faCalendar,
  faClock,
  faAddressCard,
} from "@fortawesome/free-regular-svg-icons";
import { LoadingOutlined } from "@ant-design/icons";

const BasicInfoData: React.FC = () => {
  const {
    FullName,
    Username,
    Email,
    Designation,
    ReportingManagerName,
    DepartmentName,
    JoiningDate,
    YearsOfExperience,
  } = useSelector(
    (state: RootState) => state.ModalAction?.modalData?.BasicInfo || {},
  );

  const { modalLoading } = useSelector((state: RootState) => state.ModalAction);
  const BasicInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <FontAwesomeIcon icon={faUser} size="sm" />
          <span style={{ marginLeft: "8px" }}>Full Name</span>
        </Space>
      ),
      children: modalLoading ? (
        <LoadingOutlined />
      ) : FullName ? (
        FullName
      ) : (
        "N/A"
      ),
    },
    {
      key: "2",
      label: (
        <Space>
          <FontAwesomeIcon icon={faIdBadge} size="sm" />
          <span style={{ marginLeft: "8px" }}>User Name</span>
        </Space>
      ),
      children: modalLoading ? (
        <LoadingOutlined />
      ) : Username ? (
        Username
      ) : (
        "N/A"
      ),
    },
    {
      key: "3",
      label: (
        <Space>
          <FontAwesomeIcon icon={faEnvelope} size="sm" />
          <span style={{ marginLeft: "8px" }}>Communication Email</span>
        </Space>
      ),
      children: modalLoading ? <LoadingOutlined /> : Email ? Email : "N/A",
    },
    {
      key: "4",
      label: (
        <Space>
          <FontAwesomeIcon icon={faAddressCard} size="sm" />
          <span style={{ marginLeft: "8px" }}>Designation</span>
        </Space>
      ),
      children: modalLoading ? (
        <LoadingOutlined />
      ) : Designation ? (
        Designation
      ) : (
        "N/A"
      ),
    },
    {
      key: "5",
      label: (
        <Space>
          <FontAwesomeIcon icon={faUser} size="sm" />
          <span style={{ marginLeft: "8px" }}>Reporting Manager Name</span>
        </Space>
      ),
      children: modalLoading ? (
        <LoadingOutlined />
      ) : ReportingManagerName ? (
        ReportingManagerName
      ) : (
        "N/A"
      ),
    },
    {
      key: "6",
      label: (
        <Space>
          <FontAwesomeIcon icon={faBuilding} size="sm" />
          <span style={{ marginLeft: "8px" }}>Department Name</span>
        </Space>
      ),
      children: modalLoading ? (
        <LoadingOutlined />
      ) : DepartmentName ? (
        DepartmentName
      ) : (
        "N/A"
      ),
    },
    {
      key: "7",
      label: (
        <Space>
          <FontAwesomeIcon icon={faCalendar} size="sm" />
          <span style={{ marginLeft: "8px" }}>Joining Date (M/D/YYYY)</span>
        </Space>
      ),
      children: modalLoading ? (
        <LoadingOutlined />
      ) : JoiningDate ? (
        new Date(Number(JoiningDate)).toLocaleDateString()
      ) : (
        "N/A"
      ),
    },
    {
      key: "8",
      label: (
        <Space>
          <FontAwesomeIcon icon={faClock} size="sm" />
          <span style={{ marginLeft: "8px" }}>Years Of Experience</span>
        </Space>
      ),
      children: modalLoading ? (
        <LoadingOutlined />
      ) : YearsOfExperience ? (
        YearsOfExperience
      ) : (
        "N/A"
      ),
    },
  ];

  return (
    <Descriptions
      items={BasicInfo}
      column={1}
      layout="horizontal"
      bordered
      size="middle"
      className="modal-basicinfo"
    />
  );
};

export default BasicInfoData;
