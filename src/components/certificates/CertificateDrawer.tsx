import { Button, Drawer, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCertificate } from "../../redux/features/certificates/addCertificateSlice";
import { updateCertificate } from "../../redux/features/certificates/updateCertificateSlice";
import { useEffect, useRef, useState } from "react";
import { certificateSchema } from "../../utils/validation";
import { CloseOutlined } from "@ant-design/icons";
import { ErrorPages } from "../../shared/enums";
import { useNavigate } from "react-router-dom";

const CertificateDrawer = (props: any) => {
  const { handleClose, open, providers, intData, addUpdate, fetching } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //#region useSelector
  const { addData, addload } = useSelector(
    (state: any) => state.AddCertificateAction,
  );

  const { updateData, updateload } = useSelector(
    (state: any) => state.UpdateCertificationAction,
  );
  //#endregion

  //#region dropdown
  const Option = Select.Option;
  let children: any = [];
  const certProviders = providers;

  for (let i = 0; i < certProviders?.length; i++) {
    children.push(
      <Option
        key={certProviders[i].CertificationProviderId}
        value={certProviders[i].CertificationProviderName}
      >
        {certProviders[i].CertificationProviderName}
      </Option>,
    );
  }
  //#endregion

  //#region AddCertification ststus code handler

  const didMountRef1 = useRef(false);
  useEffect(() => {
    if (didMountRef1.current) {
      const addCertificateTost = async () => {
        if (addData?.request?.status === 200) {
          setLoading(false);
          handleClose();
          await fetching();
          toast.success("Certificate added successfully");
        } else if (addData?.request?.status === 400) {
          setLoading(false);
          toast.warning(addData.data?.message);
        } else if (addData?.request?.status === 500) {
          setLoading(false);
          navigate(ErrorPages.ERROR_500);
        }
      };

      addCertificateTost();
    } else {
      didMountRef1.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addData, navigate]);
  //#endregion

  //#region updateCertificate status code handler

  const didMountRef2 = useRef(false);
  useEffect(() => {
    if (didMountRef2.current) {
      const updateCertificateTost = async () => {
        if (updateData?.request?.status === 200) {
          setLoading(false);
          handleClose();
          toast.success("Certificate details updated successfully");
          await fetching();
        } else if (updateData?.request?.status === 400) {
          setLoading(false);
          toast.warning(updateData.data?.message);
        } else if (updateData?.request?.status === 500) {
          setLoading(false);
          navigate(ErrorPages.ERROR_500);
        }
      };
      updateCertificateTost();
    } else {
      didMountRef2.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateData, navigate]);
  //#endregion
  const formikRef: any = useRef(null);

  const handleResetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  };

  return (
    <div>
      <Drawer
        title={
          <div style={{ color: "grey" }}>
            {addUpdate ? "Add Certificates" : "Update Certificates"}
          </div>
        }
        closable={false}
        className="certDrawer"
        open={open}
        style={{ width: "100" }}
        width={400}
        placement="right"
        extra={
          <CloseOutlined
            style={{ color: "grey" }}
            onClick={() => {
              handleResetForm();
              handleClose();
            }}
            title="Close"
          />
        }
      >
        <Formik
          initialValues={intData}
          enableReinitialize={true}
          onSubmit={
            addUpdate
              ? async (values: any) => {
                  try {
                    setLoading(true);
                    values.CertificationName = values.CertificationName.trim();
                    values.CertificationDescription =
                      values.CertificationDescription.trim();
                    const data = certProviders.filter(
                      (val: any) =>
                        val.CertificationProviderName ===
                        values.CertificationProvider,
                    );
                    values.CertificationProviderId =
                      data[0].CertificationProviderId;

                    await dispatch(addCertificate(values));
                  } catch (error) {
                    setLoading(false);
                    toast.error("Something! went wrong please try again later");
                  }
                }
              : async (values: any) => {
                  try {
                    setLoading(true);
                    const data = certProviders.filter(
                      (val: any) =>
                        val.CertificationProviderName ===
                        values.CertificationProvider,
                    );
                    values.CertificationProviderId =
                      data[0].CertificationProviderId;
                    const changedFields: any = {};
                    Object.keys(values).forEach((field) => {
                      if (values[field] !== intData[field]) {
                        changedFields[field] = values[field];
                      }
                    });

                    if (Object.keys(changedFields).length === 0) {
                      setLoading(false);
                      toast.info("No change found");
                      return;
                    }
                    if (changedFields.CertificationName) {
                      changedFields.CertificationName =
                        changedFields.CertificationName.trim();
                    }
                    if (changedFields.CertificationDescription) {
                      changedFields.CertificationDescription =
                        changedFields.CertificationDescription.trim();
                    }
                    changedFields.CertificationGuId = intData.CertificationGuId;
                    await dispatch(updateCertificate(changedFields));
                  } catch (error) {
                    setLoading(false);
                    toast.error("Something! went wrong please try again later");
                  }
                }
          }
          validationSchema={certificateSchema}
          innerRef={formikRef}
        >
          {({
            handleChange,
            values,
            errors,
            touched,
            setFieldValue,
            resetForm,
          }: any) => (
            <Form>
              {/* Text field certificate name*/}

              <Title level={5} className="drawewr-title drawewr-title-first">
                Certification Name <span style={{ color: "#ff1616" }}>*</span>.
              </Title>
              <Input
                size="large"
                autoFocus
                className="drawer-input"
                maxLength={100}
                autoComplete="off"
                value={values.CertificationName}
                name="CertificationName"
                onChange={handleChange}
                placeholder="CertificationName"
              />
              {errors.CertificationName && touched.CertificationName ? (
                <span style={{ color: "red" }}>{errors.CertificationName}</span>
              ) : (
                ""
              )}

              {/* Text field certificate description*/}

              <Title level={5} className="drawewr-title">
                Certification Description{" "}
                <span style={{ color: "#ff1616" }}>*</span>
              </Title>

              <TextArea
                size="large"
                autoComplete="off"
                maxLength={500}
                className="drawer-input"
                value={values.CertificationDescription}
                name="CertificationDescription"
                onChange={handleChange}
                placeholder="CertificationDescription"
              />
              {errors.CertificationDescription &&
              touched.CertificationDescription ? (
                <span style={{ color: "red" }}>
                  {errors.CertificationDescription}
                </span>
              ) : (
                ""
              )}

              {/* Text field certificate provider selector*/}

              <Title level={5} className="drawewr-title">
                Certification Provider{" "}
                <span style={{ color: "#ff1616" }}>*</span>
              </Title>
              <Select
                showSearch
                placeholder="Certification Provider"
                className="drawer-input"
                style={{ width: "100%" }}
                value={values.CertificationProvider}
                onChange={(value: string) => {
                  setFieldValue("CertificationProvider", value);
                }}
                filterOption={(input: any, option: any) =>
                  String(option?.children)
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {children}
              </Select>
              {errors.CertificationProvider && touched.CertificationProvider ? (
                <span style={{ color: "red" }}>
                  {errors.CertificationProvider}
                </span>
              ) : (
                ""
              )}
              <br />
              <br />
              <br />

              {/* Text field buttons */}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => {
                    resetForm();
                    handleClose();
                  }}
                  type="button"
                  className="drawer-button button-cancle"
                  style={{
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  Cancel
                </button>
                {addUpdate ? (
                  <Button
                    loading={addload}
                    className={
                      values.CertificationName &&
                      values.CertificationDescription &&
                      values.CertificationProvider
                        ? "drawer-button button-submit"
                        : "disable-button"
                    }
                    style={{
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    htmlType="submit"
                    disabled={
                      values.CertificationName &&
                      values.CertificationDescription &&
                      values.CertificationProvider
                        ? false
                        : true
                    }
                  >
                    {loading ? "loading" : "Submit"}
                  </Button>
                ) : (
                  <Button
                    loading={updateload}
                    className={
                      values.CertificationName &&
                      values.CertificationDescription &&
                      values.CertificationProvider
                        ? "drawer-button button-submit"
                        : "disable-button"
                    }
                    style={{
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    htmlType="submit"
                    disabled={
                      values.CertificationName &&
                      values.CertificationDescription &&
                      values.CertificationProvider
                        ? false
                        : true
                    }
                  >
                    {loading ? "loading" : "Submit"}
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Drawer>
    </div>
  );
};

export default CertificateDrawer;
