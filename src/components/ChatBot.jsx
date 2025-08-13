import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import NewChat from "./NewChat"
import SideBar from "./SideBar"
import TopBar from "./TopBar"
import Conversation from "./Conversation"
export default function ChatBot() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (

    <div className=" md:grid md:grid-cols-6 h-svh w-screen text-sm overflow-hidden">
      <div className={`${mobileMenuOpen ? "" : "hidden"} absolute md:relative h-full md:flex md:col-span-1 z-10`}>
        <SideBar
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>

      <div className="h-svh  md:col-span-5">
        <div className="flex h-1/10 w-full">
          <TopBar
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
        <div className="h-9/10 z-0">
          <Routes>
            <Route path="/" element={<NewChat />} />
            <Route path="/c/:conversationId" element={<Conversation />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>

  );
}
