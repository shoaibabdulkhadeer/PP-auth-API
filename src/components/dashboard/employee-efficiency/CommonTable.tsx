import { LoadingOutlined } from "@ant-design/icons";
import { Card, Empty, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmpGuidID } from "../../../redux/features/employee-management/empGetAllSlice";
import {
  getModalData,
  setModalOpen,
} from "../../../redux/features/modal-slice/modalSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { ErrorPages } from "../../../shared/enums";

const CommonTable = ({ tableData, title, className }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { empLoading }: any = useSelector(
    (state: RootState) => state.EmployeeAction,
  );

  const handleRowClick = async (empId: string) => {
    dispatch(setModalOpen(true));
    const res = await dispatch(getModalData(empId));
    if (res.payload.response?.data.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }
    dispatch(setEmpGuidID(empId));
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "FullName",
      key: "EmployeeGuID",
      render: (text: any) =>
        text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A",
    },
    {
      title: "Designation",
      dataIndex: "Designation",
      key: "EmployeeGuID",
      render: (text: any) => (text ? text : "N/A"),
    },
    {
      title: "Reporting Manager",
      dataIndex: "ReportingManagerName",
      key: "EmployeeGuID",
      render: (text: any) => (text ? text : "N/A"),
    },
    {
      title: "Hourly Cost ($/hr)",
      dataIndex: "HourlyCost",
      key: "EmployeeGuID",
      render: (text: any) => (text ? text : "N/A"),
    },
  ];
  return (
    <Card
      title={<span className="allocation-gte8-card-title">{title}</span>}
      className="allocation-gte8-card"
      style={{ height: "97%", width: "100%" }}
    >
      <Table
        rowKey={"EmployeeGuID"}
        columns={columns}
        dataSource={tableData}
        className={className}
        scroll={{ y: 200 }}
        pagination={
          tableData?.length < 11
            ? false
            : {
                pageSize: 10,
                pageSizeOptions: [10],
              }
        }
        locale={{
          emptyText: empLoading ? (
            <LoadingOutlined style={{ fontSize: 40 }} />
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              description="No Employees Found"
            />
          ),
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record.EmployeeGuID),
          className: "table-row-pointer",
        })}
      />
    </Card>
  );
};

export default CommonTable;
