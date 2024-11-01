import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBarComponent from './components/SideBar.jsx';
import Data from "./components/Data/Data.jsx";
import Chat from "./components/Chat/Chat.jsx";
import NewsSection from "./components/News/NewsSection.jsx";
import Home from "./components/Home/Home.jsx";
import GeneralInfo from "./components/GenInfo/GeneralInfo.jsx";
import Navbar from "./components/Home/Navbar.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";

export default function App() {
    const [isLargerScreen, setIsLargerScreen] = useState(window.innerWidth >= 768);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0); // Convert lastScrollY to useRef
    const [tabChosen, setTabChosen] = useState('Home');

    const handleResize = () => {
        setIsLargerScreen(window.innerWidth >= 768);
    };

    const handleScroll = () => {
        const mainBody = document.getElementById("main");
        if (mainBody) {
            const currentScrollY = mainBody.scrollTop;
            if (currentScrollY > lastScrollY.current) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true); // Show on scroll up
            }
            lastScrollY.current = currentScrollY; // Update the ref value
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        
        // Add scroll event listener to the #main element
        const mainBody = document.getElementById("main");
        mainBody?.addEventListener("scroll", handleScroll);

        // Clean up event listeners on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            mainBody?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleTabChange = (tab) => {
        setTabChosen(tab);
    };

    return (
        <Router>
            <div className="flex flex-col md:flex-row h-screen relative md:m-10 md:rounded-2xl shadow-lg">
                {/* Conditionally render Navbar for smaller screens and Sidebar for larger screens */}
                {isLargerScreen ? (
                    <SideBarComponent tabChosen={tabChosen} />
                ) : (
                    <Navbar isVisible={isVisible} tabChosen={tabChosen}/> // Pass visibility state
                )}

                {/* Main content area */}
                <div className={`content flex-1 overflow-y-auto bg-gradient-to-r from-blue-100 to-blue-300 ${isVisible && !isLargerScreen ? 'mt-20': 'mt-0'} `} id="main">
                    <Routes>
                        <Route path="/" element={<Home handleTabChange={handleTabChange} />} />
                        <Route path="/data" element={<Data handleTabChange={handleTabChange} />} />
                        <Route path="/chat" element={<Chat handleTabChange={handleTabChange}/>} />
                        <Route path="/news" element={<NewsSection handleTabChange={handleTabChange}/>} />
                        <Route path="/general-information" element={<GeneralInfo handleTabChange={handleTabChange}/>} />
                        <Route path="/feedback" element={<Feedback handleTabChange={handleTabChange} />}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
