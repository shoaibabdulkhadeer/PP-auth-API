import { Col, DatePicker, Empty, Row } from "antd";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getNineBoxModelData } from "../../../redux/features/TeamsDashboard/9BoxModelSlice";
import { Bill_Nonbill_hrs } from "../../../redux/features/TeamsDashboard/billableNonbillableSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import "./TeamDashboard.css";

const LineChart = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { NineBoxModelData, ShowNineBoxData } = useSelector(
    (state: RootState) => state.NineBoxAction,
  );

  const currentDate = new Date();

  useEffect(() => {
    dispatch(
      Bill_Nonbill_hrs({
        deptID: NineBoxdeptId,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const allCountsAreZero = NineBoxModelData.data.every(
    (item: any) => item.count === 0,
  );

  const { NineBoxdeptId } = useSelector(
    (state: RootState) => state.NineBoxAction,
  );

  const positionNames = NineBoxModelData.data.map(
    (item: any) => item.PositionName,
  );
  const employeeNames = NineBoxModelData.data.map((item: any) => item.employee);
  const employeeNumbers = NineBoxModelData.data.map((item: any) => item.count);

  const categories = positionNames;

  //#region for changing the department
  const handleDateChange1 = (date: any) => {
    setSelectedDate(date);
    const jsDate = new Date(date);
    const year = jsDate.getFullYear();
    const month = jsDate.getMonth() + 1;

    dispatch(
      getNineBoxModelData({
        deptID: NineBoxdeptId,
        year: year,
        month: month,
      }),
    );
  };
  //#endregion
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth().toString().padStart(2, "0");
  const todyformattedDate = `${year}-${month}`;

  const chartOptions: ApexOptions = {
    chart: {
      toolbar: {
        export: {
          svg: {
            filename: "9boxmodel",
          },
          csv: {
            filename: "9boxmodel",
          },
          png: {
            filename: "9boxmodel",
          },
        },
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: [11],
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.35,
      },
    },

    colors: ["#F4CE14", "#F4CE14", "#F4CE14"],
    series: [
      {
        name: "EmployeeName",
        data: employeeNumbers,
        color: "#daa520",
      },
    ],
    fill: {
      type: "gradient",
    },
    yaxis: {
      tickAmount: 6,
      tooltip: {
        enabled: true,
        offsetX: 5,
      },
      title: {
        text: "Employees count",
        rotate: -90,
        offsetX: -5,
        // offsetY: 20,
        style: {
          fontSize: "19px",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#F4CE14"],
      },
    },
    stroke: {
      curve: "smooth",
      colors: ["#daa520"],
    },

    xaxis: {
      axisBorder: {
        show: true,
        color: "#daa520",
        // offsetX: 10,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#daa520",
        offsetX: 6,
        offsetY: 0,
      },
      labels: {
        style: {
          colors: "#0C356A",
        },
      },
      categories: categories,
      title: {
        text: "9 box Positions",
        offsetY: -5,
        style: {
          fontSize: "17px",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      onDatasetHover: {
        highlightDataSeries: true,
      },
      style: {},
      x: {
        formatter: function (value, { dataPointIndex }) {
          return categories[dataPointIndex];
        },
      },
      y: {
        formatter: function (value, { dataPointIndex }) {
          const employeeList = employeeNames[dataPointIndex];
          const formattedEmployeeList = employeeList
            .map((employee: any, index: any) => {
              if (index === 0) {
                return "<span style='color: purple;'></span> " + employee;
              } else {
                return employee;
              }
            })
            .join("<br>");
          return formattedEmployeeList;
        },
      },
    },
    theme: {
      mode: "light",
    },
  };

  return (
    <div className="chart-container">
      <Row align={"middle"}>
        <Col md={15}>
          <h2>9-Box position</h2>
        </Col>
        <Col md={9}>
          <DatePicker
            className="DatePickerNineBox"
            style={{ width: "71%" }}
            format="YYYY-MM"
            picker="month"
            value={
              selectedDate ||
              dayjs(`${currentDate.getFullYear()}-${currentDate.getMonth()}`)
            }
            onChange={handleDateChange1}
            placeholder="Select date"
            disabledDate={(current) => {
              return current.isAfter(
                dayjs(todyformattedDate, "YYYY-MM"),
                "month",
              );
            }}
          />
        </Col>
      </Row>
      {allCountsAreZero ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: "315px", width: "100%", margin: "5px" }}
          description={<span id="nineboxdata">No data found </span>}
        />
      ) : ShowNineBoxData ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 200, width: "100%" }}
          description={<span>Internal Server error</span>}
        />
      ) : (
        <ApexCharts
          options={chartOptions}
          series={[{ data: employeeNumbers }]}
          type="area"
          style={{ color: "#F4CE14" }}
          height="150%"
          width="95%"
        />
      )}
    </div>
  );
};

export default LineChart;
