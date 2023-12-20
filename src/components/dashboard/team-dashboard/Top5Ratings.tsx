import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getratingData } from "../../../redux/features/TeamsDashboard/top5EmployeeSlice";
import { Empty, Button, Tooltip, Row, Col } from "antd";
import { ApexOptions } from "apexcharts";
import { InfoCircleOutlined } from "@ant-design/icons";

interface BarChartProps {}

const BarChart: React.FC<BarChartProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const itemsPerPage = 15; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getratingData());
  }, [dispatch]);

  const { ratingData, ratingError, ratingLoading } = useSelector(
    (state: RootState) => state.RatingAction,
  );

  const showNoData = ratingData.length === 0 && !ratingLoading && !ratingError;

  if (showNoData) {
    return (
      <div className="NoDataFoundWorkingHours">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 250, width: "100%" }}
          description={<span>No Data found</span>}
        ></Empty>
      </div>
    );
  }

  const names = ratingData?.map((item: any) => item.FullName);
  const ratings = ratingData?.map((item: any) => item.AverageRating);
  const sortedData = names
    .map((name: any, index: any) => ({ name, rating: ratings[index] }))
    .sort((a: any, b: any) => b.rating - a.rating);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const namesPerPage = sortedData
    .slice(startIndex, endIndex)
    .map((item: any) => item.name);
  const ratingsPerPage = sortedData
    .slice(startIndex, endIndex)
    .map((item: any) => item.rating);

  const options: ApexOptions = {
    chart: {
      height: 400,
      type: "bar",
      offsetY: 16,
      toolbar: {
        export: {
          svg: {
            filename: "AverageRatingofEmployees",
          },
          csv: {
            filename: "AverageRatingofEmployees",
          },
          png: {
            filename: "AverageRatingofEmployees",
          },
        },
      },
    },

    plotOptions: {
      bar: {
        distributed: true,
        barHeight: "80%",
        borderRadius: 5,
        colors: {
          backgroundBarOpacity: 100,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      title: {
        text: "Employees",
        offsetX: -5,
        // offsetY: 20,
        style: {
          fontSize: "19px",
        },
      },
      categories: namesPerPage,
      position: "bottom",
      labels: {
        show: true,
      },
    },

    yaxis: {
      title: {
        text: "Average rating",

        rotate: -90,
        offsetX: -5,
        // offsetY: 20,
        style: {
          fontSize: "19px",
        },
      },
      labels: {
        show: true,
      },
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: ["#a7f3d0", "#7dd3fc", "#c4b5fd", "#fde68a", "#fca5a5"],
  };

  const series = [
    {
      name: "AverageRating",
      data: ratingsPerPage,
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: false,
      },
    },
  ];

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="top5Barchart">
      <h2>
        Employees average skills rating
        <Tooltip
          title="Here average rating is calculated on the basis of Reporting manager rating."
          placement="right"
        >
          <Button
            type="text"
            shape="circle"
            icon={<InfoCircleOutlined style={{ color: "green" }} />}
          />
        </Tooltip>
      </h2>
      <Chart
        className="Barchart-child"
        options={options}
        series={series}
        type="bar"
        height="120%"
        width="98%"
        dir="ltr"
      />
      <Row justify={"end"} gutter={8} style={{ padding: "2%" }}>
        <Col>
          <Button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </Button>
        </Col>
        <Col>
          <Button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BarChart;
