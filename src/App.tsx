import { useState } from "react";
import "../src/assets/styles/styles.css";
import { AppContext } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";
import "../src/assets/styles/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          userInfo,
          setUserInfo,
        }}
      >
        <ToastContainer style={{ fontSize: "13px" }} />
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
