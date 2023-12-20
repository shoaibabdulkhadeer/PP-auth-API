const iconColor = {
  color: "rgba(116,119,126,1)",
};
const cardShadow = {
  boxShadow: "rgba(76, 78, 100, 0.22) 0px 2px 10px 0px",
};
const toolTipCss = {
  fontSize: "10px",
  padding: "0",
};
const textMaxLength = 50;
const getColor = (index: any) => {
  if (index === 0) {
    return "#FD636B";
  } else if (index === 1) {
    return "#FFBA00";
  } else if (index === 2) {
    return "#38E9B2";
  } else if (index === 3) {
    return "#14B1D1";
  } else if (index === 4) {
    return "#6967CF";
  } else if (index === 5) {
    return "rgb(14 165 233)";
  } else if (index === 6) {
    return "rgb(124 58 237)";
  } else if (index === 7) {
    return "rgb(168 85 247)";
  } else if (index === 8) {
    return "rgb(236 72 153)";
  } else if (index === 9) {
    return "rgb(244 63 94)";
  }
};
export { toolTipCss, iconColor, getColor, cardShadow, textMaxLength };
