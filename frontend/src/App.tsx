import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/auth";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
