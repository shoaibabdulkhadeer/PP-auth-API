//500
//401

import { Button, Col, Empty, Row } from "antd";
import { useNavigate } from "react-router-dom";
import img403 from "../assets/image/403.png";
import { DashboardLink } from "../shared/enums";
import "./ErrorPage.css";

const ErrorPage500 = () => {
  const navigate = useNavigate();
  return (
    <div className="outer-err-container">
      <Row className="err-container">
        <Col>
          <Empty
            className="error-403"
            image={img403}
            imageStyle={{ height: 300 }}
            description="Forbidden!!"
          />
        </Col>

        <Col className="err-text">
          You do not have permission to access requested page.
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
