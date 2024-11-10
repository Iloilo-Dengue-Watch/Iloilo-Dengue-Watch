import React, { useEffect, useRef, useState } from 'react';
import JumbotronHome from "./Jumbotron.jsx";
import MeetTheTeam from "./Team.jsx";

export default function Home({ handleTabChange }) {
    useEffect(() => {
        handleTabChange("Home");
    }, [handleTabChange]);

    // State to track visibility
    const [isVisible, setIsVisible] = useState(false);

    // Create a reference to the MeetTheTeam component
    const meetTheTeamRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Trigger transition when visible
                    console.log('Intersected')
                } else {
                    setIsVisible(false); // Optionally hide when not visible
                }
            },
            {
                threshold: 0.01, // This means 50% of the element needs to be visible
            }
        );

        if (meetTheTeamRef.current) {
            observer.observe(meetTheTeamRef.current);
        }

        return () => {
            if (meetTheTeamRef.current) {
                observer.unobserve(meetTheTeamRef.current);
            }
        };
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg">
            <JumbotronHome />
            <div
                ref={meetTheTeamRef} // Attach the ref to the MeetTheTeam component
            >
                <MeetTheTeam onScreen={isVisible}/>
            </div>
        </div>
    );
}
