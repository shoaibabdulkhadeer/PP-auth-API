import "../../../../assets/styles/styles.css";
import { Layout } from "antd";

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "black",
        padding: "0.5rem",
        width: "100%",
        position: "fixed",
        bottom: "0px",
        zIndex: 1,
      }}
    >
      <a href="https://www.g7cr.com/" target="blank" style={{ color: "#fff" }}>
        &copy;2023 G7 CR Technologies India Pvt Ltd.
      </a>
    </Footer>
  );
};

export default Footer;
