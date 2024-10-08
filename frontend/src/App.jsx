import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewsSection from "./components/News/NewsSection.jsx";
import Chat from "./components/Chat/Chat.jsx";
function App() {

  return (
    <>
        <Chat />
        <NewsSection />
    </>
  )
}

export default App
