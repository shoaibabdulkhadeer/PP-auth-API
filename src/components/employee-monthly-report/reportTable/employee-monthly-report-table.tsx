import { SnippetsOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Select, Table, Tooltip, Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  addMonthlyReport,
  setFildes,
  setsubmitDate,
} from "../../../redux/features/monthly-report/add-monthly-report";
import { EditMonthlyReport } from "../../../redux/features/monthly-report/edit-emp-report";
import {
  setDateChange,
  setEditOpen,
  setEdtiOn,
  setReload,
  setString,
  setbuttonTorF,
} from "../../../redux/features/monthly-report/montly-emp-report";
import { AppDispatch, RootState } from "../../../redux/store";
import { getColor } from "../../../utils/commonCSS";
import "./employee-monthly-report-table.css";
import NoData from "../../employee-management/NoData";
import { useNavigate } from "react-router-dom";
import { ErrorPages } from "../../../shared/enums";

const { Option } = Select;

export const EditableTable = () => {
  const { nineBox } = useSelector((state: RootState) => state.NineBoxData);
  interface NineBoxItem {
    PositionId: number;
    BoxName: string;
  }

  const [forInput, SetForInput] = useState<{ [key: string]: boolean }>({});

  const [forInputRemarks, SetForInputRemarks] = useState<{
    [key: string]: boolean;
  }>({});
  const [buttonTF, setButtonTF] = useState(false);
  const [textChange, SetTextChange] = useState<any>({
    BillableHours: "",
    NonBillableHours: "",
    PositionId: "",
    Remarks: "",
    key: "",
  });
  const navigate = useNavigate();
  const ninebox: NineBoxItem[] = nineBox;
  const { EmpNameId } = useSelector((state: RootState) => state.EmpNameId); //bascifo
  const [originalEmpNameId] = useState<any[]>(
    EmpNameId?.map((item: any) => ({
      key: item.EmployeeGuID,
      FullName: item.FullName,
      BillableHours: item.BillableHours,
      NonBillableHours: 0,
      PositionId: item.PositionId,
      Remarks: item.Remarks,
    })),
  );
  const [empNameId] = useState<any[]>(originalEmpNameId); //this is for add
  const {
    empMontlyReport,
    monthdate,
    editOrAdd,
    editButton,
    saveButton,
    submitDate,
    checkdays,
    editOn,
    reload,
  } = useSelector((state: RootState) => state.EmpMonthlyReport); //MR
  const { submitDatee } = useSelector(
    (state: RootState) => state.AddingMonthlyReport,
  );

  const EmpReportAsMonth = empMontlyReport?.filter(
    (state: any) => state.ForMonth.substring(0, 7) === monthdate,
  );

  const dispatch = useDispatch<AppDispatch>();

  interface editI {
    FullName: string;
    BillableHours: string;
    NonBillableHours: string;
    PositionId: any;
    Remarks: string;
    key: string;
  }
  const mapPositionIdToBoxName = (positionId: any) => {
    const matchingBox: any = nineBox.find(
      (box: any) => box.PositionId === positionId,
    );

    return matchingBox ? matchingBox.BoxName : "";
  };

  const mapPositionNameToBoxId = (positionName: any) => {
    const matchingBox: any = nineBox.find(
      (box: any) => box.BoxName === positionName,
    );

    return matchingBox?.PositionId;
  };

  function getDatesInMonth(year: any, month: any) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const dates = [];

    for (
      let date = firstDay;
      date <= lastDay;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date));
    }

    return dates;
  }

  const stringDate = checkdays.toString();
  const [year, month] = stringDate.split("-");
  const count = getDatesInMonth(year, month);
  const dayes = count[count.length - 1].getDate();
  const exceedHours = dayes * 24;

  const handleHoursBlur = (
    key: string,
    dataIndex: string,
    otherHours: any,
    record: any,
  ) => {
    const newSumm =
      Number(record.BillableHours) + Number(record.NonBillableHours);
    if (newSumm > exceedHours) {
      toast.error(`Total hours cannot exceed ${exceedHours} hours`);
      SetForInput({ ...forInput, [key]: true });
      dispatch(setbuttonTorF(true));
      setButtonTF(true);
    } else {
      SetForInput({ ...forInput, [key]: false });
      dispatch(setbuttonTorF(false));
      setButtonTF(false);
    }
  };

  const editMonth: any = [];
  EmpNameId?.forEach((item1: any) => {
    EmpReportAsMonth?.forEach((item2: any) => {
      if (item1.EmployeeGuID === item2.EmployeeGuID) {
        const obj: editI = {
          FullName: item1.FullName,
          BillableHours: item2.BillableHours,
          NonBillableHours: item2.NonBillableHours,
          PositionId: mapPositionIdToBoxName(item2.PositionId),
          Remarks: item2.Remarks,
          key: item2.MonthlyPerformanceInfoGuId,
        };

        editMonth.push(obj);
      }
    });
  });

  const [editState, setEditState] = useState<any[]>(editMonth);

  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (
    value: string | number | any,
    key: string,
    dataIndex: string,
  ) => {
    const MAX_REMARKS_LENGTH = 500;
    if (dataIndex === "Remarks") {
      if (value.length <= MAX_REMARKS_LENGTH) {
        SetForInputRemarks({ ...forInput, [key]: false });
      } else {
        SetForInputRemarks({ ...forInput, [key]: true });
        return;
      }
    }

    if (editOrAdd === "edit") {
      const newData = [...editState];

      const itemData = newData.find((item) => item.key === key);

      if (itemData) {
        SetTextChange(itemData);

        itemData[dataIndex] = value;
        setEditState(newData);
      }
    } else {
      const newData = [...empNameId];
      const itemData = newData.find((item) => item.key === key);

      if (itemData) {
        itemData[dataIndex] = value;
        setEditState(newData);
      }
    }
  };

  const handleEdit = (key: string, record: any) => {
    SetTextChange({ ...record, key });
    setEditStates({ ...editStates, [key]: true });
    dispatch(setEdtiOn(true));
  };

  const editfunction = async (record: any) => {
    const res = await dispatch(EditMonthlyReport(record));
    if (res.payload.response?.data?.code === 400) {
      toast.warning("Property should not be empty");
    } else if (res.payload?.response?.data?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    } else {
      toast.success(res.payload.message);
      SetTextChange({
        BillableHours: "",
        NonBillableHours: "",
        PositionId: "",
        Remarks: "",
        key: "",
      });
      dispatch(setReload(reload + 1));
      const newData = [...editState];
      const findData = newData.find((item) => item.key === textChange.key);
      findData.BillableHours = textChange.BillableHours;
      findData.NonBillableHours = textChange.NonBillableHours;
      findData.PositionId = textChange.PositionId;
      findData.Remarks = textChange.Remarks;
      findData.key = textChange.key;
      setEditState(newData);
      setDatasource(newData);
    }
  };

  const handleSave = async (record: any) => {
    setEditStates({ ...editStates, [record.key]: false });
    if (typeof record.PositionId === "string") {
      record.PositionId = await mapPositionNameToBoxId(record.PositionId);
    } else {
      record.PositionId = await mapPositionIdToBoxName(record.PositionId);
    }
    const obj = {
      BillableHours: parseInt(textChange.BillableHours, 10),
      NonBillableHours: parseInt(textChange.NonBillableHours, 10),
      PositionId: mapPositionNameToBoxId(textChange.PositionId),
      Remarks: textChange.Remarks,
      key: record.key,
    };

    if (typeof record.PositionId !== "string") {
      record.PositionId = await mapPositionIdToBoxName(record.PositionId);
    }

    setEditState([
      ...editState.filter((c: any) => c.key !== obj.key),
      {
        BillableHours: parseInt(record.BillableHours, 10),
        NonBillableHours: parseInt(record.NonBillableHours, 10),
        PositionId: record.PositionId,
        Remarks: record.Remarks,
        FullName: record.FullName,
        key: record.key,
      },
    ]);

    if (
      parseInt(textChange.BillableHours, 10) +
        parseInt(textChange.NonBillableHours, 10) >
      exceedHours
    ) {
      toast.warning(`Total hours cannot exceed ${exceedHours} hours`);
    } else {
      editfunction(obj);
    }
    dispatch(setEdtiOn(false));
  };

  const handleSelectChange = (
    value: string,
    key: string,
    dataIndex: string,
  ) => {
    handleInputChange(value, key, dataIndex);
  };

  const columns = [
    {
      title: <span className="titleStyle">Employee Name</span>,
      dataIndex: "FullName",
      key: "FullName",
      render: (text: string, record: any, index: number) => (
        <div className="empNameContentStyle">
          {!editStates[record.key] ? (
            <>
              <Avatar
                size={32}
                style={{
                  backgroundColor: getColor(index), //index
                  marginRight: "8px", // Add margin to create space between Avatar and text
                }}
              >
                {text.toString().charAt(0).toUpperCase()}
              </Avatar>
              {text}
            </>
          ) : (
            text
          )}
        </div>
      ),
    },

    {
      title: <span className="titleStyle"> Billable Hours*</span>,
      width: 200,
      dataIndex: "BillableHours",
      key: "BillableHours",
      render: (text: string, record: any) => (
        <div className="contentStyle">
          {editStates[record.key] || editOrAdd !== "edit" ? (
            <Form.Item
              className="new-class"
              validateStatus={forInput[record.key] ? "error" : "success"}
            >
              <Input
                value={editOrAdd === "edit" ? textChange.BillableHours : text}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange(newValue, record.key, "BillableHours");
                }}
                onBlur={() =>
                  handleHoursBlur(
                    record.key,
                    "BillableHours",
                    record.BillableHours,
                    record,
                  )
                }
                className="inputStyle"
              />
            </Form.Item>
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: <span className="titleStyle">Non-Billable Hours*</span>,
      dataIndex: "NonBillableHours",
      key: "NonBillableHours",
      render: (text: string, record: any) => (
        <div className="contentStyle">
          {editStates[record.key] || editOrAdd !== "edit" ? (
            <Form.Item
              validateStatus={forInput[record.key] ? "error" : "success"}
            >
              <Input
                value={
                  editOrAdd === "edit" ? textChange.NonBillableHours : text
                }
                onChange={(e) => {
                  const newValue = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange(newValue, record.key, "NonBillableHours");
                }}
                onBlur={() =>
                  handleHoursBlur(
                    record.key,
                    "NonBillableHours",
                    record.NonBillableHours,
                    record,
                  )
                }
                className="inputStyle"
              />
            </Form.Item>
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: <span className="titleStyle">9-Box Position*</span>,
      dataIndex: "PositionId",
      key: "PositionId",
      render: (text: any, record: any) => (
        <div className="contentStyle">
          {editStates[record.key] || editOrAdd !== "edit" ? (
            <Form.Item>
              <Select
                listHeight={100}
                style={{ width: "100%" }}
                showSearch
                suffixIcon={false}
                placeholder={
                  <span className="placeHoleder">Choose 9-box position</span>
                }
                size="middle"
                filterOption={(input: any, option: any) => {
                  if (
                    option &&
                    option.children &&
                    typeof option.children === "string"
                  ) {
                    return (
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }
                  return false;
                }}
                value={editOrAdd === "edit" ? textChange.PositionId : text}
                onChange={(value) =>
                  handleSelectChange(value, record.key, "PositionId")
                }
                className="SelectinputStyle"
              >
                {ninebox.map((option) => (
                  <Option key={option.PositionId} value={option.PositionId}>
                    {option.BoxName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <div>{text}</div>
          )}
        </div>
      ),
    },

    {
      title: <span className="titleStyle">Remarks*</span>,
      dataIndex: "Remarks",
      key: "Remarks",
      render: (text: string, record: any) => (
        <div className="contentStyle">
          {editStates[record.key] || editOrAdd !== "edit" ? (
            <Form.Item
              className="new-class"
              validateStatus={forInputRemarks[record.key] ? "error" : "success"}
              help={
                forInputRemarks[record.key]
                  ? `Up to 500 Characters Permitted`
                  : null
              }
            >
              <Input
                value={editOrAdd === "edit" ? textChange.Remarks : text}
                onChange={(e) => {
                  const newValue = e.target.value;
                  handleInputChange(newValue, record.key, "Remarks");
                }}
                className="inputStyle"
              />
            </Form.Item>
          ) : (
            <Tooltip title={text} placement="bottom">
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {text}
              </div>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: <span className="titleStyle">Actions</span>,
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div>
          {editStates[record.key] ? (
            <Button
              type="primary"
              disabled={buttonTF}
              icon={<SnippetsOutlined />}
              onClick={() => handleSave(record)}
              className="buttonStyle"
            />
          ) : (
            <Button
              type="primary"
              disabled={editOn}
              icon={<FaEdit />}
              onClick={() => {
                handleEdit(record.key, record);
              }}
              className="editbuttonStyle"
            />
          )}
        </div>
      ),
    },
  ];
  if (editOrAdd !== "edit") {
    columns.pop(); // Remove the last column (which is the "Actions" column)
  }
  const [copy, setcopy] = useState([]);
  if (copy && copy.length === 0 && nineBox.length !== 0) {
    setcopy(nineBox);
  }

  const [datasource, setDatasource]: any[] = useState();
  useEffect(() => {
    setEditState(editMonth);
    if (editOrAdd === "edit") {
      setDatasource(editMonth);
      setDatasource(editMonth);
    } else {
      setDatasource(empNameId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editButton, copy]);

  const sub = async (obj: any) => {
    const result = await dispatch(addMonthlyReport(obj));
    if (result.payload.response?.data?.code === 400) {
      toast.error(result.payload?.response?.data?.message);
    } else if (result.payload.code === 200) {
      toast.success(result.payload.message);
      dispatch(setReload(reload + 1));
      dispatch(setEditOpen(false));
      dispatch(setDateChange(null));
      dispatch(setsubmitDate(submitDatee + 1));
      dispatch(setString(""));
    } else if (result.payload.response?.data?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }
  };

  useEffect(() => {
    if (saveButton) {
      const transformedDataArray = empNameId?.map((item) => ({
        EmployeeGuID: item.key,
        BillableHours: parseInt(item.BillableHours, 10),
        NonBillableHours: parseInt(item.NonBillableHours, 10),
        PositionId: item.PositionId,
        ForMonth: `${submitDate}-01`,
        Remarks: item.Remarks,
      }));

      const hasUndefinedValues = transformedDataArray.some((item) =>
        Object.values(item).some(
          (value) => value === undefined || value === null,
        ),
      );

      const obj = { reports: transformedDataArray };
      if (hasUndefinedValues) {
        dispatch(setFildes(true));
        toast.warning("All fields are mandatory");
      } else {
        dispatch(setFildes(false));
        sub(obj);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveButton, dispatch]);

  return (
    <div
      style={{ overflow: "auto", maxHeight: "300px" }}
      className="empMonthlyReport"
    >
      <Table
        dataSource={datasource}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        locale={{ emptyText: <NoData /> }}
      />
    </div>
  );
};
