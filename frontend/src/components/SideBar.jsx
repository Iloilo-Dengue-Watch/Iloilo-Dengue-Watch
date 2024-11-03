"use client";

import { Badge, Sidebar } from "flowbite-react";
import { HiHome, HiChartPie, HiInbox, HiViewBoards, HiUser, HiDocumentText } from "react-icons/hi"; // Import new icon for Feedback
import { Link } from 'react-router-dom';
import { useState } from "react";
// Define the custom theme for the Sidebar
const customTheme = {
    root: {
        base: "h-full w-64 bg-[#86C5D8]", // Custom background color for the sidebar
    },
    item: {
        base: "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    },
};

export default function SideBarComponent({tabChosen}) {
    const [isClosed, setIsClosed] = useState(false);
    return (
        <Sidebar aria-label="Custom Sidebar" theme={customTheme}>
            <h1 className="text-l font-bold text-center">
                   Iloilo City Dengue Watch 
            </h1>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item as={Link} to="/" icon={HiHome} className = {`${tabChosen === "Home" ? 'bg-blue-500' : ''} `}>
                        Home
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/data" icon={HiChartPie} className = {`${tabChosen === "Data" ? 'bg-blue-500' : ''} `}>
                        Data
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/general-information" icon={HiViewBoards} className = {`${tabChosen === "GenInfo" ? 'bg-blue-500' : ''} `}>
                        General Information
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/chat" icon={HiInbox} className = {`${tabChosen === "Chat" ? 'bg-blue-500' : ''} `}>
                        Chat With ChatGPT 4
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/news" icon={HiUser} className = {`${tabChosen === "News" ? 'bg-blue-500' : ''} `}>
                        News
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/contribute" icon={HiDocumentText} className = {`${tabChosen === "Contribute" ? 'bg-blue-500' : ''} `}> {/* New feedback item */}
                        Contribute
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
            <Sidebar.CTA className={`${isClosed ? 'hidden': ''}`}>
        <div className={` mb-3 flex items-center`}>
          <Badge color="warning">Beta</Badge>
          <button
            aria-label="Close"
            className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            type="button"
            onClick={() => setIsClosed(true)}
          >
            <svg
              aria-hidden
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
          This website is still being built and may contain bugs. Please let us know in feedback section if you encounter any issues.
        </div>
      </Sidebar.CTA>
        </Sidebar>
    );
}
