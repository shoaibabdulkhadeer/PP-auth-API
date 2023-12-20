import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CommonTable from "./CommonTable";
import "./EmployeeEfficiency.css";

const AllocationGreaterEqual8 = () => {
  const { AllocationHoursgte8 }: any = useSelector(
    (state: RootState) => state.EmployeeAction.employeeData,
  );

  return (
    <CommonTable
      title=" Employees allocation hours more or equal 8 hours"
      tableData={AllocationHoursgte8}
      className="allocation-gte8"
    />
  );
};

export default AllocationGreaterEqual8;
