import DengueInfo from "./DengueInfo.jsx";
import Variables from "./Variables.jsx";
import {InfoGraphics} from "./InfoGraphics.jsx";
export default function GeneralInfo(){
    return(
        <div className="bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">General Information</h1>
            <DengueInfo />
            <Variables />
            <InfoGraphics />
        </div>
    );
}