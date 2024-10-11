import JumbotronHome from "./Jumbotron.jsx";
import MeetTheTeam from "./Team.jsx";

export default function Home(){
    return(
        <div className="bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg">

            <JumbotronHome />
            <MeetTheTeam />
        </div>
    );
}