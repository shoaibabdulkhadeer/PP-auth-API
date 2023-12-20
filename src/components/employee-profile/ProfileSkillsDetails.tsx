import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./ProfileSkillsDetails.css";
import { Empty, Spin } from "antd";

const ProfileSkillsDetails = () => {
  const { employeeSkillsData, employeeSkillsDataLoading } = useSelector(
    (state: RootState) => state.EmployeeSkillsAction,
  );

  let dataSources = employeeSkillsData.length
    ? employeeSkillsData?.flatMap((employee: any) => {
        return employee?.skillsMappings?.map((skill: any) => ({
          key: skill?.SkillMappingGuId,
          skillName: skill?.SkillGuIdInfo?.SkillName,
          reportingManagerRating: skill?.ReportingManagerRating,
          selfRating: skill?.SelfRating,
          skillGuid: skill?.SkillGuId,
        }));
      })
    : [];

  if (employeeSkillsDataLoading) {
    return (
      <>
        {" "}
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
      </>
    );
  } else {
    const skills =
      dataSources.length !== 0 ? (
        <div className="circular-container">
          {dataSources.map((skill, index) => (
            <div
              key={skill.key || index}
              className={`circular color-${(index % 5) + 1}`}
            >
              <div className="circular-content">
                {skill.skillName
                  .split(" ")
                  .map(
                    (word: any) => word.charAt(0).toUpperCase() + word.slice(1),
                  )
                  .join(" ")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty style={{ padding: "0.5rem" }} description="No Skills Found" />
      );

    return <>{skills}</>;
  }
};

export default ProfileSkillsDetails;
