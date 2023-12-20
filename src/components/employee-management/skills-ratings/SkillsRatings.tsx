import { PlusOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmpSkillApi } from "../../../redux/features/employee-management/empSkillSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { EmployeeManagementLink } from "../../../shared/enums";
import { cardShadow } from "../../../utils/commonCSS";
import NoData from "../NoData";
import AddSkill from "./AddSkill";
import SkillCard from "./SkillCard";
import EmployeeInfo from "../EmployeeInfo";
export default function SkillsRatings() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const controlModal = () => {
    setOpen(!open);
  };
  const disPatch = useDispatch<AppDispatch>();
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  const { rmRatingLoad } = useSelector(
    (state: RootState) => state.RmRatingSkillAction,
  );
  const { empSkillPostLoad } = useSelector(
    (state: RootState) => state.EmpSkillPostAction,
  );

  const { empSkillDisLoad } = useSelector(
    (state: RootState) => state.EmpSkillDisableAction,
  );

  useEffect(() => {
    if (!empID) {
      navigate(EmployeeManagementLink.EMPLOYEE_LSIT);
    }
    disPatch(getEmpSkillApi(empID));
  }, [
    rmRatingLoad,
    empSkillPostLoad,
    empSkillDisLoad,
    disPatch,
    empID,
    navigate,
  ]);

  const { empSkillData } = useSelector(
    (state: RootState) => state.EmpGetSkillAction,
  );
  const skillNames = empSkillData?.map((skill: any) => skill.SkillName);
  return (
    <Card
      style={cardShadow}
      title={
        <Row align={"middle"}>
          <Col md={8}>
            <Title
              level={5}
              style={{ color: "rgb(119 123 129)", margin: "0px" }}
            >
              <TrophyOutlined /> <span>SKILLS</span>
            </Title>
          </Col>
          <Col md={8}>
            {" "}
            <EmployeeInfo />
          </Col>
          <Col md={8}>
            <Button
              style={{
                padding: "0.5rem,0",
                marginBottom: "0.5rem",
                background: "rgb(102 108 255)",
                color: "#ffff",
                border: "none",
                float: "right",
              }}
              icon={<PlusOutlined />}
              onClick={controlModal}
            >
              Add New Skill
            </Button>
          </Col>
        </Row>
      }
    >
      {empSkillData?.length ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {empSkillData.map((skill: any) => (
            <SkillCard {...skill} />
          ))}
        </div>
      ) : (
        <NoData />
      )}

      <AddSkill
        open={open}
        controlModal={controlModal}
        skillNames={skillNames}
      />
    </Card>
  );
}
