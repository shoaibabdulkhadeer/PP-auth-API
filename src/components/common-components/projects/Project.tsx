import { FolderOpenOutlined } from "@ant-design/icons";
import { Col, Collapse, CollapseProps, Row } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectTypes } from "../../../shared/enums";
import ProjectTable from "./ProjectTable";
export default function ProjectsDetails({ type }: any) {
  const {
    activeProjects,
    pastProjects,
    upcomingProjects,
    activeCount,
    pastCount,
    upcomingCount,
    projectLoad,
  } = useSelector((state: RootState) => state.ProjectAction);

  const textStyle = {
    margin: "0",
    padding: "0",
    fontSize: "12px",
    fontWeight: 600,

    fontFamily: "'Roboto',sans-serif",
    color: "rgba(76, 78, 100, 0.87)",
  };
  const Pojects = {
    ActivePojects: {
      className: "activeProjects",
      data: activeProjects,
      TableTitle: "ACTIVE PROJECTS",
      loading: projectLoad,
      noData: "No Active Projects",
      type,
      totalCount: activeCount,
      projectType: ProjectTypes.ACTIVE,
    },
    PastProjects: {
      className: "pastProjects",
      data: pastProjects,
      TableTitle: "PAST PROJECTS",
      loading: projectLoad,
      noData: "No Past Projects",
      type,
      totalCount: pastCount,
      projectType: ProjectTypes.PAST,
    },
    UpcomingProjects: {
      className: "upcomingProjects",
      data: upcomingProjects,
      TableTitle: "UPCOMING PROJECTS",
      loading: projectLoad,
      noData: "No Upcoming Projects",
      type,
      totalCount: upcomingCount,
      projectType: ProjectTypes.UPCOMING,
    },
  };
  const items: CollapseProps["items"] = [
    {
      key: 1,
      label: (
        <p
          style={{
            ...textStyle,
          }}
        >
          <FolderOpenOutlined /> {Pojects.ActivePojects.TableTitle} (
          {activeCount})
        </p>
      ),
      children: <ProjectTable {...Pojects.ActivePojects} />,
    },

    {
      key: 2,
      label: (
        <p
          style={{
            ...textStyle,
          }}
        >
          <FolderOpenOutlined /> {Pojects.UpcomingProjects.TableTitle} (
          {upcomingCount})
        </p>
      ),
      children: <ProjectTable {...Pojects.UpcomingProjects} />,
    },
    {
      key: 3,
      label: (
        <p
          style={{
            ...textStyle,
          }}
        >
          <FolderOpenOutlined /> {Pojects.PastProjects.TableTitle} ({pastCount})
        </p>
      ),
      children: <ProjectTable {...Pojects.PastProjects} />,
    },
  ];

  return (
    <Row gutter={[5, 5]}>
      <Col xs={24}>
        <Collapse
          size="small"
          items={items}
          defaultActiveKey={[1]}
          bordered={false}
        />
      </Col>
    </Row>
  );
}
