"use client";

import { Sidebar } from "flowbite-react";
import { HiHome, HiChartPie, HiInbox, HiViewBoards, HiUser, HiDocumentText } from "react-icons/hi"; // Import new icon for Feedback
import { Link } from 'react-router-dom';

// Define the custom theme for the Sidebar
const customTheme = {
    root: {
        base: "h-full w-64 bg-[#86C5D8]", // Custom background color for the sidebar
    },
    item: {
        base: "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    },
};

export default function SideBarComponent() {
    return (
        <Sidebar aria-label="Custom Sidebar" theme={customTheme}>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item as={Link} to="/" icon={HiHome}>
                        Home
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/data" icon={HiChartPie}>
                        Data
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/general-information" icon={HiViewBoards}>
                        General Information
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/chat" icon={HiInbox}>
                        Chat With ChatGPT 4
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/news" icon={HiUser}>
                        News
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="/feedback" icon={HiDocumentText}> {/* New feedback item */}
                        Feedback
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
