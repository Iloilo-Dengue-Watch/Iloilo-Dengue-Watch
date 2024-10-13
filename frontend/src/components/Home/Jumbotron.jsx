import "bootstrap/dist/css/bootstrap.min.css";

function JumbotronHome() {
    return (
        <>
            <div>
                <section
                    className="bg-center bg-no-repeat bg-[url('https://static.scientificamerican.com/sciam/cache/file/87033586-8B8D-4E17-8DA97BF7FD3AE633_source.jpg')] bg-gray-700 bg-blend-multiply h-[80vh]">
                    <div className="px-4 mx-auto max-w-screen-xl text-center h-full flex flex-col justify-center">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-4xl lg:text-5xl">
                            Iloilo City Dengue Watch Project
                        </h1>
                        <p className="mb-8 text-base font-normal text-gray-300 lg:text-lg sm:px-8 lg:px-16">
                            An AI4GHI Challenge Project Submission.
                        </p>
                        <div className="flex flex-col space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
                            <a href="/general-information"
                               className="w-full md:w-auto inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Get started
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <a href="https://ai4pep.org/ai4ghi/"
                               className="w-full md:w-auto inline-flex justify-center hover:text-black items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                               <span className="hover:text-black">
                                    Go to AI4GHI Challenge
                                </span>
                            </a>
                            <a href="https://github.com/miniloda/AI4GHI-Challenge"
                               className="w-full md:w-auto inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                                <img src='https://img.icons8.com/?size=100&id=62856&format=png&color=000000'
                                     className="h-10"/>
                                <span className="hover:text-black">
                                    Source Code
                                </span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default JumbotronHome;
