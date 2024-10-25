import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBarComponent from './components/SideBar.jsx';
import Data from "./components/Data/Data.jsx";
import Chat from "./components/Chat/Chat.jsx";
import NewsSection from "./components/News/NewsSection.jsx";
import Home from "./components/Home/Home.jsx";
import GeneralInfo from "./components/GenInfo/GeneralInfo.jsx";
import Navbar from "./components/Home/Navbar.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";

function App() {
    const [isLargerScreen, setIsLargerScreen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        // Function to update the state based on screen size
        const handleResize = () => {
            setIsLargerScreen(window.innerWidth >= 768);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <Router>
            <div className="flex flex-col md:flex-row h-screen overflow-y-auto relative md:m-10 rounded-2xl shadow-lg">
                {/* Conditionally render Navbar for smaller screens and Sidebar for larger screens */}
                {isLargerScreen ? (
                    <SideBarComponent />
                ) : (
                    <Navbar />
                )}

                {/* Main content area */}
                <div className="content flex-1 overflow-y-auto bg-gradient-to-r from-blue-100 to-blue-300">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/data" element={<Data />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/news" element={<NewsSection />} />
                        <Route path="/general-information" element={<GeneralInfo />} />
                        <Route path="/feedback" element={<Feedback />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
