import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
import { Routes, Route, useNavigate } from "react-router-dom";

import Landing from './pages/Landing';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Header /> */}
        <Route path="/" element={<Landing />} />
        {/* <Footer /> */}
      </Routes>
    </div>
  );
}

export default App;
