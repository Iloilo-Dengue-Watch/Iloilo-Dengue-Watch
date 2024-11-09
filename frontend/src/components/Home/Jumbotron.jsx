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
                        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-4 p-10">
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
                <NewsLetter />
            </div>
        </>
    );
}


function NewsLetter() {
    return (
      <div className="bg-gradient-to-r from-blue-100 to-blue-300 py-16 px-6 font-sans">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-gray-800 md:text-5xl text-4xl font-extrabold mb-6">Join Our Exclusive Newsletter</h2>
          <p className="text-xl text-gray-700">Be part of our ever-growing community. Get updates about Dengue forecasts, warnings, and many others.</p>
  
          <div className="bg-white shadow-lg rounded-lg p-8 mt-12 flex flex-col md:flex-row items-center justify-center">
            <input type="email" placeholder="Enter your email" className="w-full md:w-96 bg-transparent border-b-2 border-blue-500 py-3 px-4 text-gray-800 text-base focus:outline-none placeholder-gray-500 placeholder-opacity-70" />
            <button className="max-md:mt-6 md:ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded hover:shadow-md hover:transform hover:scale-105 focus:outline-none">
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }
  
export default JumbotronHome;
