import React, { useEffect } from "react";
import Projects from "./Projects";
import { useDispatch } from "react-redux";
import ProjectsDrawer from "./ProjectsDrawer";
import { fetchProjects } from "../../redux/features/projects/projectsSlice";
import { ErrorPages } from "../../shared/enums";
import { useNavigate } from "react-router-dom";

function ProjectsMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch<any>(fetchProjects({ page: 1 }));
      if (res.payload.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  return (
    <div>
      <ProjectsDrawer />
      <Projects />
    </div>
  );
}

export default ProjectsMain;
