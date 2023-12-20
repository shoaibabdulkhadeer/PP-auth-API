import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  disableEmpSkillApi,
  empResetDisableSkillAction,
  getEmpSkillApi,
} from "../../../redux/features/employee-management/empSkillSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { ErrorPages } from "../../../shared/enums";
import "./SkillRating.css";
export default function DisableSkillModal({
  disOpen,
  disableControllModal,
  skillMappingsGuid,
  SkillName,
}: any) {
  const navigate = useNavigate();
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  const disPatch = useDispatch<AppDispatch>();
  const disableSkillHandler = async () => {
    const res = await disPatch(disableEmpSkillApi(skillMappingsGuid));
    if (res.payload.code === 200) {
      toast.info(res.payload.message);
      disPatch(getEmpSkillApi(empID));
      disPatch(empResetDisableSkillAction());
    } else if (res.payload.response?.data.code === 500) {
      navigate(ErrorPages.ERROR_500);
    } else if (
      res.payload.response?.data.code >= 400 &&
      res.payload.response?.data.code <= 499
    ) {
      toast.warning(res.payload.message);
    }
    disableControllModal();
  };

  return (
    <Modal
      style={{ padding: "0" }}
      maskClosable={false}
      closeIcon={false}
      open={disOpen}
      centered
      footer={null}
    >
      <p
        style={{
          margin: "0.5rem 0",
          textAlign: "center",
          color: " #211F43",
          fontSize: "16px",
        }}
      >
        Are you sure, you want to delete the{" "}
        <span style={{ color: "#666cff" }}>{SkillName}</span> skill ?
      </p>
      <p
        style={{ display: "flex", justifyContent: "center", columnGap: "1rem" }}
      >
        <Button
          type="primary"
          danger
          size="small"
          onClick={disableControllModal}
        >
          No
        </Button>
        <Button type="primary" size="small" onClick={disableSkillHandler}>
          Yes
        </Button>
      </p>
    </Modal>
  );
}
