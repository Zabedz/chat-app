import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

function App() {
  const { authenticated } = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ColorModeSwitcher />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
