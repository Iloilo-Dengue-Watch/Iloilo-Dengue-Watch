import DengueInfo from "./DengueInfo.jsx";
import Variables from "./Variables.jsx";

export default function GeneralInfo(){
    return(
        <div className="bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg">
            <DengueInfo />
            <Variables />
        </div>
    );
}