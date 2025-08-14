import { LuSquarePen } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import {useUserEmail, useSignOut} from "@nhost/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSubscription } from '@apollo/client';
import { CHAT_LIST } from "../graphql/subscription";

export default function SideBar({setMobileMenuOpen}){
    const userEmail = useUserEmail();
    const { signOut } = useSignOut()
    const navigate = useNavigate();
    const { data } = useSubscription(CHAT_LIST);
    
    const logoutHandler = () => {
        signOut();
        setMobileMenuOpen(false);
        toast.success("Logged out successfully");
        navigate("/");
    };
    
    return (
        <>
            <div className="flex flex-col gap-1 w-fit md:w-full h-full p-2 border border-gray-200 bg-gray-50  opacity-100">
                <div className="h-fit flex md:hidden justify-between items-center gap-30 px-2">
                    <h1 className="text-2xl font-semibold tracking-tighter">ChatBot</h1>
                    <RxCross2 
                        className="text-2xl cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                </div>
                <div className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-xl cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <LuSquarePen className="text-lg" />
                    <div>New chat</div>
                </div>
                <div className="text-gray-400 p-2">Chats</div>
                <div className="flex flex-col h-100 md:min-h-110 max-h-100 overflow-y-scroll">
                    {data?.chats.map((chat, index) => (
                        <div key={index} className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-xl cursor-pointer"
                            onClick={() => {setMobileMenuOpen(false); navigate(`/c/${chat.id}`)}}
                        >
                            {chat?.name}
                        </div>
                    ))}
                </div>
                <div className="h-full flex flex-col ">
                    <div className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-xl cursor-pointer">
                        {userEmail}
                    </div>
                    <div className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-xl cursor-pointer"
                        onClick={() => {logoutHandler()}}
                    >
                        <BiLogOutCircle className="text-lg" />
                        Logout
                    </div>
                </div>
            </div>
        </>
    );
}