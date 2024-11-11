import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./asset.css";

export default function WeatherDengue({ content }) {
    const [displayedContent, setDisplayedContent] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    // Typing effect for content
    useEffect(() => {
        if (content) {
            let currentIndex = 0;
            setIsTyping(true);
            const typingInterval = setInterval(() => {
                setDisplayedContent((prev) => prev + content[currentIndex]);
                currentIndex += 1;
                if (currentIndex === content.length-1) {
                    clearInterval(typingInterval);
                    setIsTyping(false);
                }
            }, 10); // Adjust speed by changing the interval time
            return () => clearInterval(typingInterval);
        }
    }, [content]);

    return (
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md border border-gray-200 mx-auto !w-full" id="chat-summary">
            <div className="flex items-center justify-center mb-4">
                <img src='https://img.icons8.com/?size=512&id=TUk7vxvtu6hX&format=png' alt="ChatGPT Logo" className="w-12 h-12 mr-4" /> {/* ChatGPT image */}
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                    Weather and Dengue Information <br></br>Summary Today
                </h1>
            </div>
            <div className="lg:hidden">
                <p
                    className="text-black lg:text-lg leading-relaxed w-full"
                    dangerouslySetInnerHTML={{ __html: content }}
                    id="chat-summary-content"
                />
            </div>
            {content ? (
                <div className="lg:block md:hidden">
                <p
                    className="text-black lg:text-lg leading-relaxed w-full"
                    dangerouslySetInnerHTML={{ __html: displayedContent }}
                    id="chat-summary-content"
                />
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <ClipLoader />
                </div>
            )}

            {isTyping && (
                <div className="text-center mt-4 text-gray-600 italic text-sm hidden lg:block">
                    Loading updates...
                </div>
            )}

            {/* Note Section */}
            <div className="bg-blue-50 text-blue-900 p-4 mt-8 rounded-lg border border-blue-200 text-center bottom-4">
                <p className="text-base">
                    For more detailed news and article references, visit our
                    <Link to="/news" className="text-blue-600 underline ml-1 font-semibold hover:text-blue-800 transition-colors">
                        News Section``
                    </Link>.
                </p>
            </div>
        </div>
    );
}

