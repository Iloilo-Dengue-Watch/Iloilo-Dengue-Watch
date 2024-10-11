import "bootstrap/dist/css/bootstrap.min.css";


function JumbotronHome() {

    return (
        <>
            <main role="main">
                <section
                    className="bg-center bg-no-repeat bg-[url('https://static.scientificamerican.com/sciam/cache/file/87033586-8B8D-4E17-8DA97BF7FD3AE633_source.jpg')] bg-gray-700 bg-blend-multiply">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            Iloilo City Dengue Watch Project</h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            An AI4GHI Challenge Project Submission.</p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="/general-information"
                               className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Get started
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <a href="https://ai4pep.org/ai4ghi/"
                               className="inline-flex justify-center hover:text-black items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                               <span className="hover:text-black">
                                    Go to AI4GHI Challenge
                                </span>
                            </a>
                            <a href="https://github.com/miniloda/AI4GHI-Challenge"
                               className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                                <img src='https://img.icons8.com/?size=100&id=62856&format=png&color=000000'
                                     className="h-10"/>
                                <span className="hover:text-black">
                                    Source Code
                                </span>
                            </a>
                        </div>
                    </div>
                </section>

            </main>


        </>
    );
}

export default JumbotronHome;
