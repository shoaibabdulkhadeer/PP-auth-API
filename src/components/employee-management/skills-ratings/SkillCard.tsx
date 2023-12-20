import { DeleteFilled } from "@ant-design/icons";
import { Button, Card, Col, Rate, Row, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getEmpSkillApi,
  patchRmRatingApi,
  rmResetSkillRatingAction,
} from "../../../redux/features/employee-management/empSkillSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import DisableSkillModal from "./SkillDisablePop";
import "./SkillRating.css";
import { useNavigate } from "react-router-dom";
import { ErrorPages } from "../../../shared/enums";
const SkillCard = ({
  SkillName,
  SelfRating,
  ReportingManagerRating,
  SkillTags,
  skillMappingsGuid,
}: any) => {
  const navigate = useNavigate();
  const [disOpen, setDisOpen] = useState<boolean>(false);
  const disableControllModal = () => {
    setDisOpen(!disOpen);
  };

  const roleRm = sessionStorage.getItem("role") === "Reporting Manager";
  const disPatch = useDispatch<AppDispatch>();
  const { empID } = useSelector((state: RootState) => state.EmpGetALlAction);
  const rmRatingHandler = async (rating: number) => {
    const res = await disPatch(
      patchRmRatingApi({ skillMappingsGuid, rmSkilRating: rating }),
    );
    if (res.payload.code === 200) {
      toast.success(res.payload.message);
      disPatch(getEmpSkillApi(empID));
      disPatch(rmResetSkillRatingAction());
    } else if (res.payload.response?.data.code === 500) {
      navigate(ErrorPages.ERROR_500);
    } else if (
      res.payload.response?.data.code >= 400 &&
      res.payload.response?.data.code <= 499
    ) {
      toast.warning(res.payload.message);
    }
  };
  return (
    <>
      <Col key={skillMappingsGuid}>
        <Card
          size="small"
          title={
            <Tooltip placement="top" title={SkillName}>
              <span className="card-title">{SkillName}</span>
            </Tooltip>
          }
          extra={
            <div
              style={{
                display: "flex",
                columnGap: "0.5rem",
                alignItems: "center",
              }}
            >
              <p className="skill-tag">{SkillTags}</p>
              <Tooltip placement="top" title="Click here to delete skill">
                {" "}
                <Button
                  onClick={disableControllModal}
                  type="default"
                  style={{
                    borderRadius: "50%",
                    padding: "0",
                    fontSize: "12px",
                    color: "rgb(196 6 6)",
                    // color:"#a14e4e",
                    border: "none",
                  }}
                  danger
                  ghost
                  icon={<DeleteFilled />}
                />
              </Tooltip>
            </div>
          }
          headStyle={{
            background: "#61C0C2",
            padding: "0 0.5rem",
            minHeight: "38px",
          }}
          // bodyStyle={{ padding: "24px 10px" }}
          style={{
            background: "#ffff",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            width: 280,
          }}
        >
          <Row align={"middle"} gutter={[5, 5]}>
            <Col xs={12}>
              <p className="rating-text">SELF RATING</p>
            </Col>
            <Col xs={12}>
              <Tooltip
                placement="top"
                title="Only the respective employee can provide a rating for it."
              >
                <Rate
                  value={SelfRating}
                  disabled
                  style={{ fontSize: "17px" }}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row align={"middle"} gutter={[3, 3]}>
            <Col xs={12}>
              <p className="rating-text">RM RATING</p>
            </Col>
            <Col xs={12}>
              <Tooltip
                placement="top"
                title={
                  roleRm
                    ? ""
                    : "Only reporting manager is the sole authority for providing skill ratings."
                }
              >
                <Rate
                  value={ReportingManagerRating}
                  style={{ fontSize: "17px" }}
                  onChange={(rating) => rmRatingHandler(rating)}
                  tooltips={
                    roleRm
                      ? [
                          "Poor",
                          "Need improvement",
                          "Good",
                          "Very good",
                          "Excellent",
                        ]
                      : []
                  }
                  disabled={roleRm ? false : true}
                />
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </Col>
      <DisableSkillModal
        disOpen={disOpen}
        disableControllModal={disableControllModal}
        skillMappingsGuid={skillMappingsGuid}
        SkillName={SkillName}
      />
    </>
  );
};

export default SkillCard;
