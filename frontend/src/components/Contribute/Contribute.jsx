import Feedback from "./Feedback";
import SourceCode from "./SourceCode.tsx";
import { useEffect } from "react";

export default function Contribute({handleTabChange}) {
    useEffect(() => {
        handleTabChange("Contribute");
    },[handleTabChange]);
    return (
        <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-700 text-center">Contribute</h1>
            <div className="grid lg:grid-cols-2 my-5 p-0 md:!p-10">
                <div>
                    <Feedback />
                </div>
                <div className="mt-5 lg:!mt-0">
                    <SourceCode />
                </div>
            </div>
        </div>
    );
}