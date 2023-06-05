import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
import { Routes, Route, useNavigate } from "react-router-dom";

import Landing from './Pages/Landing';
import User from './Pages/User';
import Admin from './Pages/Admin';
import Mint from './Pages/Mint';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Header /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mint" element={<Mint />} />
        {/* <Footer /> */}
      </Routes>
    </div>
  );
}

export default App;
