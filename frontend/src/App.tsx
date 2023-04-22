import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthProvider, useAuth} from "./context/auth";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    const {authenticated} = useAuth();

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={authenticated ? <Home/> : <Navigate to="/login"/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
