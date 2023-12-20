import NOSkillFound from "../../assets/image/No Record.jpg";
export default function NoData() {
  return (
    <div style={{ height: "150px" }}>
      <img
        src={NOSkillFound}
        width="100%"
        height="100%"
        style={{ objectFit: "contain", mixBlendMode: "multiply" }}
        alt="No Data"
      />
    </div>
  );
}
