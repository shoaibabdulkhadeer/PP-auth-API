import { Col, Popover, Row } from "antd";
import { useEffect, useState } from "react";
import image1 from "../../../assets/image/WelcomeImage1.png";
import image2 from "../../../assets/image/side_scrollable.gif";
import image3 from "../../../assets/image/Achievements.webp";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import LineChart from "./9BoxModel";
import DepartmentDropdown from "./Departments";
import "./TeamDashboard.css";
import BarChart from "./Top5Ratings";
import GroupBarChart from "./WorkingHours";

import { decode } from "../../../common/common";
import {
  getNineBoxModelData,
  setDeptIDfor9Box,
} from "../../../redux/features/TeamsDashboard/9BoxModelSlice";
import { getratingData } from "../../../redux/features/TeamsDashboard/top5EmployeeSlice";
import {
  getDepartmentData,
  resetDepartmentAction,
} from "../../../redux/features/common-features/departmentSlice";
import { getMaxBillableHours } from "../../../redux/features/TeamsDashboard/maxBillableHours";
import {
  Bill_Nonbill_hrs,
  setDeptIDforbillable,
} from "../../../redux/features/TeamsDashboard/billableNonbillableSlice";
import { useNavigate } from "react-router-dom";
import { ErrorPages } from "../../../shared/enums";
// import { getMaxBillableHours } from "../../../redux/features/TeamsDashboard/maxBillableHours";

const TeamDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [FullName, setFullName] = useState<any>("");
  const [isResponseTrue, setIsResponseTrue] = useState(false);

  const { dptName } = useSelector((state: RootState) => state.DepartmentAction);

  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();

    const fetchData = async () => {
      dispatch(resetDepartmentAction());
      const departmentResponse = await dispatch(getDepartmentData());

      if (departmentResponse?.payload?.response?.data?.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }

      const userdata = decode(sessionStorage.getItem("token"));
      const { myDecodedToken }: any = userdata;
      const { DepartmentId, FullName } = myDecodedToken;
      setFullName(FullName);
      await dispatch(setDeptIDforbillable(DepartmentId));
      await dispatch(setDeptIDfor9Box(DepartmentId));

      await dispatch(getMaxBillableHours(DepartmentId));

      const averageRatingResponse = await dispatch(getratingData(DepartmentId));
      const workingResponse = await dispatch(
        Bill_Nonbill_hrs({
          deptID: DepartmentId,
          year: currentDate.getFullYear(),
          month: currentDate.getMonth(),
        }),
      );

      const nineboxDataResponse = await dispatch(
        getNineBoxModelData({
          deptID: DepartmentId,
          year: currentDate.getFullYear(),
          month: currentDate.getMonth(),
        }),
      );

      if (
        workingResponse?.payload?.data?.code === 200 &&
        averageRatingResponse.payload.code === 200 &&
        nineboxDataResponse.payload.code === 200
      ) {
        setIsResponseTrue(true);
      }
      if (workingResponse?.payload?.response?.data?.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }
      if (nineboxDataResponse?.payload?.response?.data?.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  const currentDate = new Date();

  currentDate.setMonth(currentDate.getMonth() - 1);
  const previousMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(currentDate);

  const { MaxBillableHoursData } = useSelector(
    (state: RootState) => state.MaxBillableHourPreviousMonthAction,
  );
  const response: any = MaxBillableHoursData;

  const fullNames: any = [];
  let maxBillableHours: any = 0;

  response?.forEach((entry: any) => {
    const fullName = entry.FullName;
    const billableHours = entry.BillableHours;

    if (billableHours > maxBillableHours) {
      maxBillableHours = billableHours;
      fullNames.length = 0; // Clear the array
    }

    if (billableHours === maxBillableHours) {
      // If this entry has the maximum billable hours, add the name to the array
      fullNames.push(fullName);
    }
  });

  const billableHoursList = [maxBillableHours];
  // const demo = [
  //   "ranjan kishor",
  //   "ranjan kishor",
  //   "ranjan kishor",
  //   "ranjan kishor",
  //   "ranjan kishor",
  //   "ranjan kishor",
  // ];

  return (
    <div>
      {isResponseTrue ? (
        <>
          {" "}
          <div className="greetingBoxRow">
            <div className="greetingBoxRowLeft" style={{ height: "295px" }}>
              <div>
                <img
                  className="illustrationimage"
                  alt="Congratulations"
                  src={image1}
                  style={{
                    height: "220px",
                    width: "300px",
                  }}
                />
              </div>

              <div
                className="greetingBoxRowLeft-rightCol"
                style={{ width: "100%" }}
              >
                <div className="Department-SearchDropDiv">
                  <DepartmentDropdown />
                </div>
                <h4>
                  <span className="welcome">Welcome! </span>
                  <span className="name">
                    <span id="fullname">{FullName}</span>
                  </span>
                </h4>
                <span className="Welcome-Box" style={{ minWidth: "100%" }}>
                  Here's what's happening in{" "}
                  <span className="departmentName"> {dptName}</span> department.
                </span>
                <p className="Welcome-Box"></p>
              </div>
            </div>

            <div style={{ display: "flex" }} className="GreetingBoxRight">
              <img
                className="movinggif"
                alt="Congratulations"
                src={image2}
                style={{
                  height: "220px",
                  width: "300px",
                }}
              />
              <div>
                <h4 className="Highest-billable">
                  Highest billable hours logged in{" "}
                  <span id="month">{previousMonthName}</span> month{" "}
                </h4>
                <div>
                  {/* Other content */}
                  <p
                    className="EmployeeCount"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Popover
                      content={
                        fullNames?.length === 1 ? (
                          fullNames[0]
                        ) : (
                          <div style={{ maxHeight: "150px", overflow: "auto" }}>
                            <ul>
                              {fullNames?.map((name: any, index: any) => (
                                <li key={index}>{name}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                      title={
                        fullNames.length === 0
                          ? "No employee found"
                          : "Employees with max billable hours"
                      }
                      trigger="hover"
                      placement="top"
                      color="#e4e4e7"
                    >
                      <p id="maxBillable">{billableHoursList}</p>
                    </Popover>

                    <img
                      src={image3}
                      alt="achievements"
                      style={{ height: "160px", width: "160px" }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Row></Row>
          <Row gutter={17}>
            <Col md={12}>
              <LineChart />
            </Col>
            <Col md={12}>
              <GroupBarChart />
            </Col>
          </Row>
          <BarChart />
        </>
      ) : (
        <div className="loading-container">
          <div>
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDashboard;
