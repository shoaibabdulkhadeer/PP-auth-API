import { TrophyOutlined } from "@ant-design/icons";
import { Form, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllSkills } from "../../../redux/features/common-features/skillSlice";
import {
  empResetPostSkillSlAction,
  getEmpSkillApi,
  postEmpSkillApi,
} from "../../../redux/features/employee-management/empSkillSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { ErrorPages } from "../../../shared/enums";

export default function AddSkill({ open, controlModal, skillNames }: any) {
  const [SkillGuId, setSkillGuid] = useState<string>();
  const navigate = useNavigate();
  const disPatch = useDispatch<AppDispatch>();
  useEffect(() => {
    disPatch(getAllSkills());
  }, [disPatch]);

  const { skillData } = useSelector((state: RootState) => state.SkillAction);
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  return (
    <Modal
      title={
        <span>
          <TrophyOutlined /> ADD SKILL
        </span>
      }
      open={open}
      onOk={async () => {
        const res = await disPatch(postEmpSkillApi({ empID, SkillGuId }));
        if (res.payload.code === 200) {
          toast.success(res.payload.message);
          disPatch(empResetPostSkillSlAction());
          disPatch(getEmpSkillApi(empID));
          setSkillGuid("");
        } else if (res.payload.response?.data.code === 500) {
          navigate(ErrorPages.ERROR_500);
        } else if (
          res.payload.response?.data.code >= 400 &&
          res.payload.response?.data.code <= 499
        ) {
          toast.warning(res.payload.message);
        }
        controlModal();
      }}
      okButtonProps={{ disabled: SkillGuId ? false : true }}
      maskClosable={false}
      onCancel={() => {
        controlModal();
        setSkillGuid("");
      }}
      okText="Add Skill"
      cancelText="Cancel"
      centered
    >
      <Form style={{ minHeight: "130px" }}>
        <Form.Item label="Search Skill" required labelCol={{ span: 24 }}>
          <Select
            showSearch
            placeholder="Select Your Skill"
            optionFilterProp="children"
            value={SkillGuId ? SkillGuId : null}
            onChange={(value) => setSkillGuid(value)}
            listHeight={100}
          >
            {skillData.map((skill: any) =>
              !skillNames?.includes(skill.SkillName) ? (
                <Select.Option key={skill.SkillGuId}>
                  {skill.SkillName}
                </Select.Option>
              ) : (
                ""
              ),
            )}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
