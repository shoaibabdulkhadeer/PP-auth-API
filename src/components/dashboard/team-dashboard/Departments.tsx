import { Select, Tooltip } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "../../../common/common";
import {
  getNineBoxModelData,
  setDeptIDfor9Box,
} from "../../../redux/features/TeamsDashboard/9BoxModelSlice";
import { getLastThreemonthWorkingHours } from "../../../redux/features/TeamsDashboard/Last3MonthWorking";
import {
  Bill_Nonbill_hrs,
  setDeptIDforbillable,
} from "../../../redux/features/TeamsDashboard/billableNonbillableSlice";
import { getratingData } from "../../../redux/features/TeamsDashboard/top5EmployeeSlice";
import {
  getDepartmentData,
  setDepartmentId,
  setDepartmentName,
} from "../../../redux/features/common-features/departmentSlice";
import { getEmployeeData } from "../../../redux/features/employee-efficiency-slice/employeeSlice.redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { RoleGroup } from "../../../routes/Roles";
import { getMaxBillableHours } from "../../../redux/features/TeamsDashboard/maxBillableHours";
import InfoImage from "../../../assets/image/Info.webp";

const DepartmentDropdown = () => {
  const dispatch = useDispatch<AppDispatch>();

  //#region Select and Filter

  useEffect(() => {
    const getDepartment = async () => {
      await dispatch(getDepartmentData());
      const tokenData = decode(sessionStorage.getItem("token"));
      const { myDecodedToken }: any = tokenData;
      const { DepartmentId } = myDecodedToken;
      if (DepartmentId) {
        dispatch(getEmployeeData(DepartmentId));
        dispatch(setDepartmentId(DepartmentId));
      }
    };
    getDepartment();
  }, [dispatch]);
  const { departmentsId, dptName } = useSelector(
    (state: RootState) => state.DepartmentAction,
  );

  const filterOption = (
    input: string,
    option?: { label: string; value: number },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  //#endregion

  const currentDate = new Date();
  let selectedYear = currentDate.getFullYear();
  let selectedMonth = currentDate.getMonth();

  const handleDepartmentID = async (deptID: any) => {
    dispatch(setDeptIDforbillable(deptID));
    // dispatch(resetDepartmentAction());

    dispatch(getratingData(deptID));
    const department = departmentsId.find((dept) => dept.value === deptID);
    const name = department ? department.label : "";
    dispatch(getEmployeeData(deptID));
    dispatch(setDepartmentName(name));
    await dispatch(setDeptIDfor9Box(deptID));

    dispatch(
      Bill_Nonbill_hrs({
        deptID: deptID,
        year: selectedYear,
        month: selectedMonth,
      }),
    );
    dispatch(
      getNineBoxModelData({
        deptID: deptID,
        year: selectedYear,
        month: selectedMonth,
      }),
    );

    await dispatch(getMaxBillableHours(deptID));

    dispatch(getEmployeeData(deptID));
    dispatch(getLastThreemonthWorkingHours(deptID));
  };

  //#endregion
  return (
    <>
      {sessionStorage.getItem("role") === RoleGroup.ADMIN && (
        <>
          <Select
            className="dept-dropdown"
            showSearch
            placeholder="Select a Department"
            filterOption={filterOption}
            options={departmentsId}
            value={dptName}
            onSelect={(value: any) => handleDepartmentID(value)}
            style={{ width: "100%" }}
          />
          <Tooltip
            title="To view information from different departments, switch to the department of your choice."
            placement="right"
          >
            <img
              src={InfoImage}
              alt="info"
              style={{
                height: "40px",
                width: "40px",
                margin: "0px 0px 0px 8px",
              }}
            />
          </Tooltip>
        </>
      )}
    </>
  );
};

export default DepartmentDropdown;
