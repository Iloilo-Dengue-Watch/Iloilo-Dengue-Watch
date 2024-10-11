import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBarComponent from './components/SideBar.jsx';
import Data from "./components/Data/Data.jsx";
import Chat from "./components/Chat/Chat.jsx";
import NewsSection from "./components/News/NewsSection.jsx";
import Home from "./components/Home/Home.jsx";
import GeneralInfo from "./components/GenInfo/GeneralInfo.jsx";
function App() {
    return (
        <Router>
            {/* Outer div with rounded-2xl class for rounded edges */}
            <div className="flex flex-row h-screen overflow-y-auto m-10 rounded-2xl shadow-lg bg-white relative">
                <SideBarComponent />
                <div className="content p-4 flex-1 overflow-y-auto"> {/* Allow overflow if content is too tall */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/data" element={<Data />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/news" element={<NewsSection />} />
                        <Route path="/general-information" element={<GeneralInfo />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
