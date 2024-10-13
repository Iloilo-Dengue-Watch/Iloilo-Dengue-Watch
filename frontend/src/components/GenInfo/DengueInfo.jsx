


export default function DengueInfo() {
    return (
        <div className=" p-10 rounded-lg shadow-lg max-w-4xl mx-auto my-8 bg-white">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Dengue Information in Iloilo City</h1>
            <div className="text-lg text-gray-600 mb-4">
                <p className="mb-2">
                    <strong>Dengue</strong> is a viral infection caused by infected female mosquitoes (<em>Aedes
                    aegypti</em> and <em>Aedes albopictus</em>).
                </p>
                <ul className="list-disc list-inside ml-6">
                    <li>Its incidence has surged globally, reaching <strong>5.2 million cases</strong> in 2019
                        and <strong>6.5 million</strong> in 2023, with over <strong>7,300 deaths</strong>.
                    </li>
                    <li>It is endemic in over <strong>100 countries</strong>, including Southeast Asia, the Americas,
                        and the Western Pacific.
                    </li>
                    <li>The global burden escalates due to climate change, urbanization, and increased human mobility.
                    </li>
                </ul>
            </div>
            <div className="text-lg text-gray-600 mb-4">
                <p className="mb-2">
                    The <strong>Philippines</strong> faces a high dengue burden, with <strong>90,119
                    cases</strong> and <strong>233 deaths</strong> in the first half of 2024.
                </p>
                <ul className="list-disc list-inside ml-6">
                    <li><strong>Iloilo, Philippines</strong>, is highly susceptible to dengue outbreaks due to its dense
                        population, urbanization, and climate.
                    </li>
                    <li>Iloilo City experienced a <strong>161% increase</strong> in dengue cases in the first half of
                        2024.
                    </li>
                    <li>The Department of Health in the Philippines is implementing its <strong>5 Strategies
                        (5S)</strong> program against Dengue.
                    </li>
                    <li>This research on predicting mosquito-borne dengue disease in Iloilo City is hoped to help
                        the <strong>Search and Destroy (5S-1)</strong> strategy in combating dengue.
                    </li>
                </ul>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">The Alarming Cases of Dengue in Iloilo City</h1>
            <div className="mb-4 flex">
                <img src="/public/cases.png" alt="Dengue Cases" className="rounded-lg shadow-lg mx-auto"/>
            </div>
            <div className="text-lg text-gray-600 mb-4">
                <p className="mb-2">
                    Dengue is highly prevalent in Iloilo City, Philippines, due to several factors:
                </p>
                <ul className="list-disc list-inside ml-6">
                    <li><strong>Tropical Climate:</strong> The Philippines has a tropical climate, providing an ideal
                        environment for mosquitoes to breed and thrive.
                    </li>
                    <li><strong>Urbanization:</strong> Rapid urbanization leads to crowded living conditions, which can
                        facilitate the spread of dengue.
                    </li>
                    <li><strong>Water Storage Practices:</strong> Inadequate water storage practices can create breeding
                        grounds for mosquitoes.
                    </li>
                    <li><strong>High Population Density:</strong> Dense populations increase the likelihood of
                        mosquito-human interactions.
                    </li>
                </ul>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">The Dengue Trend</h1>
            <div className="mb-8 flex flex-col items-center">
                <img src="/public/trend.png" alt="Dengue Trend" className="rounded-lg shadow-lg mb-4 w-full max-w-2xl"/>
                <img src="/public/calendar.png" alt="Calendar" className="rounded-lg shadow-lg w-full max-w-2xl"/>
                <div className="text-lg text-gray-600">
                    <p className="mb-4">
                        According to our <a href="/data" className="text-blue-600 hover:underline">model</a> in the data
                        section of the website, the trend of dengue exhibits a yearly seasonality. Cases start to rise
                        in <strong>July</strong> and begin to decline in <strong>November</strong>.
                    </p>
                    <p>
                        This pattern is attributed to the increased rainfall and favorable temperatures for mosquito
                        breeding during these months in the Philippines.
                    </p>
                </div>
            </div>
        </div>
    )
        ;
}