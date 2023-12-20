import { Empty } from "antd";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import "./EmployeeEfficiency.css";
const Chart = () => {
  const { OnBench, AllocationHoursgte8, AllocationHourslt8 } = useSelector(
    (state: RootState) => state.EmployeeAction.employeeData,
  );
  const options: any = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Overall Employee Status",
      align: "center",
      margin: 20,
      offsetX: 0,
      offsetY: 2,
      floating: false,
      style: {
        fontSize: "16px",
        fontFamily: "'Roboto',sans-serif",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.29,
        stops: [0, 70],
      },
    },
    plotOptions: {
      pie: {
        customScale: 1,
      },
    },
    labels: ["On Bench", "Allocation hrs <8", "Allocation hrs >=8"],
    series: [
      OnBench?.length,
      AllocationHourslt8?.length,
      AllocationHoursgte8?.length,
    ],
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: "bottom",
      itemMargin: {
        horizontal: 6,
        vertical: 3,
      },
      fontSize: "14%",
    },
    colors: ["#b62e2d", "#405497", "#e3ad3e"],
  };

  return (
    <>
      {OnBench?.length === 0 ? (
        <>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            Overall Employee Status
          </h3>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 150 }}
            description={<span>No Record found</span>}
          ></Empty>
        </>
      ) : (
        <ReactApexChart
          options={options}
          series={options.series}
          type="pie"
          height={300}
        />
      )}
    </>
  );
};

export default Chart;
