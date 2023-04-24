import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ColorModeSwitcher />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
