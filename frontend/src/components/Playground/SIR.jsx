import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the arrow icon from react-icons

export default function SIR() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [params, setParams] = useState({
        beta_h: 0.3,
        beta_m: 0.1,
        gamma: 0.1,
        sigma: 0.1,
        delta_m: 0.1,
        N_h: 1000,
        N_m: 3000,
        I_h0: 1,
        R_h0: 0,
        I_m0: 10,
        E_m0: 0
    });

    const fetchData = () => {
        setLoading(true);
        const queryString = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
        fetch(`https://dengue-watch-backend-f59b9593b035.herokuapp.com/playground/sir/?${queryString}`)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParams(prevParams => ({
            ...prevParams,
            [name]: parseFloat(value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const tooltipDescriptions = {
        beta_h: 'The transmission rate of the disease from mosquitoes to humans.',
        beta_m: 'The transmission rate of the disease from humans to mosquitoes.',
        gamma: 'The recovery rate of humans infected with the disease.',
        sigma: 'The rate at which mosquitoes transition from exposed to infected.',
        delta_m: 'The death rate of mosquitoes due to the disease.',
        N_h: 'Total population of humans in the simulation.',
        N_m: 'Total population of mosquitoes in the simulation.',
        I_h0: 'Initial number of infected humans.',
        R_h0: 'Initial number of recovered humans.',
        I_m0: 'Initial number of infected mosquitoes.',
        E_m0: 'Initial number of exposed mosquitoes.'
    };

    return (
        <div>
            <div className="top-4 left-8 z-10 px-4 sticky">
                <Link to="/playground" className="text-black p-2 rounded-full transition">
                    <FaArrowLeft size={24} />
                </Link>
            </div>
            <h1 className="text-3xl text-center font-bold mt-12">The SIR Model</h1>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 p-4">
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full md:w-1/3">
                    <h2 className="text-lg font-semibold text-center">Simulation Parameters</h2>
                    <p className="text-center text-sm text-gray-600 mb-4 italic">Hover on each parameter to get info.</p>
                    <div className="grid grid-cols-2 gap-x-3">
                        {Object.keys(params).map((key) => (
                            <div key={key} className="relative mb-3 group">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {key.replace('_', ' ')}:
                                </label>
                                <input
                                    type="number"
                                    name={key}
                                    value={params[key]}
                                    onChange={handleChange}
                                    step="0.1"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {/* Tooltip */}
                                <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                                    {tooltipDescriptions[key]}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                    >
                        Run Simulation
                    </button>
                </form>

                {data && (
                    <div className="w-full md:w-2/3">
                        <Chart
                            options={{
                                chart: {
                                    id: 'sir-chart',
                                    toolbar: { show: true },
                                    animations: {
                                        enabled: true,
                                        easing: 'easeinout',
                                        speed: 1000,
                                        animateGradually: { enabled: true, delay: 150 },
                                        dynamicAnimation: { enabled: true, speed: 500 }
                                    }
                                },
                                stroke: {
                                    curve: 'smooth',
                                    width: 2,
                                    lineCap: 'round',
                                    //colors: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4'],
                                    dashArray: [8, 0, 0, 8, 0, 0, 0]  // Dashed line for susceptible human and mosquito
                                },
                                xaxis: {
                                    categories: data.t,
                                    tickAmount: 10,
                                    labels: {
                                        rotate: -45,
                                        formatter: (val) => `Day ${Math.round(val)}`
                                    },
                                    title: {
                                        text: 'Time (days)',
                                        style: { fontSize: '16px', fontWeight: 'bold' }
                                    }
                                },
                                yaxis: {
                                    title: {
                                        text: 'Population Count',
                                        style: { fontSize: '16px', fontWeight: 'bold' }
                                    }
                                },
                                tooltip: {
                                    enabled: true,
                                    theme: 'dark',
                                    x: { formatter: (value) => `Day ${value}` },
                                    y: { formatter: (value) => value.toFixed(0) }
                                },
                                legend: {
                                    show: true,
                                    position: 'top',
                                    horizontalAlign: 'center',
                                    fontSize: '14px',
                                    fontFamily: 'Helvetica, Arial',
                                    fontWeight: 400
                                }
                            }}
                            series={[
                                { name: 'Susceptible Human', data: data.S_h },
                                { name: 'Infected Human', data: data.I_h },
                                { name: 'Recovered Human', data: data.R_h },
                                { name: 'Susceptible Mosquito', data: data.S_m },
                                { name: 'Exposed Mosquito', data: data.E_m },
                                { name: 'Infected Mosquito', data: data.I_m },
                                { name: 'Recovered Mosquito', data: data.R_m }
                            ]}
                            type="line"
                            width="100%"
                            height="500"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
