import { FolderOpenFilled, SafetyCertificateFilled } from "@ant-design/icons";
import { faTrophy, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TabsProps } from "antd";
import { Button, Modal, Tabs } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../../redux/features/modal-slice/modalSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import ProjectsDetails from "../../common-components/projects/Project";
import BasicInfoData from "./BasicInfo.dashboard";
import CertificatesData from "./Certification.dashboard";
import SkillsData from "./Skills.dashboard";
import "./modal.css";
import { ProjectTypes } from "../../../shared/enums";
import {
  getProjects,
  resetProjectAction,
} from "../../../redux/features/common-features/projectSlice";

const DashboardModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  const modalState = useSelector(
    (state: RootState) => state.ModalAction.modalState,
  );

  const { isProjectLoaded } = useSelector(
    (state: RootState) => state.ProjectAction,
  );

  const [tabs, setTabs] = useState("1");
  const handleTabs = (key: string) => {
    setTabs(key);
  };

  const handleModal = () => {
    dispatch(setModalOpen(false));
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span onClick={() => handleTabs("1")}>
          <FontAwesomeIcon
            size="lg"
            icon={faUser}
            style={{ marginRight: "8px" }}
          />
          BASIC INFO
        </span>
      ),
      children: <BasicInfoData />,
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            handleTabs("2");
            if (!isProjectLoaded) {
              const payload = {
                EmployeeGuID: empID,
                projectStatus: ProjectTypes.ACTIVE,
                page: 1,
              };
              dispatch(
                getProjects({ ...payload, projectStatus: ProjectTypes.ACTIVE }),
              );
              dispatch(
                getProjects({
                  ...payload,
                  projectStatus: ProjectTypes.UPCOMING,
                }),
              );
              dispatch(
                getProjects({ ...payload, projectStatus: ProjectTypes.PAST }),
              );
            }
          }}
        >
          <FolderOpenFilled style={{ fontSize: "1.1rem" }} />
          PROJECTS
        </span>
      ),
      children: <ProjectsDetails type={ProjectTypes.DASHBOARD} />,
    },
    {
      key: "3",
      label: (
        <span onClick={() => handleTabs("3")}>
          <FontAwesomeIcon
            size="lg"
            icon={faTrophy}
            style={{ marginRight: "8px" }}
          />
          SKILLS
        </span>
      ),
      children: <SkillsData />,
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleTabs("4")}>
          <SafetyCertificateFilled style={{ fontSize: "1.1rem" }} />
          CERTIFICATION
        </span>
      ),
      children: <CertificatesData />,
    },
  ];
  const modalFooter = (
    <div>
      <Button
        type="primary"
        className="close-btn"
        onClick={() => {
          handleModal();
          handleTabs("1");
          dispatch(resetProjectAction());
        }}
      >
        Close
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        open={modalState}
        title={<div className="modal-title">Employee Information</div>}
        centered
        closable={false}
        footer={modalFooter}
        bodyStyle={{ overflowX: "hidden", height: 400, marginBottom: "20px" }}
        width={800}
        maskClosable={false}
      >
        <Tabs activeKey={tabs} items={items} className="modal-tabs" />
      </Modal>
    </>
  );
};

export default DashboardModal;
