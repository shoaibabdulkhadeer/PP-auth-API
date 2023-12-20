import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import empImage from "../../../assets/image/Total Employees.png";
import { RootState } from "../../../redux/store";

const TotalEmployee = () => {
  const { OnBench, AllocationHoursgte8, AllocationHourslt8 } = useSelector(
    (state: RootState) => state.EmployeeAction.employeeData,
  );

  const { dptName } = useSelector((state: RootState) => state.DepartmentAction);

  const totalEmployees =
    (OnBench?.length || 0) +
    (AllocationHourslt8?.length || 0) +
    (AllocationHoursgte8?.length || 0);

  return (
    <Row justify="center" align="middle" className="totalempcard">
      <Col xs={20} sm={24} md={16}>
        <Row>
          <Col xs={24} sm={24} md={24}>
            <p className="total-employee-text">
              Total Employees in<span className="dept-name">{dptName}</span>
            </p>
          </Col>

          <Col xs={24} sm={24} md={24}>
            <p className="total-employee-count">{totalEmployees}</p>
          </Col>
        </Row>
      </Col>
      <Col xs={4} sm={24} md={8} className="totalEmpImgDiv">
        <img
          src={empImage}
          alt="3D Illustration"
          className="total-employee-image"
        />
      </Col>
    </Row>
  );
};

export default TotalEmployee;
