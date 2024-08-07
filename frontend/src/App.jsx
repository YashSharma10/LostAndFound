import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Lostitm from './Pages/Lostitm';
import Founditm from './Pages/Founditm';
import Report from './Pages/Report';
import LoginForm from './Pages/LoginForm';
import Profile from './Pages/Profile';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <ToastContainer />
      <Router>
        <Header onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <div>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Lostitm" element={<Lostitm />} />
            <Route path="/Founditm" element={<Founditm />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
