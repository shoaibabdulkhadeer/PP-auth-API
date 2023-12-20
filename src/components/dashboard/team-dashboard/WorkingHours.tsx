import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./TeamDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { Button, Empty, DatePicker, Row, Col } from "antd";
import {
  Bill_Nonbill_hrs,
  setMonthYear,
} from "../../../redux/features/TeamsDashboard/billableNonbillableSlice";
import dayjs from "dayjs";

const GroupedBarChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const { Bill_Nonbill_Data } = useSelector(
    (state: RootState) => state.Billable_NonBillableHoursAction,
  );

  const filteredData = Bill_Nonbill_Data?.data;

  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const pageData = filteredData?.slice(startIdx, endIdx);

  // Modify this section of your code
  const sortedData = pageData?.map((item: any) => ({
    name: item.FullName,
    billableHours: item.BillableHours,
    nonBillableHours: item.NonBillableHours,
  }));

  sortedData?.sort((a, b) => b.billableHours - a.billableHours);

  const xaxisnames = sortedData?.map((item: any) => item.name);
  const billableHours = sortedData?.map((item: any) => item.billableHours);
  const nonBillableHours = sortedData?.map(
    (item: any) => item.nonBillableHours,
  );

  // The rest of your code remains the same

  const { deptId } = useSelector(
    (state: RootState) => state.Billable_NonBillableHoursAction,
  );

  const currentDate = new Date();

  const handleDateChange1 = (date: any) => {
    setSelectedDate(date);
    const jsDate = new Date(date);
    const year = jsDate.getFullYear();

    const month = jsDate.getMonth() + 1;

    dispatch(setMonthYear({ month: month, year: year }));
    dispatch(
      Bill_Nonbill_hrs({
        deptID: deptId,
        year: year,
        month: month,
      }),
    );
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        export: {
          svg: {
            filename: "Billable_Non_Billable_Data",
          },
          csv: {
            filename: "Billable_Non_Billable_Data",
          },
          png: {
            filename: "Billable_Non_Billable_Data",
          },
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "75%",
        borderRadius: 3,
      },
    },
    xaxis: {
      title: {
        text: "Employees",
        style: {
          fontSize: "15px",
        },
      },
      categories: xaxisnames,
      labels: {
        rotateAlways: false,
      },
    },

    yaxis: {
      title: {
        text: "No. of hours",

        style: {
          fontSize: "17px",
        },
      },
    },
  };

  const chartSeries = [
    {
      name: "Billable Hours",
      data: billableHours,
      color: "#1d4ed8",
    },
    {
      name: "Non-Billable Hours",
      data: nonBillableHours,
      color: "#C70039",
    },
  ];

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth().toString().padStart(2, "0");
  const todyformattedDate = `${year}-${month}`;

  return (
    <div className="chart-container-WorkingHours">
      <Row align={"middle"}>
        <Col md={15}>
          <h2>Billable and non-billable hours</h2>
        </Col>
        <Col md={9}>
          <DatePicker
            style={{ width: "71%" }}
            // format="YYYY-MM"
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
      {Bill_Nonbill_Data?.data.length === 0 ? (
        <div>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: "303px", width: "100%" }}
            description={<span>No data found</span>}
          ></Empty>
        </div>
      ) : (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="109%"
          width="95%"
        />
      )}

      <Row justify={"end"} gutter={8} style={{ padding: "2%" }}>
        {filteredData?.length > 0 && (
          <Col>
            <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Previous
            </Button>
          </Col>
        )}
        {filteredData?.length > 0 && (
          <Col>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default GroupedBarChart;
