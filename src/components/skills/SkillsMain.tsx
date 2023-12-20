import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSkills } from "../../redux/features/skills/skillsSlice";
import Skills from "./Skills";
import SkillsDrawer from "./SkillsDrawer";
import { ErrorPages } from "../../shared/enums";
import { useNavigate } from "react-router-dom";

const SkillsMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch<any>(fetchSkills({ page: 1 }));
      if (res.payload.code === 500) {
        navigate(ErrorPages.ERROR_500);
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  return (
    <div>
      <SkillsDrawer />
      <Skills />
    </div>
  );
};

export default SkillsMain;
