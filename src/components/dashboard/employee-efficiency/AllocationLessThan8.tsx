import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import CommonTable from "./CommonTable";
import "./EmployeeEfficiency.css";

const AllocationLessThan8 = () => {
  const { AllocationHourslt8 }: any = useSelector(
    (state: RootState) => state.EmployeeAction.employeeData,
  );

  return (
    <CommonTable
      title=" Employees allocation hours less than 8 hours"
      tableData={AllocationHourslt8}
      className="allocation-lt8"
    />
  );
};

export default AllocationLessThan8;
