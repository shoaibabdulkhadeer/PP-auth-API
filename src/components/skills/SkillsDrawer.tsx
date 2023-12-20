import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkillTagname,
  fetchSkills,
  handleClose,
} from "../../redux/features/skills/skillsSlice";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Col, Drawer, Input, Row, Form, Radio, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./SkillsStyle.css";
import { ErrorPages } from "../../shared/enums";
import { useNavigate } from "react-router-dom";
import { addSkill } from "../../redux/features/skills/addSkillSlice";
import { updateSkill } from "../../redux/features/skills/updateSkillSlice";

const SkillsDrawer = () => {
  const { open, add, skillsDetails, tagData } = useSelector(
    (state: any) => state.SkillsAction,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch<any>(fetchSkillTagname());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    SkillName: Yup.string()
      .required("Skill Name is required")
      .max(100, "Skill Name should be 100 in length"),
    SkillDescription: Yup.string()
      .required("Skill Description is required")
      .max(500, "Skill Description should be 500 in length"),
    SkillTagName: Yup.string().required("Skill TagName is required"),
  });

  return (
    <>
      <Drawer
        width={420}
        title={add ? "Add Skill" : "Edit Skill"}
        placement="right"
        onClose={() => dispatch(handleClose())}
        open={open}
        maskClosable={false}
        closable={false}
        extra={
          <Tooltip
            color="#626477"
            placement="bottom"
            title={"Click here to close"}
          >
            <CloseOutlined
              onClick={() => dispatch(handleClose())}
              className="Skill-closable"
            />
          </Tooltip>
        }
      >
        <Formik
          initialValues={
            add
              ? {
                  SkillName: "",
                  SkillDescription: "",
                  SkillTagName: "",
                }
              : {
                  SkillName: skillsDetails.SkillName,
                  SkillDescription: skillsDetails.SkillDescription,
                  SkillTagName: skillsDetails.SkillTagId,
                  SkillGuId: skillsDetails.SkillGuId,
                }
          }
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={
            add
              ? async (values, actions) => {
                  try {
                    setLoading(true);
                    const formData = {
                      SkillName: values.SkillName.trim(),
                      SkillDescription: values.SkillDescription.trim(),
                      SkillTagId: values.SkillTagName,
                    };
                    const resultAction = await dispatch<any>(
                      addSkill(formData),
                    );
                    if (resultAction.payload.code === 200) {
                      toast.success(resultAction.payload.message);
                      dispatch<any>(fetchSkills({ page: 1 }));
                      actions.resetForm();
                      dispatch(handleClose());
                      setLoading(false);
                    } else if (resultAction.payload.code === 400) {
                      toast.warning(resultAction.payload.message);
                      setLoading(false);
                    } else {
                      setLoading(false);
                      navigate(ErrorPages.ERROR_500);
                    }
                  } catch (error) {
                    navigate(ErrorPages.ERROR_500);
                    setLoading(false);
                  }
                }
              : async (values, actions) => {
                  setLoading(true);
                  try {
                    const formData = {
                      SkillGuId: values.SkillGuId,
                      SkillName: values.SkillName.trim(),
                      SkillDescription: values.SkillDescription.trim(),
                      SkillTagId: values.SkillTagName,
                    };
                    const resultAction = await dispatch(updateSkill(formData));
                    if (resultAction.payload?.data?.code === 200) {
                      toast.success(resultAction.payload.data.message);
                      dispatch<any>(fetchSkills({ page: 1 }));
                      setLoading(false);
                      dispatch(handleClose());
                    } else if (resultAction.payload.code === 400) {
                      setLoading(false);
                      toast.warning(resultAction.payload.message);
                    } else {
                      setLoading(false);
                      navigate(ErrorPages.ERROR_500);
                    }
                  } catch (error) {
                    navigate(ErrorPages.ERROR_500);
                    setLoading(false);
                  }
                }
          }
        >
          {({
            handleSubmit,
            values,
            handleChange,
            setFieldValue,
            resetForm,
          }) => (
            <Form layout="vertical">
              <Row gutter={24}>
                <Col span={20}>
                  <Form.Item
                    label={
                      <span className="skillname-label">
                        Skill Name <span className="red-asterisk">*</span>
                      </span>
                    }
                    name="SkillName"
                    className="label-on-top"
                  >
                    <div>
                      <Input
                        placeholder="Please enter Skill name"
                        autoComplete="off"
                        name="SkillName"
                        value={values.SkillName}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="SkillName"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={20}>
                  <Form.Item
                    label={
                      <span className="skillname-label">
                        Skill Description{" "}
                        <span className="red-asterisk">*</span>
                      </span>
                    }
                    name="SkillDescription"
                  >
                    <div>
                      <Input.TextArea
                        placeholder="Please enter Skill description"
                        autoComplete="off"
                        name="SkillDescription"
                        value={values.SkillDescription}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="SkillDescription"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label={
                      <span className="skillname-label">
                        Skill Tag <span className="red-asterisk">*</span>
                      </span>
                    }
                    name="SkillTagName"
                  >
                    <div>
                      <Radio.Group
                        value={values.SkillTagName}
                        onChange={(e) => {
                          setFieldValue("SkillTagName", e.target.value);
                        }}
                      >
                        {tagData?.data?.map((tag: any) => (
                          <Radio key={tag.SkillTagId} value={tag.SkillTagId}>
                            {tag.SkillTagName}
                          </Radio>
                        ))}
                      </Radio.Group>
                      <ErrorMessage
                        name="SkillTagName"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <div className="skills-buttons-container">
                <div>
                  <Button
                    onClick={() => {
                      resetForm();
                      dispatch(handleClose());
                    }}
                    className="button-Skills-Cancel"
                  >
                    Cancel
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    loading={loading}
                    style={{
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    className="button-Skills-Submit"
                    onClick={() => handleSubmit()}
                  >
                    {add
                      ? loading
                        ? "Loading"
                        : "Submit"
                      : loading
                      ? "Updating"
                      : "Update"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default SkillsDrawer;
