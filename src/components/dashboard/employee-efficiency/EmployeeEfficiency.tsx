import { Col, Row, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decode } from "../../../common/common";
import {
  getDepartmentData,
  resetDepartmentAction,
  setDepartmentId,
  setDepartmentName,
} from "../../../redux/features/common-features/departmentSlice";
import { getEmployeeData } from "../../../redux/features/employee-efficiency-slice/employeeSlice.redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { RoleGroup } from "../../../routes/Roles";
import { ErrorPages } from "../../../shared/enums";
import DashboardModal from "./../dashboard-modal/Modal.dashboard";
import AllocationGreaterEqual8 from "./AllocationGreaterEqual8";
import AllocationLessThan8 from "./AllocationLessThan8";
import Chart from "./Chart.dashboard";
import "./EmployeeEfficiency.css";
import OnBenchTable from "./OnBenchTable.dashboard";
import TotalEmployee from "./TotalEmployees.dashboard";

const EmployeeEfficiency = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [fullName, setFullName] = useState("");

  const { departmentsId, dptName } = useSelector(
    (state: RootState) => state.DepartmentAction,
  );

  useEffect(() => {
    dispatch(resetDepartmentAction());
    const getDepartment = async () => {
      const res = await dispatch(getDepartmentData());
      if (res.payload.code === 200) {
        const tokenData = decode(sessionStorage.getItem("token"));
        const { myDecodedToken }: any = tokenData;
        const { DepartmentId, FullName } = myDecodedToken;
        setFullName(FullName);
        if (DepartmentId) {
          dispatch(getEmployeeData(DepartmentId));
          dispatch(setDepartmentId(DepartmentId));
        }
      } else if (res.payload.response.data.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }
    };
    getDepartment();
  }, [dispatch, navigate]);

  const filterOption = (
    input: string,
    option?: { label: string; value: number },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleDepartmentID = (deptID: number) => {
    const department = departmentsId.find((dept) => dept.value === deptID);
    const name = department ? department.label : "";
    dispatch(getEmployeeData(deptID));
    dispatch(setDepartmentName(name));
  };
  const { Text, Title } = Typography;

  return (
    <>
      {/* TOP BAR WITH SELECT */}
      <Row align={"middle"} className="emp-dashboard-topbar">
        <Col xs={24} sm={24} md={20}>
          <Title level={4} style={{ margin: 0 }}>
            {`Welcome!! ${fullName}`}
          </Title>
          <Text type="secondary">
            Here are {dptName} department's employee details.
          </Text>
        </Col>
        <Col xs={24} sm={24} md={4}>
          {sessionStorage.getItem("role") === RoleGroup.ADMIN ? (
            <Select
              showSearch
              placeholder="Select a Department"
              size="large"
              filterOption={filterOption}
              options={departmentsId}
              onSelect={(value: any) => {
                handleDepartmentID(value);
              }}
              className="dept-dropdown"
              value={dptName}
            />
          ) : null}
        </Col>
      </Row>

      {/* DASHBOARD CONTENT */}
      <Row gutter={[15, 16]}>
        <Col xs={24} sm={24} md={8}>
          <Col xs={24} sm={24} md={24} className="total-employee-container">
            <TotalEmployee />
          </Col>
          <Col xs={24} sm={24} md={24} className="piechart-container">
            <Chart />
          </Col>
        </Col>
        <Col xs={24} sm={24} md={16}>
          <OnBenchTable />
        </Col>
        <Col xs={24} sm={24} md={12} style={{ marginBottom: "1%" }}>
          <AllocationLessThan8 />
        </Col>
        <Col xs={24} sm={24} md={12} style={{ marginBottom: "1%" }}>
          <AllocationGreaterEqual8 />
        </Col>
      </Row>

      {/* DASHBOARD RENDER */}
      <DashboardModal />
    </>
  );
};

export default EmployeeEfficiency;
