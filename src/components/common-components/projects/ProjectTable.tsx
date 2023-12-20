import { Divider, Empty, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFormattedDate,
  getProjectColor,
  getTitleCase,
} from "../../../common/common";
import { getProjects } from "../../../redux/features/common-features/projectSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { ProjectTypes } from "../../../shared/enums";
import { textMaxLength } from "../../../utils/commonCSS";
import { IProjectTable } from "../../../utils/interfaces";
import "./Projects.css";
const ProjectTable = ({
  className,
  data,
  loading,
  noData,
  type,
  totalCount,
  projectType,
}: any) => {
  const disPatch = useDispatch<AppDispatch>();
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  const [filter] = useState({
    EmployeeGuID: empID,
    projectStatus: projectType,
    page: 1,
  });
  const [headers, setHeaders] = useState<any[]>([]);
  useEffect(() => {
    const columns: ColumnsType<IProjectTable> = [
      {
        title: "PROJECT NAME",
        dataIndex: "ProjectName",
        key: "ProjectName",
        width: "20%",
        render: (text: string) => {
          if (text.length > textMaxLength) {
            const truncatedText = text.substring(0, textMaxLength) + "....";
            return (
              <Tooltip
                title={
                  <>
                    <span>DESCRIPTION</span>
                    <Divider style={{ padding: "0", margin: "0.3rem 0" }} />
                    <span>{text}</span>
                  </>
                }
                color="#626477"
                placement="bottomRight"
              >
                {truncatedText}
              </Tooltip>
            );
          } else {
            return text;
          }
        },
      },
      {
        title: "PROJECT DESCRIPTION",
        dataIndex: "ProjectDescription",
        key: "ProjectDescription",
        render: (text: string) => {
          if (text.length > textMaxLength) {
            const truncatedText = text.substring(0, textMaxLength) + "....";
            return (
              <Tooltip
                title={
                  <>
                    <span>DESCRIPTION</span>
                    <Divider style={{ padding: "0", margin: "0.3rem 0" }} />
                    <span>{text}</span>
                  </>
                }
                color="#626477"
                placement="bottomRight"
              >
                {truncatedText}
              </Tooltip>
            );
          } else {
            return text;
          }
        },
      },
      {
        title:
          type === ProjectTypes.DASHBOARD ? (
            <Tooltip title={"Daily allocated hours"}>
              <span>DAH</span>
            </Tooltip>
          ) : (
            "DAILY ALLOCATED HOURS"
          ),
        dataIndex: "DailyAllocatedHours",
        key: "DailyAllocatedHours",
      },
      {
        title: "START DATE",
        dataIndex: "StartDate",
        key: "StartDate",
        width: "18%",
        render: (value) => <span>{getFormattedDate(0, value)}</span>,
      },
      {
        title: "END DATE",
        key: "EndDate",
        dataIndex: "EndDate",
        width: "18%",
        render: (value) => <span>{getFormattedDate(0, value)}</span>,
      },
    ];

    if (type === ProjectTypes.PROFILE) {
      const profileColumn = {
        title: "TEAM MEMBERS",
        key: "Team_Members",
        dataIndex: "Team_Members",
        width: 300,
        render: (text: any, record: any) => {
          const teamMembers = record?.Team_Members?.map((member: string) =>
            getTitleCase(member),
          );
          if (teamMembers?.length > 0) {
            if (teamMembers.length > 1) {
              return (
                <Tooltip
                  color="#626477"
                  placement="bottomRight"
                  title={teamMembers.join(", ")}
                >
                  <span className="short-paragraph">
                    {teamMembers.join(", ")}
                  </span>
                </Tooltip>
              );
            } else {
              return (
                <p className="short-paragraph">{teamMembers.join(", ")}</p>
              );
            }
          } else {
            return "No Team Members";
          }
        },
      };
      setHeaders([...columns, profileColumn]);
    } else if (
      type === ProjectTypes.DASHBOARD ||
      type === ProjectTypes.EMP_MANAGEMENT
    ) {
      setHeaders(columns);
    } else if (type === ProjectTypes.RECCENT_PROJECTS) {
      setHeaders([
        {
          title: <span>STATUS</span>,
          dataIndex: "status",
          key: "status",
          width: 80,
          render: (status: any) => (
            <span>
              <div
                className={`status-circle`}
                style={{
                  backgroundColor: getProjectColor(status),
                }}
              />
            </span>
          ),
        },
        ...columns,
      ]);
    }
  }, [type]);

  return (
    <div className={className}>
      <Table
        columns={headers}
        dataSource={data}
        pagination={
          totalCount > 5
            ? {
                total: totalCount,
                pageSize: 5,
                onChange: (page: number) => {
                  disPatch(getProjects({ ...filter, page }));
                },
              }
            : false
        }
        style={{
          borderRadius: 5,
          overflowY: "auto",
          fontFamily: "'Roboto',sans-serif",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
        loading={loading}
        locale={{ emptyText: <Empty description={getTitleCase(noData)} /> }}
        rowKey={"ProjectName"}
      />
    </div>
  );
};

export default ProjectTable;
