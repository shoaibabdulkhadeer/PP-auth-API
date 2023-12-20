import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CommonTable from "./CommonTable";
import "./EmployeeEfficiency.css";

const OnBenchTable = () => {
  const { OnBench }: any = useSelector(
    (state: RootState) => state.EmployeeAction.employeeData,
  );

  return (
    <CommonTable
      title="Employees allocation hours more or equal 8 hours"
      tableData={OnBench}
      className="on-bench"
    />
  );
};

export default OnBenchTable;
