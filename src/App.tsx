import "./App.css";
import { Button, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./navigation/RouterConfig";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#531dab",
          borderRadius: 7,

          // Alias Token
          colorBgContainer: "#fefefe",
        },
      }}
    >
      <AppProvider>
        <AuthProvider>
          <BrowserRouter>
            <RouterConfig />
          </BrowserRouter>
        </AuthProvider>
      </AppProvider>
    </ConfigProvider>
  );
}

export default App;
