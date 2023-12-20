import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./ProfileCertificateDetails.css";
import { Empty, Spin } from "antd";

const ProfileCertificateDetails = () => {
  //FUNCTION TO DETERMINE BACKGROUND COLOR
  const getBackgroundColor = (index: any) => {
    const colors = ["#14B1D1", "#FD636B", "#FFBA00", "#38E9B2"];
    return colors[index % colors.length];
  };

  const { certificateData, certificateDataLoading }: any = useSelector(
    (state: RootState) => state.EmpGetCertificateAction,
  );

  const certificateDetail = certificateData?.map((cert: any) => {
    const data = {
      CertificateName: cert?.CertificationName,
      CertificateGuid: cert?.CertificationGuId,
      CertificateDescription: cert?.CertificationDescription,
    };
    return data;
  });

  // FUNCTION TO CAPITALIZE THE FIRST LETTER
  function capitalizeFirstLetter(string: any) {
    return string
      .split(" ")
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const uniqueCertificateNames: any = [];

  certificateDetail?.forEach((cert: any) => {
    const certificateName = capitalizeFirstLetter(cert.CertificateName);
    if (!uniqueCertificateNames.includes(certificateName)) {
      uniqueCertificateNames.push(certificateName);
    }
  });

  return (
    <>
      {certificateDataLoading ? (
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
        <div
          className="profile-certificate-container"
          style={{
            minHeight: "178px",
            maxHeight: "178px",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          {uniqueCertificateNames.length <= 0 ? (
            <Empty
              style={{ padding: "0.5rem" }}
              description="No Certificates Found"
            />
          ) : (
            uniqueCertificateNames.map((certificateName: any, index: any) => (
              <div
                className="profile-ceritficate"
                key={certificateName}
                style={{ backgroundColor: getBackgroundColor(index) }}
              >
                <span>{certificateName}</span>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ProfileCertificateDetails;
