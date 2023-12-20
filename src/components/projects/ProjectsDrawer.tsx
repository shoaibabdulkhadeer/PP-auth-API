import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Input,
  Row,
  Table,
  Form,
  Select,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import utc from "dayjs/plugin/utc";
import { RootState } from "../../redux/store";
import {
  fetchEmployees,
  fetchProjects,
  handleClose,
} from "../../redux/features/projects/projectsSlice";
import dayjs from "dayjs";
import "./Drawer.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { ErrorPages } from "../../shared/enums";
import { useNavigate } from "react-router-dom";
import { addProjects } from "../../redux/features/projects/addProjectSlice";
import { updateProject } from "../../redux/features/projects/updateProjectSlice";

dayjs.extend(utc);

const EditDrawer = () => {
  const [employeeData, setEmployeeData] = useState<any>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const navigate = useNavigate();

  const {
    projectDetails,
    open,
    add,
    empData: data,
  } = useSelector((state: RootState) => state.ProjectsAction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (open && !add) {
      setEmployeeData(projectDetails.EmployeeData);
    }
    if (add) {
      setEmployeeData([]);
    }
  }, [open, add, projectDetails]);
  const [startDateValue, setStartDateValue] = useState<string | null>(null);
  const [endDateValue, setEndDateValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    ProjectName: Yup.string()
      .required("Project Name is required")
      .max(100, "Project Name should be 100 in length"),
    ProjectDescription: Yup.string()
      .required("Project Description is required")
      .max(500, "Project Description should be 500 in length"),
    StartDate: Yup.date().required("Start Date is required"),
    EndDate: Yup.date().required("End Date is required"),
  });

  const handleAddMember = () => {
    const newEmployee = {
      FullName: "",
      DailyAllocatedHours: "",
    };
    const updatedEmployeeData = [...employeeData, newEmployee];
    setEmployeeData(updatedEmployeeData);
  };

  const handleDeleteEmployee = (record: any) => {
    const updatedEmployees = employeeData.filter(
      (employee: any) => employee !== record,
    );
    setEmployeeData(updatedEmployees);
  };

  const getAvailableUsers = (data: any, employeeData: any) => {
    const addedUsernames = employeeData.map(
      (employee: any) => employee.FullName,
    );
    return data.filter((user: any) => !addedUsernames.includes(user.FullName));
  };

  const handleEmployeeNameChange = (value: string, record: any) => {
    const updatedEmployeeData = employeeData.map((employee: any) => {
      if (employee === record) {
        return { ...employee, FullName: value };
      }
      return employee;
    });
    setEmployeeData(updatedEmployeeData);
  };

  const handleDailyAllocatedHoursChange = (value: any, record: any) => {
    const updatedEmployeeData = employeeData.map((employee: any) => {
      if (employee === record) {
        return { ...employee, DailyAllocatedHours: parseInt(value) || 0 };
      }
      return employee;
    });
    setEmployeeData(updatedEmployeeData);
  };

  const dropdownHeight = { maxHeight: "70px" };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "FullName",
      width: 200,
      key: "FullName",
      render: (text: any, record: any) => (
        <Select
          placeholder="Search employee name"
          className="searchable-dropdown"
          showSearch
          value={text || null}
          onChange={(value) => {
            handleEmployeeNameChange(value, record);
          }}
          filterOption={(input, option) =>
            String(option?.children)
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          dropdownStyle={dropdownHeight}
        >
          {getAvailableUsers(data, employeeData).map((user: any) => (
            <Select.Option key={user.EmployeeGuID} value={user.FullName}>
              {user.FullName}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Daily Allocated Hours",
      dataIndex: "DailyAllocatedHours",
      key: "DailyAllocatedHours",
      render: (text: any, record: any) => (
        <Input
          placeholder="Enter Daily allocated hours"
          type="number"
          className="hour-field"
          value={text}
          onChange={(e) => {
            handleDailyAllocatedHoursChange(e.target.value, record);
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <Button type="link" onClick={() => handleDeleteEmployee(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Drawer
        width={620}
        title={add ? "ADD PROJECT" : "UPDATE PROJECT"}
        placement="right"
        closable={false}
        onClose={() => {
          scrollToTop();
          dispatch(handleClose());
        }}
        maskClosable={false}
        open={open}
        extra={
          <Tooltip
            color="#626477"
            placement="bottom"
            title={"Click here to close"}
          >
            <CloseOutlined
              className="closable"
              onClick={() => {
                scrollToTop();
                dispatch(handleClose());
              }}
            />
          </Tooltip>
        }
      >
        <div ref={containerRef} className="custom-scrollbar">
          <Formik
            initialValues={projectDetails}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={
              add
                ? async (values, actions) => {
                    setLoading(true);
                    try {
                      const formData = {
                        ProjectName: values.ProjectName.trim(),
                        ProjectDescription: values.ProjectDescription.trim(),
                        StartDate: values.StartDate,
                        EndDate: values.EndDate,
                        EmployeeData: employeeData,
                      };
                      const resultAction = await dispatch<any>(
                        addProjects(formData),
                      );
                      if (resultAction.payload.code === 200) {
                        actions.resetForm();
                        setLoading(false);
                        dispatch(handleClose());
                        toast.success(resultAction.payload.message);
                        dispatch<any>(fetchProjects({ page: 1 }));
                      } else if (resultAction.payload.code === 400) {
                        setLoading(false);
                        toast.warning(resultAction.payload.message);
                        if (Array.isArray(resultAction.payload.message)) {
                          const remainingMessage =
                            resultAction.payload.message[0]
                              .substring(15)
                              .trim();
                          toast.warning(remainingMessage);
                        }
                      } else {
                        setLoading(false);
                        navigate(ErrorPages.ERROR_500);
                      }
                    } catch (error) {
                      setLoading(false);
                      navigate(ErrorPages.ERROR_500);
                    }
                  }
                : async (values) => {
                    setLoading(true);
                    try {
                      const formData = {
                        ProjectGuId: values.ProjectGuId,
                        ProjectName: values.ProjectName.trim(),
                        ProjectDescription: values.ProjectDescription.trim(),
                        StartDate: values.StartDate,
                        EndDate: values.EndDate,
                        EmployeeData: employeeData,
                      };
                      const resultAction = await dispatch<any>(
                        updateProject(formData),
                      );
                      if (resultAction.payload.code === 200) {
                        setLoading(false);
                        toast.success(resultAction.payload.message);
                        dispatch(handleClose());
                        dispatch<any>(fetchProjects({ page: 1 }));
                      } else if (resultAction.payload.code === 400) {
                        setLoading(false);
                        toast.warning(resultAction.payload.message);
                        if (Array.isArray(resultAction.payload.message)) {
                          const remainingMessage =
                            resultAction.payload.message[0]
                              .substring(15)
                              .trim();
                          toast.warning(remainingMessage);
                        }
                      } else {
                        setLoading(false);
                        navigate(ErrorPages.ERROR_500);
                      }
                    } catch (error) {
                      setLoading(false);
                      navigate(ErrorPages.ERROR_500);
                    }
                  }
            }
          >
            {({
              handleSubmit,
              values,
              handleChange,
              setFieldValue,
              resetForm,
            }) => (
              <Form layout="vertical">
                <div>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="projectsname-label">
                            Project Name <span className="red-asterisk">*</span>
                          </span>
                        }
                        name="ProjectName"
                        className="label-on-top"
                      >
                        <div>
                          <Input
                            maxLength={100}
                            placeholder="Please enter project name"
                            autoComplete="off"
                            name="ProjectName"
                            value={values.ProjectName}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="ProjectName"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="projectsname-label">
                            Project Description{" "}
                            <span className="red-asterisk">*</span>
                          </span>
                        }
                        name="ProjectDescription"
                      >
                        <div>
                          <Input.TextArea
                            maxLength={500}
                            autoComplete="off"
                            placeholder="Please enter project description"
                            name="ProjectDescription"
                            value={values.ProjectDescription}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="ProjectDescription"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[13, 10]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={
                          <span className="projectsname-label">
                            Start Date <span className="red-asterisk">*</span>
                          </span>
                        }
                        name="StartDate"
                      >
                        <div className="Drawer-datePicker">
                          <DatePicker
                            className="datePicker"
                            value={
                              values.StartDate
                                ? dayjs.utc(values.StartDate)
                                : null
                            }
                            onChange={(date) => {
                              if (date) {
                                setFieldValue("StartDate", date.toISOString());
                                setStartDateValue(date.toISOString());
                              }
                            }}
                            disabledDate={(currentDate) =>
                              currentDate.isAfter(
                                dayjs.utc(endDateValue),
                                "day",
                              )
                            }
                          />
                          <ErrorMessage
                            name="StartDate"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={
                          <span className="projectsname-label">
                            End Date <span className="red-asterisk">*</span>
                          </span>
                        }
                        name="EndDate"
                      >
                        <div>
                          <DatePicker
                            className="datePicker"
                            value={
                              values.EndDate ? dayjs.utc(values.EndDate) : null
                            }
                            onChange={(date) => {
                              if (date) {
                                setFieldValue("EndDate", date.toISOString());
                                setEndDateValue(date.toISOString());
                              }
                            }}
                            //disabled={startDateValue === null} // Disable if no start date is selected
                            disabledDate={(currentDate) =>
                              currentDate.isBefore(
                                dayjs.utc(startDateValue), //.add(1, "day")
                                "day",
                              )
                            }
                          />
                          <ErrorMessage
                            name="EndDate"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[13, 10]} className="Add-Member-Table-Button">
                    <Col xs={24} md={6}>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={handleAddMember}
                        className="button-AddMember"
                      >
                        Add Member
                      </Button>
                    </Col>
                  </Row>
                </div>
                <Table
                  columns={columns}
                  dataSource={employeeData}
                  pagination={false}
                  scroll={{ x: true }}
                />
                <div className="buttonContainer">
                  <div className="buttonInnerContainer">
                    <Button
                      onClick={() => {
                        resetForm();
                        setStartDateValue(null);
                        setEndDateValue(null);
                        dispatch(handleClose());
                        scrollToTop();
                      }}
                      className="button-cancel"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div>
                    <Button
                      loading={loading}
                      style={{
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                      onClick={() => handleSubmit()}
                      className="button-DrawerSubmit"
                      id="sbtBtn"
                    >
                      {add
                        ? loading
                          ? "Processing..."
                          : "Submit"
                        : loading
                        ? "Updating"
                        : "Update"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Drawer>
    </>
  );
};

export default EditDrawer;
