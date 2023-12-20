import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ProjectTypes } from "../../shared/enums";
import ProjectTable from "../common-components/projects/ProjectTable";
import "./ProjectDetailsContent.css";
import { getProjects } from "../../redux/features/common-features/projectSlice";

const ProjectDetailsContent = () => {
  const [filter, setFilter] = useState(ProjectTypes.ACTIVE);
  const [loaded, setLoaded] = useState({ past: false, upcom: false });
  const dispatch = useDispatch<AppDispatch>();
  const [projects, setProjects] = useState<any>();
  const { activeProjects, pastProjects, upcomingProjects, projectLoad } =
    useSelector((state: RootState) => state.ProjectAction);
  useEffect(() => {
    if (filter === ProjectTypes.ACTIVE) {
      setProjects({
        className: "activeProjects",
        data: activeProjects,
        TableTitle: "ACTIVE PROJECTS",
        loading: projectLoad,
        noData: "No Active Projects",
        type: ProjectTypes.PROFILE,
      });
    } else if (filter === ProjectTypes.PAST) {
      setProjects({
        ...projects,
        className: "pastProjects",
        data: pastProjects,
        TableTitle: "PAST PROJECTS",
        noData: "No Past Projects",
      });
    } else if (filter === ProjectTypes.UPCOMING) {
      setProjects({
        ...projects,
        className: "upcomingProjects",
        data: upcomingProjects,
        TableTitle: "UPCOMING PROJECTS",
        noData: "No Upcoming Projects",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, projectLoad]);

  //#region SET FILTER TO RESPECTIVE CLICKED BUTTON
  const handleFilterChange = async (newFilter: any) => {
    setFilter(newFilter);

    if (newFilter === ProjectTypes.PAST && !loaded.past) {
      setLoaded({ ...loaded, past: true });
      await dispatch(
        getProjects({ projectStatus: ProjectTypes.PAST, page: 1 }),
      );
    } else if (newFilter === ProjectTypes.UPCOMING && !loaded.upcom) {
      setLoaded({ ...loaded, upcom: true });
      await dispatch(
        getProjects({ projectStatus: ProjectTypes.UPCOMING, page: 1 }),
      );
    }
  };

  return (
    <div>
      <div className="buttons-parents">
        <Button
          onClick={() => handleFilterChange(ProjectTypes.ACTIVE)}
          type={filter === ProjectTypes.ACTIVE ? "primary" : "default"}
          style={{
            backgroundColor:
              filter === ProjectTypes.ACTIVE ? "#61c0c2" : "inherit",
            marginRight: "8px",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "14px",
          }}
        ></Button>
        <Button
          className="projects-buttons"
          onClick={() => handleFilterChange(ProjectTypes.UPCOMING)}
          type={filter === ProjectTypes.UPCOMING ? "primary" : "default"}
          style={{
            backgroundColor:
              filter === ProjectTypes.UPCOMING ? "rgb(248,173,94)" : "inherit",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "14px",
            marginRight: "8px",
          }}
        ></Button>
        <Button
          onClick={() => handleFilterChange(ProjectTypes.PAST)}
          type={filter === ProjectTypes.PAST ? "primary" : "default"}
          style={{
            backgroundColor:
              filter === ProjectTypes.PAST ? "rgb(244, 149, 149)" : "inherit",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "14px",
          }}
        ></Button>
      </div>
      <div className="project-details-content-root">
        <ProjectTable {...projects} />
      </div>
    </div>
  );
};

export default ProjectDetailsContent;
