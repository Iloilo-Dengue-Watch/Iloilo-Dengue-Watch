export default function Variables() {
    return (
        <>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Environmental Variables</h1>
    <div className="grid lg:grid-cols-2 gap-8 md:p-8 rounded-lg">

        <VariableCard
                title="Temperature"
                description="Warmer temperatures accelerate the mosquito life cycle, reducing the time from egg to adult.
                This leads to more frequent breeding cycles and a higher population of mosquitoes¹.
                However, extremely high temperatures can be detrimental to mosquito survival.
                The optimal temperature for mosquito activity is around 25-30°C."
                image_src="https://media.istockphoto.com/id/1323823418/photo/low-angle-view-thermometer-on-blue-sky-with-sun-shining.jpg?s=612x612&w=0&k=20&c=LwLCGF902C-DNwKgCMCR12zFnB4g1INWzlk1JPOidRk="
                read_more="https://doi.org/10.1186/s12889-024-18869-0"
            />
            <VariableCard
                title="Humidity"
                description="High humidity levels are crucial for mosquito survival and activity.
                Mosquitoes thrive in humid conditions as it prevents them from drying out.
                Humidity also affects their flight patterns and feeding behavior²."
                image_src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKBcoPhC0ZZCQ_citwTN1pEz55-TNM0igtPw&s"
                read_more="https://doi.org/10.1371/journal.pntd.0010859"
            />
            <VariableCard
                title="Precipitation"
                description="Rainfall creates breeding sites by providing standing water, which is essential for mosquito larvae to develop. Increased precipitation can lead to more breeding sites and thus a higher mosquito population²."
                image_src="https://st.depositphotos.com/1763191/5012/v/450/depositphotos_50127793-stock-illustration-a-rainy-weather.jpg"
                read_more="https://doi.org/10.1371/journal.pntd.0010859"
            />
            <VariableCard
                title="Heat Index"
                description="The heat index, which combines temperature and humidity, can influence mosquito activity. Higher heat indices can enhance mosquito metabolism and breeding rates, but extreme heat indices might reduce their survival³."
                image_src="https://contents.pep.ph/images2/images2/2024/04/04/heat-index-1712236326.jpg"
                read_more="https://doi.org/10.1186/s12942-022-00317-0"
            />
        </div>
            </>
    );
}

function VariableCard({ title, description, image_src, read_more }) {
    return (
        <div className="w-full bg-white bg-opacity-80 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg w-full h-48 object-cover" src={image_src} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {description}
                </p>
                <a href={read_more}
                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    );
}