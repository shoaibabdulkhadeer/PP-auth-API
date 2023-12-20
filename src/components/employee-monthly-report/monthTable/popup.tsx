import { Button, DatePicker, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setCheckdays,
  setDateChange,
  setEditOpen,
  setSaveButton,
  setString,
  setSubmitDate,
  setsubmitbutton,
} from "../../../redux/features/monthly-report/montly-emp-report";
import { AppDispatch, RootState } from "../../../redux/store";
import "../monthTable/monthly-table.css";
import "../../employee-management/basic-info/BasicInfo.css";
import { EditableTable } from "../reportTable/employee-monthly-report-table";
import "react-toastify/dist/ReactToastify.css";
import { setsubmitBoolean } from "../../../redux/features/monthly-report/add-monthly-report";
import cal from "../../../assets/image/calenderImg.jpg";
import dayjs from "dayjs";

const TableModal: React.FC = () => {
  const {
    editOpen,
    selectedDate,
    editOrAdd,
    editChange,
    empMontlyReport,
    editOn,
    monthdate,
    buttonTorF,
  } = useSelector((state: RootState) => state.EmpMonthlyReport);
  const { submitBoolean, fileds, submitDatee } = useSelector(
    (state: RootState) => state.AddingMonthlyReport,
  );
  const dispatch = useDispatch<AppDispatch>();

  const crossCancel: any = () => {
    dispatch(setEditOpen(false));
    dispatch(setDateChange(null));
    dispatch(setString(""));
    setSelecteddate("");
  };
  useEffect(() => {
    if (!fileds) {
      setSelecteddate("");
    }
  }, [fileds]);

  useEffect(() => {
    setSelecteddate("");
  }, [submitDatee]);
  const [selecteddate, setSelecteddate]: any = useState();
  const uniqueForMonthsDate = new Set();
  empMontlyReport?.filter((item: any) => {
    const isUnique = !uniqueForMonthsDate.has(item.ForMonth);
    if (isUnique) {
      uniqueForMonthsDate.add(item.ForMonth);
    }
    return isUnique;
  });
  const modifiedUniqueForMonths = Array.from(uniqueForMonthsDate)?.map(
    (date: any) => date.substring(0, 7),
  );
  const uniqueForMonths = new Set(modifiedUniqueForMonths);
  const uniqueForMonthsArray: any = [];
  uniqueForMonths?.forEach((item) => {
    uniqueForMonthsArray.push(item);
  });
  const onCancel: any = () => {
    dispatch(setEditOpen(false));
    dispatch(setDateChange(null));
    dispatch(setString(""));
    setSelecteddate("");
  };
  const [processing, setProcessing] = useState(false);
  const handleSave: any = () => {
    setProcessing(true);
    dispatch(setsubmitbutton());
    dispatch(setSaveButton(true));
    setTimeout(() => {
      dispatch(setSaveButton(false));
    }, 3000);

    if (submitBoolean) {
      setTimeout(() => {
        onCancel();
        setProcessing(false);
        dispatch(setsubmitBoolean(false));
      }, 2000);
    }
    setTimeout(() => {
      setProcessing(false);
    }, 2000);
  };

  function formatMonthYear(dateStr: any) {
    const date = new Date(dateStr);
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `: ${month}-${year}`;
  }

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth().toString().padStart(2, "0"); // Months are zero-based, so add 1
  const todyformattedDate = `${year}-${month}`;
  return (
    <div>
      <Modal
        maskClosable={false}
        className="calender-modal"
        centered
        title={
          <div className="title">
            {" "}
            {editOrAdd === "edit"
              ? `For Month ${formatMonthYear(monthdate)}`
              : "Add monthly report"}
          </div>
        }
        open={editOpen}
        closeIcon={editChange || selectedDate ? false : true}
        onCancel={crossCancel}
        width={editChange || selectedDate ? 1200 : 500}
        footer={[
          editOrAdd !== "edit" && selectedDate && (
            <Tooltip title={editOn ? "can't close while editing" : ""}>
              <Button
                type="primary"
                key="close"
                style={{ background: "#FA6464" }}
                onClick={onCancel}
                disabled={editOn}
              >
                Close
              </Button>
            </Tooltip>
          ),

          editOrAdd === "edit" && (
            <Tooltip
              title={
                editOn ? "This button is disabled because editon is true" : ""
              }
            >
              <Button
                className="closeButton"
                type="primary"
                key="close"
                style={{ background: "#FA6464" }}
                onClick={onCancel}
                disabled={editOn}
              >
                Close
              </Button>
            </Tooltip>
          ),
          editOrAdd !== "edit" && selectedDate && (
            <Button
              key="Submit"
              type="primary"
              style={{ background: "#454BFA " }}
              disabled={buttonTorF}
              onClick={handleSave}
              loading={processing}
            >
              {processing ? "Processing" : "Submit"}
            </Button>
          ),
        ]}
      >
        <div className="model">
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!editChange && (
              <div className="datePicker-div" style={{ display: "flex" }}>
                <label className="label-datepicker" htmlFor="forMonthPicker">
                  For Month:
                </label>
                <DatePicker
                  id="forMonthPicker"
                  className="date-pick"
                  format="YYYY-MM"
                  picker="month"
                  value={selecteddate}
                  disabledDate={(current) => {
                    return current.isAfter(
                      dayjs(todyformattedDate, "YYYY-MM"),
                      "month",
                    );
                  }}
                  onChange={(date) => {
                    if (date) {
                      const dateSelected = date.format("YYYY-MM");

                      if (!uniqueForMonthsArray.includes(dateSelected)) {
                        dispatch(setDateChange(date));
                        dispatch(setSubmitDate(dateSelected));
                        setSelecteddate(date);
                        dispatch(setCheckdays(dateSelected));
                      } else {
                        setSelecteddate(null);
                        dispatch(setDateChange(""));
                        toast.warning(
                          "For the selected month, a report is already added",
                        );
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
          {editOrAdd !== "edit" && !selectedDate && (
            <div className="calImg">
              <img
                style={{
                  width: "50%",
                  height: "10%",
                  mixBlendMode: "multiply",
                }}
                src={cal}
                alt={cal}
              />
            </div>
          )}
          <div style={{ flex: 1, paddingRight: "1rem" }}>
            {editChange && <EditableTable />}
            {selectedDate && <EditableTable />}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TableModal;
