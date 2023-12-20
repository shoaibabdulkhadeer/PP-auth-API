import { Card, Col, Descriptions, Empty, Rate, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import NoSkills from "../../../assets/image/No-Skills-IMG.jpg";
import { RootState } from "../../../redux/store";
import { Skill } from "../../../utils/interfaces";
import { LoadingOutlined } from "@ant-design/icons";

const SkillsData: React.FC = () => {
  const { Skills } = useSelector(
    (state: RootState) => state.ModalAction?.modalData || {},
  );
  const { modalLoading }: any = useSelector(
    (state: RootState) => state.ModalAction,
  );

  if (modalLoading) {
    return (
      <LoadingOutlined
        style={{
          fontSize: 30,
          display: "flex",
          justifyContent: "center",
          marginTop: "1%",
        }}
      />
    );
  }

  if (Skills && Skills.length === 0) {
    return (
      <Empty
        className="err-message400"
        image={NoSkills}
        imageStyle={{ height: 200 }}
        description="No skill found"
      />
    );
  }

  return (
    <Row gutter={16}>
      {Skills?.map((skill: Skill, index: number) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={12} key={index}>
          <Card
            size="small"
            title={skill.SkillName}
            extra={<div className="card-extra">{skill.SkillTags}</div>}
            className="card-container-skills"
          >
            <Descriptions
              items={[
                {
                  key: skill.SkillName,
                  label: "Self Rating",
                  children: <Rate disabled defaultValue={skill.SelfRating} />,
                },
                {
                  key: skill.SkillName,
                  label: "RM Rating",
                  children: (
                    <Rate
                      disabled
                      defaultValue={skill.ReportingManagerRating}
                    />
                  ),
                },
              ]}
              column={1}
              layout="horizontal"
              size="middle"
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SkillsData;
