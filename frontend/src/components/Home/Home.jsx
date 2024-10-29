import JumbotronHome from "./Jumbotron.jsx";
import MeetTheTeam from "./Team.jsx";
import { useEffect } from "react";
export default function Home({handleTabChange}) {
    useEffect(() => {
    handleTabChange("Home");
    }, [handleTabChange]);
    return(
        <div className="bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg">

            <JumbotronHome />
            <MeetTheTeam />
        </div>
    );
}