import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Modal, Spin, Table, Tooltip } from "antd";
import {
  fetchSkills,
  handleEdit,
  handleOpen,
} from "../../redux/features/skills/skillsSlice";
import "./SkillsStyle.css";
import { PlusOutlined, TrophyOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import { Switch } from "antd";
import { Card } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColumnsType } from "antd/es/table";
import { getColor } from "../../utils/commonCSS";
import { getFormattedDate, getTitleCase } from "../../common/common";
import { disableSkill } from "../../redux/features/skills/disableSkillSlice";

interface DataType {
  key: React.Key;
  SkillGuId: string;
  SkillName: string;
  SkillDescription: string;
  SkillTagName: number;
  SkillTagId: number;
  IsActive: boolean;
  CreatedBy: string;
  CreatedAt: Date;
}
const Skills = () => {
  const { data: skillsData, skillsLoad } = useSelector(
    (state: any) => state.SkillsAction,
  );

  const dispatch = useDispatch();
  const flattenedData: DataType[] = [];

  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const showConfirmModal = (record: any) => {
    setSelectedSkill(record);
    setConfirmModalVisible(true);
  };

  const handleConfirmModalOk = async () => {
    setLoading(true);
    if (selectedSkill) {
      const resultAction = await dispatch(disableSkill(selectedSkill));
      if (resultAction.payload.data.code === 200) {
        setLoading(false);
        toast.success(resultAction.payload.data.message);
        dispatch<any>(fetchSkills({ page: 1 }));
      } else if (resultAction.payload.data.code === 400) {
        setLoading(false);
        toast.warning(resultAction.payload.data.message);
      } else {
        setLoading(false);
        toast.error(resultAction.payload.data.message);
      }
    }
    setConfirmModalVisible(false);
    setSelectedSkill(null);
  };

  const handleConfirmModalCancel = () => {
    setConfirmModalVisible(false);
    setSelectedSkill(null);
  };

  if (Array.isArray(skillsData?.data?.skills)) {
    skillsData?.data?.skills?.forEach((skill: any) => {
      flattenedData.push({
        key: skill.SkillGuId,
        SkillGuId: skill.SkillGuId,
        SkillName: skill.SkillName,
        SkillDescription: skill.SkillDescription,
        SkillTagName: skill.SkillTagIdInfo.SkillTagName,
        SkillTagId: skill.SkillTagId,
        IsActive: skill.IsActive,
        CreatedBy: skill.createdByInfo.FullName,
        CreatedAt: skill.CreatedAt,
      });
    });
  }
  const flattenedDataLength = flattenedData.length;

  const columns: ColumnsType<DataType> = [
    {
      title: "SKILL NAME",
      dataIndex: "SkillName",
      className: "table-cell",
      render: (text: any, record: any, index) => (
        <span className="SkillName-Container">
          <Avatar style={{ backgroundColor: getColor(index) }}>
            {record.SkillName[0].toUpperCase()}
          </Avatar>
          <Tooltip placement="right" color="#626477" title={record.SkillName}>
            <p className="short-paragraph">{getTitleCase(record.SkillName)}</p>
          </Tooltip>
        </span>
      ),
    },
    {
      title: "SKILL DESCRIPTION",
      className: "table-cell",
      dataIndex: "SkillDescription",
      render: (text: any) => (
        <Tooltip color="#626477" placement="right" title={text}>
          <p className="short-paragraph">{getTitleCase(text)}</p>
        </Tooltip>
      ),
    },
    {
      title: "SKILL TAG",
      className: "table-cell",
      dataIndex: "SkillTagName",
      render: (text: any) => <span className="skills-table-data">{text}</span>,
    },
    {
      title: "CREATED BY",
      className: "table-cell",
      dataIndex: "CreatedBy",
      render: (text: any) => <span className="skills-table-data">{text}</span>,
    },
    {
      title: "CREATED ON",
      className: "table-cell",
      dataIndex: "CreatedAt",
      render: (record: any) => (
        <p className="skills-table-data">{getFormattedDate(record)}</p>
      ),
    },
    {
      title: "ACTION",
      className: "table-cell",
      dataIndex: "Action",
      render: (_: any, skill: any) => (
        <div className="table-icons">
          <Tooltip
            color="#626477"
            placement="bottom"
            title={"Click here to update the skill"}
          >
            <FaEdit
              className="editiconbtn-skills"
              onClick={() => handler(skill)}
            />
          </Tooltip>
          <Tooltip
            color="#626477"
            placement="bottom"
            title={"Click here to change the status"}
          >
            <Switch
              className="switch"
              size="small"
              checked={skill.IsActive}
              onChange={() => showConfirmModal(skill)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  function handler(editData: any) {
    const projectData = {
      SkillGuId: editData.SkillGuId,
      SkillName: editData.SkillName,
      SkillDescription: editData.SkillDescription,
      SkillTagId: editData.SkillTagId,
    };
    dispatch<any>(handleEdit(projectData));
  }
  return (
    <>
      <Modal
        open={isConfirmModalVisible}
        closable={false}
        width={450}
        footer={null}
        centered
      >
        <p className="model-line">
          {" "}
          Are you sure you want to{" "}
          {selectedSkill && selectedSkill.IsActive ? (
            <>
              disable{" "}
              <span className="status-skillname">
                {selectedSkill?.SkillName}
              </span>{" "}
            </>
          ) : (
            <>
              enable{" "}
              <span className="status-skillname">
                {selectedSkill?.SkillName}
              </span>{" "}
            </>
          )}
          skill?
        </p>
        <div className="model-button-container">
          <Button
            style={{
              backgroundColor: "#ff4d4f",
              cursor: loading ? "not-allowed" : "pointer",
              marginRight: "5px",
            }}
            type="primary"
            onClick={handleConfirmModalCancel}
          >
            No
          </Button>
          <Button
            loading={loading}
            type="primary"
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              backgroundColor: "#666CFF",
              marginLeft: "5px",
            }}
            onClick={handleConfirmModalOk}
          >
            {loading ? "Updating" : "Yes"}
          </Button>
        </div>
      </Modal>
      <Card
        className="skills-card"
        type="inner"
        title={
          <h3 className="skill-header">
            <TrophyOutlined className="skill-icon" />
            SKILLS
          </h3>
        }
        extra={
          <Button
            icon={<PlusOutlined />}
            onClick={() => dispatch(handleOpen())}
            className="button-Add-skill"
          >
            {" "}
            Add Skill
          </Button>
        }
      >
        {skillsLoad ? (
          <div className="skills-skeleton">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <Table
              columns={columns}
              className="custom-table"
              dataSource={flattenedData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize,
              )}
              size="middle"
              rowClassName={(_, index) =>
                index % 2 === 0 ? "odd-row" : "even-row"
              }
              pagination={
                skillsData?.data?.totalSkills > 10
                  ? {
                      total: flattenedDataLength,
                      current: currentPage,
                      pageSize: pageSize,
                      onChange: (page) => {
                        setCurrentPage(page);
                        dispatch<any>(fetchSkills({ page }));
                      },
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

export default Skills;
