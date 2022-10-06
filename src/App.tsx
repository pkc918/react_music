import { Button } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutFrame from "./components/Layout";
import Discover from "./views/Discover";

function Login() {
  return (
    <div>
      <Button>登录</Button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutFrame />}>
            <Route index element={<Navigate to="login" />}></Route>
            <Route path="login" element={<Discover />}></Route>
            <Route path="a" element={<Login />}></Route>
            <Route path="b" element={<Login />}></Route>
            <Route path="c" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
