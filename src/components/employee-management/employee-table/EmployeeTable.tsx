import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Switch,
  Table,
  Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { decode, getRoleName, getTitleCase } from "../../../common/common";
import { GetRolesData } from "../../../redux/features/common-features/roleSlice";
import {
  editEmpDetails,
  getAllEmployeesData,
  resetBasicEmpDatails,
  setEmpGuidID,
  setPageID,
} from "../../../redux/features/employee-management/empGetAllSlice";
import { empResetStatusAction } from "../../../redux/features/employee-management/empStatusSlice";
import { resetEmpUpdateAction } from "../../../redux/features/employee-management/empUpdateSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { EmployeeManagementLink, ErrorPages } from "../../../shared/enums";
import { cardShadow, getColor } from "../../../utils/commonCSS";
import { IEmployeeTable } from "../../../utils/interfaces";
import NoData from "../NoData";
import ConfimModal from "./ConfimModal";
import "./EmployeeTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faUsers } from "@fortawesome/free-solid-svg-icons";
let lastIndex = 0;
const unqiueIndex = () => {
  lastIndex = lastIndex + 1;
};
const EmployeeTable = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);
  const [emp, setEmp] = useState<{
    empID: string;
    name: string;
    status: boolean | undefined;
  }>({ empID: "", name: "", status: true });
  const { empGetRes, empGetLoad, totalCount, pageId } = useSelector(
    (state: RootState) => state.EmpGetALlAction,
  );
  const [filter] = useState({ page: pageId, name: "" });
  const ControllModal = () => {
    setOpen(!open);
  };
  const { empStatusLoad, empStatusRes, empStatusCode } = useSelector(
    (state: RootState) => state.EmpStatusAction,
  );
  const { rolesRes } = useSelector((state: RootState) => state.RolesAction);
  useEffect(() => {
    disPatch(empResetStatusAction());
  }, [disPatch]);
  useEffect(() => {
    async function EmpTableHandler() {
      if (empStatusCode === 200) {
        toast.success(empStatusRes);
      } else if (empStatusCode === 400) {
        toast.warning(empStatusRes);
      } else if (empStatusCode === 500) {
        toast.error(empStatusRes);
      }
      const res = await disPatch(getAllEmployeesData(filter));
      if (res.payload?.code === "ERR_NETWORK") {
        navigate(ErrorPages.ERROR_500);
      } else if (res.payload.response?.data.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }
      disPatch(GetRolesData());
    }
    EmpTableHandler();
  }, [empStatusLoad, disPatch, empStatusCode, empStatusRes, filter, navigate]);

  const { logedInUserEmpID, currentRole } = decode(
    sessionStorage.getItem("token"),
  );

  const columns: ColumnsType<IEmployeeTable> = [
    {
      title: "FULL NAME",
      dataIndex: "FullName",
      key: `FullName${unqiueIndex()}`,
      render: (text, record, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 12,
          }}
        >
          <Col>
            <Avatar
              style={{
                backgroundColor: getColor(index),
              }}
            >
              {text.charAt(0).toUpperCase()}
            </Avatar>
          </Col>

          <Col>
            <p
              style={{
                margin: "0",
                fontSize: "15px",
                fontWeight: 400,
                color: "rgba(76, 78, 100, 0.87)",
              }}
            >
              {getTitleCase(text)}
            </p>
            <p style={{ margin: "0", color: "GrayText" }}>
              {record.Username?.toLowerCase()}
            </p>
          </Col>
        </div>
      ),
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "EMPLOYEE ID",
      key: `EmployeeID${unqiueIndex()}`,
      dataIndex: "EmployeeID",
      filterSearch: true,
      render: (text) => (
        <span className="table_content">{text?.toUpperCase()}</span>
      ),
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "EMPLOYEE ROLES",
      dataIndex: "AdditionalRoles",
      key: `AdditionalRoles${unqiueIndex()}`,
      render: (_, record) => (
        <span className="table_content">
          <span>Employee</span>
          {record.AdditionalRoles.map((roleId) => {
            return (
              <span>{`, ${getTitleCase(getRoleName(rolesRes, roleId))}`}</span>
            );
          })}
        </span>
      ),
      responsive: ["md"],
    },

    {
      title: "DESIGNATION",
      key: `DesignationName${unqiueIndex()}`,
      dataIndex: "DesignationName",
      filterSearch: true,
      render: (text) => (
        <span className="table_content">{getTitleCase(text)}</span>
      ),
      responsive: ["lg"],
    },
    {
      title: "DEPARTMENT",
      key: `DepartmentName${unqiueIndex()}`,
      dataIndex: "DepartmentName",
      render: (text) => (
        <span className="table_content">{getTitleCase(text)}</span>
      ),
      responsive: ["lg"],
    },
    {
      title: "HOURLY COST",
      key: `HourlyCost${unqiueIndex()}`,
      dataIndex: "HourlyCost",
      render: (text) => (
        <span className="table_content">
          <FontAwesomeIcon icon={faDollarSign} />
          {text}
        </span>
      ),
      responsive: ["lg"],
    },
    {
      title: "REPORTING MANAGER",
      key: `ReportingManagerFullName${unqiueIndex()}`,
      dataIndex: "ReportingManagerFullName",
      render: (text) => (
        <span className="table_content">
          {text ? getTitleCase(text) : "NA"}
        </span>
      ),
      responsive: ["sm"],
    },
    {
      title: "ACTIONS",
      key: "EmployeeGuID",
      render: (_, record) => (
        <Space
          direction="horizontal"
          style={{
            gap: "1rem",
            alignItems: "center",
          }}
          key={record.EmployeeGuID}
        >
          <Tooltip
            placement="top"
            title={
              logedInUserEmpID === record.EmployeeGuID
                ? "You cannot edit your own Info"
                : "Click here to edit details"
            }
          >
            <Button
              style={{ fontSize: "20px", color: "#FFBA00", border: "none" }}
              shape="circle"
              disabled={logedInUserEmpID === record.EmployeeGuID}
              onClick={() => {
                const AdditionalRoles = [];
                const RoleID = [3, ...record.AdditionalRoles];
                for (let i = 0; i < record.AdditionalRoles.length; i++) {
                  const role = record.AdditionalRoles[i];
                  AdditionalRoles.push(getRoleName(rolesRes, role));
                }
                const JoiningDate = new Date(Number(record.JoiningDate));
                const editDetails = {
                  ...record,
                  AdditionalRoles: AdditionalRoles,
                  JoiningDate: JoiningDate,
                  RoleID,
                };

                disPatch(resetEmpUpdateAction());
                disPatch(editEmpDetails(editDetails));
                disPatch(setEmpGuidID(editDetails.EmployeeGuID));
                navigate(EmployeeManagementLink.BASIC_INFO);
              }}
            >
              <FaEdit />
            </Button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={
              logedInUserEmpID === record.EmployeeGuID
                ? "You cannot disable yourself"
                : "Click here to change status"
            }
          >
            <Switch
              size="small"
              disabled={logedInUserEmpID === record.EmployeeGuID}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={record.IsActive}
              onChange={() => {
                ControllModal();
                setEmp({
                  empID: record.EmployeeGuID ? record.EmployeeGuID : "",
                  name: record.FullName,
                  status: record.IsActive,
                });
                disPatch(empResetStatusAction());
              }}
            />
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
          <Row align={"middle"} justify={"space-between"}>
            <Col>
              <h3
                style={{
                  margin: "0",
                  color: "rgb(111 113 120)",
                  fontWeight: 500,
                }}
              >
                <FontAwesomeIcon icon={faUsers} /> EMPLOYEES DETAILS
              </h3>
            </Col>
            <Col>
              <div
                style={{
                  display: "inline-flex",
                  columnGap: "0.7rem",
                }}
              >
                <Input
                  placeholder="Search Name"
                  onChange={(e) => {
                    disPatch(
                      getAllEmployeesData({ ...filter, name: e.target.value }),
                    );
                  }}
                />

                {currentRole === "Admin" ? (
                  <Button
                    type="primary"
                    style={{
                      padding: "0.5rem,0",
                      background: "rgb(102 108 255)",
                      color: "#ffff",
                      border: "none",
                    }}
                    icon={<PlusOutlined />}
                    onClick={() => {
                      disPatch(resetBasicEmpDatails());
                      navigate(EmployeeManagementLink.BASIC_INFO);
                    }}
                  >
                    Add New
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        }
      >
        <div className="emp-list">
          <Table
            columns={columns}
            dataSource={empGetRes}
            loading={empGetLoad}
            pagination={
              totalCount > 10
                ? {
                    defaultCurrent: pageId,
                    total: totalCount,
                    onChange: (page) => {
                      disPatch(setPageID(page));
                      disPatch(setPageID(page));
                      disPatch(getAllEmployeesData({ ...filter, page }));
                    },
                  }
                : false
            }
            locale={{ emptyText: <NoData /> }}
            rowKey={"EmployeeGuID"}
            scroll={{ x: "overflow" }}
          />
        </div>
        <ConfimModal open={open} ControllModal={ControllModal} emp={emp} />
      </Card>
    </>
  );
};

export default EmployeeTable;
