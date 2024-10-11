"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiHome } from "react-icons/hi";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function SideBarComponent() {
    return (
        <Sidebar aria-label="Default sidebar example" className="bg-[#86C5D8] h-full w-64"> {/* Set a fixed width for Sidebar */}
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
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
