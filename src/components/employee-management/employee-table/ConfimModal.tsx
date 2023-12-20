import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { updateEmpStatus } from "../../../redux/features/employee-management/empStatusSlice";
import { AppDispatch } from "../../../redux/store";

export default function ConfimModal({ open, ControllModal, emp }: any) {
  const disPatch = useDispatch<AppDispatch>();
  const empStatushandler = () => {
    disPatch(updateEmpStatus(emp.empID));
    ControllModal();
  };
  return (
    <Modal
      maskClosable={false}
      closeIcon={false}
      open={open}
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
        Are you sure, you want to {emp.status ? "deactivate" : "activate"}{" "}
        <span style={{ color: "#666cff" }}>{emp.name}</span> account?
      </p>
      <p
        style={{ display: "flex", justifyContent: "center", columnGap: "1rem" }}
      >
        <Button type="primary" danger size="small" onClick={ControllModal}>
          No
        </Button>
        <Button type="primary" size="small" onClick={empStatushandler}>
          Yes
        </Button>
      </p>
    </Modal>
  );
}
