import React, { useState } from "react";
import { Table, Button, Card, Tooltip, Avatar, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  handleEdit,
  handleOpen,
} from "../../redux/features/projects/projectsSlice";
import dayjs from "dayjs";
import { FolderOpenOutlined, PlusOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import "./Drawer.css";
import { getColor } from "../../utils/commonCSS";
import { getFormattedDate, getTitleCase } from "../../common/common";

interface DataType {
  key: React.Key;
  ProjectGuId: string;
  ProjectName: string;
  ProjectDescription: string;
  StartDate: Date;
  EndDate: Date;
  TeamMembers: string[];
  AllocatedHours: number[];
  CreatedAt: Date;
  CreatedBy: string;
}

const Projects = () => {
  const { data: responseData, projectsLoad } = useSelector(
    (state: any) => state.ProjectsAction,
  );

  const dispatch = useDispatch();
  const flattenedData: DataType[] = [];

  responseData?.data?.projects?.forEach((project: any) => {
    const employeeNames: string[] = [];
    const allocatedHours: number[] = [];

    if (project.Employees && project.Employees.length > 0) {
      project.Employees.forEach((employee: any) => {
        employeeNames.push(employee.FullName);
        allocatedHours.push(employee.DailyAllocatedHours);
      });
    }

    flattenedData.push({
      key: project.ProjectGuId,
      ProjectGuId: project.ProjectGuId,
      ProjectName: project.ProjectName,
      ProjectDescription: project.ProjectDescription,
      StartDate: new Date(project.StartDate),
      EndDate: new Date(project.EndDate),
      TeamMembers: employeeNames,
      AllocatedHours: allocatedHours,
      CreatedAt: project.CreatedAt,
      CreatedBy: project.CreatedBy,
    });
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "PROJECT NAME",
      dataIndex: "ProjectName",
      className: "table-cell",
      render: (text: any, record: any, index) => (
        <span className="Projectname-Container">
          <Avatar style={{ backgroundColor: getColor(index) }}>
            {record.ProjectName[0].toUpperCase()}
          </Avatar>
          <Tooltip placement="right" color="#626477" title={record.ProjectName}>
            <p className="projects-short-paragraph">
              {getTitleCase(record.ProjectName)}
            </p>
          </Tooltip>
        </span>
      ),
    },
    {
      title: "PROJECT DESCRIPTION",
      className: "table-cell",
      dataIndex: "ProjectDescription",
      render: (record: any) => (
        <Tooltip placement="right" color="#626477" title={record}>
          <p className="projects-short-paragraph">{getTitleCase(record)}</p>
        </Tooltip>
      ),
    },
    {
      title: "START DATE",
      dataIndex: "StartDate",
      className: "table-cell",
      render: (date) => (
        <span className="projects-table-data">{getFormattedDate(0, date)}</span>
      ),
    },
    {
      title: "END DATE",
      dataIndex: "EndDate",
      className: "table-cell",
      render: (date) => (
        <span className="projects-table-data">{getFormattedDate(0, date)}</span>
      ),
    },
    {
      title: "CREATED BY",
      className: "table-cell",
      dataIndex: "CreatedBy",
      render: (text: any) => (
        <span className="projects-table-data">{text}</span>
      ),
    },
    {
      title: "CREATED ON",
      className: "table-cell",
      dataIndex: "CreatedAt",
      render: (record: any) => (
        <p className="projects-table-data">{getFormattedDate(record)}</p>
      ),
    },
    {
      title: "ACTION",
      className: "table-cell",
      dataIndex: "Action",
      render: (_, project) => (
        <Tooltip
          color="#626477"
          placement="bottom"
          title={"Click here to update the project"}
        >
          <FaEdit className="editiconbtn" onClick={() => handler(project)} />
        </Tooltip>
      ),
    },
  ];

  function handler(editData: any) {
    const projectData = {
      ProjectGuId: editData.ProjectGuId,
      ProjectName: editData.ProjectName,
      ProjectDescription: editData.ProjectDescription,
      StartDate: dayjs(editData.StartDate).format("YYYY-MM-DD"),
      EndDate: dayjs(editData.EndDate).format("YYYY-MM-DD"),
      EmployeeData: editData?.TeamMembers?.map((member: any, index: any) => ({
        FullName: member,
        DailyAllocatedHours: editData.AllocatedHours[index],
      })),
    };

    dispatch<any>(handleEdit(projectData));
  }
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    dispatch<any>(fetchProjects({ page }));
  };
  const flattenedDataLength = flattenedData.length;
  return (
    <>
      <Card
        className="card"
        type="inner"
        title={
          <h3 className="project-header">
            <FolderOpenOutlined className="FolderOpenOutlined" />
            PROJECTS
          </h3>
        }
        extra={
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              dispatch(handleOpen());
            }}
            className="AddProject-button"
          >
            Add Project
          </Button>
        }
      >
        {projectsLoad ? (
          <div className="Project-Skeleton-div">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <Table
              columns={columns}
              className="custom-table"
              dataSource={flattenedData}
              size="middle"
              rowClassName={(_, index) =>
                index % 2 === 0 ? "odd-row" : "even-row"
              }
              pagination={
                flattenedDataLength > 10
                  ? {
                      pageSize,
                      current: currentPage,
                      total: flattenedDataLength,
                      onChange: handleChangePage,
                    }
                  : false
              }
              scroll={{ x: true }}
            />
          </div>
        )}
      </Card>
    </>
  );
};

export default Projects;
