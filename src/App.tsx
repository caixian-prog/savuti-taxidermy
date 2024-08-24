import "./App.css";
import { Button, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./navigation/RouterConfig";

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
      <BrowserRouter>
        <div className="background">
          <RouterConfig />
        </div>
        {/* <div className="App">
          <header className="App-header">
            <img src={"logo.png"} className="App-logo" alt="logo" />
          </header>
        </div> */}
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
