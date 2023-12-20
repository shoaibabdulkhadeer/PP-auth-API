import { Modal, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmpSkillApi,
  patchRmRatingApi,
  rmResetSkillRatingAction,
} from "../../../redux/features/employee-management/empSkillSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { toast } from "react-toastify";

export default function SkillRateConfirm({
  open,
  controllModal,
  rmSkilRating,
  skillMappingsGuid,
}: any) {
  const disPatch = useDispatch<AppDispatch>();
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  return (
    <Modal
      title="Reporting Manager Rating"
      open={open}
      onOk={async () => {
        const res = await disPatch(
          patchRmRatingApi({ skillMappingsGuid, rmSkilRating }),
        );
        if (res.payload.code === 200) {
          toast.info(res.payload.message);
          disPatch(getEmpSkillApi(empID));
          disPatch(rmResetSkillRatingAction());
        }
        if (res.payload.response?.data.code === 500) {
          toast.error(res.payload.message);
        }
        if (
          res.payload.response?.data.code >= 400 &&
          res.payload.response?.data.code <= 499
        ) {
          toast.warning(res.payload.message);
        }
        controllModal();
      }}
      closeIcon={false}
      maskClosable={false}
      onCancel={controllModal}
      okText="Submit"
      cancelText="Cancel"
      centered
    >
      <h2 style={{ textAlign: "center", margin: "2.5rem" }}>
        <Rate
          value={rmSkilRating}
          disabled
          allowHalf
          style={{ fontSize: 50 }}
        />
      </h2>
    </Modal>
  );
}
