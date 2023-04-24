import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ColorModeSwitcher from './components/ColorModeSwitcher';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <ColorModeSwitcher />
        <LogoutButton />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
