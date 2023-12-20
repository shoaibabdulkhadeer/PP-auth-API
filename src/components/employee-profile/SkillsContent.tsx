import React, { useEffect, useState } from "react";
import { Rate, Table, Empty, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeeSelfRating } from "../../redux/features/employee/employeeSkillsPatchSlice";
import { RootState } from "../../redux/store";
import { fetchEmployeeSkills } from "../../redux/features/employee/employeeSkillsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import "./SkillsContent.css";
import { useNavigate } from "react-router-dom";
import { ErrorPages } from "../../shared/enums";

const SkillsContent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employeeSkillsDataLoading }: any = useSelector(
    (state: RootState) => state.EmployeeSkillsAction,
  );

  let [starData, setStarData] = useState<any[]>([]);

  const fetchSkills = async () => {
    const list = await dispatch(fetchEmployeeSkills());
    if (list?.payload?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    }
    if (list?.payload?.length !== 0) {
      const skills = list?.payload[0]?.skillsMappings?.map((element: any) => ({
        key: element?.SkillMappingGuId,
        skillName: element?.SkillGuIdInfo?.SkillName,
        reportingManagerRating: element?.ReportingManagerRating,
        selfRating: element?.SelfRating,
        skillGuid: element?.SkillGuId,
      }));
      setStarData((prev: any) => skills);
    }
  };

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelfRatingChange = async (key: any, selfRating: any) => {
    if (selfRating === 0) {
      toast.warning("Selected Self Rating value is already set for the skill");
      return;
    }
    const updatedData = starData?.map((item) => {
      if (item.key === key) {
        return { ...item, selfRating };
      }
      return item;
    });
    setStarData((prev: any) => updatedData);

    const data = updatedData?.filter((ele: any) => ele.key === key);
    const resultAction = await dispatch(
      updateEmployeeSelfRating({
        SelfRating: data[0].selfRating,
        SkillGuId: data[0].skillGuid,
      }),
    );
    if (resultAction?.payload?.data?.code === 200) {
      toast.success("Self rating updated successfully");
    } else if (resultAction?.payload?.code === 400) {
      toast.warning(resultAction.payload.message);
    } else if (resultAction?.payload?.code === 500) {
      navigate(ErrorPages.ERROR_500);
    } else {
      toast.warning(resultAction.payload.message);
    }
  };

  useEffect(() => {}, [starData]);

  const columns = [
    {
      title: "SKILL NAME",
      dataIndex: "skillName",
      key: "skillName",
      width: "25%",
    },
    {
      title: <>REPORTING MANAGER RATING{"  "}</>,
      dataIndex: "reportingManagerRating",
      key: "reportingManagerRating",
      render: (rating: any) => (
        <Rate
          value={rating}
          disabled
          allowHalf
          style={{ cursor: "not-allowed" }}
        />
      ),
      width: "25%",
      onCell: (record: any) => ({
        style: { cursor: "not-allowed" },
      }),
    },
    {
      title: (
        <>
          UPDATE SELF RATING{"  "}
          &nbsp;
          <FontAwesomeIcon size="lg" icon={faEdit} />
        </>
      ),
      dataIndex: "selfRating",
      key: "selfRating",
      render: (selfRating: any, record: any) => (
        <Rate
          value={selfRating}
          onChange={(value) => handleSelfRatingChange(record.key, value)}
        />
      ),
      width: "25%",
    },
  ];

  return (
    <>
      {employeeSkillsDataLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              marginBottom: "10px",
            }}
          ></div>
          <Table
            className="skills-content-tbl"
            locale={{ emptyText: <Empty description="No Skills Found" /> }}
            dataSource={starData}
            columns={columns}
            pagination={false}
            scroll={{ y: 400, x: "max-content" }}
            style={{ marginBottom: "3rem" }}
          />
        </div>
      )}
    </>
  );
};

export default SkillsContent;
