import { useEffect } from 'react';
import SIR from './SIR';
import {Link } from 'react-router-dom';

export default function PlayGround({ handleTabChange }) {
    useEffect(() => {
        handleTabChange("playground");
    }, [handleTabChange]);

    return (
        <div className='mb-10'>
            <h1 className='text-center text-3xl font-bold mt-12 mb-20'>Welcome to the Playground!</h1>
            <div className="space-y-12">
                <SIRInfo />
                <NetLogoInfo />
            </div>
        </div>
    );
}

function SIRInfo() {
    return (
        <div className="px-6 font-sans">
            <div className="lg:max-w-7xl max-w-lg mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="max-h-80">
                    <video className="rounded-md object-cover w-full h-full" autoPlay
                        muted
                        playsInline
                        onEnded={(e) => {
                            e.target.currentTime = 0;
                            e.target.play();
                        }}>
                          <source src="/PlayGround/SIR.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-purple-700 mb-4">Compartmental SIR Model</h2>
                        <p className="text-gray-600 text-sm leading-6">
                            The Susceptible-Infected-Recovered (SIR) model is a classic framework in epidemiology for modeling the spread of infectious diseases. It divides the population into three compartments—Susceptible, Infected, and Recovered—representing the stages of disease transmission.
                        </p>
                        <ul className="list-disc text-sm text-gray-600 space-y-2 pl-4 mt-6">
                            <li>Analyze disease spread and recovery rates.</li>
                            <li>Adjust parameters to simulate different outbreak scenarios.</li>
                            <li>Understand the impact of interventions on disease dynamics.</li>
                        </ul>
                        <div className="mt-6">
                            <Link to="/playground/sir" className="text-purple-600 text-sm font-semibold hover:underline">Explore SIR Model</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NetLogoInfo() {
    return (
        <div className="px-6 font-sans">
            <div className="lg:max-w-7xl max-w-lg mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-purple-700 mb-4">Agent-Based Model with NetLogo</h2>
                        <p className="text-gray-600 text-sm leading-6">
                            Agent-Based Modeling (ABM) is a powerful simulation approach for studying interactions within complex systems. Using NetLogo, you can simulate the behaviors of individuals (agents) and observe how their interactions influence the entire system over time.
                        </p>
                        <ul className="list-disc text-sm text-gray-600 space-y-2 pl-4 mt-6">
                            <li>Model individual behaviors and interactions.</li>
                            <li>Explore complex systems from biology to social sciences.</li>
                            <li>Experiment with different scenarios to observe emergent patterns.</li>
                        </ul>
                        <div className="mt-6">
                            <Link to="/playground/netlogo" className="text-purple-600 text-sm font-semibold hover:underline">Explore NetLogo</Link>
                        </div>
                    </div>
                    <div className="max-h-80">
                        <video className="rounded-md object-cover w-full h-full" autoPlay
                        muted
                        playsInline
                        onEnded={(e) => {
                            e.target.currentTime = 0;
                            e.target.play();
                        }}>
                          <source src="/PlayGround/NetLogo.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    );
}
