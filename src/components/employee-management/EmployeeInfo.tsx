import { useSelector } from "react-redux";
import { getTitleCase } from "../../common/common";
import { RootState } from "../../redux/store";

export default function EmployeeInfo() {
  const { basicIntial } = useSelector(
    (state: RootState) => state.EmpGetALlAction,
  );
  if (!basicIntial.FullName) {
    return <></>;
  }
  return (
    //  <div style={{boxShadow:"inherit",marginTop:"0.5rem",padding:"0.5rem 0"}}>
    <div
      style={{
        fontFamily: "'Roboto',sans-serif",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "black",
          fontFamily: "'Roboto',sans-serif",
          textAlign: "center",
          fontSize: "15px",
        }}
      >
        {getTitleCase(basicIntial.FullName)}
      </p>

      <p
        style={{
          margin: 0,
          color: "gray",
          fontFamily: "'Roboto',sans-serif",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        {basicIntial.Username}
      </p>
    </div>
  );
}
