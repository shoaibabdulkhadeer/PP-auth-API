//500
//401

import { Button, Col, Empty, Row } from "antd";
import { useNavigate } from "react-router-dom";
import img500 from "../assets/image/500.png";
import { DashboardLink } from "../shared/enums";
import "./ErrorPage.css";

const ErrorPage500 = () => {
  const navigate = useNavigate();
  return (
    <div className="outer-err-container">
      <Row className="err-container">
        <Col>
          <Empty
            className="server-err-message"
            image={img500}
            imageStyle={{ height: 300 }}
            description="Internal Server Error"
          />
        </Col>
        <Col className="err-text">
          The server encountered an internal error please try again later.
        </Col>
        <Col className="err-btn">
          <Button
            onClick={() => navigate(DashboardLink.PROGRESS_HIGHLIGHTS)}
            type="primary"
            className="button-87"
          >
            Back to Dashboard
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ErrorPage500;
