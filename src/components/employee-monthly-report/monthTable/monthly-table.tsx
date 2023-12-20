import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NineBox from "../../../assets/image/MicrosoftTeamsPerf.png";
import { useNavigate } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { fetchingEmpName } from "../../../redux/features/monthly-report/basic-info-emp-name";
import { exportMonthlyReport } from "../../../redux/features/monthly-report/export-monthly-report";
import {
  fetchingEmpReport,
  setChange,
  setCheckdays,
  setEditButton,
  setEditOpen,
  setMonthDate,
  setString,
} from "../../../redux/features/monthly-report/montly-emp-report";
import { fetching9box } from "../../../redux/features/monthly-report/nineBoxSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import NoData from "../../employee-management/NoData";
import TableModal from "./popup";
import { ErrorPages } from "../../../shared/enums";
import { cardShadow } from "../../../utils/commonCSS";

const MonthTable = () => {
  // let load=1;
  const dispatch = useDispatch<AppDispatch>();
  const { empMontlyReport, reload, empMontlyReportdataloading } = useSelector(
    (state: RootState) => state.EmpMonthlyReport,
  );
  //bascifo
  const [array, setArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchingEmpName());
      setArray(data.payload.data);
      const result = await dispatch(fetchingEmpReport());
      if (result.payload.code === 400) {
        toast.warning("No report uploaded yet");
      } else if (result.payload.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }
    };
    fetchData();
  }, [reload, navigate, dispatch]);

  useEffect(() => {
    dispatch(fetching9box());
  }, [dispatch]);

  const NameToDay = (year: any, month: any) => {
    const DATEE = new Date(`${year}-${month}-01`);
    const yearr = DATEE.getFullYear();
    const monthh = (DATEE.getMonth() + 1).toString().padStart(2, "0");
    const formattedDate = `${yearr}-${monthh}`;
    return formattedDate;
  };

  const uniqueForMonthsDate = new Set();
  empMontlyReport?.filter((item: any) => {
    const isUnique = !uniqueForMonthsDate.has(item.ForMonth);
    if (isUnique) {
      uniqueForMonthsDate.add(item.ForMonth);
    }
    return isUnique;
  });

  const modifiedUniqueForMonths1 = Array.from(uniqueForMonthsDate)?.map(
    (date: any) => date,
  );

  const formattedObject: any = [];

  modifiedUniqueForMonths1.forEach((dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const formattedMonth = `${month}-${year}`;
    formattedObject.push(formattedMonth);
  });
  formattedObject.sort((a: any, b: any) => {
    const dateA: any = new Date(`01-${a}`);
    const dateB: any = new Date(`01-${b}`);
    return dateB - dateA;
  });
  const mapMonth: any = [];
  formattedObject.map((array: any) => {
    const obj: any = {};
    obj["ForMonth"] = array;
    mapMonth.push(obj);
    return {};
  });
  const editTableModal = (data: any) => {
    dispatch(setEditButton()); //bten t/F
    const [month, year] = data.split("-");
    const formattedDate = NameToDay(month, year);
    dispatch(setMonthDate(formattedDate));
    dispatch(setCheckdays(formattedDate));

    dispatch(setEditOpen(true)); //model popup open and close
    dispatch(setChange(true));
    dispatch(setString("edit"));
  };

  const download = (data: any) => {
    const [month, year] = data.split("-");
    const monthh = NameToDay(month, year);
    dispatch(exportMonthlyReport({ ForMonth: `${monthh}-01` }));
  };
  const addTableModel = () => {
    dispatch(setEditOpen(true));
    dispatch(setChange(false));
    dispatch(setString("add"));
  };
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>For Month</div>,
      dataIndex: "ForMonth",
      key: "ForMonth",
      width: 300,
    },
    {
      title: <div style={{ textAlign: "center" }}>Actions</div>,
      dataIndex: "actions",
      key: "actions",
      width: 300,
      render: (_: any, record: any) => (
        <div className="button">
          <Tooltip title="Click here to update" placement="bottom">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              style={{ backgroundColor: "#ffc000" }}
              onClick={() => editTableModal(record.ForMonth)}
            />
          </Tooltip>
          <Tooltip title="Click here to download" placement="bottom">
            <Button
              type="primary"
              shape="circle"
              icon={<FaCloudDownloadAlt />}
              style={{ backgroundColor: "#8ac84e" }}
              onClick={() => {
                download(record.ForMonth);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="Main">
      <div className="monthlyTbl">
        <Card className="empreport-header-card" style={cardShadow}>
          <Row justify={"space-between"} align={"middle"}>
            <Col>
              <div className="imgandreport">
                <span>Explore monthly employee reports here!</span>
              </div>
            </Col>
            <Col>
              <Tooltip title={array?.length ? "" : "No reportees assigned"}>
                <Button
                  className="add-rpt-btn"
                  size="small"
                  type="primary"
                  // shape="round"
                  disabled={array?.length ? false : true}
                  icon={<PlusOutlined />}
                  onClick={() => addTableModel()}
                >
                  New Report
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Card>

        {/* DESIGNING MAIN CONTENT */}

        <Row
          gutter={8}
          justify={"space-around"}
          style={{ margin: "1rem 0 2rem 0" }}
        >
          <Col xs={24} sm={24} md={12}>
            <Card
              className="table-card"
              title="EMPLOYEE REPORT"
              style={cardShadow}
            >
              <div className="TableContainer">
                <Table
                  dataSource={mapMonth}
                  columns={columns}
                  className="table-monthly"
                  loading={empMontlyReportdataloading}
                  pagination={
                    mapMonth.length < 4
                      ? false
                      : {
                          pageSize: 3,
                          pageSizeOptions: [3, 5, 10],
                        }
                  }
                  locale={{
                    emptyText: empMontlyReportdataloading ? " " : <NoData />,
                  }}
                />
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Card
              className="nine-box-img"
              title="9-BOX MODEL"
              style={cardShadow}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  mixBlendMode: "multiply",
                }}
                src={NineBox}
                alt={NineBox}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <TableModal />
    </div>
  );
};

export default MonthTable;
