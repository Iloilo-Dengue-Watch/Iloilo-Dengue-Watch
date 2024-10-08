import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Home/Navbar';
import Home from './components/Home/Home';
import Data from './components/Data/Data';
import NewsSection from './components/News/NewsSection';
import Map from './components/Map/Map';
import Chat from "./components/Chat/Chat.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
        <Route path="/map" element={<Map />} />
        {/* <Route path="/news" element={<NewsSection />} /> */}
      </Routes>
    </Router>
  );

        
}

export default App;
